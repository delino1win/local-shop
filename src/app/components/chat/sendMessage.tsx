"use client"

import { useState } from "react";
import { IoSend } from "react-icons/io5";

export default function SendMessage({data}: {data?: Contact}) {

  const [message, setMessage] = useState<string>("")

  const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData()

    const roomId = data?._id.toString()

    formData.append('text', message)
    formData.append('roomId', roomId || "")

    try {

      const res = await fetch('/api/chat/msgUser', {
        method: 'POST',
        body: formData
      })

      if(!res.ok) return alert("send messaeg failed")

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
            <textarea value={message} onChange={event => setMessage(event.target.value)} className="pt-2 pl-1 w-[350px] h-[34px] resize-none focus:outline-none bg-transparent"></textarea>
          </div>
          <button type="submit"><IoSend className="size-5"/></button>
        </form>
      </div>
    </>
  )
}