"use client"

import { useEffect } from "react"
import AddToCartBtn from "../button/addToCartBtn"
import getAllProducts from "@/utils/getAllProducts"

// const getSellerUsername = () => {
//     useEffect(() => {
//         async function fetchData () {
//             try {
//                 const res = await getAllProducts();
//                 if(!res) return 

//                 const {user: userData} = await res.json();
//                 return userData

//             } catch (error) {
//                 console.log(error)
//             }
//         }
//         fetchData()
//     },[])
// }

const DetailProduct = ({detail} : {detail: Product & {sellerUsername: string}}) => {

    // const sellerUsername = getSellerUsername();
    // console.log("Seller Username: ", sellerUsername)

    return(
        <div className="font-medium grid grid-cols-2 ml-40 mr-3 my-4 border-2 shadow-md rounded-lg">
            <div className="flex p-2 ">
                <img className="p-3 h-80 w-90 shadow-sm hover:shadow-lg" src={detail?.images[0]} alt={detail?.productName} />
            </div>
            <div className="m-3 pl-3 border-l-2 space-y-1.5">
                <div className="mb-2 p-1 font-bold text-3xl shadow-md border-b-2">
                    {detail?.productName}
                </div>
                <div className="mb-4 font-semibold border-b-4 text-lg">
                    <label className="">Merchant: </label>
                    {detail?.sellerUsername}
                </div>
                <div>
                    <label htmlFor="">Price: </label>
                        {detail?.price} $
                    </div>
                <div>
                    <label htmlFor="">Brand: </label>
                    {detail?.brand}
                </div>
                <div>
                    <label htmlFor="">Categories: </label>
                    {detail?.categories.join(", ")}
                </div>
                <div>
                    <label htmlFor="">Total Product: </label>
                    {detail?.inventory}
                </div>
                <div>
                    <label htmlFor="">Description: </label>
                    {detail?.description}
                </div>
                <div className="flex justify-between">
                        <AddToCartBtn props={detail}/>
                    <div className="my-14 mr-5 h-10 w-24 border-2 rounded-md hover:shadow-lg hover:font-bold">
                        <button className="mt-[6px] ml-[10px]">Purchase</button>
                    </div>
                    
                </div>
            </div>
            
        </div>
    )
}

export default DetailProduct