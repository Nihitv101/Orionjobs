import { NextRequest, NextResponse } from "next/server";




// check for the token , if we dont have token and no public page then redirect to the login page




export async function middleware(request: NextRequest){
    try{
        const publicPage = request.nextUrl.pathname == '/login' || request.nextUrl.pathname == '/register';

        // if no token then redirect to the login page
        const token = request.cookies.get("token");
        if(!token && !publicPage){
            return NextResponse.redirect(new URL('/login', request.nextUrl))
        }

        // if there is a token and its public then redirect to the home page


        if(token && publicPage){
            return NextResponse.redirect(new URL('/', request.nextUrl)) 
        }

        return NextResponse.next()
    }
    catch(error:any){
        return NextResponse.error();
    }
}



export const config = {
    matcher: ['/', '/login', '/register']
}


