  import Register from '../../features/auth/pages/register'
  import { createLazyFileRoute } from '@tanstack/react-router'

  export const Route = createLazyFileRoute('/auth/register')({
    component: Register,
  })
