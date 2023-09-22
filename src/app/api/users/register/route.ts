import {NextRequest , NextResponse} from 'next/server';
import connectDB from '@/config/dbconfig';

connectDB();


export async function POST(request: NextRequest){
    return NextResponse.json({
        message:"users register post request"
    })
}

