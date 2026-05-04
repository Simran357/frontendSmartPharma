import { useState } from "react";
import axiosInstance from "../Form/Utils/AxiosInstance";

const CreateUserForm = ({ setModel, getUser }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    pharmacyName:"",
    contact: "",
    license: "",
    location:"",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/registerroute/createNewUser",formData);
      if (res?.data?.success) {
        alert(res.data.message);
        getUser(); // refresh table
        setModel(false); // close modal
      }
    } catch (error) {
      console.log("Error:", error);
    }
  }; 

  return (
   <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
  <div className="w-500px bg-white rounded-2xl shadow-xl overflow-hidden">

    <div className="bg-blue-600 text-white p-4 font-semibold">
      Add New User
    </div>

    <form onSubmit={handleCreateUser} className="p-5 space-y-4">
      <input name="username" placeholder="Full Name" onChange={handleChange}
        className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"/>
      <input name="email" placeholder="Email" onChange={handleChange}
        className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"/>
      <input name="password" placeholder="Password" onChange={handleChange}
        className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"/>
      <input name="pharmacyName" placeholder="Pharmacy" onChange={handleChange}
        className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"/>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input name="contact" placeholder="Contact" onChange={handleChange}
          className="p-3 rounded-xl border border-gray-300"/>
        <input name="location" placeholder="Location" onChange={handleChange}
          className="p-3 rounded-xl border border-gray-300"/>
        <input name="license" placeholder="License" onChange={handleChange}
          className="p-3 rounded-xl border border-gray-300"/>
      </div>

      <select name="role" onChange={handleChange}
        className="w-full p-3 rounded-xl border border-gray-300">
        <option value="">Select Role</option>
        <option value="Wholesaler">Wholesaler</option>
        <option value="Retailer">Retailer</option>
      </select>

      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={() => setModel(false)}
          className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">
          Cancel
        </button>

        <button type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Create
        </button>
      </div>

    </form>
  </div>
</div>
  );
};

export default CreateUserForm