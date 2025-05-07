import React from 'react'
import { ToastProvider } from '@/components/ToastProvider'

// This is a simple wrapper component that can be used in server components
export default function ToastWrapper({ children }: { children: React.ReactNode }) {
  return <ToastProvider>{children}</ToastProvider>
}
