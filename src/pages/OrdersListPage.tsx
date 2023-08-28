import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { CartItem } from '../utils/types';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router';

const OrdersListPage: React.FC = () => {
  const navigate=useNavigate()
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const handelInvoice=(itemId:number)=>{
    navigate(`/ewaybill/${itemId}`)
  }
  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Order Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cartItems.map((item: CartItem) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col"
            >
              <div className='flex '>
                <p className='px-4 py-2 rounded-lg bg-slate-900 text-white cursor-pointer ' onClick={()=>handelInvoice(item.id)}>Invoice</p>
              </div>
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 mx-auto mb-4 object-cover"
              />
              <h3 className="text-lg font-semibold text-center mb-2">
                {item.title}
              </h3>
              <p className="text-green-600 text-center mb-4">
                ₹ {item.totalPrice.toFixed(2)}
              </p>
              <p className="text-center mb-4">Quantity: {item.quantity}</p>
              <p className="text-center mb-4">Order ID: {uuidv4()}</p>
              <button
                className="bg-yellow-400 text-white py-2 rounded-md transition duration-300 hover:bg-yellow-500"
              >
                Buy It Again
              </button>
              <p className="text-center mt-4">Order Date: July 15, 2023</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersListPage;
