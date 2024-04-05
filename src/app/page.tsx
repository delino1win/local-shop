import connectMongoDataBase from "@/libs/mongodb";
import FeaturedProduct from "./components/product/featuredProduct";
import Product from "@/models/product";
import { NextResponse } from "next/server";


const getAllProduct = async () => {
    await connectMongoDataBase()
    try {
        const productList = await Product.find().populate<{user : {username : string}}>({
            path: 'user',
            options : {
                select : '_id username'
            }
        }).lean()
        return productList as ProductWithUsername[];
    } catch (error) {
        console.log(error)
        return NextResponse.json({error : true, message : String(error)}, {status : 500});
    }
}

const Page = async () => {
    const allProductList = await getAllProduct() as ProductWithUsername[]

    if(!allProductList) return null
 return(
    <div> 
        <FeaturedProduct listProduct={allProductList} />
    </div>
 )
}

export default Page;