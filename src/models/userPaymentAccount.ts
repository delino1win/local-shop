import mongoose, {Schema} from 'mongoose'
import User from './user'

const userPaymentAccount = new Schema<UserPaymentAccount>({
  userId: {
    type: String,
  },
  paymentType: {
    virtualAccount: {
      _id: false,
      type: [String],
      default: null
    },
    ewallet: {
      _id: false,
      type: [String],
      default: null
    },
    qris: {
      type: Boolean,
      default: false
    }
  },
  nationalId: {
    type: Number
  },
  phoneNumber: {
    type: Number
  },
  activation: {
    type: Boolean,
    default: false
  },
  activationAt: {
    type: Date
  },
  updateAt: {
    type: Date
  },
  totalTransactionAmount: {
    type: String
  }
})

userPaymentAccount.virtual('user', {
  ref: User,
  localField: 'userId',
  foreignField: 'userId',
  justOne: true
})

const UserPaymentAccount: mongoose.Model<UserPaymentAccount> = mongoose.models.UserPaymentAccount || mongoose.model('UserPaymentAccount', userPaymentAccount)

export default UserPaymentAccount