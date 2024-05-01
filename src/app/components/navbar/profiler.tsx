import { useSession } from "next-auth/react";
import CartBtn from "../button/cartBtn";
import ProfileBtn from "../button/profileBtn";
import { useEffect, useState } from "react";
import connectMongoDataBase from "@/libs/mongodb";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

async function getUserDetail (sid: string) {

  try {
    await connectMongoDataBase()

    const getUserInfo = await User.findOne({userId: sid})
    if(!getUserInfo) return
    return getUserInfo
  } catch (error) {
    console.log(error)
  }
}

export default async function Profiler() {

  const session = await getServerSession(options)

  if(!session) return

  const userInfo = await getUserDetail(session?.user?.id || "")

  return (
    <div className="flex max-sm:flex-row">
      <div className="mt-1 mx-4">
        {userInfo?.userRole === "buyer" && (
          <div className="flex flex-row gap-2">
            <CartBtn />
            <div className="text-lg text-green-900 font-light bg-slate-500 rounded-2xl px-2">
              Rp. {userInfo?.balanceAmount}
            </div>
          </div>
        )}
      </div>
      <ProfileBtn />
    </div>
  );
}
