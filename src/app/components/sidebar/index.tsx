import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import SidebarMenuSeller from "./seller/sidebar_menu_seller";

const Sidebar = async () => {
  const session = await getServerSession(options);
  const isOpen = false

  if(session?.user?.role === "buyer" ||
    !session) return null

  return (
    <div className="min-w-[250px] bg-stone-50">
      <div className="fixed flex flex-col my-3 ml-3 min-h-screen h-full min-w-[220px] w-[220px]overflow-y-scroll">
        {session?.user?.role === "seller" ? (
            <SidebarMenuSeller />
        ) : null}
      </div>
      <div className="sm:hidden">
        <button>{`==>`}</button>
        {isOpen && (
          <div className="bg-slate-200 top-20 absolute h-[600px] w-[200px] flex-col">
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
