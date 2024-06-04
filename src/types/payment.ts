import * as global from "mongoose"

declare global {
  interface PaymentType {
    _id: string
    merchantId: string
    orderDetail: object
    createdAt: object
    endAt: object
    customerPaymentAccount: string
    paymentStatus: string
  }
}