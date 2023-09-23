import connectDB from "@/config/dbconfig";

import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from "next/server";
import User from '@/models/user.model';
import bcrypt, { compare } from 'bcryptjs';




connectDB();


export async function POST(request : NextRequest){

    try{
            const reqbody = await request.json();
        
            // check if the user exits
        
            const user = await User.findOne({email: reqbody.email});
        
            if(!user){
                throw new Error("User Does not exist");
            }
        
            // compare the passwords
            const comparePassword = await bcrypt.compare(reqbody.password, user.password );
        
            if(!comparePassword){
                throw new Error("Password does'nt match");
            }
        
            // jwt sign
        
            const dataTobeSigned = {
                userId : user._id,
                email: user.email,
            }
        
            const token = jwt.sign(dataTobeSigned, process.env.JWT_SECRET! , {
                expiresIn: "1d",
            })
        
            const response = NextResponse.json({
                message: "Login Successful",
                success:true
            }, {
                status: 200
            })
        
        
            // set cookie
        
            response.cookies.set('token', token, {
                httpOnly:true,
                maxAge: 60*60*24*1000,
            })

            return response;

    }
    catch(error:any){
        console.log(error)
        return NextResponse.json({
            message:error.message,
        }, {
            status: 500 
        })
    }

}