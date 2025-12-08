import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/jobs/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/jobs/$id"!</div>
}
