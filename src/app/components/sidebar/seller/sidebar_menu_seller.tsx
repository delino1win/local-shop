"use client";

import Link from "next/link";
import { useState } from "react";

const SidebarMenuSeller = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function onOpen() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="ml-2 py-2 rounded-lg bg-zinc-100">
      <button className={`${isOpen ? "shadow-lg rounded-md": ""} flex justify-between p-1 mx-2 min-w-24 w-52 transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-slate-300 focus:rounded-lg focus:font-bold hover:font-semibold`} onClick={onOpen}>
        <label>Product</label>
        <label className={`${isOpen ? "opacity-0 invisible" : ""}text-xs mt-1 font-semibold`}>see details</label>
      </button>
      {isOpen && (
        <div className="flex flex-col min-w-[40px] mt-2 mx-4 text-sm transition-opacity duration-300 ease-in-out">
          <ul>
            <li className="my-1 py-2 font-medium hover:bg-zinc-200">
              <Link className="pl-2 min-w-48 focus:font-bold focus:rounded-lg hover:font-semibold"
                href="/product/seller/addProduct"
              >
                Add New Product
              </Link>
            </li>
            <li className="my-1 py-2 font-medium hover:bg-zinc-200">
              <Link className="pl-2 min-w-48 focus:font-bold focus:rounded-lg hover:font-semibold"
                href="/product/seller/productList"
              >
                Product List
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SidebarMenuSeller;
