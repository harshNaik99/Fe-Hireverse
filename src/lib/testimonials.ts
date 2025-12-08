// data/testimonials.ts

export interface Testimonial {
  id: string;
  name: string;
  role: "Candidate" | "HR" | "Freelance HR";
  company?: string;
  rating: number;
  message: string;
  profileImage: string;
  date: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Priya Sharma",
    role: "Candidate",
    rating: 5,
    message: "Got hired in just 12 days! The job matching algorithm is incredible. HireVerse connected me with my dream company and the entire process was seamless.",
    profileImage: "https://i.pravatar.cc/150?img=5",
    date: "Hired in 12 days"
  },
  {
    id: "2",
    name: "Rajesh Kumar",
    role: "HR",
    company: "TechCorp India",
    rating: 5,
    message: "We reduced our hiring time by 60%! The quality of candidates and the streamlined process have transformed our recruitment strategy completely.",
    profileImage: "https://i.pravatar.cc/150?img=12",
    date: "2 weeks ago"
  },
  {
    id: "3",
    name: "Ananya Desai",
    role: "Freelance HR",
    rating: 5,
    message: "Successfully placed 35+ candidates in the last 3 months. The platform's tools for freelance recruiters are outstanding. My revenue has doubled!",
    profileImage: "https://i.pravatar.cc/150?img=9",
    date: "1 month ago"
  },
  {
    id: "4",
    name: "Vikram Patel",
    role: "Candidate",
    rating: 5,
    message: "After months of searching, HireVerse helped me land a role at a Fortune 500 company in just 18 days. The personalized job recommendations were spot-on!",
    profileImage: "https://i.pravatar.cc/150?img=13",
    date: "Hired in 18 days"
  },
  {
    id: "5",
    name: "Meera Reddy",
    role: "HR",
    company: "StartupHub",
    rating: 5,
    message: "The best hiring platform we've used! The candidate filtering and interview scheduling features saved us countless hours. Highly recommended for growing teams.",
    profileImage: "https://i.pravatar.cc/150?img=10",
    date: "3 weeks ago"
  },
  {
    id: "6",
    name: "Arjun Singh",
    role: "Freelance HR",
    rating: 5,
    message: "Built my entire freelance recruitment business on HireVerse. The commission structure is fair and the client quality is excellent. Placed 50+ candidates so far!",
    profileImage: "https://i.pravatar.cc/150?img=14",
    date: "2 months ago"
  },
  {
    id: "7",
    name: "Sneha Gupta",
    role: "Candidate",
    rating: 5,
    message: "The resume builder and interview prep resources were game-changers. Got multiple offers and accepted my ideal position within 3 weeks. Thank you HireVerse!",
    profileImage: "https://i.pravatar.cc/150?img=16",
    date: "Hired in 21 days"
  },
  {
    id: "8",
    name: "Aditya Mehta",
    role: "HR",
    company: "FinServe Solutions",
    rating: 5,
    message: "We filled 15 positions in one month! The analytics dashboard and candidate tracking features make recruitment data-driven and efficient.",
    profileImage: "https://i.pravatar.cc/150?img=15",
    date: "1 week ago"
  },
  {
    id: "9",
    name: "Kavya Iyer",
    role: "Freelance HR",
    rating: 5,
    message: "The support from HireVerse team is exceptional. I've grown my network and successfully placed candidates across 8 different industries. This platform is a goldmine!",
    profileImage: "https://i.pravatar.cc/150?img=20",
    date: "6 weeks ago"
  },
  {
    id: "10",
    name: "Rohan Malhotra",
    role: "Candidate",
    rating: 5,
    message: "Career change made easy! HireVerse helped me transition from teaching to tech. The skill assessments validated my abilities and I landed a developer role in 16 days.",
    profileImage: "https://i.pravatar.cc/150?img=33",
    date: "Hired in 16 days"
  },
  {
    id: "11",
    name: "Divya Krishnan",
    role: "HR",
    company: "EcomGrowth",
    rating: 5,
    message: "The quality of candidates is consistently high. We've hired 20+ team members through HireVerse and the retention rate is excellent. Best ROI on any recruitment platform!",
    profileImage: "https://i.pravatar.cc/150?img=24",
    date: "4 weeks ago"
  },
  {
    id: "12",
    name: "Sanjay Verma",
    role: "Freelance HR",
    rating: 5,
    message: "Earning 6 figures annually as a freelance recruiter thanks to HireVerse. The platform handles all the heavy lifting so I can focus on matching great talent with great companies.",
    profileImage: "https://i.pravatar.cc/150?img=11",
    date: "3 months ago"
  }
];