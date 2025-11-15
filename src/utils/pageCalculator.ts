/**
 * Page Calculator Utilities
 * Calculates component distribution across A4 pages (zone-free system)
 */

import type { CVComponentData } from "@/interfaces/cVComponentData.interfaces";
import type { ComponentType } from "@/types/componentType.types";
import { nanoid } from "./id";

// A4 dimensions in pixels (at 96 DPI)
export const A4_WIDTH_PX = 794; // 210mm
export const A4_HEIGHT_PX = 1123; // 297mm

// Padding and margins
export const PAGE_PADDING = 48; // 12mm each side
export const AVAILABLE_HEIGHT = A4_HEIGHT_PX - PAGE_PADDING * 2; // ~1027px

/**
 * Estimated component heights (in pixels)
 * These are approximations based on typical content
 */
export const COMPONENT_BASE_HEIGHTS: Record<ComponentType, number> = {
  header: 100,
  contact: 80,
  summary: 100,
  experience: 150, // per item
  education: 120, // per item
  skills: 70,
  projects: 180, // per item
  certifications: 70, // per item
  languages: 80,
  custom_section: 120,
};

/**
 * Estimate the height of a component
 */
export function estimateComponentHeight(component: CVComponentData): number {
  const baseHeight = COMPONENT_BASE_HEIGHTS[component.type] || 100;

  // For array-based components, multiply by item count
  if ("items" in component && Array.isArray(component.items)) {
    const itemCount = component.items.length;
    return baseHeight * Math.max(itemCount, 1);
  }

  return baseHeight;
}

/**
 * Distribute components to pages
 * Components stay on their assigned page unless height exceeds page limit
 */
export function distributeComponentsToPages(
  components: CVComponentData[]
): Map<number, CVComponentData[]> {
  const pageMap = new Map<number, CVComponentData[]>();

  // Filter visible components and sort by page number then order
  const visibleComponents = components
    .filter((c) => c.visible)
    .sort((a, b) => {
      if (a.pageNumber !== b.pageNumber) {
        return a.pageNumber - b.pageNumber;
      }
      return a.order - b.order;
    });

  visibleComponents.forEach((component) => {
    const page = component.pageNumber;
    if (!pageMap.has(page)) {
      pageMap.set(page, []);
    }
    pageMap.get(page)!.push(component);
  });

  // Ensure at least page 1 exists
  if (!pageMap.has(1)) {
    pageMap.set(1, []);
  }

  return pageMap;
}

/**
 * Get total pages needed
 */
export function getTotalPages(components: CVComponentData[]): number {
  if (components.length === 0) return 1;
  const maxPage = Math.max(...components.map((c) => c.pageNumber));
  return Math.max(maxPage, 1);
}

/**
 * Get CSS styles for A4 page
 */
export function getA4PageStyles() {
  return {
    width: `${A4_WIDTH_PX}px`,
    minHeight: `${A4_HEIGHT_PX}px`,
    padding: `${PAGE_PADDING}px`,
  };
}

/**
 * Check if adding a component will exceed page height
 */
export function willExceedPageHeight(
  existingComponents: CVComponentData[],
  newComponent: CVComponentData
): boolean {
  const totalHeight = existingComponents.reduce(
    (sum, comp) => sum + estimateComponentHeight(comp),
    0
  );
  const newHeight = estimateComponentHeight(newComponent);

  return totalHeight + newHeight > AVAILABLE_HEIGHT;
}

/**
 * Suggest next available page for a component
 */
export function suggestPageForComponent(
  components: CVComponentData[],
  newComponentType?: ComponentType
): number {
  // Always start at page 1 if no components
  if (components.length === 0) return 1;

  // Group by page
  const pageMap = distributeComponentsToPages(components);
  const maxPage = Math.max(getTotalPages(components), 1);

  // Estimate height for the new component if type provided
  const estimatedNewHeight = newComponentType
    ? COMPONENT_BASE_HEIGHTS[newComponentType] || 100
    : 100;

  // Always try page 1 first, then subsequent pages
  for (let page = 1; page <= maxPage; page++) {
    const pageComponents = pageMap.get(page) || [];

    const totalHeight = pageComponents.reduce(
      (sum, comp) => sum + estimateComponentHeight(comp),
      0
    );

    // Check if new component will fit (with 15% buffer for safety)
    if (totalHeight + estimatedNewHeight <= AVAILABLE_HEIGHT * 0.85) {
      return page;
    }
  }

  // If no space in existing pages, suggest new page
  return maxPage + 1;
}

/**
 * Calculate if component items should overflow to next page
 * For array-based components (experience, education, etc.)
 */
export function calculateItemOverflow(
  component: CVComponentData,
  currentPageComponents: CVComponentData[]
): { itemsOnCurrentPage: number; itemsOnNextPage: number } {
  // Only for array-based components
  if (!("items" in component) || !Array.isArray(component.items)) {
    return { itemsOnCurrentPage: 0, itemsOnNextPage: 0 };
  }

  const totalItems = component.items.length;
  const baseHeight = COMPONENT_BASE_HEIGHTS[component.type] || 100;

  // Calculate current page used height
  const currentPageHeight = currentPageComponents.reduce((sum, comp) => {
    if (comp.id === component.id) return sum; // Don't count current component yet
    return sum + estimateComponentHeight(comp);
  }, 0);

  // Calculate how many items fit on current page
  let itemsOnCurrentPage = 0;
  let accumulatedHeight = currentPageHeight;

  for (let i = 0; i < totalItems; i++) {
    if (accumulatedHeight + baseHeight <= AVAILABLE_HEIGHT * 0.85) {
      itemsOnCurrentPage++;
      accumulatedHeight += baseHeight;
    } else {
      break;
    }
  }

  const itemsOnNextPage = totalItems - itemsOnCurrentPage;

  return { itemsOnCurrentPage, itemsOnNextPage };
}

/**
 * Split array-based component across pages
 */
export function splitComponentAcrossPages(
  component: CVComponentData,
  currentPage: number,
  itemsOnCurrentPage: number
): CVComponentData[] {
  if (!("items" in component) || !Array.isArray(component.items)) {
    return [component];
  }

  const totalItems = component.items.length;

  // If all items fit on current page, no split needed
  if (itemsOnCurrentPage >= totalItems) {
    return [component];
  }

  // Create component for current page with first N items
  const currentPageComponent = {
    ...component,
    items: component.items.slice(0, itemsOnCurrentPage),
  };

  // Create component for next page with remaining items
  const nextPageComponent = {
    ...component,
    id: nanoid(), // Generate unique ID for overflow component
    pageNumber: currentPage + 1,
    order: 0,
    items: component.items.slice(itemsOnCurrentPage),
  };

  return [
    currentPageComponent as CVComponentData,
    nextPageComponent as CVComponentData,
  ];
}
