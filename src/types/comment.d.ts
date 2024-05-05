import { ObjectId } from "mongoose"

declare global {
  interface Comment {
    productId: string
    buyerId: string
    text: string
    createdAt: object
    updateAt: object
  }
}