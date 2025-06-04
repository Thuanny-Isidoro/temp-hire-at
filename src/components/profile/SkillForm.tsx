
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface SkillItem {
  name: string;
  years: string;
}

interface SkillFormProps {
  initialValue?: SkillItem;
  onSave: (value: SkillItem) => void;
  onCancel: () => void;
}

const defaultSkill: SkillItem = {
  name: "",
  years: "",
};

const skillSchema = z.object({
  name: z.string().min(1, "Skill name is required"),
  years: z.string(),
});

const SkillForm = ({ 
  initialValue = defaultSkill, 
  onSave, 
  onCancel 
}: SkillFormProps) => {
  const { toast } = useToast();
  
  // Initialize form with react-hook-form
  const form = useForm<SkillItem>({
    resolver: zodResolver(skillSchema),
    defaultValues: initialValue,
  });

  const handleSave = (data: SkillItem) => {
    onSave(data);
    toast({
      title: "Success",
      description: "Skill has been saved.",
    });
  };

  return (
    <div className="flex flex-col gap-4 bg-muted/50 dark:bg-[#2d3152] p-6 rounded-lg">
      <h3 className="font-semibold text-lg mb-1">
        {initialValue === defaultSkill ? "Add Skill" : "Edit Skill"}
      </h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSave)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm mb-1">Skill Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. React, Python"
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
              name="years"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm mb-1">Years of Experience</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. 3"
                      className="bg-background border-primary-600 focus-visible:ring-primary-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
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

export default SkillForm;
