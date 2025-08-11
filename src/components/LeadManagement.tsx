import { useParams } from "react-router-dom";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useEffect, useState } from "react";
import useDataContext from "@/contexts/DataContext";
import { EditLeadForm } from "./EditLeadForm";
import { v4 as uuid } from "uuid";

import { leadApi } from "@/services/api";
import type { Comment as CommentsType } from "@/utils/types";
import toast from "react-hot-toast";

export function LeadManagement() {
  const { leadsData, salesAgentData } = useDataContext();
  const params = useParams();

  const leadData = leadsData.find((lead) => lead.id === params.id);
  const salesAgentId = salesAgentData.find(
    (agent) => agent.name === leadData?.salesAgent
  )?.id;

  const [addCommentLoading, setAddCommentLoading] = useState(false);
  const [commentsData, setCommentsData] = useState<CommentsType[]>([]);
  const [message, setMessage] = useState("");

  // get comments from db
  useEffect(() => {
    const fetchComment = async () => {
      const leadId = params.id;
      if (leadId) {
        const res = await leadApi.getCommentsForLead(leadId);
        if (res) {
          setCommentsData(res);
        }
      }
    };
    fetchComment();
  }, []);

  if (!leadData || !salesAgentId) return;

  const { name, salesAgent, source, status, priority, timeToClose, tags } =
    leadData;

  // set comment to state and db
  const handleCommentAdd = async () => {
    if (!message.trim() || !leadData) return;
    try {
      setAddCommentLoading(true);
      const newComment = {
        id: uuid(),
        author: leadData.salesAgent,
        commentText: message,
        createdAt: new Date(),
      };

      const apiComment = {
        commentText: message,
        author: salesAgentId,
      };
      setCommentsData((prev) => [...prev, newComment]);

      await leadApi.addCommentToLead(leadData.id, apiComment);
    } catch (error) {
      console.error("Error addding comment", error);
      toast.error("Error adding your comment");
    } finally {
      setMessage("");
      setAddCommentLoading(false);
    }
  };
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Lead Management</h1>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Lead Details</h2>
        <EditLeadForm lead={leadData} />
      </div>

      <div className="space-y-6 text-gray-700 pl-6 max-w-[300px] text-lg">
        <div className="flex justify-between">
          <span className="font-semibold">Lead Name:</span>
          <span>{name}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Sales Agent:</span>
          <span>{salesAgent}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Lead Source:</span>
          <span className="capitalize">{source}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Lead Status:</span>
          <span className="capitalize">{status}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Priority:</span>
          <span className="capitalize">{priority}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Time to Close:</span>
          <span>{timeToClose} Days</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Tags:</span>
          <div className="flex flex-wrap gap-1 max-w-[150px]">
            {tags && tags.length > 0 ? (
              tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex px-2 py-1 bg-blue-100 text-blue-900 text-xs rounded-md"
                >
                  {tag}
                </span>
              ))
            ) : (
              <span className="text-gray-400 italic">No tags</span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 border-t">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 pt-4">
          Comments Section
        </h2>
        <ul className="space-y-3 text-gray-700 list-disc pl-8">
          {commentsData.map((comment) => (
            <li key={comment.id}>
              <span className="font-semibold">
                {comment.author} - {comment.createdAt.toLocaleString()}
              </span>
              <p>{comment.commentText}</p>
            </li>
          ))}
        </ul>

        <div className="gap-2 mt-8 max-w-md pl-6">
          <Textarea
            placeholder="Type your message here."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            className="mt-2 cursor-pointer"
            onClick={handleCommentAdd}
            disabled={addCommentLoading || !message}
          >
            Add Comment
          </Button>
        </div>
      </div>
    </div>
  );
}
