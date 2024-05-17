import { ObjectId } from "mongoose"

declare global {
  interface Chat {
    _id: string
    userId: string
    senderRole: string
    createdAt: object
    text: string
    chatRoomId: string
  }
}