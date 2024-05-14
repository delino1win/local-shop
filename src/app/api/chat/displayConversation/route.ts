import connectMongoDataBase from "@/libs/mongodb"
import UserMessage from "@/models/chat"
import ChatRoom from "@/models/chat_room"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { options } from "../../auth/[...nextauth]/options"

export async function GET (request: NextRequest) {

  const session = await getServerSession(options)

  if(!session) return NextResponse.json({message: "forbidden access, Login first"}, {status: 400})

  const searchParams = request.nextUrl.searchParams
  const roomId = searchParams.get('roomId')
  const receiverUsername = searchParams.get('username')
  const receiverRole = searchParams.get('role')

  // console.log("roomId:", roomId)

  try {
    await connectMongoDataBase()

    const usersConversation = await UserMessage.find({
      chatRoomId: roomId
    }).lean()

    const conversationContext = {
      instigatorId: session?.user?.id,
      receiverUsername: receiverUsername,
      receiverRole: receiverRole,
      conversations: usersConversation
    }

    console.log(conversationContext)

    // console.log("display conv:", result)
    return NextResponse.json(conversationContext)

  } catch (error) {
    console.error(error)
  }
}

