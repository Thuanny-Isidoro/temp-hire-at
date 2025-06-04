
import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import SkillForm from "@/components/profile/SkillForm";
import { Skill } from "@/types/profile";

interface SkillsSectionProps {
  skills: Skill[];
  addingSkill: boolean;
  editingSkillIndex: number | null;
  setAddingSkill: (adding: boolean) => void;
  setEditingSkillIndex: (index: number | null) => void;
  handleSkillSave: (skill: Skill) => void;
}

const SkillsSection = ({
  skills,
  addingSkill,
  editingSkillIndex,
  setAddingSkill,
  setEditingSkillIndex,
  handleSkillSave,
}: SkillsSectionProps) => {
  const { t } = useTranslation();

  return (
    <Card className="border-none shadow-xl bg-white dark:bg-gray-800">
      <CardHeader className="pb-0 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{t("profile.skills")}</h2>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-9 w-9 p-0 rounded-full hover:bg-primary-50 dark:hover:bg-primary-900"
            onClick={() => setAddingSkill(true)}
          >
            <Plus size={16} className="text-primary" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-4 pb-6">
        {addingSkill ? (
          <SkillForm 
            onSave={handleSkillSave}
            onCancel={() => setAddingSkill(false)}
          />
        ) : editingSkillIndex !== null ? (
          <SkillForm
            initialValue={skills[editingSkillIndex]}
            onSave={handleSkillSave}
            onCancel={() => setEditingSkillIndex(null)}
          />
        ) : (
          <div className="flex flex-wrap gap-2">
            {Array.isArray(skills) && skills.length > 0
              ? skills.map((skill, i) => (
                <div 
                  key={i} 
                  className="bg-primary-50 text-primary dark:bg-primary-900/50 dark:text-primary-300 px-5 py-2 rounded-full text-sm font-medium group relative hover:bg-primary-100 dark:hover:bg-primary-800 transition-colors cursor-pointer"
                  onClick={() => setEditingSkillIndex(i)}
                >
                  <span className="font-semibold">{skill.name}</span>
                  {skill.years && (
                    <span className="ml-1 text-primary/70 dark:text-primary-300/70">
                      ({skill.years} {parseInt(skill.years) === 1 ? 'year' : 'years'})
                    </span>
                  )}
                  <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10 rounded-full scale-0 group-hover:scale-100 transition-transform z-[-1]"></div>
                </div>
              ))
              : (
                <p className="text-gray-400 italic">No skills added yet</p>
              )
            }
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SkillsSection;
