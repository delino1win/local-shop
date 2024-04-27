import DetailProduct from "@/app/components/product/detailProduct"
import connectMongoDataBase from "@/libs/mongodb"
import Product from "@/models/product"
import User from "@/models/user"
import { headers } from "next/headers"


const getProductDetail = async (slug: string) => {
    try {
        await connectMongoDataBase()
        const productDetail = await Product.findOne({_id: slug}).lean()
  
        if(!productDetail) return

        const sellerId = productDetail.userId

        const sellerData = await User.findOne({userId: sellerId})

        const sellerUsername = sellerData?.username ?? "john doe"

        const detail = {...productDetail, sellerUsername}
        
        return detail as Product & {sellerUsername: string }
    } catch (error) {
        console.log(error)
    }
  }

const Page = async ({params} : {params: {slug: string}}) => {

    const { slug } = params; //slug references from the id in the featured product list which is Product Listed by ID
    const detail = await getProductDetail(slug); //get the detailed product by id
    
    if(!detail) return ""

    // console.log("product console from page: ", detailProduct)

    return (
        <section>
            <DetailProduct product={detail} />
        </section>
    )
}

export default Page