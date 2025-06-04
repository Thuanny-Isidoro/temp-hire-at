
import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import ProfileEditForm from "@/components/profile/ProfileEditForm";

interface AboutSectionProps {
  summary: string;
  editingSummary: boolean;
  setEditingSummary: (editing: boolean) => void;
  handleSummarySave: (summary: string) => void;
}

const AboutSection = ({
  summary,
  editingSummary,
  setEditingSummary,
  handleSummarySave
}: AboutSectionProps) => {
  const { t } = useTranslation();

  return (
    <Card className="border-none shadow-xl bg-white dark:bg-gray-800">
      <CardHeader className="pb-0 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{t("profile.aboutMe")}</h2>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-9 w-9 p-0 rounded-full hover:bg-primary-50 dark:hover:bg-primary-900"
            onClick={() => setEditingSummary(true)}
          >
            <Edit size={16} className="text-primary" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-4 pb-6">
        {editingSummary ? (
          <ProfileEditForm
            fieldName="About Me"
            initialValue={summary || ""}
            onSave={handleSummarySave}
            onCancel={() => setEditingSummary(false)}
            isTextarea={true}
            placeholder="Describe your professional background, expertise, and career goals..."
          />
        ) : (
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {summary || 
              "Experienced full-stack developer with expertise in React, Node.js, and cloud technologies. I'm passionate about creating efficient, scalable, and user-friendly applications that solve real-world problems. I thrive in collaborative environments and enjoy tackling complex challenges."
            }
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default AboutSection;
