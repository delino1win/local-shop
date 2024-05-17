import connectMongoDataBase from "@/libs/mongodb";
import ChatRoom from "@/models/chat_room";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { options } from "../../auth/[...nextauth]/options";

export async function GET (request: NextRequest) {

  const session = await getServerSession(options);

  if(!session) return NextResponse.json({message: "Unauthorized"}, {status: 400})
  
  try {
    await connectMongoDataBase()

    if(session?.user?.role === 'buyer') {
      const result = await ChatRoom.find({
          'userIds.instigatorId': session?.user?.id,
      }).populate<User>({
        path: 'user',
        options: {
          select: 'username userRole'
        }
      }).lean()

      console.log("contact list from buyer:", result)


      return NextResponse.json(result)

    }

    if(session?.user?.role === 'seller') {
      const result = await ChatRoom.find({
          'userIds.receiverId': session?.user?.id,
      }).populate<User>({
        path: 'userSeller',
        options: {
          select: 'username userRole'
        }
      }).lean()

      console.log("contact list from merchant:", result)

      return NextResponse.json(result)
    }

    



  } catch (error) {
    console.error(error)
  }
}