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
    nationalId: string
    phoneNumber: string
    activation: boolean
    activationAt: object
    updateAt: object
    totalTransactionAmount: number
  }
}