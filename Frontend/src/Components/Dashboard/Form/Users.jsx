import React, { useEffect } from 'react'
import axiosInstance from './Utils/AxiosInstance'
import { useState } from 'react'

const Users = () => {
const [user,setUser] = useState([])
console.log(user)
  useEffect(() => {
    try{
       axiosInstance.get("/registerroute/GetRegisterdata")
      .then((res) => {
      console.log(res?.data)
      setUser(res?.data?.data)
    }).catch((err)=>{
      console.log("error",err)

    })}
    catch(err){
 console.log("error",err)
}
  },[])
  return (
    <>
  <div>
        {user?.map((items,index)=>{
            return(
                <div key={index} className=''>
                <div className='border mt-2 bg-amber-200'>
                <p>{items?.username}</p>
<p>{items?.email}</p>
                </div>
                </div>
            )
        })}
    </div>
    </>
  )
}

export default Users