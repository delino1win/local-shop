"use client";
import React, { useState, useEffect } from "react";
import getProductDetail from "@/utils/getProductDetail";
import Link from "next/link";
import ProductGallery from "@/app/components/gallery/productGallery";
import { useRouter } from "next/navigation";

const SellerProdDetailForm = ({
  productDetail,
}: {
  productDetail: Product;
}) => {
  const [isDisable, setIsDisable] = useState<boolean>(false)
    const [deleteProps, setDeleteProps] = useState<{id: string, productName: string}>()
    const router = useRouter()
  if (!productDetail) return null;
  

  const deleteProduct = async (productId: string) => {
    try {
      const res = await fetch(
        `/api/product/seller/deleteProduct?id=${productId}`,
        {
          method: "DELETE",
          cache: "no-store",
        }
      );

      if (!res.ok) {
        throw new Error(`Failed to delete product. Status: ${res.status}`);
      }

      deleteContext("", "")
      window.location.replace('/product/seller/productList')
    } catch (error) {
      console.log("Delete Product Error: ", error);
    }
  };

  function deleteContext (id: string, productName: string) {
    return {
        id: id,
        productName: productName
    }
  }

  function deleteConfirmation (id: string, productName:string) {
    setIsDisable(!isDisable)
    const props = deleteContext(id, productName)
    setDeleteProps(props)
  }

  function DeleteConf () {
    return (
        <div className="absolute top-[50%] left-[50%] w-[250px] h-[75px] bg-slate-100 rounded-lg">
            <div className="flex flex-col">
                <div>Are you sure want to delete {deleteProps?.productName} ?</div>
                <div className="flex flex-row gap-5 justify-center">
                    <button onClick={() => {
                        deleteProduct(deleteProps?.id ?? '')
                        setIsDisable(false)}}>YES</button>
                    <button onClick={() => {
                        setIsDisable(false)
                        deleteContext("", "")}
                    }>NO</button>
                </div>
            </div>
        </div>
    )
  }

  return (
    <>
      <section className="flex flex-col w-full h-[500px] max-h-full bg-transparent">
      {isDisable && (
            <DeleteConf />
        )}
        <div className="flex flex-row h-full pt-10 justify-around">
          <div className="w-1/2 h-full">
            <ProductGallery images={productDetail?.images} />
          </div>
          <div className="bg-blue-50 w-1/2 h-full rounded-xl">
            <div className="flex flex-col justify-between p-4 leading-normal">
              <div className="text-2xl font-medium tracking-wide text-gray-900 dark:text-white">
                {productDetail?.productName}
              </div>
              {productDetail.brand && (
                <div className="mb-2 italic text-sm tracking-tight font-semibold text-gray-400">
                  from {productDetail?.brand}
                </div>
              )}
              <div className="mb-2 text-2xl font-semibold tracking-tight text-gray-500">
                Rp. {productDetail?.price}
            </div>
              <div className="mb-2 italic text-sm tracking-tight font-normal text-gray-900">
                  Available: {productDetail?.inventory}
                </div>
              <div className="mb-2 text-gray-500 h-[250px] max-h-[420px] ring-1 ring-gray-200 rounded-lg overflow-y-auto">
                <pre className="text-wrap p-1 text-base font-medium tracking-tight">
                  {productDetail?.description}
                </pre>
              </div>
            </div>
            <div className="relative">
              <div className="absolute z-10 text-3xl tracking-wider top-5 right-2">
              <div className="flex flex-row gap-8">
                <div className="rounded-lg w-full h-full ring-1 ring-slate-900 bg-slate-50 shadow-sm hover:shadow-lg hover:text-blue-600 hover:font-semibold transition-all duration-300  px-2">
                  <Link href={`/product/seller/updateProduct/${productDetail?._id}`}>Edit</Link></div>
                <div className="rounded-lg w-full h-full ring-1 ring-slate-900 bg-slate-50 shadow-sm hover:shadow-lg hover:font-semibold hover:text-red-700 transition-all duration-300 px-2"
                  onClick={() => deleteConfirmation(productDetail?._id, productDetail?.productName)}>
                  Delete
                </div>
              </div>
              </div>
              
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SellerProdDetailForm;
