export interface Job {
    _id: string;
    title: string;
    companyName?: string | null; 
  
    comapany? : string | undefined
    description: string;
    responsibilities: string[];
    requirements: string[];
    skills: string[];

    logo?: string | null

    slug?: string
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
    brandColor?: string
  
    companyId?: {
      _id: string;
      name?: string;
      logo?: string;
      website?: string;
      industry?: string;
    } | null;
  }