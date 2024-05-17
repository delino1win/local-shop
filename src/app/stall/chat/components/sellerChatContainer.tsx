"use client";

import { useContext, useEffect, useState } from "react";
import SellerConversation from "./sellerConversation";
// import Conversation from "./conversation";
// import HeaderTitle from "./headerTitle";
// import SendMessage from "./sendMessage";
// import { ChatContext } from "../product/detailProduct";

const getContactUsers = async () => {
  try {
    const res = await fetch(`/api/chat/listUserMsg`);

    if (!res.ok) return "Failed to fetch Data";

    const listOfContact = await res.json();

    // console.log(listOfContact)

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

interface SellerContact extends ChatRoom {
  userSeller: User;
}

export default function SellerChatContainer() {
  const [users, setUsers] = useState<SellerContact[]>([]);
  const [conversationParams, setConversationParams] = useState<ConvParams>();

  // console.log("params:", conversationParams)

  interface ConvParams {
    roomId: string;
    instigatorUsername: string;
    instigatorRole: string;
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
      const getResult = (await getContactUsers()) as SellerContact[];
      setUsers(getResult);
    } catch (error) {
      console.error(error);
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
    fetchData();
  }, []);

  // useEffect(() => {

  // })

  return (
    <>
      <div className="flex h-full w-full justify-center items-center">
        <div className="flex w-[75%] h-[550px] bg-slate-50 rounded-xl">
          <div className="flex-1 border-r-2 border-neutral-400 bg-blue-100">
            <div className="h-[17%]"></div>
            <div className="flex flex-col p-2 h-full overflow-y-auto">
              {users.map((prop) => (
                <div
                  key={prop.userIds.receiverId}
                  className="mb-3 px-2 py-1 ring-1 ring-gray-400 rounded-md tracking-wide font-medium text-gray-900 hover:bg-slate-300 hover:shadow-md active:bg-slate-600 transition-all duration-200 ease-out"
                >
                  <div
                    className="flex flex-row justify-between"
                    onClick={() =>
                      setConversationParams({
                        roomId: prop?._id,
                        instigatorUsername: prop?.userSeller?.username,
                        instigatorRole: prop?.userSeller?.userRole,
                      })
                    }
                  >
                    <div>{prop?.userSeller?.username}</div>
                    <div className="italic text-gray-400 text-sm">
                      {prop?.userSeller?.userRole}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex w-[65%] flex-col bg-slate-400 ml-2">
            <div className="h-full bg-slate-50 border-l-2">
              {conversationParams && <SellerConversation params={conversationParams}/>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
