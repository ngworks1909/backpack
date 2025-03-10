import PaymentStatus from '@/components/payment/PaymentStatus'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'

export default function PaymentStatusScreen() {
  const params = useLocalSearchParams()

  // Ensure correct types
  const status = params.status as "Success" | "Fail"
  const purchaseId = params.purchaseId as string
  const amount = Number(params.amount) || 0 // Convert to number safely
  const username = params.username as string
  const paymentType = params.paymentType as "Success" | "Fail"

  return (
    <PaymentStatus status={status} amount={amount} purchaseId={purchaseId} paymentType={paymentType} username={username} />
  )
}
