import RegisterForm from '@/components/RegisterForm'
import LogoutButton from '@/components/LogoutButton'

export default function RegisterPage() {
  return (
    <div className='card'>
      <p>Register</p>
      <RegisterForm />
      <LogoutButton />
    </div>
  )
}
