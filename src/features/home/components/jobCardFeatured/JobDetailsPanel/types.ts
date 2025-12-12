// types.ts
export interface Job {
    _id: string;
    title: string;
    companyName?: string | null; 
  
    description: string;
    responsibilities: string[];
    requirements: string[];
    skills: string[];

    jobType: string;
    workMode: string;
    experienceLevel: string;
  
    location: string;
  
    minSalary: number;
    maxSalary: number;
    salaryCurrency: string;
  
    isFeatured: boolean;
    isActive: boolean;
    isApproved: boolean;
  
    createdAt: string | Date;
    updatedAt: string | Date;
    expiryDate: string | Date;
  
    totalViews: number;
    totalApplications: number;
  
    applyType: "external" | "internal";
    applyUrl?: string;
  
    postedBy?: {
      _id: string;
      name: string;
    };
  
    companyId?: {
      _id: string;
      name?: string;
      logo?: string;
      website?: string;
      industry?: string;
    } | null;
  }
  
  export interface JobDetailsPanelProps {
    job: Job | null;
    open: boolean;
    onClose: () => void;
  }
  
  export interface UseJobDetailsPanelReturn {
    job: Job | null;
    isOpen: boolean;
    openPanel: (job: Job) => void;
    closePanel: () => void;
  }
  