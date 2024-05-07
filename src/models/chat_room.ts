import mongoose, {Schema} from "mongoose"

const chatRoom = new Schema<ChatRoom>({
  userIds: { //instigator and the seller
    _id: false,
    type: [String]
  },
  instigatorId: { //usually buyer
    type: String
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

const ChatRoom: mongoose.Model<ChatRoom> = mongoose.models.ChatRoom || mongoose.model("ChatRoom", chatRoom)

export default ChatRoom