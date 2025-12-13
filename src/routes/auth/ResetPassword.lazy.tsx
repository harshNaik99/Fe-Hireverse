import ResetPassword from '../../features/auth/pages/ResetPassword'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/auth/ResetPassword')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ResetPassword />
}
