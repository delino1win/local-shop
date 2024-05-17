"use client";

import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import SidebarMenuSeller from "./sidebar_menu_seller";
import { useState } from "react";
import { useSession } from "next-auth/react";

const MobileSidebar = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  if (session?.user?.role === "buyer" || !session) return null;

  if(!session?.user?.id) return

  return (
    <div className="sm:hidden fixed top-25 z-30">
      <button onClick={() => setIsOpen(!isOpen)} className="">
        {!isOpen ? `Open ==>` : <div className="mr-5">{`<== Colapse`}</div>}
      </button>
      <div
        className={`${
          !isOpen
            ? "bg-slate-0 h-0 w-[0px] transition-all duration-1000 ease-in-out"
            : " bg-slate-100 h-screen w-[200px] transition-all duration-700 ease-in-out"
        }flex flex-col top-40`}
      >
        {isOpen && (
          <div className={``}>
            {session?.user?.role === "seller" ? <SidebarMenuSeller userId={session?.user?.id}/> : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileSidebar;
