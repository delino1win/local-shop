"use client";
import React, { useState, useEffect } from "react";
import AddProductPage from "./addProductBtn";
import Link from "next/link";
import { useRouter } from "next/navigation";


const ProductList = ({ products }: { products: Product[] }) => {
    const [isDisable, setIsDisable] = useState<boolean>(false)
    const [deleteProps, setDeleteProps] = useState<{id: string, productName: string}>()

    // interface DeleteProps {
    //     id: string;
    //     productName: string;
    // }

  if (!products) return <>No product List</>;


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

      window.location.reload();
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
    <div>
        {isDisable && (
            <DeleteConf />
        )}
    <section className={`mt-10 ${isDisable ? "pointer-events-none opacity-50" : "pointer-events-auto"}`}>
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
            {products.map((product) => (
              <tr
                key={product?._id}
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
                  {product?.productName}{" "}
                  <div className="text-xs text-gray-500 hover:text-blue-600 transition-all duration-200">
                    <Link href={`/product/seller/${product._id}`}>
                      See Detail
                    </Link>
                  </div>
                </th>
                <td className="px-6 py-4">{product?.brand}</td>
                <td className="px-6 py-4 grow-0">
                  <div className="max-w-[200px] w-full max-h-[50px] h-full overflow-x-auto">
                    {product?.categories.join(", ")}
                  </div>
                </td>
                <td className="px-6 py-4">Rp. {product?.price}</td>
                <td className="px-6 py-4">{product?.inventory}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-row gap-2">
                    <Link
                      href={`/product/seller/updateProduct/${product._id}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                    <button onClick={() => deleteConfirmation(product?._id, product?.productName)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <nav
          className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
          aria-label="Table navigation"
        >
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
            Showing{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              1-10
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              1000
            </span>
          </span>
          <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                1
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                2
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-current="page"
                className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
              >
                3
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                4
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                5
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </a>
            </li>
          </ul>
        </nav> */}
      </div>
    </section>
    </div>
  );
};

export default ProductList;

{
  /* <>
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
        </> */
}

{
  /* <div
          className="flex mt-2 flex-row border-slate-200 rounded-lg bg-slate-400 text-pretty"
          key={product._id}
        >
          <div className="m-[3px] px-1 bg-slate-300 rounded-md">
            <div className="flex flex-col">
              <div className="w-full border-b-2 text-lg flex justify-center font-semibold">
                Thumbnail
              </div>
              <div className="h-full flex justify-center align-middle">
                <img
                  className="p-2 h-[100px] w-[100px] object-contain"
                  src={product?.thumbnail ?? ""}
                />
              </div>
            </div>
          </div>

          <div className="m-[3px] px-1 bg-slate-300 rounded-md">
            <div className="flex flex-col">
              <div className="border-b-2 text-lg flex justify-center font-semibold">
                Name
              </div>
              <div className="min-h-[50px] h-[100px] flex  items-center text-sm">
                {product?.productName}
              </div>
            </div>
          </div>

          <div className="m-[3px] px-1 bg-slate-300 rounded-md">
            <div className="flex flex-col">
              <div className="border-b-2 text-lg flex justify-center font-semibold">
                Brand
              </div>
              <div className="min-h-[50px] h-[100px] flex  items-center text-sm">
                {product?.brand}
              </div>
            </div>
          </div>

          <div className="m-[3px] px-1 bg-slate-300 rounded-md">
            <div className="flex flex-col">
              <div className="border-b-2 text-lg flex justify-center font-semibold">
                Description
              </div>
              <div className="min-h-[50px] h-[100px] max-w-[250px] flex items-center text-sm overflow-auto">
                {product?.description}
              </div>
            </div>
          </div>

          <div className="m-[3px] px-1 bg-slate-300 rounded-md">
            <div className="flex flex-col">
              <div className="border-b-2 text-lg flex justify-center font-semibold">
                Category
              </div>
              <div className="min-h-[50px] h-[100px] max-w-[250px] flex items-center text-sm overflow-auto">
                {product?.categories.join(", ")}
              </div>
            </div>
          </div>

          <div className="m-[3px] px-1 bg-slate-300 rounded-md">
            <div className="flex flex-col">
              <div className="border-b-2 text-lg flex justify-center font-semibold">
                Price
              </div>
              <div className="min-h-[50px] h-[100px] max-w-[250px] flex items-center text-sm overflow-auto">
                Rp. {product?.price}
              </div>
            </div>
          </div>

          <div className="m-[3px] px-1 bg-slate-300 rounded-md">
            <div className="flex flex-col">
              <div className="border-b-2 text-lg flex justify-center font-semibold">
                Available
              </div>
              <div className="min-h-[50px] h-[100px] max-w-[250px] flex items-center text-sm overflow-auto">
                {product?.inventory}
              </div>
            </div>
          </div>

          <div className="m-[3px] px-1 bg-slate-300 rounded-md">
            <div className="flex flex-col">
              <div className="border-b-2 text-lg flex justify-center font-semibold">
                Action
              </div>
              <div className="min-h-[50px] h-[100px] max-w-[250px] flex items-center text-sm overflow-auto gap-2">
                <Link
                  className=" hover:text-blue-500 hover:font-semibold transition-all duration-300"
                  href={`/product/seller/${product._id}`}
                >
                  Detail
                </Link>
                <button 
                    className=" hover:text-blue-500 hover:font-semibold transition-all duration-300"
                    onClick={() => deleteProduct(product._id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div> */
}
