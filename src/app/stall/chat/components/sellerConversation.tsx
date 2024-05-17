'use client'

import SellerHeaderTitle from "./sellerHeader"
import SellerSendMessage from "./sellerSendMessage";
import SellerMainRoom from "./sellerMainRoom";
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

  const {roomId, instigatorUsername, instigatorRole} = params

  try {
    const res = await fetch(`/api/chat/displayConversation?roomId=${roomId}&username=${instigatorUsername}&role=${instigatorRole}`)

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
  instigatorUsername: string
  instigatorRole: string
}

interface ConversationsContext extends ConversationParams {
  receiverId: string
  conversations: Chat[]
}

// Do not fetching shit from here, it does not work. The result is alwayas empty idk why
export default function SellerConversation({params} : {params: ConversationParams}) {

  // console.log("conv params: ", params)

  const [convContext, setConvContext] = useState<ConversationsContext>()

  async function fetchUserConversation () {    

    try {
    const conversationContext = await getUserConversation(params)

    // {
    //    receiverId: session?.user?.id,
    //    instigatorUsername: userName,
    //    instigatorRole: userRole,
    //    conversations: usersConversation
    // }

    setConvContext(conversationContext)
    } catch (error) {
      console.error(error)
    }
  }

  // console.log("conversation info:", convContext)

  useEffect(() => {
    fetchUserConversation()
  }, [params])

  return (
    <>
      <div className="h-[17%] bg-blue-100">
        <SellerHeaderTitle username={convContext?.instigatorUsername}/>
      </div>
      <div className="h-[66%] overflow-auto">
        {convContext?.conversations && (
          <SellerMainRoom data={convContext?.conversations} roomId={params?.roomId} />
        )}
      </div>
        <div className="flex h-[17%] justify-center items-center bg-slate-200">
        {params?.roomId && (
          <SellerSendMessage chatRoomId={params.roomId}/>
        )}
      </div>
    </>
  );
}
