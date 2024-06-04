import { useSession } from "next-auth/react";
import CartBtn from "../button/cartBtn";
import ProfileBtn from "../button/profileBtn";
import { Suspense, useEffect, useState } from "react";
import connectMongoDataBase from "@/libs/mongodb";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { MdCreditCard } from "react-icons/md";
import Link from "next/link";


async function getUserDetail (sid?: string) {

  try {
    await connectMongoDataBase()

    const getUserInfo = await User.findOne({userId: sid})
    if(!getUserInfo) return
    return getUserInfo

  } catch (error) {
    console.error(error)
  }
}

export default async function Profiler() {

  const session = await getServerSession(options)

  const userInfo = await getUserDetail(session?.user?.id)

  if (!userInfo) return (
      <div className="flex mt-2 justify-center text-sm">
        <Suspense fallback={<>loading</>}>
        <button className="px-2 mr-1 bg-blue-100 rounded-lg border-r-2 border-slate-800 transition-all duration-150 hover:font-bold">
          <Link href="/api/auth/signin">Login</Link> 
        </button>
        <button className="px-2 bg-blue-100 rounded-lg border-l-2 border-slate-800 transition-all duration-150 hover:font-bold">
          <Link href="/registerPage">Registration</Link>
        </button>
        </Suspense>
      </div>
    );

  return (
    <div className="flex max-sm:flex-row">
      
      <div className="mt-1 mx-4">
        {userInfo?.userRole === "buyer" && (
          <div className="flex flex-row gap-2">
            <CartBtn />
            <Link href="/accountPayment">
              <MdCreditCard size={30} />
            </Link>
          </div>
        )}
      </div>
      <ProfileBtn />
    </div>
  );
}
