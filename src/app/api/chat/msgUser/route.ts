import connectMongoDataBase from "@/libs/mongodb";
import UserMessage from "@/models/chat";
import { NextRequest, NextResponse } from "next/server";
import { options } from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import ChatRoom from "@/models/chat_room";


export async function POST (request: NextRequest) {

  const session = await getServerSession(options)

  if(!session) return NextResponse.json({message: "Unaothrized"}, {status: 400})

  const formData = await request.formData()

  const message = formData.get('text')
  const roomId = formData.get('roomId')

  try {
    await connectMongoDataBase()

    const result = await UserMessage.create({
      userId: session?.user?.id,
      text: message,
      chatRoomId: roomId
    })

    return NextResponse.json(result, {status: 200})

  } catch (error) {
    console.error(error)
  }
}
