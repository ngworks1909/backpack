import React, { useEffect, useRef, useState } from 'react';
import { Keyboard, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView } from 'react-native';
import TopBar from '../common/TopBar';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';

export default function PaymentPage({ purchaseId, paymentType }: { purchaseId: string, paymentType: "Razorpay" | "Wallet" }) {
  const [amount, setAmount] = useState("");
  const [keyboardHeight, setKeyboardHeight] = useState(0); // Track keyboard height
  const inputRef = useRef<TextInput>(null);
  const [paying, setPaying] = useState(false);

  // Auto focus the input when component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Listen for keyboard show/hide events
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (event) => {
        setKeyboardHeight(event.endCoordinates.height + 10); // Set keyboard height
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardHeight(0); // Reset keyboard height
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const razrKey = process.env.EXPO_PUBLIC_RAZORPAY_KEY as string
  const razrSecret = process.env.EXPO_PUBLIC_RAZORPAY_SECRET 


  const handleClick = () => {
    setPaying(true)
    setTimeout(() => {
      setPaying(false);
    }, 2000);
  }



  const handleAmountChange = (text: string) => {
    // Remove any non-numeric characters
    const numericValue = text.replace(/[^0-9]/g, '');
    
    // Remove leading zeros
    const cleanValue = numericValue.replace(/^0+/, '') || '';
    
    setAmount(cleanValue);
  };

  const disabled = (amount ? false : true) || paying

  return (
    <View className='min-h-screen flex-1 bg-[#191919]'>
      <TopBar />
      <Ionicons name="arrow-back-outline" onPress={(e) => { e.preventDefault(); router.back() }} className='mt-4 px-4' size={24} color="white" />
      <View className='flex flex-1 justify-between px-4'>
        <View className='items-center mt-10'>
          <Text className='text-2xl font-geist text-white mb-5'>Enter Amount</Text>
          <View className='flex-row items-center justify-center'>
            <Text style={styles.currencySymbol} className='font-geistMedium text-white mr-2'>₹</Text>
            <TextInput
              ref={inputRef}
              style={styles.amountInput}
              className='font-geistMedium'
              value={amount}
              onChangeText={handleAmountChange}
              keyboardType="numeric"
              selectionColor="white"
              caretHidden={false}
              maxLength={5}
            />
          </View>
        </View>
        {/* Adjust the bottom padding based on keyboard height */}
        <View style={{ paddingBottom: keyboardHeight + 20 }}>
          <TouchableOpacity
            className={`${disabled ? "bg-gray-400" : "bg-white"} rounded-full`}
            disabled={disabled}
            onPress={handleClick}
          >
            <Text className='text-black text-center text-xl font-geistBold py-3'>{paying ? "Paying..." : "Pay"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  currencySymbol: {
    fontSize: 40,
    marginRight: 8,
  },
  amountInput: {
    color: 'white',
    fontSize: 40,
    minWidth: 50,
    textAlign: 'center',
    padding: 0,
  }
});