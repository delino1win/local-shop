import { NextRequest, NextResponse } from "next/server";
import { options } from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import connectMongoDataBase from "@/libs/mongodb";
import ChatRoom from "@/models/chat_room";

export async function POST (request: NextRequest) {
  const session = await getServerSession(options)

  const formData = await request.formData()
  const sellerId = formData.get("sellerId")

  if(!session) return NextResponse.json({message: "Unauthorized"}, {status: 400})
  
  if(session?.user?.role !== 'buyer') return NextResponse.json({message: "Role must Buyer"}, {status: 400})
  
  // console.log("username", session?.user?.username)

  // const tempUserIds = {} as ChatRoom['userIds']
  // tempUserIds.instigatorId = session?.user?.id || ""
  // tempUserIds.push(sellerId)

  try {
    await connectMongoDataBase()

    const isExist = await ChatRoom.findOne({
      $or: [
        {
          'userIds.instigatorId': session?.user?.id, 
          'userIds.receiverId': sellerId
        }
      ]
    })

    if(!isExist) {
      await ChatRoom.create({
        userIds: {
          instigatorId: session?.user?.id,
          receiverId: sellerId
        }, 
      })

      return NextResponse.json({status: 200})
    }

    return NextResponse.json({status: 200})
    
  } catch (error) {
    console.error(error)
  }
}