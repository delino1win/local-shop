import Conversation from "./conversation";
import HeaderTitle from "./headerTitle";
import SendMessage from "./sendMessage";

export default function ChatBoard() {
  return (
    <>
      <div className="flex w-[700px] h-[500px] bg-slate-50 rounded-xl">
        <div className="flex-1 w-[100px] border-r-2 border-neutral-400 bg-blue-100">

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
