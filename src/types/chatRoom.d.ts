import * as global from "mongoose"

declare global {
  interface ChatRoom {
    _id: string
    userIds: {
      instigatorId: string
      receiverId: string
    }
    createdAt: object
    lastMessageAt: object
    messageIds: string[]
  }
  interface Contact extends ChatRoom {
    user: User;
  }
}