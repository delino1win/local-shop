import connectMongoDataBase from "@/libs/mongodb";
import Product from "@/models/product";
import { NextRequest, NextResponse } from "next/server";

export async function PUT (request: NextRequest, ) {
    const searchParams = await request.nextUrl.searchParams;
    const id = searchParams.get("id");
    const {
        newProductName: productName, 
        newDescription: description, 
        newBrand: brand, 
        newCategories: categories,
        newPrice: price,
        newInventory: inventory,
        newImages: images} = await request.json();

    await connectMongoDataBase();

    try {
        const updateProduct = await Product.findByIdAndUpdate(id, {
            productName,
            description,
            brand,
            categories,
            price,
            inventory,
            images
        })

        if(!updateProduct) return

        return NextResponse.json(updateProduct)
    } catch (error) {
        console.log("update error PUT handler: ", error)
    }
}