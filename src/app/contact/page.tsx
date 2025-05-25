import { Metadata } from 'next'
import ContactUsForm from '@/components/Forms/ContactUsForm'

export const metadata: Metadata = {
  title: 'Contact Us - Holidaze',
  description:
    "We'd love to hear from you! Whether you have a question, suggestion, or just want to say hello — drop us a message below.",
}

export default function ContactUs() {
  return (
    <>
      <ContactUsForm />
    </>
  )
}
