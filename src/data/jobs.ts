// Mock data for job listings
export const featuredJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechGlobal Inc.",
    location: "Remote",
    type: "Full-time",
    salary: "$90K - $120K",
    tags: ["React", "TypeScript", "UI/UX"],
    logo: "https://ui-avatars.com/api/?name=TG&background=5944f5&color=fff",
    isRemote: true,
    postedAt: "2 days ago",
    externalLink: "https://www.google.com/jobs/techglobal"
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "Innovative Solutions",
    location: "Berlin, Germany",
    type: "Full-time",
    salary: "€70K - €90K",
    tags: ["Node.js", "Python", "AWS"],
    logo: "https://ui-avatars.com/api/?name=IS&background=5944f5&color=fff",
    isRemote: false,
    postedAt: "1 week ago",
    externalLink: "https://www.google.com/jobs/innovative"
  },
  {
    id: 3,
    title: "DevOps Specialist",
    company: "Cloud Systems",
    location: "New York, USA",
    type: "Full-time",
    salary: "$100K - $130K",
    tags: ["Docker", "Kubernetes", "CI/CD"],
    logo: "https://ui-avatars.com/api/?name=CS&background=5944f5&color=fff",
    isRemote: false,
    postedAt: "3 days ago",
    externalLink: "https://www.google.com/jobs/cloudsystems"
  },
  {
    id: 4,
    title: "Mobile Developer",
    company: "AppWorks Ltd",
    location: "Remote",
    type: "Contract",
    salary: "$70K - $100K",
    tags: ["React Native", "Flutter", "iOS/Android"],
    logo: "https://ui-avatars.com/api/?name=AW&background=5944f5&color=fff",
    isRemote: true,
    postedAt: "5 days ago",
    externalLink: "https://www.google.com/jobs/appworks"
  },
  {
    id: 5,
    title: "Data Scientist",
    company: "DataMinds",
    location: "São Paulo, Brazil",
    type: "Full-time",
    salary: "R$15K - R$20K",
    tags: ["Python", "Machine Learning", "SQL"],
    logo: "https://ui-avatars.com/api/?name=DM&background=5944f5&color=fff",
    isRemote: false,
    postedAt: "1 day ago",
    externalLink: "https://www.google.com/jobs/dataminds"
  },
  {
    id: 6,
    title: "UX/UI Designer",
    company: "Creative Hub",
    location: "Remote",
    type: "Full-time",
    salary: "$75K - $95K",
    tags: ["Figma", "Adobe XD", "User Research"],
    logo: "https://ui-avatars.com/api/?name=CH&background=5944f5&color=fff",
    isRemote: true,
    postedAt: "4 days ago",
    externalLink: "https://www.google.com/jobs/creativehub"
  }
];

// User profile related functions
export const getUserAppliedJobs = (email: string): number[] => {
  const appliedJobs = localStorage.getItem(`${email}_applied_jobs`);
  return appliedJobs ? JSON.parse(appliedJobs) : [];
};

export const getUserSavedJobs = (email: string): number[] => {
  const savedJobs = localStorage.getItem(`${email}_saved_jobs`);
  return savedJobs ? JSON.parse(savedJobs) : [];
};

export const saveJobApplication = (email: string, jobId: number) => {
  const appliedJobs = getUserAppliedJobs(email);
  if (!appliedJobs.includes(jobId)) {
    localStorage.setItem(`${email}_applied_jobs`, JSON.stringify([...appliedJobs, jobId]));
  }
};

export const saveJobToFavorites = (email: string, jobId: number) => {
  const savedJobs = getUserSavedJobs(email);
  if (!savedJobs.includes(jobId)) {
    localStorage.setItem(`${email}_saved_jobs`, JSON.stringify([...savedJobs, jobId]));
  }
};

export const removeJobFromFavorites = (email: string, jobId: number) => {
  const savedJobs = getUserSavedJobs(email);
  localStorage.setItem(
    `${email}_saved_jobs`,
    JSON.stringify(savedJobs.filter(id => id !== jobId))
  );
};
