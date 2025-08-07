export interface RoutesType {
  path: string;
  element: React.ReactNode;
}

export interface Lead {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  source: LeadSource;
  salesAgent: string;
  status: LeadStatus;
  tags?: string[];
  timeToClose: number;
  priority: LeadPriority;
  createdAt: Date;
  updatedAt: Date;
  closedAt?: Date;
}

export type LeadStatus =
  | "New"
  | "Contacted"
  | "Qualified"
  | "Proposal Sent"
  | "Closed";

export type LeadSource =
  | "Website"
  | "Referral"
  | "Cold Call"
  | "Advertisement"
  | "Email"
  | "Other";

export type LeadPriority = "High" | "Medium" | "Low";

export interface LeadStats {
  New: number;
  Contacted: number;
  Qualified: number;
  "Proposal Sent": number;
  Closed: number;
}

export interface SalesAgent {
  id: string;
  name: string;
  email: string;
  createdAt?: Date;
}

export interface Comment {
  id: string;
  lead: {
    id: string;
    name: string;
    email: string;
    company?: string;
    status: string;
    priority: LeadPriority;
  };
  author: SalesAgent;
  commentText: string;
  createdAt: Date;
}
