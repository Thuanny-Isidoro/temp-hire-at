
import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Plus } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import ExperienceForm from "@/components/profile/ExperienceForm";
import { Experience } from "@/types/profile";

interface ExperienceSectionProps {
  experiences: Experience[];
  addingExperience: boolean;
  editingExperienceIndex: number | null;
  setAddingExperience: (adding: boolean) => void;
  setEditingExperienceIndex: (index: number | null) => void;
  handleExperienceSave: (experience: Experience) => void;
  handleDeleteExperience: (index: number) => void;
}

const ExperienceSection = ({
  experiences,
  addingExperience,
  editingExperienceIndex,
  setAddingExperience,
  setEditingExperienceIndex,
  handleExperienceSave,
  handleDeleteExperience,
}: ExperienceSectionProps) => {
  const { t } = useTranslation();

  return (
    <Card className="border-none shadow-xl bg-white dark:bg-gray-800">
      <CardHeader className="pb-0 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{t("profile.professionalExperience")}</h2>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-9 w-9 p-0 rounded-full hover:bg-primary-50 dark:hover:bg-primary-900"
            onClick={() => setAddingExperience(true)}
          >
            <Plus size={16} className="text-primary" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-4 pb-6">
        {addingExperience ? (
          <ExperienceForm 
            onSave={handleExperienceSave}
            onCancel={() => setAddingExperience(false)}
          />
        ) : editingExperienceIndex !== null ? (
          <ExperienceForm
            initialValue={experiences[editingExperienceIndex]}
            onSave={handleExperienceSave}
            onCancel={() => setEditingExperienceIndex(null)}
          />
        ) : (
          <div className="space-y-8">
            {Array.isArray(experiences) && experiences.length > 0 ? (
              experiences.map((exp, i) => (
                <div key={i} className="group relative border-l-2 border-primary/60 pl-8 py-2">
                  <div className="absolute top-0 left-[-10px] w-5 h-5 rounded-full bg-primary"></div>
                  <div className="mb-2">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{exp.position}</h3>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      <span className="font-medium text-primary dark:text-primary-400">{exp.company}</span>
                      <span className="mx-2">•</span>
                      <span>{exp.startDate} - {exp.endDate || "Present"}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mt-3">{exp.description}</p>
                  
                  {/* Edit/Delete overlay */}
                  <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 flex gap-2 transition-opacity">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 rounded-full text-gray-500 hover:text-primary hover:bg-primary-50" 
                      onClick={() => setEditingExperienceIndex(i)}
                    >
                      <Edit size={14} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 rounded-full text-gray-500 hover:text-red-500 hover:bg-red-50" 
                      onClick={() => handleDeleteExperience(i)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 italic">No experience added yet</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExperienceSection;
