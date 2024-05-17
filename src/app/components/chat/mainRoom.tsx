"use client"

import { pusherClient } from '@/libs/pusher'
import { useEffect, useRef, useState } from 'react'
import { find } from 'lodash'
import { useSession } from 'next-auth/react'
import { formatChatTime } from '@/utils/dateFormatter'

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

  console.log("message intial state:", data)

  const [messages, setMessages] = useState<Chat[]>()

  const {data: session} = useSession()

  useEffect(() => {
    setMessages(data)
  }, [data])

  useEffect(() => {

    //establish connection
    //When roomId get mounted, this will be connect to the channel or roomId (roomId channel registered in BE)
    pusherClient.subscribe(roomId || '') 
    
    const messageHandler = (message: Chat) => { //callback as function that has message argument indicated from newMessage in the BE

      setMessages((current) => {

        // console.log("current: ",current)
        // console.log("message: ",message)

        if(!current) return

        //if current set of messages has an id with the same newMessage ID, return the current message
        if(find(current, {_id: message._id})) {
          return current  
        }
        
        //if doesn't, append the newMessage to the current set of messages conversation and return it with the setMessage and will be used for display the messages
        return [...current, message];
      })
    }
    
    //the message:new that created on the BE automatically has 2 default depends on the arguments in the .bind method
      //messageHandler's argument (in this case message) has newMessage (the new message's sender) indicated from 'message:new'
    pusherClient.bind('messages:new', messageHandler);

    return () => {
      pusherClient.unsubscribe(roomId || '')
      pusherClient.unbind('messages:new', messageHandler)
    }

  }, [roomId])


  if(!data) return ""

  return (
    <>
      <div className="p-5">
        {messages && (
          <>
           {messages.map(message => (
              <div key={message?._id} className='flex my-3'>
                <div className=''>
                <p className={`${message?.senderRole === 'buyer' ? 'bg-green-200' : 'bg-neutral-200' } p-2 rounded-tl-xl `}>{message.text}</p>
                <label className='font-light text-xs italic self-end bg-neutral-200 p-1 my-1 mr-2'>{formatChatTime(message.createdAt)}</label>
                </div>
                
              </div>
            ))}
          </>
        )}
           
      </div>
    </>
  )
}