import mongoose from "mongoose";
import connectMongoDataBase from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET () {
    try {
        await connectMongoDataBase();
        const isUserExist = await User.find();

        if(!isUserExist.length) {
            return NextResponse.json({message: "User List Does Not Exist"})
        } else {
            return NextResponse.json({userList: isUserExist });
        }
    } catch (error) {
        return NextResponse.json(error);
    }
};