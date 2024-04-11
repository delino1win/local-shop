import mongoose from "mongoose";
import connectMongoDataBase from "@/libs/mongodb";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";

export async function GET () {
    await connectMongoDataBase();

    const session = await getServerSession(options)

    if(!session) return

    try {
        
        const getUser = await User.findOne({userId: session?.user?.id})

        if(!getUser) return NextResponse.json({message: "User List Does Not Exist"})

        console.log("getUser: ", getUser)

        return NextResponse.json({...getUser})
        
    } catch (error) {
        console.log(error)
    }
};