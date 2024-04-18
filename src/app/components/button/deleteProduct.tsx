"use client"
import { headers } from "next/headers";
import { useRouter } from "next/navigation";
import React from "react"

const DeleteProduct = ({productId} : {productId: string}) => {

    const router = useRouter()

    async function deleteHandler () {
        try {
                const res = await fetch(`https://localhost:3000/api/product/deleteProduct?id=${productId}`, {
                headers: headers()
            })

            if(!res.ok) {
                throw new Error("Error")
            } 
    
            router.replace("/product/seller/productlist");
        } catch (error) {
            console.log("error")
        }
    }

    return (
        <div>
            <button onClick={deleteHandler}>Delete Product</button>
        </div>
    );
}

export default DeleteProduct;
