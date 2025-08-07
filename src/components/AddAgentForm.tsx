import { useState } from "react";
import { Button } from "@/components/ui/button";
import { agentApi } from "@/services/api";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import useDataContext from "@/contexts/DataContext";

export function AddAgentForm() {
  const { refreshData } = useDataContext();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      name: !formData.name.trim(),
      email: !formData.email.trim().includes("@"),
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    setIsSubmitting(true);
    try {
      await agentApi.createAgent(formData);
      await refreshData();
      
      toast.success("Agent created successfully!");

      setFormData({
        name: "",
        email: "",
      });

      setOpen(false);
    } catch (error) {
      console.error("Error creating agent:", error);
      toast.error("Failed to create agent. Please try again.");
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
            Add New Agent
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Sales Agent</DialogTitle>
            <DialogDescription>
              Enter the details for adding a new sales agent to the team.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="agent-name">Agent Name</Label>
              <Input
                id="agent-name"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                required
                className={errors.name ? "border-red-500" : ""}
                placeholder="Enter agent's full name"
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="agent-email">Agent Email</Label>
              <Input
                id="agent-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                required
                className={errors.email ? "border-red-500" : ""}
                placeholder="Enter agent's email address"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Agent"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}