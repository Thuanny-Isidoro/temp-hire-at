
export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  year: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  expiry: string;
}

export interface Skill {
  name: string;
  years: string;
}

export interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  profilePhoto: string;
  title: string;
  yearsExperience: string;
  summary: string;
  experiences: Experience[];
  educations: Education[];
  certifications: Certification[];
  skills: Skill[];
  salary: string;
  currency: string;
  availability: string;
  remotePreference: string;
  noticePeriod: string;
  portfolio: string;
  linkedin: string;
  github: string;
  additionalInfo: string;
  termsAgreed: boolean;
  communicationConsent: boolean;
}
