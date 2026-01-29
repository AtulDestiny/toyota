// src/types/hour.ts
export interface Hour {
  id: string;
  name?: string;
  type?: string;
  start_hour?: string;
  end_hour?: string;
  week?: boolean;
  weekEnd?: boolean;
  officeId?: string;
}
