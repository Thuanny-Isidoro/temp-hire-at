
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import type { RegistrationData } from '../RegistrationWizard';

interface AdditionalInfoProps {
  data: RegistrationData;
  updateData: (data: Partial<RegistrationData>) => void;
  onPreviousStep: () => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const AdditionalInfo = ({ data, updateData, onPreviousStep, onSubmit, isLoading }: AdditionalInfoProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="portfolio">Portfolio URL</Label>
          <Input
            id="portfolio"
            type="url"
            placeholder="https://your-portfolio.com"
            value={data.portfolio}
            onChange={(e) => updateData({ portfolio: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn Profile</Label>
          <Input
            id="linkedin"
            type="url"
            placeholder="https://linkedin.com/in/your-profile"
            value={data.linkedin}
            onChange={(e) => updateData({ linkedin: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="github">GitHub Profile</Label>
          <Input
            id="github"
            type="url"
            placeholder="https://github.com/your-username"
            value={data.github}
            onChange={(e) => updateData({ github: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="additionalInfo">Additional Information</Label>
          <Textarea
            id="additionalInfo"
            placeholder="Additional information about yourself, preferences, etc."
            value={data.additionalInfo}
            onChange={(e) => updateData({ additionalInfo: e.target.value })}
            className="min-h-[100px]"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="termsAgreed"
            checked={data.termsAgreed}
            onCheckedChange={(checked) => 
              updateData({ termsAgreed: checked as boolean })}
          />
          <Label htmlFor="termsAgreed" className="text-sm">
            I agree to the terms of service and privacy policy
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="communicationConsent"
            checked={data.communicationConsent}
            onCheckedChange={(checked) => 
              updateData({ communicationConsent: checked as boolean })}
          />
          <Label htmlFor="communicationConsent" className="text-sm">
            I agree to receive communications about opportunities from Seven Technologies
          </Label>
        </div>
      </div>
      
      <div className="flex justify-between pt-4">
        <Button onClick={onPreviousStep} variant="outline">
          {t("form.previous")}
        </Button>
        <Button onClick={onSubmit} disabled={isLoading}>
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>
      </div>
    </div>
  );
};

export default AdditionalInfo;
