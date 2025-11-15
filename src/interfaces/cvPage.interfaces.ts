/**
 * CV Page Interfaces
 * For multi-page A4 layout system
 */

import type { CVComponentData } from "./cVComponentData.interfaces";
import type { LayoutZone } from "@/types/layoutZone.types";

export interface CVPage {
  pageNumber: number;
  zones: {
    [key in LayoutZone]?: CVComponentData[];
  };
  estimatedHeight: number;
}

export interface PageBreakInfo {
  componentId: string;
  shouldBreakBefore: boolean;
  shouldBreakAfter: boolean;
}
