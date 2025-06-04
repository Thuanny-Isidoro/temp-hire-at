
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { useTranslation } from '@/hooks/useTranslation';
import type { RegistrationData } from '../RegistrationWizard';

interface SkillsCompensationProps {
  data: RegistrationData;
  updateData: (data: Partial<RegistrationData>) => void;
  onNextStep: () => void;
  onPreviousStep: () => void;
}

const SkillsCompensation = ({ data, updateData, onNextStep, onPreviousStep }: SkillsCompensationProps) => {
  const { t } = useTranslation();
  const [skills, setSkills] = useState(data.skills);

  const updateSkills = (newSkills: typeof skills) => {
    setSkills(newSkills);
    updateData({ skills: newSkills });
  };

  return (
    <div className="space-y-8 p-6">
      {/* Skills Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Skills & Technologies</h3>
        {skills.map((skill, index) => (
          <div key={index} className="flex gap-4 p-4 border rounded-lg">
            <div className="flex-1">
              <Input
                placeholder="e.g. React.js, Python, UI/UX Design"
                value={skill.name}
                onChange={(e) => {
                  const newSkills = [...skills];
                  newSkills[index] = { ...skill, name: e.target.value };
                  updateSkills(newSkills);
                }}
              />
            </div>
            <div className="w-32">
              <Input
                placeholder="Years"
                type="number"
                min="0"
                value={skill.years}
                onChange={(e) => {
                  const newSkills = [...skills];
                  newSkills[index] = { ...skill, years: e.target.value };
                  updateSkills(newSkills);
                }}
              />
            </div>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() => updateSkills([...skills, { name: '', years: '' }])}
        >
          Add Skill
        </Button>
      </div>

      {/* Compensation Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Compensation & Availability</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="salary">Expected Salary</Label>
            <Input
              id="salary"
              value={data.salary}
              onChange={(e) => updateData({ salary: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Input
              id="currency"
              value={data.currency}
              onChange={(e) => updateData({ currency: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="availability">Availability</Label>
          <select
            id="availability"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={data.availability}
            onChange={(e) => updateData({ availability: e.target.value })}
          >
            <option value="">Select availability</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="freelance">Freelance</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="remotePreference">Remote Work Preference</Label>
          <select
            id="remotePreference"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={data.remotePreference}
            onChange={(e) => updateData({ remotePreference: e.target.value })}
          >
            <option value="">Select preference</option>
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
            <option value="onsite">Onsite</option>
            <option value="flexible">Flexible</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="noticePeriod">Notice Period (weeks)</Label>
          <Input
            id="noticePeriod"
            type="number"
            min="0"
            value={data.noticePeriod}
            onChange={(e) => updateData({ noticePeriod: e.target.value })}
          />
        </div>
      </div>
      
      <div className="flex justify-between pt-4">
        <Button onClick={onPreviousStep} variant="outline">
          {t("form.previous")}
        </Button>
        <Button onClick={onNextStep}>
          {t("form.continue")}
        </Button>
      </div>
    </div>
  );
};

export default SkillsCompensation;
