"use client"
import { createContext, useContext, useState } from "react";
import { BsChatLeft } from "react-icons/bs";
import { TbRuler2Off } from "react-icons/tb";
import { ChatContext } from "../product/detailProduct";

export default function ChatToSellerBtn() {
  const [isOpen, setIsOpen] = useContext(ChatContext);

  async function submitChatReq (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <form onSubmit={submitChatReq}>
          <button onClick={() => setIsOpen(!isOpen)} className="flex flex-row items-center hover:shadow-md hover:shadow-slate-500 ring-1 ring-neutral-800 rounded-xl p-2 gap-2 transition-all duration-300 ease-in-out">
            <label className="text-sm -pt-4">
              Message <br></br> Seller{" "}
            </label>
            <BsChatLeft />
          </button>
      </form>
    </>
  );
}
