"use client"
import { createContext, useContext, useEffect, useState } from "react";
import { BsChatLeft } from "react-icons/bs";
import { TbRuler2Off } from "react-icons/tb";
import { ChatContext } from "../product/detailProduct";

export default function ChatToSellerBtn({product} : {product : Product & {sellerUsername: string}}) {
  const [isOpen, setIsOpen] = useContext(ChatContext);

  const [openChat, setOpenChat] = useState<boolean>(false) 

  async function submitChatReq (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData()

    try {
      formData.append("sellerId", product?.userId)

      const res = await fetch(`/api/chat/addSellerToChat`, {
        method: "POST",
        body: formData
      })

      if(!res.ok) return alert("Error Occured, Try Again")

      setOpenChat(!isOpen)
    } catch (error) {
      console.error(error)
    }
  }

  // useEffect(() => {
  //     setIsOpen(openChat)
  // }, [])

  return (
    <>
      <form onSubmit={submitChatReq}>
          <button type="submit" className="flex flex-row items-center hover:shadow-md hover:shadow-slate-500 ring-1 ring-neutral-800 rounded-xl p-2 gap-2 transition-all duration-300 ease-in-out">
            <label className="text-sm -pt-4">
              Message <br></br> Seller{" "}
            </label>
            <BsChatLeft />
          </button>
      </form>
    </>
  );
}
