"use client"
import React, { useState, useEffect } from "react";
import AddProductPage from "./addProductBtn";
import Link from "next/link";
import { useRouter } from "next/navigation";


const ProductList = ({products} : {products: Product[]}) => {

    if(!products) return <>No product List</>

    const deleteProduct = async (productId: string) => {
        try {
            const res = await fetch(`/api/product/seller/deleteProduct?id=${productId}`, {
                method: "DELETE",
                cache: "no-store"
            });
    
            if (!res.ok) {
                throw new Error(`Failed to delete product. Status: ${res.status}`);
            }

            window.location.reload()
        } catch (error) {
            console.log("Delete Product Error: ", error);
        }
    }
    
    return (
        <>
            {products.map((product) => (
                <section className="flex justify-center" key={product._id}>
                    <div className="grid-rows-2 space-y-4">
                            {product.images && (
                                <div className="grid grid-cols-2">
                                    {product?.images?.map((imgs) => (
                                <div key={imgs}>
                                    <img className="h-[100px] w-[120px] object-contain" src={imgs} alt="image 1" />
                                </div>
                            ))}
                                </div>
                            )}
                        <div className="flex flex-col">
                            <li>Name of the Product: {product.productName}</li>
                            <li>Brand of the Product: {product.brand}</li>
                            <li>Product Description: {product.description}</li>
                            <li>Product Categories: {product.categories.join(", ")}</li>
                            <li>Product Price: {product.price}</li>
                            <li>Product Amount: {product.inventory}</li>
                            <Link className="w-32 outline hover:outline-blue-500 justify-self-center" href={`/product/seller/${product._id}`}>See Details</Link>
                            <button onClick={() => deleteProduct(product._id)}>Delete</button>
                            <div>===============================================</div>
                        </div>
                    </div>
                </section>
            ))}
            <div className="flex justify-center">
                <AddProductPage />
            </div>
        </>
    );
}

export default ProductList;
