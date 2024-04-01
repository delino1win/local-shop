import connectMongoDataBase from "@/libs/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/product";


export async function DELETE (request: NextRequest) {
    connectMongoDataBase();
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get("id")
    console.log("this is Delete ID: ", id)

    if(!id) return NextResponse.json({error : "No id!"}, {status: 400})
    try {
        const deleteById = await Product.findByIdAndDelete(id)

        if (!deleteById) {
            return NextResponse.json({ error: "No product found with this ID." }, { status: 404 });
        }

        return NextResponse.json({message: `Delete ID ${deleteById} successful`})
    } catch (error) {
        console.log(error)
    }
}