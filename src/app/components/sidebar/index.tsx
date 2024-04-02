import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import SidebarMenuSeller from "./seller/sidebar_menu_seller";

const Sidebar = async () => {
  const session = await getServerSession(options);
  const isOpen = false;

  if (session?.user?.role === "buyer" || !session) return null;

  return (
    <div className="bg-blue-200">
      <div className="bg-blue-200 max-sm:hidden">
        <div className="w-[250px] bg-stone-50">
          <div className="fixed flex-col min-h-screen h-full min-w-[220px] w-[250px] overflow-y-scroll">
            {session?.user?.role === "seller" ? <SidebarMenuSeller /> : null}
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Sidebar;
