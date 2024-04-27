"use client";

import { useEffect } from "react";
import AddToCartBtn from "../button/addToCartBtn";
import getAllProducts from "@/utils/getAllProducts";
import ProductGallery from "../gallery/productGallery";

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

const DetailProduct = ({
  product,
}: {
  product: Product & { sellerUsername: string };
}) => {
  // const sellerUsername = getSellerUsername();
  // console.log("Seller Username: ", sellerUsername)


  return (
    <section className="flex flex-col w-full h-[500px] max-h-full bg-transparent">
      <div className="flex flex-row h-full pt-10 justify-around">
        <div className="w-1/2 h-full">
          <ProductGallery images={product?.images} />
        </div>
        <div className="bg-blue-50 w-1/2 h-full rounded-xl">
            <div className="p-2 rounded-t-lg bg-slate-400 text-3xl font-light tracking-wide text-gray-900 dark:text-white">
              {product?.sellerUsername}
            </div>
          <div className="flex flex-col justify-between p-4 leading-normal">
            
            <div className="text-2xl font-medium tracking-wide text-gray-900 dark:text-white">
              {product?.productName}
            </div>
            {product?.brand && (
              <div className="mb-2 italic text-sm tracking-tight font-semibold text-gray-400">
                from {product?.brand}
              </div>
            )}
            <div className="mb-2 text-2xl font-semibold tracking-tight text-gray-500">
              Rp. {product?.price}
            </div>
            <div className="mb-2 italic text-sm tracking-tight font-normal text-gray-900">
              Available: {product?.inventory}
            </div>
            <div className="mb-2 text-gray-500 h-[250px] max-h-[420px] ring-1 ring-gray-200 rounded-lg overflow-y-auto">
              <pre className="text-wrap p-1 text-base font-medium tracking-tight">
                {product?.description}
              </pre>
            </div>
          </div>
          <div className="">
              <div className="flex flex-row gap-8">
                <AddToCartBtn props={product} />
              </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailProduct;
