/**
 * CVCanvas - New Flexible Layout
 * Multi-page A4 canvas with drag & drop, free positioning
 */

import { useMemo, useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { CVDocument } from "@/interfaces/cVDocument.interfaces";
import type { CVComponentData } from "@/interfaces/cVComponentData.interfaces";
import ComponentPreview from "@/components/cv/ComponentPreview";
import {
  distributeComponentsToPages,
  getA4PageStyles,
} from "@/utils/pageCalculator";
import { Trash2, GripVertical, Pencil, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  document: CVDocument;
  onReorderComponents: (components: CVComponentData[]) => void;
  onDeleteComponent: (componentId: string) => void;
  onEditComponent: (componentId: string) => void;
  onAddPage?: () => void;
};

// Sortable Component Wrapper
function SortableComponent({
  component,
  onDelete,
  onEdit,
}: {
  component: CVComponentData;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: component.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this component?")) {
      onDelete(component.id);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(component.id);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.confirm("Delete this component?")) {
      onDelete(component.id);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onContextMenu={handleContextMenu}
      className="group relative"
    >
      {/* Drag Handle & Delete Button */}
      <div className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1 z-10">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-1 bg-gray-200 hover:bg-gray-300 rounded"
          title="Drag to reorder"
        >
          <GripVertical className="w-4 h-4 text-gray-600" />
        </button>
        <button
          onClick={handleEdit}
          className="p-1 bg-blue-100 hover:bg-blue-200 rounded"
          title="Edit component"
        >
          <Pencil className="w-4 h-4 text-blue-600" />
        </button>
        <button
          onClick={handleDelete}
          className="p-1 bg-red-100 hover:bg-red-200 rounded"
          title="Delete component"
        >
          <Trash2 className="w-4 h-4 text-red-600" />
        </button>
      </div>

      {/* Component Content */}
      <div className={isDragging ? "ring-2 ring-blue-400 rounded" : ""}>
        <ComponentPreview component={component} />
      </div>
    </div>
  );
}

export default function CVCanvas({
  document,
  onReorderComponents,
  onDeleteComponent,
  onEditComponent,
  onAddPage,
}: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [manualPageCount, setManualPageCount] = useState(0);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Require 8px movement before dragging starts
      },
    })
  );

  // Group components by page
  const pageMap = useMemo(() => {
    return distributeComponentsToPages(document.components);
  }, [document.components]);

  // Get all page numbers including manually added empty pages
  const pages = useMemo(() => {
    const pageNumbers = Array.from(pageMap.keys()).sort((a, b) => a - b);
    const maxComponentPage =
      pageNumbers.length > 0 ? Math.max(...pageNumbers) : 0;
    const totalPages = Math.max(maxComponentPage, manualPageCount, 1);

    // Create array of page numbers from 1 to totalPages
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }, [pageMap, manualPageCount]);

  const handleAddPage = () => {
    const maxPage = Math.max(...pages, 0);
    setManualPageCount(maxPage + 1);
    if (onAddPage) {
      onAddPage();
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over || active.id === over.id) return;

    const oldIndex = document.components.findIndex((c) => c.id === active.id);
    const newIndex = document.components.findIndex((c) => c.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    // Create new array with reordered components
    const newComponents = [...document.components];
    const [movedComponent] = newComponents.splice(oldIndex, 1);
    const targetComponent =
      newComponents[newIndex >= oldIndex ? newIndex - 1 : newIndex];

    // Update the page number of the moved component to match target
    if (targetComponent) {
      movedComponent.pageNumber = targetComponent.pageNumber;
    }

    newComponents.splice(
      newIndex >= oldIndex ? newIndex : newIndex,
      0,
      movedComponent
    );

    // Update order values for components on the same page
    const pageMap = new Map<number, CVComponentData[]>();
    newComponents.forEach((comp) => {
      if (!pageMap.has(comp.pageNumber)) {
        pageMap.set(comp.pageNumber, []);
      }
      pageMap.get(comp.pageNumber)!.push(comp);
    });

    // Reassign order values within each page
    const reorderedComponents: CVComponentData[] = [];
    Array.from(pageMap.entries())
      .sort(([a], [b]) => a - b)
      .forEach(([, pageComps]) => {
        pageComps.forEach((comp, idx) => {
          reorderedComponents.push({ ...comp, order: idx });
        });
      });

    onReorderComponents(reorderedComponents);
  };

  const activeComponent = activeId
    ? document.components.find((c) => c.id === activeId)
    : null;

  const a4Styles = getA4PageStyles();

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="space-y-8 pl-12">
        {" "}
        {/* Add left padding for drag handles */}
        {pages.map((pageNumber) => {
          const pageComponents = pageMap.get(pageNumber) || [];

          return (
            <div
              key={pageNumber}
              className="bg-white shadow-xl relative mx-auto"
              style={a4Styles}
            >
              {/* Page number indicator */}
              <div className="absolute top-2 right-2 text-xs text-gray-400 font-mono bg-gray-100 px-2 py-1 rounded">
                Page {pageNumber}
              </div>

              {/* Page content */}
              <div className="space-y-3">
                {pageComponents.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-gray-300 text-sm">
                    <div className="text-center">
                      <p>Empty page</p>
                      <p className="text-xs mt-1">
                        Drag components here or add new ones
                      </p>
                    </div>
                  </div>
                ) : (
                  <SortableContext
                    items={pageComponents.map((c) => c.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {pageComponents.map((component) => (
                      <SortableComponent
                        key={component.id}
                        component={component}
                        onDelete={onDeleteComponent}
                        onEdit={onEditComponent}
                      />
                    ))}
                  </SortableContext>
                )}
              </div>
            </div>
          );
        })}
        {/* Add Page Button */}
        <div className="flex justify-center py-4">
          <Button onClick={handleAddPage} variant="outline" className="gap-2">
            <Plus className="w-4 h-4" />
            Add New Page
          </Button>
        </div>
        {/* Show message if no components */}
        {document.components.length === 0 && pages.length === 1 && (
          <div className="text-center text-gray-400 -mt-4 mb-4">
            <p className="text-sm">Your CV is empty</p>
            <p className="text-xs mt-1">
              Start adding components from the left panel
            </p>
          </div>
        )}
      </div>

      {/* Drag Overlay */}
      <DragOverlay>
        {activeComponent && (
          <div className="bg-white shadow-lg rounded p-4 opacity-90">
            <ComponentPreview component={activeComponent} />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
