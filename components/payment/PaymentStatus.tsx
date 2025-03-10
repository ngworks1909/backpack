import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import {Entypo} from '@expo/vector-icons/';
import { router } from 'expo-router';

export default function PaymentStatus({status, amount, purchaseId, username, paymentType}: {status: "Fail" | "Success", paymentType: "Success" | "Fail", amount: number, purchaseId: string, username: string}) {

  const onPress = () => {
    router.push('/wallet');
  }
  const date = new Date();

// Format the date: "25 Feb 2025"
const formattedDate = date.toLocaleDateString('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric'
});

// Format the time: "9:38 am"
const formattedTime = date.toLocaleTimeString('en-US', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: true
});

  return (
    <View className='bg-[#191919] flex-1 p-4 pb-10'>
      <View className='flex-1 items-center justify-center
      '>
      <View>
      <Text className='text-white font-geistBold text-4xl'>₹ {amount}</Text>
      <View className='flex flex-row items-center gap-1 mt-5'>
        <View className={`rounded-full ${status === "Success" ? "bg-emerald-500": "bg-red-500"}`}>
        <Entypo name={status === "Success" ? "check": "cross" } size={12} color="white" className='px-1 py-1'/>
        </View>
        <Text className='text-md font-geistMedium text-white'>{status === "Success"? "Completed": "Failed"}</Text>
      </View>
      </View>
      <View className='bg-white h-[1px] w-36 mt-4'/>
      <View className='flex flex-row gap-2 mt-4'>
        <Text className='text-white font-geistMedium'>{formattedDate},</Text>
        <Text className='text-white font-geistMedium'>{formattedTime.toLocaleLowerCase()}</Text>
      </View>
      </View>
      <View className='flex-1 flex flex-col justify-between'>
        <View className='border border-gray-400 border-dashed rounded-3xl flex flex-col'>
            <View className='flex flex-col p-4 border-b border-gray-400 border-dashed'>
                <Text className='text-lg text-white font-geistMedium
                '>Transaction ID</Text>
                <Text className='text-lg text-gray-300 font-geist'>{purchaseId}</Text>
            </View>
            <View className='flex flex-col p-4 border-b border-gray-400 border-dashed'>
                <Text className='text-lg text-white font-geistMedium
                '>FROM: </Text>
                <Text className='text-lg text-gray-300 font-geist'>{username}</Text>
            </View>
            <View className='flex flex-col p-4'>
                <Text className='text-lg text-white font-geistMedium
                '>Transaction TYPE</Text>
                <Text className='text-lg text-gray-300 font-geist'>{paymentType}</Text>
            </View>
            </View>
            <TouchableOpacity onPress={(e) => {e.preventDefault(), onPress()}} className='bg-white py-4 rounded-full'>
                <Text className='text-center font-geistBold'>Back</Text>
            </TouchableOpacity>
      </View>
    </View>
  )
}
