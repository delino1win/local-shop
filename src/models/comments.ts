import mongoose, {Schema} from "mongoose"
//  Comment Database Modeling...

//  Modeling logic for comment database is in API/BE, we will find the productId
//and display all comment. then FE will fetch and display it sequencially to it's time
//    User can comment in product feedback/comment section
//    who is own the product? Seller
//    who can comment? user with role buyer (many user)

const productComment = new Schema<Comment>({
  productId: { //productId already represents SELLER as it's can be made by the SELLER
    type: String,
    required: true
  },
  buyerId: { //
    type: String,
    required: true
  },
  text: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updateAt: {
    type: Date
  }
})

const ProductComment: mongoose.Model<Comment> = mongoose.models.ProductComment || mongoose.model("ProductComment", productComment)

export default ProductComment