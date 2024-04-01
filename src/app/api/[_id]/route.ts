import connectMongoDataBase from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET (request: Request, {params}: {params: {_id: string}}) {
    const {_id} = await params;
    console.log(_id);
    await connectMongoDataBase();
    try {
        const getId = await User.findOne({_id: _id});
        console.log(getId);
        return NextResponse.json(getId);
    } catch (error) {
        return NextResponse.json({message: `${error}`})
    }
}

export async function PUT (request: Request, {params}: {params: {_id: string}}) {
    const {_id} = await params;
    console.log(_id)
    const {newEmail: email, newUsername: username, newPassword: password} = await request.json();
    await connectMongoDataBase();

    try {
        const getId = await User.findByIdAndUpdate({_id}, {email, username, password});
        console.log(getId)

        return NextResponse.json({message: 'Update Successed', updatedDocs: getId});

    } catch (error) {
        return NextResponse.json({message: `${error}`})
    }

}
