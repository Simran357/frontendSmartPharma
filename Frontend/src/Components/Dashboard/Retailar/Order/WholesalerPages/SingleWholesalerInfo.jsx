import React, { useContext, useEffect, useState } from 'react'
import { ShoppingBag, AddShoppingCart, LocalShipping, CurrencyRupee } from '@mui/icons-material';
import { Checkbox, Select } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../../Form/Utils/AxiosInstance';
import { contextProvide } from '../../../Form/Utils/Context/CommonContext';
const SingleWholesalerInfo = () => {
  const { id } = useParams()
  console.log("id", id)
  const { auth } = useContext(contextProvide)
  const [medicines, setMedicines] = useState([])
  const [singleWholesaler, setSingleWholesaler] = useState({})
  const [cartProduct, setCartProduct] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const navigate = useNavigate()
  console.log("singleWholesaler", singleWholesaler)
  const getUser = async () => {
    console.log("getUser called ");
    try {
      const res = await axiosInstance.get(`/registerroute/getsingleWholesaler/${id}`)
      if (res?.data) {
        console.log("wholesaler single", res?.data)
        setSingleWholesaler(res?.data?.data)
        console.log("singlwholesalerid", res?.data)
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  }
  console.log("auth in frontend", auth)
  const getMedicines = async () => {
    console.log("getMedicines called");
    try {
      const res = await axiosInstance.get(`/registerroute/getProductList/${id}`)
      console.log("MEDICINE API RESPONSE:", res?.data);
      if (res?.data) {
        setMedicines(res?.data?.data)
      }
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    console.log("Component mounted ");
    if (id) {
      getUser()
      getMedicines()
    }

  }, [id]);


  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartProduct));
  }, [cartProduct]);
  const handleCartItem = (ProductId) => {



    const selectedProduct = medicines.find(
      (product) => product._id === ProductId
    );
    if (!selectedProduct) return;

    setCartProduct((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item._id === ProductId
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item._id === ProductId
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...prevCart, { ...selectedProduct, qty: 1 }];
    });
  };
  console.log("medicines", medicines)

  const increaseQty = (id) => {
    setCartProduct((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, qty: item.qty + 1 }
          : item
      )
    );
  };
  useEffect(() => {
    const storedWholesaler = localStorage.getItem("wholesalerId");
    if (storedWholesaler && storedWholesaler !== id) {
      setCartProduct([]);
      localStorage.removeItem("cart");
    }
    localStorage.setItem("wholesalerId", id);
  }, [id]);

  const isInCart = (id) => {
    return cartProduct.some(item => item._id === id);
  };
  const decreaseQty = (id) => {
    setCartProduct((prev) =>
      prev
        .map((item) =>
          item._id === id
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter((item) => item.qty > 0) // remove if qty = 0
    );
  };
  const totalItems = cartProduct.reduce((total, item) => total + item.qty, 0);

  return (
    <>
      <div className='m-6'>
        <div className='bg-white border    shadow-xl border-gray-300 p-6 rounded-xl ' >
          <div className='flex gap-2'>
            <span className='flex flex-row items-center gap-5'>
              <span className='text-green-900/90  rounded-xl bg-green-200/80 p-6'>
                <LocalShipping fontSize='medium' />
              </span>
              <div className='flex flex-col items-center gap-2'>
                <span className='flex flex-row items-center gap-2'>
                  <h1 className='font-bold text-xl'>
                    {singleWholesaler?.pharmacyName || "No Name"}
                  </h1>
                  <p className=' bg-green-200/80 px-1 text-xs rounded-2xl text-green-700/90 uppercase '>verified</p>
                </span>
                <p className='text-sm font-medium text-gray-700 '>{singleWholesaler?.license}</p>
              </div>
            </span>
          </div>
          <div className='flex flex-row gap-2 ml-4 mt-4'>
            <div className='flex flex-row gap-8'>
              <span className='flex flex-col items-center'>
                <h1 className='font-bold text-xl '>98%</h1>
                <p className='text-xs text-gray-700 '>DELIVERY RATE</p>
              </span>
              <span className='flex flex-col items-center'>
                <h1 className='font-bold text-xl '>3.5h</h1>
                <p className='text-xs text-gray-700 '>AVG . TIME </p>
              </span>
              <span className='flex flex-col items-center'>
                <button className='text-black font-bold text-md bg-green-700/80 shadow-2xl shadow-green-700/60 px-4 py-2 rounded-xl '>
                  <AddShoppingCart />
                  Procure Now</button>
              </span>
            </div>
          </div>

        </div>
        <div className="grid grid-cols-12 gap-6 mt-8">
          <div className="col-span-12 lg:col-span-3">
            <section className='bg-white border shadow-xl border-gray-300 p-6 rounded-xl'>
              <span className='flex justify-between items-center'>
                <h1 className='font-bold text-lg'>Filters</h1>
                <p className='text-green-500 text-sm font-semibold'>Clear All</p>
              </span>
              <span className=''>
                <h1 className='text-gray-500 font-bold text-sm mt-2'>BATCH SEARCH</h1>
                <input
                  className="w-full bg-gray-100 py-2 px-3 rounded-lg mt-2" placeholder='Enter Batch No.' />
              </span>

              <div className=' mt-4 '>
                <h1 className='font-bold text-sm text-gray-500 '>CATEGORY </h1>
                <input
                  className="w-full bg-gray-100 py-2 px-3 rounded-lg mt-2" placeholder='Enter Batch No.'
                />
                <span className='flex flex-col font-bold text-gray-800 gap-2'>
                  <Checkbox>Syrups</Checkbox>
                  <Checkbox>Capsules</Checkbox>
                  <Checkbox>Tablets</Checkbox>
                  <Checkbox>Injectables</Checkbox>
                </span>
              </div>

              <div className='flex mt-4 flex-col font-bold text-gray-800 gap-2'>
                <h1 className='font-bold text-sm text-gray-500'>COMPANY</h1>
                <Checkbox>GSK</Checkbox>
                <Checkbox>Pfizer</Checkbox>
                <Checkbox>Abbott</Checkbox>
                <Checkbox>Cipla</Checkbox>
                <Checkbox>Sun Pharma</Checkbox>
              </div>

              <div className='mt-4'>
                <h1 className=' text-xs font-bold break-normal'>SALT COMPOSITION</h1>
                <div className='grid grid-cols-4 lg:grid-cols-2  mt-3 gap-2'>
                  <span className='bg-gray-500/80 rounded px-2 lg:max-w-32 max-w-30 py-1 text-xs font-bold text-gray-700'>Amoxillin</span>
                  <span className='bg-gray-500/80 rounded px-2 lg:max-w-32 max-w-30 py-1 text-xs font-bold text-gray-700'>Paracetamol</span>
                  <span className='bg-gray-500/80 rounded px-2 lg:max-w-32 max-w-30 py-1 text-xs font-bold text-gray-700'>Metformin</span>
                  <span className='bg-gray-500/80 rounded px-2 lg:max-w-32 max-w-30 py-1 text-xs font-bold text-gray-700'>Atorvastatin</span>
                </div>
              </div>
            </section>
          </div>
          <div className="col-span-12 lg:col-span-6">
            <section className="min-h-600px">
              <div className='m-4'>
                <h1 className='text-black font-medium text-lg '>Available Medicines</h1>
                <h1 className='text-gray-500 font-bold text-sm mt-2'>BATCH SEARCH</h1>
                <span className='flex  justify-between items-center  gap-4'>
                  <input
                    className="w-full bg-gray-100 py-1 px-2 rounded-lg mt-2"
                    placeholder='Enter Batch No.'
                  />
                  <span>
                    <Select
                      defaultValue="relevance"
                      style={{ width: 200, border: 0 }}>
                      <Option value="relevance">Sort By: Relevance</Option>
                      <Option value="priceLowHigh">Price: Low to High</Option>
                      <Option value="priceHighLow">Price: High to Low</Option>
                      <Option value="newest">Newest First</Option>
                      <Option value="popularity">Popularity</Option>
                      <Option value="rating">Customer Rating</Option>
                      <Option value="discount">Best Discount</Option>
                    </Select>
                  </span>
                </span>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5'>
                {medicines?.length > 0 ? (
                  medicines.map((med) => (


                    <div className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition p-3 text-sm font-medium">

                      {/* Image Section */}
                      <div className="relative aspect-square bg-gray-100 rounded-lg flex items-center justify-center p-4">

                        <img
                          src="/src/assets/unnamed.png"
                          alt={med.ProductName}
                          className="w-full h-full object-contain"
                        />

                        {/* Stock Badge */}
                        <span className={`absolute top-2 right-2 text-xs px-2 py-1 rounded 
          ${med.ProductQuantity > 10
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-600"}`}>
                          {med.ProductQuantity > 10 ? "IN STOCK" : "LOW STOCK"}
                        </span>

                        {/* Category Tag */}
                        <span className="absolute bottom-2 left-2 bg-blue-100 text-blue-600 px-2 py-0.5 rounded text-xs">
                          {med.ProductCategory}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="mt-3 space-y-1">
                        <p className="text-gray-400 text-xs">{med.ProductSku}</p>
                        <span>
                          <h3 className="font-semibold text-base block">
                            {med.ProductName}
                          </h3>
                          <p className="text-gray-400 text-xs">
                            Batch: {med.ProductBatchNo || "N/A"}
                          </p>
                        </span>
                        <p className="text-gray-500 text-xs">
                          Exp: {new Date(med.ProductExpiryDate).toLocaleDateString()}
                        </p>

                        {/* Price + Cart */}
                        <div className="flex justify-between items-center mt-2">
                          <p className="text-lg font-bold text-gray-800">
                            ₹ {med.ProductPrice || 0}
                            <span className="text-xs text-gray-900 ml-1">/ unit</span>
                          </p>

                          <button
                            disabled={isInCart(med._id)}
                            className={`p-2 rounded-lg transition ${isInCart(med._id)
                              ? "bg-gray-200 cursor-not-allowed"
                              : "bg-green-100 hover:bg-green-200"
                              }`}
                            onClick={() => handleCartItem(med._id)}
                          >
                            🛒
                          </button>
                        </div>

                        {/* Optional Offer */}
                        <p className="text-green-500 text-xs font-semibold">
                          10% Off on Bulk
                        </p>
                      </div>
                    </div>


                  ))
                ) : (
                  <p>No Medicines Found</p>
                )}
              </div>
              <div className='flex justify-center'>
                <button className=' px-4 py-2 rounded-xl  mt-4 bg-white/90 border w-fit text-gray-600 border-slate-400 font-medium'>Load More Medicines</button>

              </div>
            </section>
          </div>

          {/* MY CART (OLD DESIGN + NEW LOGIC) */}
          <div className="col-span-12 lg:col-span-3 flex flex-col gap-6">
            <section className='bg-white border shadow-xl w-full mt-30 border-gray-300 p-6 rounded-xl'>

              {/* Header */}
              <div className='flex justify-between items-center'>
                <span className='flex gap-2 items-center'>
                  <ShoppingBag fontSize='medium' />
                  <p className='text-md font-bold'>MY CART</p>
                </span>
                <span className='bg-green-300/90 text-green-800/80 text-xs font-medium rounded-2xl px-2'>
                  {totalItems} Items
                </span>
              </div>

              {/* CART ITEMS */}
              <div className='mt-4'>
                {cartProduct.length === 0 ? (
                  <p className='text-gray-400 text-sm'>Cart is empty</p>
                ) : (
                  cartProduct.map((item) => (
                    <div key={item._id} className='flex gap-2 items-center mt-3'>

                      {/* image placeholder */}
                      <div className='w-12 h-12 rounded-xl bg-linear-to-t from-amber-500 to-cyan-700'></div>

                      {/* content */}
                      <div className='flex justify-between w-full items-center'>

                        <span className='flex flex-col'>
                          <h1 className='text-sm font-bold'>
                            {item.ProductName}
                          </h1>

                          {/* QTY CONTROLS */}
                          <div className="flex items-center gap-2 mt-1">

                            <button
                              onClick={() => decreaseQty(item._id)}
                              className="px-2 bg-gray-200 rounded"
                            >
                              -
                            </button>

                            <span className="text-sm font-medium">
                              {item.qty}
                            </span>

                            <button
                              onClick={() => increaseQty(item._id)}
                              className="px-2 bg-gray-200 rounded"
                            >
                              +
                            </button>
                          </div>
                        </span>

                        <span className='text-sm flex items-center font-medium'>
                          <CurrencyRupee fontSize='small' />
                          {item.qty * (item.ProductPrice || 0)}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* DIVIDER */}
              <div className='border border-t-gray-50 mt-4'></div>

              {/* TOTAL SECTION */}
              <div className='mt-3'>

                <span className='flex justify-between items-center'>
                  <h1 className='text-gray-400 text-sm'>Sub Total</h1>
                  <p className='flex items-center font-bold'>
                    <CurrencyRupee fontSize='small' />
                    {cartProduct.reduce((total, item) => {
                      return total + (item.qty * item.ProductPrice);
                    }, 0)}
                  </p>
                </span>

                <span className='flex justify-between items-center mt-2'>
                  <h1 className='text-gray-400 text-sm'>Bulk Discount</h1>
                  <p className='flex items-center text-green-300/80 font-bold'>
                    - <CurrencyRupee fontSize='small' />50.00
                  </p>
                </span>

                <span className='flex justify-between items-center mt-4'>
                  <h1 className='text-gray-800 text-lg font-bold'>
                    Total Amount
                  </h1>

                  <p className='flex items-center font-bold text-lg'>
                    <CurrencyRupee fontSize='small' />
                    {cartProduct.reduce((total, item) => {
                      return total + (item.qty * item.ProductPrice);
                    }, 0) - 50}
                  </p>
                </span>

                {/* CHECKOUT */}
                <button className='w-full p-2 bg-green-600/70 rounded-xl mt-3 whitespace-nowrap text-black text-lg font-bold'
                  onClick={() => navigate("Cart", { state: { cartProduct } })}
                >
                  Proceed to Checkout
                </button>
              </div>
            </section>
          </div>
        </div>

      </div>
    </>
  )
}
export default SingleWholesalerInfo