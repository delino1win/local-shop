import mongoose, {Schema} from "mongoose"
import User from "./user"

const chatRoom = new Schema<ChatRoom>({
  userIds: { //instigator and the seller, usually
    _id: false,
    instigatorId: {
      type: String
    },
    receiverId: {
      type: String
    }
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  lastMessageAt: {
    type: Date,
    default: Date.now()
  },
  messageIds: { //from model message._id
    _id: false,
    type: [String]
  }
})

chatRoom.virtual("user", {
  ref: User,
  localField: "userIds.receiverId", //seller userid
  foreignField: "userId",
  justOne: true
})

chatRoom.virtual('userSeller', {
  ref: User,
  localField: "userIds.instigatorId", //customer/buyer userid
  foreignField: "userId",
  justOne: true
})


const ChatRoom: mongoose.Model<ChatRoom> = mongoose.models.ChatRoom || mongoose.model("ChatRoom", chatRoom)

export default ChatRoom