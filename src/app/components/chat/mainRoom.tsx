"use client"

import { useEffect, useState } from "react"

const getConversation = async (roomId: string) => {

  // const formData = new FormData()
  // formData.append('roomId', roomId)

  try {
    const res = await fetch(`/api/chat/displayConversation?roomId=${roomId}`)

    if(!res.ok) return alert("res not ok")

    const listOfConversation = await res.json()

    return listOfConversation
  } catch (error) {
    console.error(error)
  }
}

export default function MainRoom({data}: {data?: Contact}) {

  const [listMsg, setListMsg] = useState<Chat[]>([])

  // console.log("roomId client:", data?._id)

  const fetchData = async () => {
    const listConversation = await getConversation(data?._id || "")
    setListMsg(listConversation)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <div className="">
            {listMsg.map(message => (
              <div key={message.chatRoomId}>
                <p>{message.text}</p>
                <label htmlFor=""></label>
              </div>
            ))}
      </div>
    </>
  )
}