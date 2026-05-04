import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import axiosInstance from "./Utils/AxiosInstance";
import { useNavigate } from "react-router-dom";
import { MedicalInformation } from "@mui/icons-material";
import { toast } from "react-toastify";

const Register = () => {
  const [state, setState] = useState();
  const [getData, setGetData] = useState([]);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await axiosInstance.post(
        "/registerroute/registercontroller",
        values
      );
    
      if (res?.data?.success) {
        const data = await axiosInstance.get(
          "/registerroute/GetRegisterdata"
        );
        if (data) {
          setGetData(data?.data?.data);
        }
         toast.success(res.data.message)
      }
      
      setState(res.data.message);
    
    } catch (err) {
      setState(err?.response?.data?.message);
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center position">
      <header className="w-full bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between absolute top-0">
        <div className="flex items-center gap-6 ">
          <div className="flex items-center gap-2"
          onClick={()=>navigate("/")}
          >
            <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center text-white shadow-sm">
              <MedicalInformation size={20} />
            </div>
            <span className="font-extrabold text-slate-900 text-xl tracking-tight">SmartPharm</span>
          </div>


        </div>

        <div className="flex items-center gap-8">


        </div>
      </header>

      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create Account
        </h2>

        <Form layout="vertical" onFinish={onFinish} autoComplete="off">

          <Form.Item label="Username" name="username">
            <Input placeholder="Enter username" />
          </Form.Item>
                   
          <Form.Item label="Email" name="email">
            <Input placeholder="Enter email" />
          </Form.Item>

          <Form.Item label="Password" name="password">
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          <Form.Item label="Confirm Password" name="confirmpassword">
            <Input.Password placeholder="Confirm password" />
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              className="w-full bg-linear-to-r from-emerald-400 to-teal-500 text-white border-none h-10 rounded-lg"
            >
              Register
            </Button>
          </Form.Item>
        </Form>

        {/* Message */}
        {state && (
          <p className="text-center mt-3 text-sm text-gray-600">{state}</p>
        )}

        {/* Login Link */}
        <p className="text-center mt-4 text-sm">
          Already have an account ?
          <span
            onClick={() => navigate("/", { state: { openModal: true } })}
            className="text-teal-600 font-medium cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>

      {/* Optional: Show registered users */}
      <div className="absolute bottom-5 left-5 text-black">
        {getData.map((item) => (
          <p key={item._id}>{item.username}</p>
        ))}
      </div>

    </section>
  );
};

export default Register;