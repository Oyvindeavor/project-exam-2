'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import Toast from 'bootstrap/js/dist/toast'
import style from './Toast.module.scss'
import { BicepsFlexed, MessageCircleWarning, Info } from 'lucide-react'

export type ToastType = 'success' | 'danger' | 'warning' | 'info'

interface ToastMessage {
  id: string
  message: string
  type: ToastType
  title: string
}

interface ToastContextType {
  showToast: (title: string, message: string, type: ToastType) => void
}

const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
})

// Hook for components to use the toast
export const useToast = () => useContext(ToastContext)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([])
  const [isMounted, setIsMounted] = useState(false)

  // Check if the component is mounted to avoid server-side rendering issues
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Show a new toast
  const showToast = (title: string, message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { id, title, message, type }])
  }

  // Hide a specific toast
  const hideToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  // Get the toast container element - only for client-side rendering
  const toastContainer = isMounted ? (
    <div className={`toast-container position-fixed bottom-0 end-0 p-3 ${style.toast}`}>
      {toasts.map((toast) => (
        <ToastComponent key={toast.id} toast={toast} onClose={() => hideToast(toast.id)} />
      ))}
    </div>
  ) : null

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {isMounted && createPortal(toastContainer, document.body)}
    </ToastContext.Provider>
  )
}

// Individual Toast Component
interface ToastComponentProps {
  toast: ToastMessage
  onClose: () => void
}

function ToastComponent({ toast, onClose }: ToastComponentProps) {
  const toastRef = React.useRef<HTMLDivElement>(null)
  const toastInstanceRef = React.useRef<Toast | null>(null)

  useEffect(() => {
    if (!toastRef.current) return

    import('bootstrap/js/dist/toast').then((BootstrapToast) => {
      toastInstanceRef.current = new BootstrapToast.default(toastRef.current!, {
        autohide: true,
        delay: 2000,
        animation: true,
      })

      toastInstanceRef.current.show()

      const handleHidden = () => {
        onClose()
      }

      toastRef.current!.addEventListener('hidden.bs.toast', handleHidden)

      return () => {
        toastRef.current?.removeEventListener('hidden.bs.toast', handleHidden)
        toastInstanceRef.current?.dispose()
      }
    })
  }, [onClose])

  // Get icon based on toast type
  const getToastIcon = () => {
    switch (toast.type) {
      case 'success':
        return <BicepsFlexed fill='goldenrod' color='goldenrod' className='me-2' size={24} />
      case 'danger':
        return <Info className='me-2' size={24} fill='red' />
      case 'warning':
        return <MessageCircleWarning className='me-2' size={24} />
      case 'info':
      default:
        return <Info className='me-2' size={24} />
    }
  }

  return (
    <div
      ref={toastRef}
      className={`toast align-items-center text-white bg-${toast.type}`}
      role='alert'
      aria-live='assertive'
      aria-atomic='true'
    >
      <div className='d-flex'>
        <div className='toast-body d-flex align-items-center'>
          {getToastIcon()}
          <div>
            <strong>{toast.title}</strong>
            <br />
            {toast.message}
          </div>
        </div>
        <button
          type='button'
          className='btn-close btn-close-white me-2 m-auto'
          onClick={() => {
            if (toastInstanceRef.current) {
              toastInstanceRef.current.hide()
            }
          }}
          aria-label='Close'
        ></button>
      </div>
    </div>
  )
}
