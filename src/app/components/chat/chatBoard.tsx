"use client"

import { useContext, useEffect, useState } from "react";
import Conversation from "./conversation";
import HeaderTitle from "./headerTitle";
import SendMessage from "./sendMessage";
import { ChatContext } from "../product/detailProduct";

const getContactUsers = async () => {
  try {
    const res = await fetch(`/api/chat/listUserMsg`)

    if(!res.ok) return "Failed to fetch Data"

    const listOfContact = await res.json()

    return listOfContact
    
  } catch (error) {
    console.error(error)
  }
}


export default function ChatBoard() {

  interface Contact extends ChatRoom {
     user: User[]
  }

  const [isOpen, setIsOpen] = useContext(ChatContext)

  const [users, setUsers] = useState<Contact[]>([])

  async function fetchData () {
    const getResult = await getContactUsers() as Contact[]
    setUsers(getResult)
  }

  useEffect(() => {
    fetchData()
  }, [isOpen])

  return (
    <>
      <div className="flex w-[700px] h-[500px] bg-slate-50 rounded-xl">
        <div className="flex-1 w-[100px] border-r-2 border-neutral-400 bg-blue-100">
          <div className="h-[17%]"></div>
          <div className="flex flex-col p-2 h-full overflow-y-auto">
            {users.map(prop => (
              <div key={prop.userIds.instigatorId}>
                <div>{prop.user.map(user => (
                  <div key={user.userId}>
                    <div>{user.username}</div>
                    <div>{user.userRole}</div>
                  </div>
                ))}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex w-[65%] flex-col bg-slate-400 ml-2">
          <div className="h-[17%]"><HeaderTitle /></div>
          <div className="h-[66%] bg-slate-50 border-l-2"><Conversation /></div>
          <div className="h-[17%] "><SendMessage /></div>
        </div>
      </div>
    </>
  );
}
