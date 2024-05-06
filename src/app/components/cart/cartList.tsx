"use client"

import Link from "next/link"
import React, { useState } from "react"


export default function CartList ({props} : {props: CartList[]}) {

  return (
    // <div>
    //   {props.map(item => (
    //     <div key={item.productId}>
    //       {item.product.map(prod => (
    //         <div key={prod.userId}>
    //           {prod?.productName}
    //         </div>
    //       ))}
    //     </div>
    //   ))}
    // </div>
    <section>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Brand
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {props.map( product => (
              <tr
                  key={product?.productId}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="checkbox-table-search-1"
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {product?.product?.productName}{" "}
                  <div className="text-xs text-gray-500 hover:text-blue-600 transition-all duration-200">
                    <Link href={`/product/seller/${product?.product?._id}`}>
                      See Detail
                    </Link>
                  </div>
                </th>
                <td className="px-6 py-4">{product?.product?.brand}</td>
                <td className="px-6 py-4 grow-0">
                  <div className="max-w-[200px] w-full max-h-[50px] h-full overflow-x-auto">
                    {product?.product?.categories.join(", ")}
                  </div>
                </td>
                <td className="px-6 py-4">Rp. {product?.product?.price}</td>
                <td className="px-6 py-4">{product?.product?.inventory}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-row gap-2">
                    <div
                      className="font-medium text-red-600 dark:text-blue-500 hover:underline"
                    >
                      Delete
                    </div>
                    {/* <button onClick={() => deleteConfirmation(product?.product?._id, product?.product?.productName)}>Delete</button> */}
                  </div>
                </td>
              </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
