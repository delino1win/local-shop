import * as global from "mongoose"

declare global {
  interface OrderType {
    _id: string
    orderId: string
    merchantId: string
    orderDetail: object
    token: string
    url: string
    createdAt: object
    endAt: object
    customerPaymentAccount: string
    paymentStatus: string
  }
}