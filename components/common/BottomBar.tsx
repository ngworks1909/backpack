import React, { useState } from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSetRecoilState } from 'recoil';
import { ItemState } from '@/atoms/ItemState';
import { router, usePathname } from 'expo-router';


export default function BottomBar() {

  const setItem = useSetRecoilState(ItemState)

  const active = usePathname()

  const handleHome = () => {
    setItem(null);
    router.push("/")
  }
  
  
  return (
    <View className="h-24 w-full items-center justify-around flex-row"
     style={{boxShadow: "0px 4px 16px black"}} >
      <Pressable onPress={() => { handleHome()}}  className='flex flex-col items-center'>
        <MaterialCommunityIcons name="home" size={24} color={active === "/" ? "white" : "#787878"}  />
        <Text className = {`${active === "/" ? "text-white" : "text-[#787878]"} text-sm font-geistBold`}>Home</Text>
      </Pressable>
      <Pressable onPress={() => { router.push("/wallet")}} className='flex flex-col items-center'>
      <MaterialCommunityIcons name="wallet" size={24} color={active === "/wallet" ? "white" : "#787878"}/>
        <Text className={`${active === "/wallet" ? "text-white" : "text-[#787878]"} text-sm font-geistBold`}>Wallet</Text>
      </Pressable>
      <Pressable onPress={() => router.push("/user")} className='flex flex-col items-center'>
      <MaterialCommunityIcons name="account" size={24} color={active === "/user" ? "white" : "#787878"} />
        <Text className={`${active === "/user" ? "text-white" : "text-[#787878]"} text-sm font-geistBold`}>Profile</Text>
      </Pressable>
    </View>

  )
}
