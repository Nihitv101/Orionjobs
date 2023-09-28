// api route => /api/users/currentuser using the token because we have the _id and email id attached to the token
// get complete logged in user data

import { NextRequest, NextResponse } from "next/server";
import {validateUser} from '@/helpers/validateJWT';
import User from "@/models/user.model";
import connectDB from "@/config/dbconfig";

connectDB();


export async function GET(request: NextRequest){
    try{

        const userId = await validateUser(request);
        const user = await User.findById(userId).select('-password');

        if(!user){
            throw new Error("No user found");
        }

        return NextResponse.json({
            message:"User data fetched successfully",
            data:user
        })


        
    }
    catch(error:any){
        return NextResponse.json({
            message:error.message
        }, {
            status: 500
        })
    }
}
