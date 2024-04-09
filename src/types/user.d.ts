import { Date, ObjectId,  } from "mongoose"

declare global {
    interface User {
        image: string | StaticImport
        image: any
        userId: string
        email: string
        userRole: string
        firstName: string
        lastName: string
        phoneNumber: number
        address: string
        username: string
        balanceAmount: number
        password: string
    }

    interface TemporaryUser extends User {
    data: object
    otp: string
  validUntil: object
  createdAt: object
  
    }
    
    interface UserToken {
        username : string
    }
}

