"use client"
import Link from "next/link";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const RegisterPage = () => {

    const [email, setEmail] = useState<User['email']>("");
    const [username, setUsername] = useState<User['username']>("");
    const [password, setPassword] = useState<User['password']>("");
    const [confPass, setConfPass] = useState<User['password']>("");
    const [userRole, setRole] = useState<User['userRole']>("");

    const {data: session} = useSession();
    const route = useRouter();

    const handler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(confPass !== password) {
            alert("Password = Conf"); 
            return;
        }

        if(!userRole) {
            alert("Role cant be empty"); 
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email, username, userRole, password})
            })

            if(!res.ok) {
                throw new Error("Failed!!")
            } else {
                await alert("Success Registration")
                await route.push("/");
            }

        } catch (error) {
            console.log(error)
        }
    }

    if(session?.user) {
        route.push("/denied");
    }

    return(
        <div className="flex justify-center">
            <div className="grid grid-cols-1 border-4 p-3 mt-20">
                <form onSubmit={handler} className="grid grid-cols-1 gap-4" method="POST" action="/">
                    <label htmlFor="email">Email: </label>
                    <input
                        id="email"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                        className="border-4 border-cyan-400 rounded-md pb-7" 
                        type="email" 
                        placeholder="Insert Email"
                        required
                    />

                    <label htmlFor="username">Username: </label>
                    <input
                        id="username"
                        value={username}
                        onChange={event => setUsername(event.target.value)} 
                        className="border-4 border-cyan-400 rounded-md" 
                        type="text" 
                        placeholder="Insert Username"
                        required
                    />
                    
                    <label>Role</label>
                    <div className="justify-start"> 
                        <input 
                            value="buyer"
                            onChange={e => setRole(e.target.value)}
                            id="buyer"
                            type="radio"
                            name="role"
                        /> buyer
                    </div>
                    
                    <div className="justify-start">
                        <input
                            value="seller"
                            onChange={e => setRole(e.target.value)} 
                            id="seller"
                            type="radio"
                            name="role"
                        /> seller
                    </div>

                    <label htmlFor="password">Password: </label>
                    <input 
                        id="password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        className="border-4 border-cyan-400 rounded-md" 
                        type="password" 
                        placeholder="Create Password"
                        required
                    />

                    <label htmlFor="confPass">Confirm Password: </label>
                    <input
                        id="confPass"
                        value={confPass}
                        onChange={event => setConfPass(event.target.value)}
                        className="border-4 border-cyan-400 rounded-md" 
                        type="password" 
                        placeholder="Reconfirm Password"
                        required
                    />
                    <button type="submit" className="bg-slate-400">Submit</button>
                </form>
                <Link className="mt-5" href="/api/auth/signin">Aready Have an Account? Login Here!</Link>
            </div>
            
        </div>
    );
}

export default RegisterPage;