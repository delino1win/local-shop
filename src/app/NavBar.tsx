import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import Profiler from "./components/navbar/profiler";

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

    return (
        <nav className="p-5 space-x-56 sticky top-0 bg-gradient-to-l from-slate-300 to-sky-300 w-full shadow-lg max-sm:max-w-full">
            <div className="flex justify-between align-middle max-sm:text-sm">
                <div className=" mt-2 hover:font-bold">
                    <Link href="/">HOME</Link>
                </div>
                <Profiler/>
            </div>
            
        </nav> 
    );
}

export default NavBar;