import mongoose, {Schema} from "mongoose"

const chatRoom = new Schema({
  userIds: {
    _id: false,
    type: [String]
  },
  name: {
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

const ChatRoom = mongoose.models.ChatRoom || mongoose.model("ChatRoom", chatRoom)

export default ChatRoom