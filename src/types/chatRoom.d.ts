import * as global from "mongoose"

declare global {
  interface ChatRoom {
    userIds: {
      instigatorId: string
      receiverId: string
    }
    createdAt: object
    lastMessageAt: object
    messageIds: string[]
  }
}