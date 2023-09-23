import {NextRequest , NextResponse} from 'next/server';
import connectDB from '@/config/dbconfig';
import User from '@/models/user.model';

import bcrypt from 'bcryptjs';


connectDB();


export async function GET(request: NextResponse){
    return NextResponse.json({
        message:"okaye",
    })
}

export async function POST(request: NextRequest){
    try{

        const reqbody = await request.json();
        // checking the user is already registered or not
        const user = await User.findOne({email: reqbody.email});

        if(user){
            throw new Error("User already exists");
        }

        // hash passwords

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(reqbody.password,salt);
        
        reqbody.password = hashedPassword;


        await User.create(reqbody);

        return NextResponse.json({
            message:"User Created Successfullly",
            success:true,
        }, {
            status:201
        })

        
    }
    catch(error:any){
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}


