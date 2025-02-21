import PaymentPage from '@/components/payment/PaymentPage'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'

export default function pay() {
  // const purchaseId = "hello"
  const {purchaseId, paymentType}: {purchaseId: string, paymentType: "Wallet" | "Razorpay"} = useLocalSearchParams()

  return (
    <PaymentPage purchaseId = {purchaseId} paymentType={paymentType} />
  )
}
