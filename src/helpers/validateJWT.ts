// validate the jwt token

import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

export const validateUser = async (request: NextRequest)=>{
    try{
        const token = request.cookies.get("token")?.value;

        if(!token){
            throw new Error("No token found");
        }

        // if token the validate and get the data from token

        const decodedToken: any = jwt.verify(token , process.env.JWT_SECRET!)

        return decodedToken.userId;
        

    }
    catch(error:any){
        throw new Error(error.message);
    }
}