import { headers } from "next/headers";
import React from "react"

const DeleteProduct = ({productId} : any) => {

    console.log("Clicked!")
    async function deleteHandler () {
        try {
                const res = await fetch(`https://localhost:3000/api/product/deleteProduct?id=${productId}`, {
                headers: headers()
            })

            if(!res.ok) return
    
            return window.location.replace("/product/productList");
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
