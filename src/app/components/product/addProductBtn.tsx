"use client"

import Link from "next/link";
import React from "react";

export default function AddProduct () {
    return(
        <>
            <h1>Add New Product</h1>
            <Link href="http://localhost:3000/product/seller/addProduct"> + </Link>
        </>   
    )
}
