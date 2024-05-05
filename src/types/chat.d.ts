import { ObjectId } from "mongoose"

declare global {
  interface Chat {
    userId: string
    createdAt: object
    messageId: string
  }
}