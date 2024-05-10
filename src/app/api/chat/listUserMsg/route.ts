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

    const result = await ChatRoom.find({
        'userIds.instigatorId': session?.user?.id
    }).populate<User>({
      path: 'user',
      options: {
        select: 'username userRole'
      }
    }).lean()

    // console.log("contact list:", result)

    return NextResponse.json(result)

  } catch (error) {
    console.error(error)
  }
}