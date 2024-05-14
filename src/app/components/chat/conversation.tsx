'use client'

import Body from "./mainRoom";
import HeaderTitle from "./headerTitle";
import SendMessage from "./sendMessage";
import MainRoom from "./mainRoom";
import connectMongoDataBase from "@/libs/mongodb";
import ChatRoom from "@/models/chat_room";
import { useEffect, useState } from "react";
import { pusherClient } from '@/libs/pusher'
import { find } from 'lodash'

// const getUserContext = async (userRef?: string) => {

//   // const conversationData = () => {
//   //   return {

//   //   }
//   // }

//   try {
//     await connectMongoDataBase()

//     //_id here as roomId and userRef is chatRoomId from 
//     const result = await ChatRoom.findOne({_id: userRef}).populate<User>({
//       path: 'user',
//     })

//     return result
//   } catch (error) {
//     console.error(error)
//   }
// }

// const getUserConversation = async () => {

// }


//Using use client
const getUserConversation = async (params: ConversationParams) => {

  const {roomId, receiverUsername, receiverUserRole} = params

  try {
    const res = await fetch(`/api/chat/displayConversation?roomId=${roomId}&username=${receiverUsername}&role=${receiverUserRole}`)

    if(!res.ok) return console.error(res.status)

    const userConversation = await res.json()

    // console.log("fetch for userConversation:", userConversation)

    return userConversation
  } catch (error) {
   console.error(error)
  }
}

interface ConversationParams {
  roomId: string
  receiverUsername: string
  receiverUserRole: string
}

interface ConversationsContext extends ConversationParams {
  instigatorId: string
  conversations: Chat[]
}

// Do not fetching shit from here, it does not work. The result is alwayas empty idk why
export default function Conversation({params} : {params: ConversationParams}) {

  console.log("conv params: ", params)
  // const userData = await getUserContext(userRef)
  // const conversationData = await getUserConversation(userData?.)

  const [convContext, setConvContext] = useState<ConversationsContext>()

  async function fetchUserConversation () {    

    try {
    const conversationContext = await getUserConversation(params)
    setConvContext(conversationContext)
    } catch (error) {
      console.error(error)
    }
  }

  console.log("conversation info:", convContext)

  useEffect(() => {
    fetchUserConversation()
  }, [params])

  // useEffect(() => {
  //   pusherClient.subscribe(convContext?.roomId || '')

  //   const messageHandler = (message: Chat) => {
  //     setConvContext((current) => {
  //       if(find(current, {id: message._id})) {
  //         return current
  //       }
        
  //       return [...current, message];
  //     })
  //   }
    
  //   pusherClient.bind('messages:new', messageHandler);

  //   return () => {
  //     pusherClient.unsubscribe(roomId)
  //     pusherClient.unbind('messages:new', messageHandler)
  //   }

  // }, [convContext?.roomId])

  return (
    <>
      <div className="h-[17%] bg-blue-100">
        <HeaderTitle username={convContext?.receiverUsername}/>
      </div>
      <div className="h-[66%]">
        {convContext?.conversations && (
          <MainRoom data={convContext?.conversations} roomId={params?.roomId}/>
        )}
      </div>
        <div className="flex h-[17%] justify-center items-center bg-slate-200">
        {params?.roomId && (
        <SendMessage chatRoomId={params.roomId}/>
        )}
      </div>
    </>
  );
}
