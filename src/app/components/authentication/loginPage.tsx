import Link from "next/link";
import React from "react";

const LoginPage = () => {
    return(
        <div className="flex justify-center">
            <div className="grid grid-cols-1 border-4 p-3 mt-20">
                <form className="grid grid-cols-1 gap-4" method="POST" action="/dashboard">
                    <input className="border-4 border-cyan-400 rounded-md" type="email" placeholder="Insert Email"/>
                    <input className="border-4 border-cyan-400 rounded-md" type="text" placeholder="Insert Username"/> 
                    <input className="border-4 border-cyan-400 rounded-md" type="password" placeholder="Insert Password"/>
                    <button className="bg-slate-400">Submit</button>
                </form>
                <Link className="mt-5" href="/registerPage">Not Yet have an Account? Register Here!</Link>
            </div>
        </div>
    );
}

export default LoginPage;