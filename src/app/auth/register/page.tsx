import RegisterForm from '@/components/Forms/RegisterForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create an Account - Holidaze',
  description: 'Create a new account to book or create venues.',
}

export default function RegisterPage() {
  return (
    <div className='container py-5'>
      <div className='row justify-content-center'>
        <div className='col-md-9 col-lg-5'>
          <div className='card shadow-sm'>
            <div className='card-body p-4'>
              <h1 className='text-center mb-4 h3'>Create an Account</h1>
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
