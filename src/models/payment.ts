import mongoose, { Schema } from "mongoose";

const payment = new Schema<PaymentType>({
  orderDetail: {
    type: Object
  },
  customerPaymentAccount: {
    type: String
  },
  paymentStatus: {
    type: String
  },
  createdAt: {
    type: Date
  },
  endAt: {
    type: Date,
  },
})

const Payment: mongoose.Model<PaymentType> = mongoose.models.Payment || mongoose.model('Payment', payment)

export default Payment