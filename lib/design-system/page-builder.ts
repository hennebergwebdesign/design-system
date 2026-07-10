// Page builder state: an ordered list of chosen component sections per page.

import type { ComponentVariant } from "./components-library";

export interface PageSection {
  instanceId: string;
  variant: ComponentVariant;
}

export interface Page {
  id: string;
  name: string;
  sections: PageSection[];
}

export function newInstanceId(): string {
  return Math.random().toString(36).slice(2, 10);
}
