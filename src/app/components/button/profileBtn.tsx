"use client";
import React, { useState } from "react";
import UserCard from "../UserCard";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function ProfileBtn() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: session } = useSession();

  // <div className="mx-16 mt-2 hover:font-bold">
  //                   <Link href="/api/auth/signin">LOGIN</Link>
  //               </div>
  //               <div className="mx-16 mt-2 hover:font-bold">
  //                   <Link href="/registerPage">Registration</Link>
  //               </div>

  if (!session?.user) return (
    <div className="flex mt-2 justify-center text-sm">
      <button className="px-2 mr-1 bg-blue-100 rounded-lg border-r-2 border-slate-800 transition-all duration-150 hover:font-bold">
        <Link href="/api/auth/signin">Login</Link> 
      </button>
      <button className="px-2 bg-blue-100 rounded-lg border-l-2 border-slate-800 transition-all duration-150 hover:font-bold">
        <Link href="/registerPage">Registration</Link>
      </button>
    </div>
  );

  // console.log("this is session: ", session);
  // console.log("this is session user:", session.user);

  return (
    <div>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="bg-inherit-400 p-1 w-full flex items-center justify-between font-bold text-base round-lg tracking-wider border-2 border-transparent active:border-white active:text-white"
      >
        Profile
      </button>
      {isOpen && (
        // <UserCard user={} />
        <>
          <div className="bg-gray-200 absolute top-22 flex flex-col rounded-lg right-5">
            <UserCard user={session.user} />
            <Link
              className="bg-gray-100 mt-4 text-lg text-center hover:font-bold transition-all duration-200"
              href="/api/auth/signout"
            >
              Logout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
