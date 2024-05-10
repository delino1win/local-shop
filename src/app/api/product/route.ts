import connectMongoDataBase from "@/libs/mongodb";
import Product from "@/models/product";
import { NextRequest, NextResponse } from "next/server";

export async function GET () {
    await connectMongoDataBase()
    try {
        const productList = await Product.find().populate<{user : {username : string}}>({
            path: 'user',
            options : {
                select : '_id username'
            }
        }).lean();
        
        return NextResponse.json(productList);
    } catch (error) {
        console.log(error)
        return NextResponse.json({error : true, message : String(error)}, {status : 500});
    }
}
