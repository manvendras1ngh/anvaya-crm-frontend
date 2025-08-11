import type { LeadStatus } from "@/utils/types";
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export const useLeadsQueryFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const status = (searchParams.get("status") as LeadStatus | "all") || "all";
  const salesAgent = searchParams.get("sales_agent") || "all";
  const tags =
    searchParams
      .get("tags")
      ?.split(",")
      .filter((tag) => tag.trim() !== "") || [];

  const setQueryFilter = useCallback(
    (filter: {
      status: LeadStatus | "all";
      salesAgent: string | "all";
      tags: string[];
    }) => {
      setSearchParams((params) => {
        if (filter.status) {
          params.set("status", filter.status);
        }

        if (filter.salesAgent) {
          params.set("sales_agent", filter.salesAgent);
        }

        if (filter.tags && filter.tags.length > 0) {
          params.set("tags", filter.tags.join(","));
        } else {
          params.delete("tags");
        }
        return params;
      });
    },
    []
  );
  return { status, salesAgent, tags, setQueryFilter };
};
