import api from "@/api/api";
import axios from "axios";

interface WalletPayResponse{
    success: boolean,
    message: string
}

export async function walletPay(purchaseId: string, amount: number, session: string){
    try {
        const response = await api.post("/api/payment/createWalletPay", {purchaseId, amount}, 
            {
                headers: {
                    "authorization": session
                }
            }
        )
        const data = response.data as WalletPayResponse
        return data
    } catch (error) {
        if(axios.isAxiosError(error) && error.response){
            return {success: false, message: error.response.data.message} as WalletPayResponse
        }
        return {success: false, message: "Something went wrong"} as WalletPayResponse
    }
}