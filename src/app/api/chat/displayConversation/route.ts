import connectMongoDataBase from "@/libs/mongodb"
import UserMessage from "@/models/chat"
import ChatRoom from "@/models/chat_room"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { options } from "../../auth/[...nextauth]/options"

export async function GET (request: NextRequest) {

  const session = await getServerSession(options)

  if(!session) return NextResponse.json({message: "Unauthenticated, Login first"}, {status: 400})

  const searchParams = request.nextUrl.searchParams
  const roomId = searchParams.get('roomId')
  const userName = searchParams.get('username')
  const userRole = searchParams.get('role')

  // console.log("roomId:", roomId)

  try {
    await connectMongoDataBase()

    if(session?.user?.role === 'buyer') {
      const usersConversation = await UserMessage.find({
        chatRoomId: roomId
      }).lean()
  
      //if the client as customer, display the seller conversation informations
      const conversationContext = {
        instigatorId: session?.user?.id,
        receiverUsername: userName,
        receiverRole: userRole,
        conversations: usersConversation
      }
  
      // console.log(conversationContext)
  
      // console.log("display conv:", result)
      return NextResponse.json(conversationContext)
    }

    if(session?.user?.role === 'seller') {
      const usersConversation = await UserMessage.find({
        chatRoomId: roomId
      }).lean()
  
      //if the client as customer, display the seller conversation informations
      const conversationContext = {
        receiverId: session?.user?.id,
        instigatorUsername: userName,
        instigatorRole: userRole,
        conversations: usersConversation
      }
  
      // console.log(conversationContext)
  
      // console.log("display conv:", result)
      return NextResponse.json(conversationContext)
    }
    

  } catch (error) {
    console.error(error)
  }
}

