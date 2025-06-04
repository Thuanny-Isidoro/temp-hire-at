
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ProfileEditFormProps {
  fieldName: string;
  initialValue: string;
  onSave: (value: string) => void;
  onCancel: () => void;
  isTextarea?: boolean;
  placeholder?: string;
}

const ProfileEditForm = ({ 
  fieldName, 
  initialValue, 
  onSave, 
  onCancel, 
  isTextarea = false,
  placeholder
}: ProfileEditFormProps) => {
  const [value, setValue] = useState(initialValue);
  const { toast } = useToast();

  const handleSave = () => {
    onSave(value);
    toast({
      title: "Success",
      description: `${fieldName} has been updated.`,
      duration: 3000,
    });
  };

  return (
    <div className="flex flex-col gap-3">
      {isTextarea ? (
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="bg-background border-primary-600 focus-visible:ring-primary-500"
          placeholder={placeholder}
          rows={5}
        />
      ) : (
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="bg-background border-primary-600 focus-visible:ring-primary-500"
          placeholder={placeholder}
        />
      )}
      <div className="flex gap-2">
        <Button 
          onClick={handleSave} 
          className="w-full flex items-center gap-2"
          size="sm"
        >
          <Check size={16} />
          Save
        </Button>
        <Button 
          variant="outline" 
          onClick={onCancel}
          className="w-full flex items-center gap-2"
          size="sm"
        >
          <X size={16} />
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default ProfileEditForm;
