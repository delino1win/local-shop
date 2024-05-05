import mongoose, {Schema} from "mongoose"

//This model is used for messaging another user espcically buyer to merchant/seller


const userMessage = new Schema<Chat>({
  userId: {
    type: String
  }
})

const UserMessage: mongoose.Model<Chat> = mongoose.models.UserMessage || mongoose.model("UserMessage", userMessage);

export default UserMessage