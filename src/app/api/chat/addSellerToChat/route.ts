import { NextRequest, NextResponse } from "next/server";
import { options } from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import connectMongoDataBase from "@/libs/mongodb";
import ChatRoom from "@/models/chat_room";

export async function POST (request: NextRequest) {
  const session = await getServerSession(options)

  const formData = await request.formData()

  const sellerId = formData.get("sellerId")

  const tempUserIds = []
  tempUserIds.push(session?.user?.id)
  tempUserIds.push(sellerId)
 
  if(!session) return NextResponse.json({message: "Unauthorized"}, {status: 400})
  
  if(session?.user?.role !== 'buyer') return NextResponse.json({message: "Role must Buyer"}, {status: 400})
  
  try {
    await connectMongoDataBase()

    const isExist = await ChatRoom.findOne({
      userIds: tempUserIds
    })

    if(!isExist) {
      const result = await ChatRoom.create({
        userIds: tempUserIds,
        instigatorName: session?.user?.username
      })

      return NextResponse.json({status: 200})
    }

    return NextResponse.json({status: 200})
    
  } catch (error) {
    console.error(error)
  }
}