// routes/jobs/index.lazy.tsx
import { createLazyFileRoute } from "@tanstack/react-router"
import Jobs from "../../features/jobs/pages/Jobs" // ✅ Import moved here

export const Route = createLazyFileRoute("/jobs/")({
  component: JobsPage,
})

function JobsPage() {
  return (
    <>  
      <Jobs />
    </>
  )
}
