import * as global from "mongoose"

declare global {
  interface UserPaymentAccount {
    _id: string
    userId: string
    paymentType: {
      virtualAccount: string[]
      ewallet: string[]
      qris: boolean
    }
    nationalId: number
    phoneNumber: number
    activation: boolean
    activationAt: object
    updateAt: object
    totalTransactionAmount: string
  }
}