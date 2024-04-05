import Product from "@/models/product";
import connectMongoDataBase from "@/libs/mongodb";
import { NextResponse } from "next/server";
import { options } from "../../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import mongoose from "mongoose";

export async function GET () {
    
    await connectMongoDataBase();

    const session = await getServerSession(options);
    // console.log("session id:", session?.user.id)
    if(!session) return NextResponse.json({error : "Unauthenticated"}, {status : 401})
    
    //  const sessionId = new mongoose.Types.ObjectId(String(session.user.id))
    //  console.log("session ID: ", sessionId)

    try {
        const products = await Product.find({userId: session?.user?.id})
        // for(const product of products){
        //     product.userId = new mongoose.Types.ObjectId(String(product.userId))
        //     await product.save()
        // }

        if(!products) return NextResponse.json({message: "Product List by Seller is empty"})
        console.log("product list by id: ", products)
        return NextResponse.json(products);
    } catch (error) {
        console.log(error)
    }
}