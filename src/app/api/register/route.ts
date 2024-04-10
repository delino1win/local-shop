import connectMongoDataBase from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import isRole from "@/utils/checkUserRoles";
import bcrypt from "bcryptjs";
import { UUID } from "mongodb";
import TemporaryUser from "@/models/tempUser";
import { generateOtpMessage, send_Email } from "@/utils/sendEmail";
import dayjs from "dayjs";


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

// export async function POST (request: Request) {
//     await connectMongoDataBase();
//     const {firstName, lastName, email, userRole, username, phoneNumber, address, password}: User = await request.json();
//     const userId = new UUID();
//     // console.log(isRole(userRole));

//     // if(!firstName) return NextResponse.json({message: "first name required!"}, {status: 400});

//     // if(!isRole(userRole))
//     //     return NextResponse.json({message: "User Roles Must be Buyer or Seller"}, {status: 400});

//     // if(!password) return NextResponse.json({message: "Password Cant be Empty"}, {status: 400});

//     // if(!phoneNumber || phoneNumber.toString().length < 10) return NextResponse.json({message: "Phone Number Empty or the length is Wrong"}, {status: 400});
//     // if(!address) return NextResponse.json({message: "Address cant be empty"}, {status: 400});

//     const validations : Record<string, string> = {}

//     if(!firstName) {
//         validations.firstName = "First Name required!"
//     }

//     if(!email) {
//         validations.email = "Email Required"
//     }

//     if(username.length <= 4) {
//         validations.username = "Username length must not less than 4"
//     }

//     if(!isRole(userRole)) {
//         validations.isRole = "Role Must be Buyer or Seller"
//     }

//     if(!phoneNumber) {
//         validations.phoneNumber = "Phone Number Required"
//     } else if(phoneNumber.toString().length <= 10) {
//         validations.phoneNumber = "Phone Number length must not less than 10"
//     } else if(phoneNumber.toString().startsWith("08") || phoneNumber.toString().startsWith("+62")) {
//         validations.phoneNumber = "Phone Number must must starts with 08 or +62"
//     }

//     if(!password) {
//         validations.password = "Password Required"
//     } else if(password.length <= 6) {
//         validations.password = "Password equals or more than 5 letters"
//     }

//     if(!address) {
//         validations.address = "Address required"
//     }

//     if(Object.keys(validations).length > 0) {
//         return NextResponse.json({...validations}, {status: 400})
//     }

//     try {
//         const hashedPassword = bcrypt.hashSync(password, 10);
//         const isUser = await User.findOne({username: username});
        
//         if(!isUser) {
//             await User.create({
//                 userId: userId,
//                 firstName,
//                 lastName,
//                 phoneNumber,
//                 address,
//                 email,
//                 userRole,
//                 username,
//                 balanceAmount: 0,
//                 password: hashedPassword
//             });
//             return NextResponse.json({message: "User Created"}, {status: 201});
//         } else {
//             validations.username = "Username Already Exist"
//         }
        
//     } catch (error) {
//         return NextResponse.json({error_message: error});
//     }
    
// };

export async function POST (request: Request) {
    await connectMongoDataBase();
    const {firstName, lastName, email, userRole, username, phoneNumber, address, password}: User = await request.json();
    const generateUserId = new UUID();

    const validations : Record<string, string> = {}

    if(!firstName) {
        validations.firstName = "First Name required!"
    }

    if(!email) {
        validations.email = "Email Required"
    }

    if(username.length <= 4) {
        validations.username = "Username length must not less than 4"
    }

    if(!isRole(userRole)) {
        validations.isRole = "Role Must be Buyer or Seller"
    }

    if(!phoneNumber) {
        validations.phoneNumber = "Phone Number Required"
    } else if(phoneNumber.toString().length <= 10) {
        validations.phoneNumber = "Phone Number length must not less than 10"
    } else if(phoneNumber.toString().startsWith("08" || "+62")) {
        validations.phoneNumber = "Phone Number must must starts with 08 or +62"
    }

    if(!password) {
        validations.password = "Password Required"
    } else if(password.length <= 6) {
        validations.password = "Password equals or more than 5 letters"
    }

    if(!address) {
        validations.address = "Address required"
    }

    if(Object.keys(validations).length > 0) {
        return NextResponse.json({...validations}, {status: 400})
    }

    try {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const isUser = await User.findOne({username: username});

        const tempRegistrationData = {
            firstName,
            lastName,
            phoneNumber,
            address,
            email,
            userRole,
            username,
            password: hashedPassword
        }
        
        if(isUser) {
            return NextResponse.json({ status: 409, message: "Error due to email already registered" })
        } else {
            //send otp to the targeted email
            const otpData = await generateOtpMessage()

            // console.log("otpData", otpData);

            const sent_Email = await send_Email(email, otpData.emailInHtml)

            // console.log("sent email: ", sent_Email);

        
            if(!sent_Email) return console.log("sent_Email Error!")

            //create temp user
            const tempUser = await TemporaryUser.create({
                userId: generateUserId,
                data: tempRegistrationData,
                otp: otpData.otpValue,
                validUntil: dayjs().add(3, "minutes").toDate()
            });

            return NextResponse.json({
                confirmId: tempUser.userId
            });
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

        // console.log("\n is Username Found? " + findUsername);
        // console.log("\n Find ID value: " + findId);

        const isPropsId = await User.findById(findId)
        // console.log("\n ID exist ?" + isPropsId);

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