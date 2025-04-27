import LoginForm from '@/components/Forms/LoginForm'

import Link from 'next/link'

export default function Login() {
  return (
    <div className='card'>
      <p>Login</p>
      <Link href='/'>Home</Link>
      <Link href='/auth/register'>register</Link>
      <Link href={'/profile'}>Profile</Link>

      <LoginForm />
    </div>
  )
}
