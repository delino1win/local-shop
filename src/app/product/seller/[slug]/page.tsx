import Product from "@/models/product";
import SellerProdDetail from "./_sellerProductDetail";
import connectMongoDataBase from "@/libs/mongodb";

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

export default async function Page ({ params }: { params: { slug: string } }) {

    const { slug } = params

    const productDetail = await getProductDetail(slug)

    // console.log("product detail:", productDetail)

    if(!productDetail) return ""

    return (
        <>
            <SellerProdDetail productDetail={productDetail}/>
        </>
    )
}