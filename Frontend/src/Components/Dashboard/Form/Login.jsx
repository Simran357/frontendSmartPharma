import React, { useContext, useState } from 'react';
import { Button, Form, Input, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './Utils/AxiosInstance';
import { contextProvide } from './Utils/Context/CommonContext';
import { useGoogleLogin } from '@react-oauth/google';  
import {toast}  from "react-toastify"
const Login = () => {                
  const navigate = useNavigate()   
 
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(false);
  console.log(state)      
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("tokenresponse", tokenResponse.access_token)
      try {
        setLoading(true);
        console.log("response from google ui ", tokenResponse.access_token)
        const res = await axiosInstance.post("/registerroute/auth/google", {
          accessToken: tokenResponse.access_token
        })
        console.log("google data in login page", res)
        setState(res?.data?.message)
        navigate("/Dashboard")

      } catch (error) {
        setLoading(false);
        console.log("error when hiting google backend api", error)
        setState(error?.response?.data?.message)
      }

    },
    onError: () => {
      console.log("login failed")
    }
  })   
  const onFinish = async (values) => {
    console.log("Success:", values);
    try {      
      setLoading(true); 
      const res = await axiosInstance.post("/registerroute/LoginController", values);
      if (res?.data?.success) {
        const setToken = res?.data?.jwtToken  
        console.log(setToken) 
        localStorage.setItem("jwtToken", setToken)
       toast.success("You successfully login in smartpharma Website");
        setState(res?.data?.message)
        navigate("/Dashboard")
      }    
    } catch (err) {
      setLoading(false);
      console.log("ERROR MESSAGE:", err);
      setState(err?.response?.data?.message);
    }
  };
   
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };            
  return (
    <>
      <div className="w-full flex justify-center items-center">

        {/* CARD */}
        <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg p-6">
          {/* HEADER */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-slate-800">
              Welcome Back 👋
            </h2>
            <p className="text-sm text-gray-200">
              Login to continue to SmartPharm
            </p>
          </div>

          {/* FORM */}
          <Form
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
          >                                          
            <Form.Item  
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter email" }]}
            >                       
              <Input
                size="large"
                placeholder="Enter your email"
                className="rounded-lg"
              />            
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please enter password" }]}
            >
              <Input.Password
                size="large"
                placeholder="Enter password"
                className="rounded-lg"
              /> 
            </Form.Item>

            {/* LOGIN BUTTON */}
            <Form.Item>
              <Button
                htmlType="submit"
                loading={loading}
                className="w-full bg-linear-to-r from-emerald-400 to-teal-500 text-white border-none h-10 rounded-lg">
                Login
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                className="w-full  text-white border-none h-10 rounded-lg">
                Don't have an account ? <span
                  onClick={() => navigate("/register")}
                  className="text-teal-600 font-medium cursor-pointer"
                >
                  Register
                </span>
              </Button>
            </Form.Item>        
          </Form>

          {/* DIVIDER */}
          <Divider>OR</Divider>

          {/* GOOGLE BUTTON */}
          <Button
            onClick={googleLogin}
            loading={loading}
            className="w-full h-10 rounded-lg border"
          >
            Continue with Google
          </Button>       
                                                                 
          {/* MESSAGE */}                                  
          {state && ( 
            <p className="text-center mt-4 text-sm text-red-500">
              {state}
            </p>  
          )}
        </div>
      </div>
    </>)
}
export default Login; 