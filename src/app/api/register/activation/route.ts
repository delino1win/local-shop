import connectMongoDataBase from "@/libs/mongodb"
import TemporaryUser from "@/models/tempUser"
import User from "@/models/user"
import { error } from "console"
import { NextRequest, NextResponse } from "next/server"


export async function POST (request: Request) {
  await connectMongoDataBase()

  const {otp, confirmId} = await request.json()

  // console.log("confId: ", confirmId + " otp: ", otp)

  try {
    const tempUserDetail = await TemporaryUser.findOne({userId: confirmId}).lean() as TemporaryUser

    if(!tempUserDetail) return NextResponse.json({message: "User Not Found!"}, {status: 409}) 

    if(otp !== tempUserDetail.otp) return NextResponse.json({message: "Invalid OTP"}, {status: 409})

    if(new Date() > tempUserDetail.validUntil) return NextResponse.json({message: "OTP Deprecated"}, {status: 409})

    const registerUser = await User.create({
      ...tempUserDetail.data,
      userId: tempUserDetail.userId,
      balanceAmount: 0
    })

    await TemporaryUser.deleteMany({
      email: tempUserDetail.email
    })

    return NextResponse.json({message: "User fully Registered", account: registerUser})

  } catch (error) {
    console.log(error)
  }
}