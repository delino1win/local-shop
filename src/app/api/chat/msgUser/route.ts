import connectMongoDataBase from "@/libs/mongodb";
import UserMessage from "@/models/chat";
import { NextRequest, NextResponse } from "next/server";
import { options } from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import ChatRoom from "@/models/chat_room";
import { pusherServer } from "@/libs/pusher";


export async function POST (request: NextRequest) {

  const session = await getServerSession(options)

  if(!session) return NextResponse.json({message: "Unathorized"}, {status: 401})

  const formData = await request.formData()

  const message = formData.get('text')
  const roomId = formData.get('roomId')?.toString() || ''

  if(!message) return NextResponse.json({message: "Message cant be empty"}, {status: 400})
  if(!roomId) return NextResponse.json({message: "Unathorized"}, {status: 401})

  try {
    await connectMongoDataBase()

    const newMessage = await UserMessage.create({
      userId: session?.user?.id,
      senderRole: session?.user?.role,
      text: message,
      chatRoomId: roomId,
      createdAt: Date.now()
    })

    const checkPusherTriggerServer = await pusherServer.trigger(roomId, 'messages:new', newMessage)

    // console.log(checkPusherTriggerServer)

    return NextResponse.json(newMessage, {status: 200})

  } catch (error) {
    console.error(error)
  }
}
