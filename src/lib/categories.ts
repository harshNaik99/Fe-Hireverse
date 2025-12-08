// data/categories.ts
export type CategoryItem = {
  id: string;
  name: string;
  icon: string;
  totalJobs: number;
};

export const categories: CategoryItem[] = [
  { id: "c1", name: "Software Development", icon: "Laptop", totalJobs: 230 },
  { id: "c2", name: "Data Science", icon: "BarChart", totalJobs: 120 },
  { id: "c3", name: "UI/UX Design", icon: "Brush", totalJobs: 80 },
  { id: "c4", name: "Sales & Marketing", icon: "Megaphone", totalJobs: 160 },
  { id: "c5", name: "Human Resources", icon: "Users", totalJobs: 40 },
  { id: "c6", name: "Operations", icon: "Settings", totalJobs: 95 },
  { id: "c7", name: "Product Management", icon: "Briefcase", totalJobs: 70 },
  { id: "c8", name: "Customer Support", icon: "Users", totalJobs: 55 },

  { id: "c9", name: "Cybersecurity", icon: "Shield", totalJobs: 110 },
  { id: "c10", name: "Finance & Accounting", icon: "Wallet", totalJobs: 150 },
  { id: "c11", name: "DevOps & Cloud", icon: "Cloud", totalJobs: 175 },
  { id: "c12", name: "Content Writing", icon: "PenTool", totalJobs: 65 },
];

