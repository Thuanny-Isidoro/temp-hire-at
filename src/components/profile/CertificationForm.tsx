
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface CertificationItem {
  name: string;
  issuer: string;
  year: string;
  expiry: string;
}

interface CertificationFormProps {
  initialValue?: CertificationItem;
  onSave: (value: CertificationItem) => void;
  onCancel: () => void;
}

const defaultCertification: CertificationItem = {
  name: "",
  issuer: "",
  year: "",
  expiry: "N/A",
};

const certificationSchema = z.object({
  name: z.string().min(1, "Certification name is required"),
  issuer: z.string().min(1, "Issuer is required"),
  year: z.string().min(1, "Year is required"),
  expiry: z.string(),
});

const CertificationForm = ({ 
  initialValue = defaultCertification, 
  onSave, 
  onCancel 
}: CertificationFormProps) => {
  const { toast } = useToast();
  
  // Initialize form with react-hook-form
  const form = useForm<CertificationItem>({
    resolver: zodResolver(certificationSchema),
    defaultValues: initialValue,
  });

  const handleSave = (data: CertificationItem) => {
    onSave(data);
    toast({
      title: "Success",
      description: "Certification has been saved.",
    });
  };

  return (
    <div className="flex flex-col gap-4 bg-muted/50 dark:bg-[#2d3152] p-6 rounded-lg">
      <h3 className="font-semibold text-lg mb-1">
        {initialValue === defaultCertification ? "Add Certification" : "Edit Certification"}
      </h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSave)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm mb-1">Certification Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Certification name"
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
              name="issuer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm mb-1">Issuing Organization *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. AWS, Microsoft"
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
                  <FormLabel className="block text-sm mb-1">Year Obtained *</FormLabel>
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
            
            <FormField
              control={form.control}
              name="expiry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm mb-1">Expiry (or "N/A")</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="YYYY or N/A"
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

export default CertificationForm;
