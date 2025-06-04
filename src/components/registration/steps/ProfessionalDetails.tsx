
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import type { RegistrationData } from '../RegistrationWizard';

interface ProfessionalDetailsProps {
  data: RegistrationData;
  updateData: (data: Partial<RegistrationData>) => void;
  onNextStep: () => void;
  onPreviousStep: () => void;
}

const ProfessionalDetails = ({ data, updateData, onNextStep, onPreviousStep }: ProfessionalDetailsProps) => {
  const { t } = useTranslation();
  const [experiences, setExperiences] = useState(data.experiences);
  const [educations, setEducations] = useState(data.educations);
  const [certifications, setCertifications] = useState(data.certifications);

  const updateExperiences = (newExperiences: typeof experiences) => {
    setExperiences(newExperiences);
    updateData({ experiences: newExperiences });
  };

  const updateEducations = (newEducations: typeof educations) => {
    setEducations(newEducations);
    updateData({ educations: newEducations });
  };

  const updateCertifications = (newCertifications: typeof certifications) => {
    setCertifications(newCertifications);
    updateData({ certifications: newCertifications });
  };

  return (
    <div className="space-y-8 p-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">{t("profile.title")}</Label>
          <Input
            id="title"
            placeholder="e.g. Senior Software Developer"
            value={data.title}
            onChange={(e) => updateData({ title: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="yearsExperience">{t("profile.experience")}</Label>
          <Input
            id="yearsExperience"
            value={data.yearsExperience}
            onChange={(e) => updateData({ yearsExperience: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="summary">{t("profile.summary")}</Label>
          <Textarea
            id="summary"
            value={data.summary}
            onChange={(e) => updateData({ summary: e.target.value })}
            className="min-h-[100px]"
          />
        </div>
      </div>

      {/* Experience Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Work Experience</h3>
        {experiences.map((exp, index) => (
          <div key={index} className="space-y-4 p-4 border rounded-lg">
            <Input
              placeholder="Company"
              value={exp.company}
              onChange={(e) => {
                const newExps = [...experiences];
                newExps[index] = { ...exp, company: e.target.value };
                updateExperiences(newExps);
              }}
            />
            <Input
              placeholder="Position"
              value={exp.position}
              onChange={(e) => {
                const newExps = [...experiences];
                newExps[index] = { ...exp, position: e.target.value };
                updateExperiences(newExps);
              }}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="date"
                value={exp.startDate}
                onChange={(e) => {
                  const newExps = [...experiences];
                  newExps[index] = { ...exp, startDate: e.target.value };
                  updateExperiences(newExps);
                }}
              />
              <Input
                type="date"
                value={exp.endDate}
                onChange={(e) => {
                  const newExps = [...experiences];
                  newExps[index] = { ...exp, endDate: e.target.value };
                  updateExperiences(newExps);
                }}
              />
            </div>
            <Textarea
              placeholder="Description"
              value={exp.description}
              onChange={(e) => {
                const newExps = [...experiences];
                newExps[index] = { ...exp, description: e.target.value };
                updateExperiences(newExps);
              }}
            />
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() => updateExperiences([...experiences, {
            company: '',
            position: '',
            startDate: '',
            endDate: '',
            description: ''
          }])}
        >
          Add Experience
        </Button>
      </div>

      {/* Education Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Education</h3>
        {educations.map((edu, index) => (
          <div key={index} className="space-y-4 p-4 border rounded-lg">
            <Input
              placeholder="Institution"
              value={edu.institution}
              onChange={(e) => {
                const newEdus = [...educations];
                newEdus[index] = { ...edu, institution: e.target.value };
                updateEducations(newEdus);
              }}
            />
            <Input
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) => {
                const newEdus = [...educations];
                newEdus[index] = { ...edu, degree: e.target.value };
                updateEducations(newEdus);
              }}
            />
            <Input
              placeholder="Field of Study"
              value={edu.field}
              onChange={(e) => {
                const newEdus = [...educations];
                newEdus[index] = { ...edu, field: e.target.value };
                updateEducations(newEdus);
              }}
            />
            <Input
              placeholder="Graduation Year"
              value={edu.year}
              onChange={(e) => {
                const newEdus = [...educations];
                newEdus[index] = { ...edu, year: e.target.value };
                updateEducations(newEdus);
              }}
            />
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() => updateEducations([...educations, {
            institution: '',
            degree: '',
            field: '',
            year: ''
          }])}
        >
          Add Education
        </Button>
      </div>

      {/* Certifications Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Certifications</h3>
        {certifications.map((cert, index) => (
          <div key={index} className="space-y-4 p-4 border rounded-lg">
            <Input
              placeholder="Certification Name"
              value={cert.name}
              onChange={(e) => {
                const newCerts = [...certifications];
                newCerts[index] = { ...cert, name: e.target.value };
                updateCertifications(newCerts);
              }}
            />
            <Input
              placeholder="Issuing Organization"
              value={cert.issuer}
              onChange={(e) => {
                const newCerts = [...certifications];
                newCerts[index] = { ...cert, issuer: e.target.value };
                updateCertifications(newCerts);
              }}
            />
            <Input
              placeholder="Year"
              value={cert.year}
              onChange={(e) => {
                const newCerts = [...certifications];
                newCerts[index] = { ...cert, year: e.target.value };
                updateCertifications(newCerts);
              }}
            />
            <Input
              placeholder="Expiry Date (Optional)"
              value={cert.expiry}
              onChange={(e) => {
                const newCerts = [...certifications];
                newCerts[index] = { ...cert, expiry: e.target.value };
                updateCertifications(newCerts);
              }}
            />
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() => updateCertifications([...certifications, {
            name: '',
            issuer: '',
            year: '',
            expiry: ''
          }])}
        >
          Add Certification
        </Button>
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

export default ProfessionalDetails;
