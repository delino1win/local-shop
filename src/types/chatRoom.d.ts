import * as global from "mongoose"

declare global {
  interface ChatRoom {
    _id: string
    userIds: string[]
    instigatorName: string
    createdAt: object
    lastMessageAt: object
    messageIds: string[]
  }
}