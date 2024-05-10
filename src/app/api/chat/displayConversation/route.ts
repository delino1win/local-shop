import connectMongoDataBase from "@/libs/mongodb"
import UserMessage from "@/models/chat"
import ChatRoom from "@/models/chat_room"
import { NextRequest, NextResponse } from "next/server"

export async function GET (request: NextRequest) {

  const searchParams = request.nextUrl.searchParams
  const roomId = searchParams.get('roomId')

  console.log("roomId:", roomId)

  try {
    await connectMongoDataBase()

    const result = await UserMessage.find({chatRoomId: roomId}).lean()

    console.log("display conv:", result)
    return NextResponse.json(result)

  } catch (error) {
    console.error(error)
  }
}