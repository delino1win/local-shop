import React from "react";
import ProfileBtn from "./components/button/profileBtn";
import Link from "next/link";
import CartBtn from "./components/button/cartBtn";
import { options } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import getUserDetail from "@/utils/getUserDetail";

// const navBarProps = {
//     prop1: <Link href="/featuredproduct">HOME</Link>,
//     prop3: <Link href="/product/seller/addProduct">Add Product</Link>,
//     prop4: <Link href="/api/auth/signin">LOGIN</Link>,
//     prop5: <Link href="/registerPage">Registration</Link>,
//     props6: <CartBtn />
//   }

{/* {Object.values(props).map((prop, index) => (
                    <div className="mx-16 mt-2 hover:font-bold" key={index}>{prop}</div>
                ))} */}

const NavBar = async () => {
    const session = await getServerSession(options)

    const profile =  await getUserDetail(session?.user?.id) as {profile?: string}
    return (
        <nav className="p-5 space-x-56 sticky top-0 bg-blue-200 w-full border-b-2 border-b-slate-400 shadow-lg max-sm:max-w-full">
            <div className="flex justify-between align-middle max-sm:text-sm">
                <div className=" mt-2 hover:font-bold">
                    <Link href="/">HOME</Link>
                </div>
                
                <div className="flex max-sm:flex-row">
                    <div className="mt-1 mx-4">
                    {session?.user && session?.user?.role === "buyer" && (
                        <div className="flex flex-row gap-2">
                            <CartBtn />
                            <div className="text-lg text-green-900 font-light bg-slate-500 rounded-2xl px-2">Rp. {profile?.balanceAmount}</div>
                        </div>
                    )}
                    </div>
                        <ProfileBtn />
                </div>
                
            </div>
            
        </nav> 
    );
}

export default NavBar;