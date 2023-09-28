"use client"

import {Button, Form, Radio, message} from 'antd';
import Link from 'next/link';
import axios from 'axios';
import { SetLoading } from '@/redux/loaderSlice';
import {useDispatch} from 'react-redux';




const Register = ()=>{


  const dispatch = useDispatch();


    const onFinish = async (value:any)=>{
      try{

        dispatch(SetLoading(false));

        const response = await axios.post('/api/users/register', value);

        if(response.data.success){
          message.success("User Registered")
        }
      }
      catch(error:any){

        console.log("eRROR", error);
        message.error(error.response.data.message || "Something went wrong")
      }
      finally{
        dispatch(SetLoading(false));
      }
    }


    return (
        <div className="flex justify-center h-screen items-center bg-primary">
        <div className="card p-5 w-450">
          <h1 className="text-xl">Orion Jobs</h1>
          <hr />
  
          <Form
            layout="vertical"
            className="flex flex-col gap-5"
            onFinish={onFinish}
          >

            <Form.Item label='Register As' name="userType">
              <Radio.Group>
                <Radio value="employer" >Employe</Radio>
                <Radio value="employee" >Employee</Radio>
              </Radio.Group>
            </Form.Item>
  

            <Form.Item label="Name" name="name">
              <input type="text" className="input" />
            </Form.Item>
  
            <Form.Item label="Email" name="email">
              <input type="email" className="input" />
            </Form.Item>
  
            <Form.Item label="Password" name="password">
              <input type="password" className="input" />
            </Form.Item>
  
            <Button type="primary" htmlType="submit" block>
              Register
            </Button>
  
            <Link href="/login">Already have an account? Login</Link>


          </Form>
        </div>
      </div>
    )
}


export default Register;


