import { useState } from "react";
import { Button } from "@/components/ui/button";
import { leadApi } from "@/services/api";
import toast from "react-hot-toast";
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
import { Plus } from "lucide-react";
import type { LeadPriority, LeadSource, LeadStatus } from "@/utils/types";
import useDataContext from "@/contexts/DataContext";

export function AddLeadForm() {
  const { salesAgentData, refreshData } = useDataContext();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    source: "",
    salesAgent: "",
    status: "",
    timeToClose: 1,
    priority: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false,
    company: false,
    source: false,
    salesAgent: false,
    status: false,
    timeToClose: false,
    priority: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      name: !formData.name.trim(),
      email: !formData.email.trim().includes("@"),
      phone: !formData.phone.trim(),
      company: !formData.company.trim(),
      source: !formData.source,
      salesAgent: !formData.salesAgent,
      status: !formData.status,
      timeToClose: !formData.timeToClose,
      priority: !formData.priority,
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    setIsSubmitting(true);
    try {
      const leadData = {
        ...formData,
        tags: [],
        source: formData.source as LeadSource,
        status: formData.status as LeadStatus,
        priority: formData.priority as LeadPriority,
      };

      await leadApi.createLead(leadData, salesAgentData);
      await refreshData();

      toast.success("Lead created successfully!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        source: "",
        salesAgent: "",
        status: "",
        timeToClose: 1,
        priority: "",
      });

      setOpen(false);
    } catch (error) {
      console.error("Error creating lead:", error);
      toast.error("Failed to create lead. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button>
            <Plus className="h-4 w-4" />
            Add New Lead
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px] max-h-full overflow-scroll">
          <DialogHeader>
            <DialogTitle>Add New Lead</DialogTitle>
            <DialogDescription>
              Enter the details for adding a new lead to the database.
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
              <Label htmlFor="email">Lead Email</Label>
              <Input
                id="email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                required
                className={errors.email ? "border-red-500" : ""}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="phone">Lead Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, phone: e.target.value }))
                }
                required
                className={errors.phone ? "border-red-500" : ""}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="company">Lead Company</Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, company: e.target.value }))
                }
                required
                className={errors.company ? "border-red-500" : ""}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="source">Lead source</Label>
              <Select
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, source: value }))
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
              <Label htmlFor="status">Lead Status</Label>
              <Select
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, status: value }))
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
              <Label htmlFor="closing-time">Time to Close</Label>
              <Input
                id="closing-time"
                name="closing-time"
                type="number"
                value={formData.timeToClose}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    timeToClose: parseInt(e.target.value),
                  }))
                }
                required
                className={errors.timeToClose ? "border-red-500" : ""}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="priority">Priority</Label>
              <Select
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, priority: value }))
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
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Lead"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
