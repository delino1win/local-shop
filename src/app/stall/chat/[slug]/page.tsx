import ChatContainer from "@/app/components/chat/chatContainer";
import SellerChatContainer from "../components/sellerChatContainer";

export default function Page ({params} : {params: {slug : string}}) {

  const {slug: userId} = params

  return (
    <>
    <SellerChatContainer />
    </>
  ) 
}