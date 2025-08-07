import axios from "axios";
import type { Lead, SalesAgent, Comment } from "@/utils/types";

const API_BASE_URL = "http://localhost:5175/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const leadApi = {
  getAllLeads: async (): Promise<Lead[]> => {
    const response = await api.get("/leads");

    return response.data.map((lead: any) => ({
      ...lead,
      salesAgent: lead.salesAgent?.name || lead.salesAgent,
      createdAt: new Date(lead.createdAt),
      updatedAt: new Date(lead.updatedAt),
      closedAt: lead.closedAt ? new Date(lead.closedAt) : undefined,
    }));
  },

  createLead: async (
    leadData: Omit<Lead, "id" | "createdAt" | "updatedAt">,
    salesAgents: SalesAgent[]
  ): Promise<Lead> => {
    const agent = salesAgents.find((a) => a.name === leadData.salesAgent);
    const backendData = {
      ...leadData,
      salesAgent: agent?.id || leadData.salesAgent,
    };
    const response = await api.post("/leads", backendData);
    return {
      ...response.data,
      id: response.data._id,
      salesAgent: leadData.salesAgent,
      createdAt: new Date(response.data.createdAt),
      updatedAt: new Date(response.data.updatedAt),
    };
  },

  updateLead: async (id: string, leadData: Partial<Lead>): Promise<Lead> => {
    const response = await api.put(`/leads/${id}`, leadData);
    return response.data;
  },

  deleteLead: async (id: string): Promise<void> => {
    await api.delete(`/leads/${id}`);
  },

  addCommentToLead: async (
    leadId: string,
    commentData: { commentText: string; author: string }
  ): Promise<Comment> => {
    const response = await api.post(`/leads/${leadId}/comments`, commentData);
    return response.data;
  },

  getCommentsForLead: async (leadId: string): Promise<Comment[]> => {
    const response = await api.get(`/leads/${leadId}/comments`);
    return response.data;
  },
};

export const agentApi = {
  getAllAgents: async (): Promise<SalesAgent[]> => {
    const response = await api.get("/agents");

    return response.data.map((agent: any) => ({
      ...agent,
      id: agent.id,
      createdAt: agent.createdAt ? new Date(agent.createdAt) : undefined,
    }));
  },

  createAgent: async (
    agentData: Omit<SalesAgent, "id" | "createdAt">
  ): Promise<SalesAgent> => {
    const response = await api.post("/agents", agentData);
    return {
      ...response.data,
      id: response.data._id,
      createdAt: response.data.createdAt
        ? new Date(response.data.createdAt)
        : undefined,
    };
  },
};

export const reportApi = {
  getLeadsClosedLastWeek: async (): Promise<number> => {
    const response = await api.get("/reports/last-week");
    return response.data.data;
  },

  getTotalLeadsInPipeline: async (): Promise<number> => {
    const response = await api.get("/reports/pipeline");
    return response.data.data;
  },
};

export default api;
