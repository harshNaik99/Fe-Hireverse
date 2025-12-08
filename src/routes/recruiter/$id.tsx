import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/recruiter/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/recruiter/tsx/$id"!</div>
}
