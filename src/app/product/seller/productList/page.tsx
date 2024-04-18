import React from "react";
import ProductList from "@/app/components/product/productList";
import connectMongoDataBase from "@/libs/mongodb";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import Product from "@/models/product";

const getProducts = async (sessionId: string) => {
    
    try {
        await connectMongoDataBase()

        const products = await Product.find({userId: sessionId}).lean()

        if(!products) return

        return products
        // const res = await fetch(`http://localhost:3000/api/product/seller/list`, {
        //     method: "GET",
        // });

        // if (!res.ok) {
        //     throw new Error(`Failed to fetch products. Status: ${res.status}`);
        // }

    // console.log("session id:", session?.user.id)

    
    //  const sessionId = new mongoose.Types.ObjectId(String(session.user.id))

        
    } catch (error) {
        console.log(error);
    }
}

export default async function productList() {

    const session = await getServerSession(options)

    if(!session) return

    const products = await getProducts(session?.user?.id || '')
    if(!products) return 
    
    return (
    <ProductList products={products} />
    )
}