

import {useState, useEffect} from 'react';
import axios from 'axios';

import {message} from 'antd';

import {cookies} from 'next/headers';



// entire page will be loading from the server only

export async function getUser(){
  try{
    const token = cookies().get("token")
    const response = await axios.get('http://localhost:3000/api/users/currentuser' , {
      headers:{
        // we have to send the token in the cookie
        Cookie: `token=${token?.value}`
      }
    });

    return response.data.data;
  
  }
  catch(error){
    console.log(error);
  }
}




export default async function Home() {

  const user:any = await getUser();






  return (
    <div>
      Orion Jobs
      {
        user?.name
      }
      <h1>
              </h1>      
    </div>
  )
}
