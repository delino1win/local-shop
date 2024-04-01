import connectMongoDataBase from "@/libs/mongodb";
import Product from "@/models/product";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET (request: NextRequest) {
    const searchParams = await request.nextUrl.searchParams
    const id = searchParams.get('id');

    await connectMongoDataBase()

    try {
        const detailProduct = await Product.findOne({_id: id}).lean()

        if(!detailProduct) return 

        const sellerId: Product["userId"] = await detailProduct.userId

        const sellerData = await User.findOne({userId: sellerId});

        const sellerUsername = await sellerData?.username
        
        const detailProductOfSeller = {...detailProduct, sellerUsername}

        
        // console.log("Detail Product: ", detailProduct)
        // console.log("\n Username: ", sellerUsername)
        // console.log("\n detailProductOfSeller: ", detailProductOfSeller)

        if(!detailProduct) return NextResponse.json({message: "Detail Product is Empty"})

        return NextResponse.json(detailProductOfSeller)
    } catch (error) {
        console.log(error)
    }
}