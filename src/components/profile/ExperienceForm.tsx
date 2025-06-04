
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface ExperienceItem {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface ExperienceFormProps {
  initialValue?: ExperienceItem;
  onSave: (value: ExperienceItem) => void;
  onCancel: () => void;
}

const defaultExperience: ExperienceItem = {
  company: "",
  position: "",
  startDate: "",
  endDate: "",
  description: "",
};

const experienceSchema = z.object({
  company: z.string().min(1, "Company is required"),
  position: z.string().min(1, "Position is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string(),
  description: z.string(),
});

const ExperienceForm = ({ 
  initialValue = defaultExperience, 
  onSave, 
  onCancel 
}: ExperienceFormProps) => {
  const { toast } = useToast();
  
  // Initialize form with react-hook-form
  const form = useForm<ExperienceItem>({
    resolver: zodResolver(experienceSchema),
    defaultValues: initialValue,
  });

  const handleSave = (data: ExperienceItem) => {
    onSave(data);
    toast({
      title: "Success",
      description: "Experience has been saved.",
    });
  };

  return (
    <div className="flex flex-col gap-4 bg-muted/50 dark:bg-[#2d3152] p-6 rounded-lg">
      <h3 className="font-semibold text-lg mb-1">
        {initialValue === defaultExperience ? "Add Experience" : "Edit Experience"}
      </h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSave)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm mb-1">Company *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Company name"
                      className="bg-background border-primary-600 focus-visible:ring-primary-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm mb-1">Position *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Job position"
                      className="bg-background border-primary-600 focus-visible:ring-primary-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm mb-1">Start Date *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="YYYY-MM"
                      className="bg-background border-primary-600 focus-visible:ring-primary-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm mb-1">End Date (or "Present")</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="YYYY-MM or Present"
                      className="bg-background border-primary-600 focus-visible:ring-primary-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm mb-1">Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your responsibilities and achievements"
                    className="bg-background border-primary-600 focus-visible:ring-primary-500"
                    rows={4}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex gap-3 mt-2">
            <Button 
              type="submit"
              className="w-full flex items-center gap-2"
            >
              <Check size={16} />
              Save
            </Button>
            <Button 
              type="button"
              variant="outline" 
              onClick={onCancel}
              className="w-full flex items-center gap-2"
            >
              <X size={16} />
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ExperienceForm;
