'use client'

import { useEffect } from 'react'

interface ConfirmDeleteModalProps {
  show: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  bodyText?: string
  confirmText?: string
  cancelText?: string
}

export default function ConfirmDeleteModal({
  show,
  onClose,
  onConfirm,
  title = 'Confirm Delete',
  bodyText = 'Are you sure you want to delete this?',
  confirmText = 'Delete',
  cancelText = 'Cancel',
}: ConfirmDeleteModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (show) document.body.classList.add('modal-open')
    else document.body.classList.remove('modal-open')

    return () => document.body.classList.remove('modal-open')
  }, [show])

  if (!show) return null

  return (
    <div
      className='modal d-block'
      tabIndex={-1}
      role='dialog'
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <div className='modal-dialog modal-dialog-centered' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>{title}</h5>
            <button
              type='button'
              className='btn-close'
              onClick={onClose}
              aria-label='Close'
            ></button>
          </div>
          <div className='modal-body'>
            <p>{bodyText}</p>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-secondary' onClick={onClose}>
              {cancelText}
            </button>
            <button type='button' className='btn btn-danger' onClick={onConfirm}>
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
