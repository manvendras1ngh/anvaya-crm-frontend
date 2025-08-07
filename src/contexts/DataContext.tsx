import type {
  Comment as CommentType,
  Lead as LeadType,
  SalesAgent as SalesAgentType,
} from "@/utils/types";
import { useState, useContext, createContext, useEffect } from "react";
import { leadApi, agentApi } from "@/services/api";

interface DataContextType {
  leadsData: LeadType[];
  salesAgentData: SalesAgentType[];
  commentsData: CommentType[];
  setLeadsData: React.Dispatch<React.SetStateAction<LeadType[]>>;
  setSalesAgentData: React.Dispatch<React.SetStateAction<SalesAgentType[]>>;
  setCommentsData: React.Dispatch<React.SetStateAction<CommentType[]>>;
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

function useDataContext() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a data provider");
  }
  return context;
}

export function DataContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [leadsData, setLeadsData] = useState<LeadType[]>([]);
  const [salesAgentData, setSalesAgentData] = useState<SalesAgentType[]>([]);
  const [commentsData, setCommentsData] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [leads, agents] = await Promise.all([
        leadApi.getAllLeads(),
        agentApi.getAllAgents(),
      ]);

      setLeadsData(leads);
      setSalesAgentData(agents);

      // Fetch all comments for all leads
      // const allComments: CommentType[] = [];
      // for (const lead of leads) {
      //   try {
      //     const leadComments = await leadApi.getCommentsForLead(lead.id);
      //     allComments.push(...leadComments);
      //   } catch (err) {
      //     // Continue fetching other comments even if one fails
      //     console.warn(`Failed to fetch comments for lead ${lead.id}:`, err);
      //   }
      // }
      // setCommentsData(allComments);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch data");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    await fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        leadsData,
        setLeadsData,
        salesAgentData,
        setSalesAgentData,
        commentsData,
        setCommentsData,
        loading,
        error,
        refreshData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default useDataContext;
