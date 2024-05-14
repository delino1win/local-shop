"use client";

import { useContext, useEffect, useState } from "react";
import Conversation from "./conversation";
import HeaderTitle from "./headerTitle";
import SendMessage from "./sendMessage";
import { ChatContext } from "../product/detailProduct";

const getContactUsers = async () => {
  try {
    const res = await fetch(`/api/chat/listUserMsg`);

    if (!res.ok) return "Failed to fetch Data";

    const listOfContact = await res.json();

    return listOfContact;
  } catch (error) {
    console.error(error);
  }
};

// const getUsersConversations = async (roomId: string) => {
//   try {
//     const res = await fetch(`/api/chat/displayConversation?roomId=${roomId}`)

//     if(!res.ok) return

//     const result = await res.json()
//   } catch (error) {
//     console.error(error)
//   }
// }

export default function ChatBoard() {

  const [isOpen, setIsOpen] = useContext(ChatContext);

  const [users, setUsers] = useState<Contact[]>([]);
  const [conversationParams, setConversationParams] = useState<ConvParams>()

  // console.log("params:", conversationParams)

  interface ConvParams {
    roomId: string
    receiverUsername: string
    receiverUserRole: string
  }

  // interface ObjConvDataT {
  //   chatRoom_Id: string;
  // }

  // function objConvData (chatRoom_Id: string, username:string, data:Chat[]) {
  //   return {
  //     roomId: chatRoom_Id,
  //     receiverUsername: username,
  //     data: data
  //   }
  // }

  async function fetchData() {
    try {
    const getResult = await getContactUsers() as Contact[];
    setUsers(getResult);
    } catch (error) {
      console.error(error)
    }
  }

  // async function getConversations (roomId: string, receiverUsername:string, receiverRole: string) {
  //   try {
  //     const res = await fetch(`/api/chat/displayConversation?roomId=${roomId}&receiverUsername=${receiverUsername}&receiverRole${receiverRole}`)

  //     if(!res.ok) return

  //     const result = await res.json()
  //     return result

  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  // async function fetchConversation () {
  //   try {

  //     if(!conversationParams) return 

  //     const res = await getConversations(conversationParams?.roomId, conversationParams?.receiverUsername, conversationParams?.receiverUserRole)

  //     console.log("conversation respopnse:", res)
  //     setConversationData(res)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  useEffect(() => {
    fetchData()
    
  }, [isOpen]);

  // useEffect(() => {

  // })


  return (
    <>
      <div className="flex w-[700px] h-[500px] bg-slate-50 rounded-xl">
        <div className="flex-1 w-[100px] border-r-2 border-neutral-400 bg-blue-100">
          <div className="h-[17%]"></div>
          <div className="flex flex-col p-2 h-full overflow-y-auto">
            {users.map((prop) => (
              <div key={prop.userIds.instigatorId} className="mb-3">
                {/* {onClick={() => setConversationData()}} */}
                <div className="flex flex-col" onClick={() => setConversationParams({
                  roomId: prop?._id,
                  receiverUsername: prop?.user?.username,
                  receiverUserRole: prop?.user?.userRole,
                })}> 
                  <div>{prop.user.username}</div>
                  <div>{prop?._id}</div>
                  <div>{prop.user.userRole}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex w-[65%] flex-col bg-slate-400 ml-2">
          <div className="h-full bg-slate-50 border-l-2">
            {conversationParams && <Conversation params={conversationParams}/>}

          </div>
        </div>
      </div>
    </>
  );
}
