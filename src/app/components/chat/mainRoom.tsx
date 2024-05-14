"use client"

import { pusherClient } from '@/libs/pusher'
import { useEffect, useRef, useState } from 'react'
import { find } from 'lodash'

// const getConversation = async (roomId: string) => {

//   // const formData = new FormData()
//   // formData.append('roomId', roomId)

//   try {
//     const res = await fetch(`/api/chat/displayConversation?roomId=${roomId}`)

//     if(!res.ok) return alert("res not ok")

//     const listOfConversation = await res.json()

//     return listOfConversation
//   } catch (error) {
//     console.error(error)
//   }
// }


export default function MainRoom({data, roomId}: {data?: Chat[], roomId?: string}) {

  const bottomRef = useRef(null)

  console.log("component Main Room ID:", roomId)

  const [messages, setMessages] = useState<Chat[]>()

  useEffect(() => {
    setMessages(data)
  }, [data])

  useEffect(() => {
    pusherClient.subscribe(roomId || '')

    const messageHandler = (message: Chat) => {
      setMessages((current) => {
        if(!current) return 
        if(find(current, {_id: message._id})) {
          return current
        }
        
        return [...current, message];
      })
    }
    
    pusherClient.bind('messages:new', messageHandler);

    return () => {
      pusherClient.unsubscribe(roomId || '')
      pusherClient.unbind('messages:new', messageHandler)
    }

  }, [roomId])


  if(!data) return ""

  return (
    <>
      <div className="">
        {messages && (
          <>
           {messages.map(message => (
              <div key={message?._id}>
                <p>{message.text}</p>
                <label htmlFor=""></label>
              </div>
            ))}
          </>
        )}
           
      </div>
    </>
  )
}