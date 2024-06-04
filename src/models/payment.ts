import mongoose, { Schema } from "mongoose";

const payment = new Schema<PaymentType>({
  merchantId: {
    type: String
  },
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

const Payment: mongoose.Model<PaymentType> = mongoose.models.Invoice || mongoose.model('Invoice', payment)
