"use client"

import { useState } from "react";
import { IoSend } from "react-icons/io5";

export default function SellerSendMessage({chatRoomId}: {chatRoomId: string}) {
  
  const [message, setMessage] = useState<string>("")

  const roomId = chatRoomId

  const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData()


    formData.append('text', message)
    formData.append('roomId', roomId || "")

    try {

      const res = await fetch('/api/chat/msgUser', {
        method: 'POST',
        body: formData
      })

      if(!res.ok) return alert("send message failed")

      setMessage("")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className="">
        <form onSubmit={sendMessage} className="flex flex-row gap-4">
          <div className="bg-slate-50 rounded-lg">
            <textarea value={message} onChange={event => setMessage(event.target.value)} className="pt-2 pl-1 w-[350px] h-[34px] resize-none focus:outline-none bg-transparent" required></textarea>
          </div>
          <button type="submit"><IoSend className="size-5"/></button>
        </form>
      </div>
    </>
  )
}