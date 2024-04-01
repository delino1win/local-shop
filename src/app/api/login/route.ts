import connectMongoDataBase from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST (request: Request) {
    let isLogin;
    const {email, password} = await request.json();

    await connectMongoDataBase();

    try {
        const {email: checkEmail, password: checkPassword} = await User.findOne({email: email});
        
        if(!checkEmail) {
            isLogin = false;
        } else if (checkPassword !== password) {
            isLogin = false;
        } else isLogin = true;

        const loginStatus = isLogin === false ? "You Cant Login" : `Welcome to Login Page`;

        if(isLogin === false) {
            return NextResponse.json({message: `Your Email or Password is wrong, therefore ${loginStatus}`})
        } else return NextResponse.json({message: loginStatus});
        
    } catch (error) {
        return NextResponse.json({message: error});
    }
}
