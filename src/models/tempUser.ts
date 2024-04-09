import mongoose, { Schema } from "mongoose";

const temporaryUser = new Schema<TemporaryUser>({
  userId: {
    type: String,
    unique: true
  }, 
  data: {
    type: Object 
  }, 
  otp: {
    type: String
  },
  email: {
    type: String
  },
  validUntil: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

const TemporaryUser: mongoose.Model<TemporaryUser> = mongoose.models.TemporaryUser || mongoose.model("TemporaryUser", temporaryUser);

export default TemporaryUser