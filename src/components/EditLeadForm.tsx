import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import type { LeadPriority, LeadSource, LeadStatus, Lead } from "@/utils/types";
import useDataContext from "@/contexts/DataContext";
import { leadApi } from "@/services/api";
import toast from "react-hot-toast";

interface EditLeadFormProps {
  lead: Lead;
}

export function EditLeadForm({ lead }: EditLeadFormProps) {
  const { setLeadsData, salesAgentData } = useDataContext();
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: lead.name,
    salesAgent: lead.salesAgent,
    source: lead.source,
    status: lead.status,
    timeToClose: lead.timeToClose,
    priority: lead.priority,
  });

  const [errors, setErrors] = useState({
    name: false,
    salesAgent: false,
    source: false,
    status: false,
    timeToClose: false,
    priority: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      name: !formData.name.trim(),
      salesAgent: !formData.salesAgent,
      source: !formData.source,
      status: !formData.status,
      timeToClose: !formData.timeToClose,
      priority: !formData.priority,
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    try {
      const salesAgentId = salesAgentData.find(
        (agent) => agent.name == formData.salesAgent
      )?.id;

      if (!salesAgentId) return;

      const updatedLead = {
        name: formData.name,
        salesAgent: salesAgentId,
        source: formData.source as LeadSource,
        status: formData.status as LeadStatus,
        priority: formData.priority as LeadPriority,
        timeToClose: formData.timeToClose,
        updatedAt: new Date(),
      };

      setLeadsData((prev) =>
        prev.map((item) =>
          item.id === lead.id
            ? {
                ...item,
                ...updatedLead,
                salesAgent: formData.salesAgent, // Keep the name for display
              }
            : item
        )
      );

      await leadApi.updateLead(lead.id, updatedLead);
      toast.success("Lead updated successfully!");

      setOpen(false);
    } catch (error) {
      console.error("Error updating lead", error);
      toast.error("Failed to update lead.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-2 cursor-pointer">
            <Pencil className="h-4 w-4" />
            Edit Lead
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px] max-h-full overflow-scroll">
          <DialogHeader>
            <DialogTitle>Edit Lead</DialogTitle>
            <DialogDescription>
              Update the lead details in the database.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Lead Name</Label>
              <Input
                id="name-1"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                required
                className={errors.name ? "border-red-500" : ""}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="agent">Assigned Sales Agent</Label>
              <Select
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, salesAgent: value }))
                }
                value={formData.salesAgent}
                required
              >
                <SelectTrigger
                  className={`w-full ${
                    errors.salesAgent ? "border-red-500" : ""
                  }`}
                >
                  <SelectValue placeholder="Select sales agent" />
                </SelectTrigger>
                <SelectContent id="agent">
                  <SelectGroup>
                    {salesAgentData.map((agent) => (
                      <SelectItem key={agent.id} value={agent.name}>
                        {agent.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="source">Lead source</Label>
              <Select
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    source: value as LeadSource,
                  }))
                }
                value={formData.source}
                required
              >
                <SelectTrigger
                  className={`w-full ${errors.source ? "border-red-500" : ""}`}
                >
                  <SelectValue placeholder="Select lead source" />
                </SelectTrigger>
                <SelectContent id="source">
                  <SelectGroup>
                    <SelectItem value="Website">Website</SelectItem>
                    <SelectItem value="Referral">Referral</SelectItem>
                    <SelectItem value="Cold Call">Cold Call</SelectItem>
                    <SelectItem value="Advertisement">Advertisement</SelectItem>
                    <SelectItem value="Email">Email</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="status">Lead Status</Label>
              <Select
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    status: value as LeadStatus,
                  }))
                }
                value={formData.status}
                required
              >
                <SelectTrigger
                  className={`w-full ${errors.status ? "border-red-500" : ""}`}
                >
                  <SelectValue placeholder="Select lead status" />
                </SelectTrigger>
                <SelectContent id="status">
                  <SelectGroup>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Contacted">Contacted</SelectItem>
                    <SelectItem value="Qualified">Qualified</SelectItem>
                    <SelectItem value="Proposal Sent">Proposal Sent</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="priority">Priority</Label>
              <Select
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    priority: value as LeadPriority,
                  }))
                }
                value={formData.priority}
                required
              >
                <SelectTrigger
                  className={`w-full ${
                    errors.priority ? "border-red-500" : ""
                  }`}
                >
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent id="priority">
                  <SelectGroup>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low"> Low</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="closing-time">Time to Close</Label>
              <Input
                id="closing-time"
                name="closing-time"
                type="number"
                value={formData.timeToClose}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    timeToClose: e.target.value ? parseInt(e.target.value) : "",
                  }))
                }
                required
                className={errors.timeToClose ? "border-red-500" : ""}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={handleSubmit}>
              Update Lead
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
