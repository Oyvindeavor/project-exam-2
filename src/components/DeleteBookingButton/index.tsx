'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { useState, useRef } from 'react'
import { deleteBookingFormAction } from './DeleteBookingFormAction'
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal'

function SubmitButton({ onClick }: { onClick: () => void }) {
  const { pending } = useFormStatus()

  return (
    <button
      type='button'
      className='btn btn-outline-danger text-dark'
      disabled={pending}
      onClick={onClick}
    >
      {pending ? 'Deleting...' : 'Delete Booking'}
    </button>
  )
}

export default function DeleteBookingButton({ bookingId }: { bookingId: string }) {
  const [showModal, setShowModal] = useState(false)
  const [state, formAction] = useActionState(async () => await deleteBookingFormAction(bookingId), {
    error: undefined,
  })

  const formRef = useRef<HTMLFormElement>(null)

  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  const confirmDelete = () => {
    if (formRef.current) {
      formRef.current.requestSubmit()
    }
    setShowModal(false)
  }

  return (
    <>
      <form ref={formRef} action={formAction}>
        <SubmitButton onClick={openModal} />
      </form>

      {state?.error && <div className='text-dark mt-2'>{state.error}</div>}

      <ConfirmDeleteModal
        show={showModal}
        onClose={closeModal}
        onConfirm={confirmDelete}
        title='Delete Booking'
        bodyText='Are you sure you want to delete this booking? This action cannot be undone.'
        confirmText='Delete Booking'
        cancelText='Cancel'
      />
    </>
  )
}
