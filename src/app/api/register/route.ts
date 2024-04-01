import connectMongoDataBase from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import isRole from "@/utils/checkUserRoles";
import bcrypt from "bcrypt";
import { UUID } from "mongodb";

export async function GET () {
    await connectMongoDataBase();
    const userFound = await User.find();
    if(!userFound.length)
    {
        return await NextResponse.json({message: "User Not Found"}, {status: 200})
    } else {
        return await NextResponse.json(userFound, {status: 200});
    }
}

export async function POST (request: Request) {
    await connectMongoDataBase();
    const {email, userRole, username, password} = await request.json();
    const userId = new UUID();
    console.log(isRole(userRole));
    if(!isRole(userRole))
        return NextResponse.json({message: "User Roles Must be Buyer or Seller"});

    if(!password) return NextResponse.json({message: "Password Cant be Empty"});
    
    try {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const isUser = await User.findOne({username: username});
        
        
        if(!isUser) {
            await User.create({
                userId: userId,
                email, 
                userRole,
                username,
                password: hashedPassword
            });
            return NextResponse.json({message: "User Created"}, {status: 201});
        } else {
            return NextResponse.json({message: "Username Already Exist"})
        }
        
    } catch (error) {
        return NextResponse.json({error_message: error});
    }
    
};


//Delete By ID Using Request Params
export async function DELETE (request: Request) {
    const nextUrl = new URL(request.url);
    console.log("what the Next Url: " + nextUrl);
    const findId = await nextUrl.searchParams.get("id");
    await connectMongoDataBase();

    try {
        const findUsername = await User.findOne({_id: String(findId)});
        console.log("\n is Username Found? " + findUsername);
        console.log("\n Find ID value: " + findId);
        const isPropsId = await User.findById(findId)
        console.log("\n ID exist ?" + isPropsId);
        if(!isPropsId) {
            return NextResponse.json({message: "There is no Such ID"});
        } else {
            await User.findByIdAndDelete(findId);
            return NextResponse.json({message: `Deleted Success! The Deleted Username is: ${findUsername?.username}`});
        }
        
    } catch (error) {
        return NextResponse.json({message: `${error}`});
    }    
}