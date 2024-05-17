"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MdOutlineMail } from "react-icons/md";


const SidebarMenuSeller = ({userId} : {userId: string}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [id, setId] = useState<string>('')

  function onOpen() {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    setId(userId)
  }, [userId])


  return (
    <div className="py-2 mx-2 mt-5 rounded-lg bg-zinc-100 max-sm:text-xs">
      <button className={`${isOpen ? "shadow-lg rounded-md": ""} flex justify-between p-1 mx-2 min-w-24 w-52 max-sm:w-40 transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-slate-300 focus:rounded-lg focus:font-bold hover:font-semibold`} onClick={onOpen}>
        <label>Product</label>
        <label className={`${isOpen ? "opacity-0 invisible" : ""}text-xs mt-1 max-sm:mt-0 font-semibold`}>see details</label>
      </button>
      {isOpen && (
        <div className="flex-col min-w-[40px] mt-2 mx-4 text-sm transition-opacity duration-300 ease-in-out max-sm:text-xs">
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
      <button className={`flex justify-between mt-5 p-1 mx-2 min-w-24 w-52 max-sm:w-40 transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-slate-300 focus:rounded-lg focus:font-bold hover:font-semibold`}>
        <label>Messages</label>
        <Link href={`/stall/chat/${id}`}>
        <MdOutlineMail size={32}/>
        </Link>
      </button>
    </div>
  );
};

export default SidebarMenuSeller;
