import Body from "./mainRoom";
import HeaderTitle from "./headerTitle";
import SendMessage from "./sendMessage";
import MainRoom from "./mainRoom";

export default function Conversation({data} : {data?: Contact}) {
  return (
    <>
      {data && (
      <>
      <div className="h-[17%] bg-blue-100">
        <HeaderTitle username={data?.user?.username}/>
      </div>
      <div className="h-[66%]">
        <MainRoom data={data}/>
      </div>

        <div className="flex h-[17%] justify-center items-center bg-slate-200">
        <SendMessage data={data}/>
      </div>
      </>
      )}
    </>
  );
}
