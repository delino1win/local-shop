

import { Schema } from "mongoose";

const transaction = new Schema({
  merchantId: {
    type: String
  },
  orderDetails: {
    type: Object
  },
  statuses: {
    paymentStatus: {
      type: String
    },
    transactionStatus: {
      type: String
    }
  },
  paymentVia: {
    type: String
  },
  createdAt: {
    type: Date
  },
  endAt: {
    type: Date
  }

})