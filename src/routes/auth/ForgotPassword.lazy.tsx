import ForgotPassword from '../../features/auth/pages/ForgotPasswordPage'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/auth/ForgotPassword')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ForgotPassword />
}
