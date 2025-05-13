import LoginForm from '@/components/Forms/LoginForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login - Holidaze',
  description: 'Login to your account.',
}

export default function LoginPage() {
  return (
    <div className='container py-5'>
      <div className='row justify-content-center'>
        <div className='col-md-9 col-lg-5'>
          <div className='card shadow-sm'>
            <div className='card-body p-4'>
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
