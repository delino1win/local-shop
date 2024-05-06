import { ObjectId } from "mongoose"

declare global {
  interface Chat {
    userId: string
    createdAt: object
    text: string
    chatRoomId: string
  }
}