/**
 * Zone Configuration Interface
 * Defines layout zones and their properties for CV templates
 */

import type { LayoutZone } from "@/types/layoutZone.types";

export interface ZoneConfig {
  zone: LayoutZone;
  width: string; // CSS width: "100%", "30%", "70%", etc.
  order: number; // Visual order in the layout
  maxComponents?: number; // Optional limit
}

export interface LayoutZones {
  header?: ZoneConfig;
  sidebar?: ZoneConfig;
  main: ZoneConfig;
  footer?: ZoneConfig;
}
