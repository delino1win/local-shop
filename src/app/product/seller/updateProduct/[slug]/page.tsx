import UpdateProductForm from "@/app/components/product/updateProduct";
import connectMongoDataBase from "@/libs/mongodb";
import Product from "@/models/product";
import { error } from "console";

interface Params {slug: string}

const getProductDetail = async (slug: string) => {
  await connectMongoDataBase()
  try {
      const productDetail = await Product.findOne({_id: slug}).lean()

      if(!productDetail) return 

      return productDetail
  } catch (error) {
      console.log(error)
  }
}

const UpdateProduct = async ({params} : {params: Params}) => {
  const { slug } = params;
  const productDetail = await getProductDetail(slug);

  if(!productDetail) return ""

  // console.log("slug", slug)
  // console.log("Product Detail", productDetail)

  return (
    <>
      <UpdateProductForm product={productDetail} />
    </>
  )
}

export default UpdateProduct