import connectMongoDataBase from "@/libs/mongodb";
import Product from "@/models/product";
import { NextRequest, NextResponse } from "next/server";

// export async function GET (request : Request, {params} : {params: {_id: string}}) {
//     const {_id} = await params;
//     await connectMongoDataBase();

//     try {
//         const getListProdById = await Product.findOne({_id: _id})
//         return NextResponse.json(getListProdById);
        
//     } catch (error) {
//         return NextResponse.json(error);
//     }
// }

export async function GET (request : NextRequest) {
    const searchParams = await request.nextUrl.searchParams;
    const id = searchParams.get('id');
    // console.log("id", id);
    if(!id) return NextResponse.json({error : "No id!"}, {status: 400})
    await connectMongoDataBase();

    try {
        const getListProdById = await Product.findOne({_id: id})
        return NextResponse.json(getListProdById);
        
    } catch (error) {
        return NextResponse.json(error);
    }
}

