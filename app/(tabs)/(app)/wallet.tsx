import WalletPage from '@/components/wallet/WalletPage'
import React from 'react'
import { useLocalSearchParams, useSearchParams } from 'expo-router/build/hooks'
import PaymentStatus from '@/components/payment/PaymentStatus'


export default function wallet() {
    const {purchaseId}: {purchaseId?: string} = useLocalSearchParams()
  return (
    <WalletPage purchaseId = {purchaseId} />
  )
}
