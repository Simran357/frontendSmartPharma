import { useEffect, useState } from "react";
import { FaSearch, FaShieldAlt } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Components/Dashboard/Form/Utils/AxiosInstance";

const Retailors = () => {
  const [users, setUser] = useState([])
  const navigate = useNavigate()
  const [tab, setTab] = useState("all");
  const [activeMenu, setActiveMenu] = useState("retailors");
  const [activePage, setActivePage] = useState(1);
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
  useEffect(() => {
    console.log("Component mounted ");
    getUser()
  }, []);


  const filteredUsers = users.filter(
    user => user.role?.toLowerCase() === "retailer"
  );

  const filteredRetailors = filteredUsers.filter((item) => {
    if (tab === "all") return true;
    return item.status === tab;
  });

  return (<>
    <div className="w-full h-screen flex">
      {/* Main Content */}
      <div className="h-full flex-1 bg-gray-200 p-6 flex flex-col">

        {/* 👉 Show ONLY Retailors UI */}
        {activeMenu === "retailors" && (
          <>
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Retailers</h1>
                <p className="text-gray-700">
                  Manage and monitor your retail pharmacy partners
                </p>
              </div>

              <div className="flex gap-2 items-center">
                <div className="flex px-6 py-1 bg-green-100 rounded-2xl  gap-2 items-center">
                  <FaDownload className="text-base text-green-500 font-light" />
                  <button className="text-green-500 font-semibold">Export List</button>
                </div>
                <div className="px-6 py-1 bg-green-500 rounded-2xl flex items-center gap-1 ">
                  <AiOutlinePlus className="text-xl text-white" />
                  <button className="text-white font-semibold">Add Retailer</button>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="w-full mt-5">
              <div className="flex items-center border border-gray-300 rounded-full px-3 py-2 w-full bg-white">
                <FaSearch className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search retailors by name, city and contact..."
                  className="w-full outline-none capitalize"
                />
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mt-6 mb-4">


            </div>

            {/* Cards */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden  relative">
              <div className="flex flex-wrap gap-6"
              >
                {filteredRetailors.length > 0 ? (
                  filteredRetailors.map((item) => (
                    <div
                      key={item._id}
                      onClick={() => navigate(`${item._id}`)}
                      className="w-full sm:w-[48%] md:w-[31%] lg:w-[23%] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition cursor-pointer bg-[#0f1f2e]"
                    >
                      {/* Image */}
                      <div className="relative">
                        <img
                          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d"
                          className="h-36 w-full object-cover"
                        />

                        {/* Badge */}
                        <span className="absolute top-3 left-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                          FAST DELIVERY
                        </span>

                        {/* Avatar */}
                        <div className="absolute -bottom-6 left-4 bg-blue-600 w-12 h-12 flex items-center justify-center rounded-xl text-white font-bold border-4 border-[#0f1f2e]">
                          {item.username?.charAt(0)?.toUpperCase()}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="pt-10 p-4 text-white">
                        <h2 className="text-lg font-semibold">{item.username}</h2>
                        <p className="text-sm text-gray-400">
                          {item.pharmacyName || "Pharma Store"}
                        </p>

                        {/* Location */}
                        <div className="mt-3">
                          <p className="text-xs text-gray-400">LOCATION</p>
                          <p className="text-blue-400 font-medium">
                            {item.location || "N/A"}
                          </p>
                        </div>

                        {/* Info */}
                        <div className="flex gap-3 mt-4">
                          <div className="bg-[#1b2c3d] px-3 py-2 rounded-xl text-sm">
                            <p className="text-gray-400 text-xs">CONTACT</p>
                            <p>{item.contact?.slice(0, 5) || "N/A"}...</p>
                          </div>

                          <div className="bg-[#1b2c3d] px-3 py-2 rounded-xl text-sm">
                            <p className="text-gray-400 text-xs">LICENSE</p>
                            <p>{item.license || "253..."}</p>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-between items-center mt-5">
                          <p className="text-xs text-gray-400">
                            📍 {item.location || "N/A"}
                          </p>

                          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl text-sm">
                            Open Store
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 text-center w-full">
                    No Retailers Found
                  </p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  </>
  );
};
export default Retailors;