import mongoose, { Schema } from "mongoose";

const order = new Schema<OrderType>({
  orderId: {
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
  token: {
    type: String
  },
  url: {
    type: String
  },
  createdAt: {
    type: Date
  },
  endAt: {
    type: Date,
  },
})

const Order: mongoose.Model<OrderType> = mongoose.models.Order || mongoose.model('Order', order)

export default Order