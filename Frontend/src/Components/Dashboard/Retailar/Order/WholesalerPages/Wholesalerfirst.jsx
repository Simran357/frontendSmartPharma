import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../../Form/Utils/AxiosInstance'

const Wholesalerfirst = () =>  {
    const navigate = useNavigate()

      const [users, setUser] = useState([])  
    
  useEffect(() => {
    console.log("Component mounted ");
    getUser()
  }, []);

  
  const getUser = async () => {
    console.log("getUser called ");
    try {
      const res = await axiosInstance.get("/registerroute/getuserController")
      if (res?.data?.success) {
        setUser(res?.data?.data)
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  }

  
  const filteredUsers = users.filter(user => user.role === "Wholesaler");


      console.log(filteredUsers)
  return (
  <div className='w-full px-4 sm:px-6 lg:px-8'>
    <div className="w-full">
      <div className="flex flex-wrap gap-6 justify-start">

        {filteredUsers.length > 0 ? filteredUsers.map((user) => (
                                                            
          <div
          key={user._id}           
          className=" w-full 
          sm:w-[48%]
          md:w-[39%] 
          lg:w-[23%] 
          xl:w-[40%]
          bg-[#162538] 
          rounded-2xl 
          shadow-xl 
          overflow-hidden 
          cursor-pointer 
          hover:scale-105 
          transition-all duration-300"
            onClick={() => navigate(`${user._id}`)}
          >

            {/* Top Image */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d"
                alt="warehouse"
                className="h-40 w-full object-cover"
              />

              <span className="absolute top-3 left-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                FAST DELIVERY
              </span>

              {/* Avatar */}
              <div className="absolute -bottom-6 left-4 w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold border-4 border-[#162538]">
                {user.username?.charAt(0).toUpperCase()}
              </div>
            </div>

            {/* Content */}
            <div className="pt-6  p-5 text-white">

              {/* Name */}
              <div className="flex justify-between items-start gap-2">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold">{user.username}</h3>
                  <p className="text-gray-400 text-sm sm:text-sm">
                    {user.pharmacyName || "No Pharmacy"}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-gray-400  text-[10px] sm:text-xs  text-xs">LOCATION</p>
                  <p className="text-blue-400  text-sm font-semibold">
                    {user.location || "N/A"}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                <div className="bg-[rgba(36,55,81,0.36)] rounded-xl p-3 sm:p-4">
                  <p className="text-xs text-gray-400">CONTACT</p>
                  <p className="text-sm mt-1  truncate">{user.contact || "N/A"}</p>
                </div>

                <div className="bg-[rgba(36,55,81,0.36)]  gap-5  p-3 sm:p-4 rounded-xl">
                  <p className="text-xs text-gray-400">LICENSE</p>
                  <p className="text-sm mt-1  truncate">{user.license || "N/A"}</p>
                </div>
              </div>

              <div className="border-t border-gray-700 my-4"></div>

              {/* Bottom */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <p className="text-gray-400 text-xs sm:text-sm truncate">
                  📍 {user.location || "Unknown"}
                </p>
                <button className="bg-blue-600 px-3 py-2 rounded-lg text-xs sm:text-sm hover:bg-blue-700 w-full sm:w-auto">
                  Open Store
                </button>
              </div>
            </div>

          </div>

        )) : (
          <p className="text-white">No Retailers Found</p>
        )}

      </div>
    </div>
  </div>
)
}
export default Wholesalerfirst