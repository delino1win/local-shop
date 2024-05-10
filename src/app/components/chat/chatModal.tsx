"use client";

import { useSession } from "next-auth/react";
import { useContext, useState } from "react";
import { BsChatLeftTextFill } from "react-icons/bs";
import { BsArrowsAngleContract } from "react-icons/bs";
import ChatBoard from "./chatBoard";
import { ChatContext } from "../product/detailProduct";

export default function ChatModal() {

  //use useContext here
  const [isOpen, setIsOpen] = useContext(ChatContext)

  const { data: session } = useSession();

  if (!session) return
  

  if (session?.user?.role !== "buyer") return;

  return (
    <>
      {session?.user?.role === "buyer" && (
        <>
          {isOpen ? (
            <div className={`fixed bottom-10 right-20 z-30`}>
              <BsArrowsAngleContract
                onClick={() => setIsOpen(!isOpen)}
                className={`absolute right-0 bg-slate-50 p-1 rounded-lg -top-5 size-9 shadow-sm z-30 active:bg-slate-200 hover:shadow-lg hover:p-2 transition-all duration-300 ease-in`}
              />
              <ChatBoard />
            </div>
          ) : (
            <BsChatLeftTextFill
              onClick={() => setIsOpen(!isOpen)}
              color="yellowgreen"
              className="fixed bottom-10 bg-slate-400 py-1 px-3 right-20 z-50 size-16 rounded-3xl hover:shadow-lg"
            />
          )}
        </>
      )}
    </>
  );
}
