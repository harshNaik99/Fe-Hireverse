// "use client"

// import { motion, AnimatePresence } from "framer-motion"
// import { createPortal } from "react-dom"
// import { X, MapPin, DollarSign, Briefcase, Heart, ExternalLink } from "lucide-react"
// import { Button } from "../components/ui/button"
// import { type Job }from "../components/ui/jobCardFeatured/index"

// interface JobDetailsPanelProps {
//   job: Job | null
//   isOpen: boolean
//   onClose: () => void
//   onSave: (jobId: number) => void
//   onApply: (jobId: number) => void
// }

// export function JobDetailsPanel({ job, isOpen, onClose, onSave, onApply }: JobDetailsPanelProps) {
//   // ❗ No job, no render
//   if (!job || !isOpen) return null

//   // ⛳ PORTAL FIX — TRUE FULL SCREEN FIXED DRAWER
//   return createPortal(
//     <AnimatePresence>
//       {/* Overlay */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         onClick={onClose}
//         className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998]"
//       />

//       {/* Sliding Drawer */}
//       <motion.div
//         initial={{ x: "100%" }}
//         animate={{ x: 0 }}
//         exit={{ x: "100%" }}
//         transition={{ type: "spring", damping: 25, stiffness: 300 }}
//         className="
//           fixed right-0 top-0 h-full w-full md:w-[50%] 
//           bg-card border-l border-border 
//           shadow-2xl overflow-y-auto 
//           z-[9999]
//         "
//       >
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-6 right-6 p-2 hover:bg-muted rounded-lg transition-colors"
//         >
//           <X className="w-6 h-6 text-foreground" />
//         </button>

//         <div className="p-8 max-w-2xl space-y-8">
//           {/* Header */}
//           <div className="space-y-4">
//             <div className="flex items-start gap-5">
//               <img
//                 src={job.logo || "/placeholder.svg"}
//                 alt={job.company}
//                 className="w-20 h-20 rounded-2xl object-cover"
//               />
//               <div className="flex-1">
//                 <p className="text-lg font-semibold text-muted-foreground uppercase tracking-wide">
//                   {job.company}
//                 </p>
//                 <h1 className="text-5xl font-semibold text-foreground">{job.title}</h1>
//                 <p className="text-lg text-accent font-semibold mt-2">{job.type}</p>
//               </div>
//             </div>
//           </div>

//           {/* Key Info */}
//           <div className="grid grid-cols-2 gap-5">
//             <div className="p-5 rounded-2xl bg-muted/50 space-y-1.5">
//               <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">Salary</p>
//               <p className="text-2xl font-semibold text-foreground flex items-center gap-2">
//                 <DollarSign className="w-5 h-5 text-primary" />
//                 {job.salary}
//               </p>
//             </div>

//             <div className="p-5 rounded-2xl bg-muted/50 space-y-1.5">
//               <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">Location</p>
//               <p className="text-2xl font-semibold text-foreground flex items-center gap-2">
//                 <MapPin className="w-5 h-5 text-primary" />
//                 {job.location}
//               </p>
//             </div>

//             <div className="p-5 rounded-2xl bg-muted/50 space-y-1.5">
//               <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">Experience</p>
//               <p className="text-2xl font-semibold text-foreground flex items-center gap-2">
//                 <Briefcase className="w-5 h-5 text-primary" />
//                 {job.experience}
//               </p>
//             </div>

//             <div className="p-5 rounded-2xl bg-muted/50 space-y-1.5">
//               <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">Type</p>
//               <p className="text-2xl font-semibold text-foreground">{job.type}</p>
//             </div>
//           </div>

//           {/* Description */}
//           <div className="space-y-3">
//             <h2 className="text-3xl font-semibold text-foreground">About the Role</h2>
//             <p className="text-xl text-muted-foreground leading-relaxed">{job.description}</p>
//           </div>

//           {/* Responsibilities */}
//           <div className="space-y-3">
//             <h2 className="text-3xl font-semibold text-foreground">Responsibilities</h2>
//             <ul className="space-y-2">
//               {job.responsibilities.map((resp : any, idx : any) => (
//                 <li key={idx} className="flex gap-3 text-xl text-muted-foreground">
//                   <span className="text-primary font-bold mt-1 text-2xl">•</span>
//                   <span className="leading-relaxed">{resp}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Requirements */}
//           <div className="space-y-3">
//             <h2 className="text-3xl font-semibold text-foreground">Requirements</h2>
//             <ul className="space-y-2">
//               {job.requirements.map((req : any, idx : any) => (
//                 <li key={idx} className="flex gap-3 text-xl text-muted-foreground">
//                   <span className="text-primary font-bold mt-1 text-2xl">•</span>
//                   <span className="leading-relaxed">{req}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Skills */}
//           <div className="space-y-3">
//             <h2 className="text-3xl font-semibold text-foreground">Required Skills</h2>
//             <div className="flex flex-wrap gap-3">
//               {job.skills.map((skill : any) => (
//                 <motion.span
//                   key={skill}
//                   whileHover={{ scale: 1.05 }}
//                   className="px-5 py-2.5 bg-primary/10 text-primary rounded-full text-lg font-semibold border border-primary/20 cursor-default"
//                 >
//                   {skill}
//                 </motion.span>
//               ))}
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex gap-4 pt-6 border-t border-border sticky bottom-0 bg-card py-4">
//             <Button onClick={() => onSave(job.id)} variant="outline" className="flex-1 text-xl py-6">
//               <Heart className="w-5 h-5 mr-2" />
//               Save Job
//             </Button>
//             <Button
//               onClick={() => onApply(job.id)}
//               className="flex-1 bg-primary hover:bg-primary/90 text-xl py-6"
//             >
//               <ExternalLink className="w-5 h-5 mr-2" />
//               Apply Now
//             </Button>
//           </div>
//         </div>
//       </motion.div>
//     </AnimatePresence>,
//     document.body
//   )
// }
