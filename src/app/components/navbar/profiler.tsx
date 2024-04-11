"use client";

import { useSession } from "next-auth/react";
import CartBtn from "../button/cartBtn";
import ProfileBtn from "../button/profileBtn";
import { useEffect, useState } from "react";

async function getUserDetail () {
  try {
    const res = await fetch(`/api/user`, {
      method: "GET"
    })

    if(!res.ok) return null

    const userInfo = await res.json()
    return userInfo
  } catch (error) {
    console.log(error)
  }
}

export default function Profiler() {
  const [userInfo, setUserInfo] = useState<User>()

  // const [profile, setProfile] = useState<Profile>()

  useEffect(() => {
    async function fetchData () {
      try {
        const res = await getUserDetail()
        if(!res) return null
        setUserInfo(res)

      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  

  return (
    <div className="flex max-sm:flex-row">
      <div className="mt-1 mx-4">
        {userInfo && userInfo?.userRole === "buyer" && (
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
