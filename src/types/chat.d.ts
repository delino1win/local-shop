import { ObjectId } from "mongoose"

declare global {
  interface Chat {
    _id: string
    userId: string
    createdAt: object
    text: string
    chatRoomId: string
  }
}