import connectMongoDataBase from "@/libs/mongodb";
import TestString from "@/models/test_string";
import { NextResponse } from "next/server";

export async function GET (req: Request) {
    await connectMongoDataBase();

    try {
        const findDoc = await TestString.find({});

        if(!findDoc) return NextResponse.json({message: "No Doc found!"});
        
        return NextResponse.json(findDoc);

    } catch (error) {
        return NextResponse.json(error)
    }
    
} 

export async function POST (req: Request) {
    const {stringFirst, stringSecond} = await req.json();

    await connectMongoDataBase();

    try {
        const testString = await TestString.create({stringFirst, stringSecond});
        return NextResponse.json(testString);
    } catch (error) {
        return NextResponse.json(error)
    }
}