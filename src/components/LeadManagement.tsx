import { useParams } from "react-router-dom";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import useDataContext from "@/contexts/DataContext";
import { EditLeadForm } from "./EditLeadForm";
import { v4 as uuid } from "uuid";

export function LeadManagement() {
  const { leadsData, commentsData, setCommentsData } = useDataContext();
  const params = useParams();

  const leadData = leadsData.find((lead) => lead.id === params.id);
  const commentData = commentsData.filter(
    (comment) => comment.lead.id === params.id
  );

  const [message, setMessage] = useState("");

  if (!leadData) return;
  const { name, salesAgent, source, status, priority, timeToClose } = leadData;

  const handleCommentAdd = () => {
    if (!message.trim() || !leadData) return;

    const newComment = {
      id: uuid(),
      lead: {
        id: leadData.id,
        name: leadData.name,
        email: leadData.email || "NA",
        company: leadData.company || "NA",
        status: leadData.status,
        priority: leadData.priority,
      },
      author: {
        id: uuid(),
        name: leadData.salesAgent,
        email: `${leadData.salesAgent
          .toLowerCase()
          .replace(" ", ".")}@company.com`,
      },
      commentText: message,
      createdAt: new Date(),
    };

    setCommentsData((prev) => [...prev, newComment]);
    setMessage("");
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
      </div>

      <div className="mt-8 border-t">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 pt-4">
          Comments Section
        </h2>
        <ul className="space-y-3 text-gray-700 list-disc pl-8">
          {commentData.map((comment) => (
            <li>
              <span className="font-semibold">
                {comment.author.name} - {comment.createdAt.toLocaleString()}
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
          <Button className="mt-2 cursor-pointer" onClick={handleCommentAdd}>
            Add Comment
          </Button>
        </div>
      </div>
    </div>
  );
}
