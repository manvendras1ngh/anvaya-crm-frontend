import type {
  Comment as CommentType,
  Lead,
  SalesAgent as SalesAgentType,
} from "./types";

//Mock Leads Data
export const mockLeads: Lead[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 8901",
    company: "Acme Corp",
    source: "referral",
    salesAgent: "John Doe",
    status: "New",
    priority: "High",
    timeToClose: 30,
    tags: ["high-value", "enterprise"],
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 234 567 8902",
    company: "Tech Solutions",
    source: "website",
    salesAgent: "Sarah Johnson",
    status: "contacted",
    priority: "medium",
    timeToClose: 45,
    tags: ["follow-up"],
    createdAt: new Date("2024-01-14"),
    updatedAt: new Date("2024-01-16"),
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    phone: "+1 234 567 8903",
    source: "cold-call",
    salesAgent: "Mike Wilson",
    status: "qualified",
    priority: "high",
    timeToClose: 15,
    createdAt: new Date("2024-01-13"),
    updatedAt: new Date("2024-01-17"),
  },
  {
    id: "4",
    name: "Alice Brown",
    email: "alice@example.com",
    phone: "+1 234 567 8904",
    company: "StartupXYZ",
    source: "advertisement",
    salesAgent: "John Doe",
    status: "new",
    priority: "low",
    timeToClose: 60,
    tags: ["startup"],
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-12"),
  },
  {
    id: "5",
    name: "Charlie Wilson",
    email: "charlie@example.com",
    phone: "+1 234 567 8905",
    source: "email",
    salesAgent: "Sarah Johnson",
    status: "contacted",
    priority: "medium",
    timeToClose: 30,
    createdAt: new Date("2024-01-11"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "6",
    name: "David Chen",
    email: "david@example.com",
    phone: "+1 234 567 8906",
    company: "Innovation Labs",
    source: "referral",
    salesAgent: "Mike Wilson",
    status: "proposal-sent",
    priority: "high",
    timeToClose: 10,
    tags: ["proposal", "high-value"],
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-18"),
  },
];

// Mock Sales Agents Data
export const mockSalesAgents: SalesAgentType[] = [
  {
    id: "507f1f77bcf86cd799439011",
    name: "John Doe",
    email: "john.doe@company.com",
    createdAt: new Date("2023-12-01"),
  },
  {
    id: "507f1f77bcf86cd799439012",
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    createdAt: new Date("2023-12-02"),
  },
  {
    id: "507f1f77bcf86cd799439013",
    name: "Mike Wilson",
    email: "mike.wilson@company.com",
    createdAt: new Date("2023-12-03"),
  },
];

// Mock Comments Data with populated lead and author objects
export const mockComments: CommentType[] = [
  {
    id: "507f1f77bcf86cd799439021",
    lead: {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      company: "Acme Corp",
      status: "new",
      priority: "high",
    },
    author: {
      id: "507f1f77bcf86cd799439011",
      name: "John Doe",
      email: "john.doe@company.com",
    },
    commentText:
      "Initial contact made. Client seems very interested in our enterprise solution. High potential for conversion.",
    createdAt: new Date("2024-01-15T10:30:00Z"),
  },
  {
    id: "507f1f77bcf86cd799439022",
    lead: {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      company: "Acme Corp",
      status: "new",
      priority: "high",
    },
    author: {
      id: "507f1f77bcf86cd799439011",
      name: "John Doe",
      email: "john.doe@company.com",
    },
    commentText:
      "Follow-up scheduled for next week. Need to prepare detailed proposal for Acme Corp.",
    createdAt: new Date("2024-01-16T14:20:00Z"),
  },
  {
    id: "507f1f77bcf86cd799439023",
    lead: {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      company: "Tech Solutions",
      status: "contacted",
      priority: "medium",
    },
    author: {
      id: "507f1f77bcf86cd799439012",
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
    },
    commentText:
      "First call completed. Jane is the decision maker at Tech Solutions. Interested in our mid-tier package.",
    createdAt: new Date("2024-01-16T09:15:00Z"),
  },
  {
    id: "507f1f77bcf86cd799439024",
    lead: {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      company: "Tech Solutions",
      status: "contacted",
      priority: "medium",
    },
    author: {
      id: "507f1f77bcf86cd799439012",
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
    },
    commentText:
      "Sent pricing information via email. Awaiting response. Should follow up by end of week.",
    createdAt: new Date("2024-01-17T16:45:00Z"),
  },
  {
    id: "507f1f77bcf86cd799439025",
    lead: {
      id: "3",
      name: "Bob Johnson",
      email: "bob@example.com",
      status: "qualified",
      priority: "high",
    },
    author: {
      id: "507f1f77bcf86cd799439013",
      name: "Mike Wilson",
      email: "mike.wilson@company.com",
    },
    commentText:
      "Qualified lead successfully. Bob has budget approved and timeline is aggressive. Moving to proposal stage.",
    createdAt: new Date("2024-01-17T11:30:00Z"),
  },
  {
    id: "507f1f77bcf86cd799439026",
    lead: {
      id: "3",
      name: "Bob Johnson",
      email: "bob@example.com",
      status: "qualified",
      priority: "high",
    },
    author: {
      id: "507f1f77bcf86cd799439013",
      name: "Mike Wilson",
      email: "mike.wilson@company.com",
    },
    commentText:
      "Proposal draft ready. Will review with team before sending. Client wants to close within 2 weeks.",
    createdAt: new Date("2024-01-18T13:20:00Z"),
  },
  {
    id: "507f1f77bcf86cd799439027",
    lead: {
      id: "4",
      name: "Alice Brown",
      email: "alice@example.com",
      company: "StartupXYZ",
      status: "new",
      priority: "low",
    },
    author: {
      id: "507f1f77bcf86cd799439011",
      name: "John Doe",
      email: "john.doe@company.com",
    },
    commentText:
      "New lead from StartupXYZ. Need to research their business model before making contact.",
    createdAt: new Date("2024-01-12T08:45:00Z"),
  },
  {
    id: "507f1f77bcf86cd799439028",
    lead: {
      id: "4",
      name: "Alice Brown",
      email: "alice@example.com",
      company: "StartupXYZ",
      status: "new",
      priority: "low",
    },
    author: {
      id: "507f1f77bcf86cd799439011",
      name: "John Doe",
      email: "john.doe@company.com",
    },
    commentText:
      "Startup in early stage. Budget constraints likely. Will focus on basic package options.",
    createdAt: new Date("2024-01-13T15:30:00Z"),
  },
  {
    id: "507f1f77bcf86cd799439029",
    lead: {
      id: "5",
      name: "Charlie Wilson",
      email: "charlie@example.com",
      status: "contacted",
      priority: "medium",
    },
    author: {
      id: "507f1f77bcf86cd799439012",
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
    },
    commentText:
      "Charlie responded positively to initial outreach. Scheduling demo for next week.",
    createdAt: new Date("2024-01-15T12:10:00Z"),
  },
  {
    id: "507f1f77bcf86cd799439030",
    lead: {
      id: "5",
      name: "Charlie Wilson",
      email: "charlie@example.com",
      status: "contacted",
      priority: "medium",
    },
    author: {
      id: "507f1f77bcf86cd799439012",
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
    },
    commentText:
      "Demo went well. Charlie is comparing with competitors. Need to highlight our unique value proposition.",
    createdAt: new Date("2024-01-16T10:25:00Z"),
  },
  {
    id: "507f1f77bcf86cd799439031",
    lead: {
      id: "6",
      name: "David Chen",
      email: "david@example.com",
      company: "Innovation Labs",
      status: "proposal-sent",
      priority: "high",
    },
    author: {
      id: "507f1f77bcf86cd799439013",
      name: "Mike Wilson",
      email: "mike.wilson@company.com",
    },
    commentText:
      "Proposal sent to Innovation Labs. David mentioned they have approval process that takes 1-2 weeks.",
    createdAt: new Date("2024-01-18T09:30:00Z"),
  },
  {
    id: "507f1f77bcf86cd799439032",
    lead: {
      id: "6",
      name: "David Chen",
      email: "david@example.com",
      company: "Innovation Labs",
      status: "proposal-sent",
      priority: "high",
    },
    author: {
      id: "507f1f77bcf86cd799439013",
      name: "Mike Wilson",
      email: "mike.wilson@company.com",
    },
    commentText:
      "Follow-up call scheduled. David wants to discuss implementation timeline and support options.",
    createdAt: new Date("2024-01-19T14:15:00Z"),
  },
  {
    id: "507f1f77bcf86cd799439033",
    lead: {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      company: "Acme Corp",
      status: "new",
      priority: "high",
    },
    author: {
      id: "507f1f77bcf86cd799439011",
      name: "John Doe",
      email: "john.doe@company.com",
    },
    commentText:
      "Received positive feedback from technical team at Acme Corp. Moving forward with contract negotiations.",
    createdAt: new Date("2024-01-20T11:45:00Z"),
  },
  {
    id: "507f1f77bcf86cd799439034",
    lead: {
      id: "3",
      name: "Bob Johnson",
      email: "bob@example.com",
      status: "qualified",
      priority: "high",
    },
    author: {
      id: "507f1f77bcf86cd799439013",
      name: "Mike Wilson",
      email: "mike.wilson@company.com",
    },
    commentText:
      "Contract signed! Bob Johnson closed successfully. Implementation starts next Monday.",
    createdAt: new Date("2024-01-21T16:20:00Z"),
  },
  {
    id: "507f1f77bcf86cd799439035",
    lead: {
      id: "6",
      name: "David Chen",
      email: "david@example.com",
      company: "Innovation Labs",
      status: "proposal-sent",
      priority: "high",
    },
    author: {
      id: "507f1f77bcf86cd799439013",
      name: "Mike Wilson",
      email: "mike.wilson@company.com",
    },
    commentText:
      "Innovation Labs approved the proposal! Waiting for signed contract. Deal expected to close this week.",
    createdAt: new Date("2024-01-22T13:40:00Z"),
  },
];
