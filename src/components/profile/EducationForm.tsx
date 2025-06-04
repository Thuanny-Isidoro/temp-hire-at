
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface EducationItem {
  institution: string;
  degree: string;
  field: string;
  year: string;
}

interface EducationFormProps {
  initialValue?: EducationItem;
  onSave: (value: EducationItem) => void;
  onCancel: () => void;
}

const defaultEducation: EducationItem = {
  institution: "",
  degree: "",
  field: "",
  year: "",
};

const educationSchema = z.object({
  institution: z.string().min(1, "Institution is required"),
  degree: z.string().min(1, "Degree is required"),
  field: z.string(),
  year: z.string().min(1, "Graduation year is required"),
});

const EducationForm = ({ 
  initialValue = defaultEducation, 
  onSave, 
  onCancel 
}: EducationFormProps) => {
  const { toast } = useToast();
  
  // Initialize form with react-hook-form
  const form = useForm<EducationItem>({
    resolver: zodResolver(educationSchema),
    defaultValues: initialValue,
  });

  const handleSave = (data: EducationItem) => {
    onSave(data);
    toast({
      title: "Success",
      description: "Education has been saved.",
    });
  };

  return (
    <div className="flex flex-col gap-4 bg-muted/50 dark:bg-[#2d3152] p-6 rounded-lg">
      <h3 className="font-semibold text-lg mb-1">
        {initialValue === defaultEducation ? "Add Education" : "Edit Education"}
      </h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSave)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="institution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm mb-1">Institution *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="School or university name"
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
              name="degree"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm mb-1">Degree *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Bachelor's, Master's"
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
              name="field"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm mb-1">Field of Study</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Computer Science"
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
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm mb-1">Graduation Year *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="YYYY"
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

export default EducationForm;
