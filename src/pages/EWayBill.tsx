
import React from 'react';
import { useNavigate, useParams } from 'react-router';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

  const EWayBill: React.FC = () => {
  const {itemId } = useParams();

    const{ billingFirstName,
      billingLastName,
      billingEmail,
      billingPhoneNumber,
      billingAddressLine1,
      billingAddressLine2,
      billingCity,
      billingState,
      billingPostalCode,
      billingCountry,
      }= useSelector((state:RootState)=>state.checkout)
    
     const cartItems = useSelector((state: RootState) => state.cart.items);
     const productIdAsNumber: number = itemId ? parseInt(itemId as unknown as string, 10) : 0;

      const userSingleData = cartItems.find((item) => item.id === productIdAsNumber)
   

    const navigate = useNavigate()
    const generateEWayBill = () => {
      const doc = new jsPDF();
      doc.setProperties({
        title: ' Invoice',
      });
    
      doc.text(`${billingFirstName} , ${billingLastName}`, 10, 20);
      doc.text(`${billingEmail}`, 10, 30);
      doc.text(`${billingPhoneNumber}`, 10, 40);
      doc.text(`${billingAddressLine1}`, 10, 50);
      doc.text(`${billingAddressLine2}`, 10, 60);
      doc.text(`${billingCity},  ${billingState} ,${billingPostalCode}`, 10, 70);
      doc.text(`${billingCountry}`, 10, 80);
      let startY = 90; // Initial Y position for table
      const tableData = [
        [
          userSingleData?.title,
          userSingleData?.quantity,// Convert to string if necessary
          userSingleData?.price,
          userSingleData?.totalPrice,
        ]
      ];
      (doc as any).autoTable({
        head: [['Product name', 'Quantity', 'Rate', 'Amount']],
        body:tableData,
        startY: startY,
        styles: {
          fontSize: 14, 
        },
      });

      const totalAmount = cartItems.reduce((total, item) => total + item.totalPrice, 0);
      startY = startY + cartItems.length * 10 + 10; // Move down after the table 
      doc.save('invoice.pdf');
    };

    
    const handelGotoHome=()=>{
      navigate('/')
    }
    return (
      <>
      <div className="eway-bill  p-4 rounded shadow-md flex justify-center items-center py-10 bg-gray-100 flex-col">
        <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-1/2">
        <h2 className="text-xl font-semibold mb-4 text-center">Invoice Bill</h2>
        <div className="grid gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Shipping Information</h3>
            <p className='text-2xl'>{billingFirstName} {billingLastName}</p>
            <p className='text-2xl'>{billingEmail}</p>
            <p className='text-2xl'>{billingPhoneNumber}</p>
            <p className='text-2xl'>{billingAddressLine1}</p>
            <p className='text-2xl'>{billingAddressLine2}</p>
            <p className='text-2xl'>{billingCity}, {billingState}, {billingPostalCode}</p>
            <p className='text-2xl'>{billingCountry}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Cart Items</h3>
            <div className="">
                <table className="w-full text-sm text-left text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Product name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Quantity
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Rate
                            </th>
                            <th scope="col" className="px-6 py-3">
                            Amount
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                       <tr  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {userSingleData?.title}
                            </th>
                            <td className="px-6 py-3 text-center md:px-1 md:py-1">
                            {userSingleData?.quantity}
                            </td>
                            <td className="px-6 py-3 md:px-1 md:py-1">
                              {userSingleData?.price}
                            </td> 
                            <td className="px-6 py-3 md:px-1 md:py-1">
                                ${userSingleData?.totalPrice.toFixed(2)}
                            </td>
                        </tr>
                        
                    </tbody>
                    
                </table>
            </div>
          </div>
        </div>
        
        </div>
        <div className='my-2 flex justify-around p-8 w-full max-w-md flex-col sm:flex-row gap-2'>
            <button className='px-3 py-2 bg-slate-400 text-gray-50 rounded-md sm:w-full hover:bg-slate-600' onClick={handelGotoHome}>Go To Home</button>
            <button className='px-3 py-2 bg-slate-400 text-gray-50 rounded-md sm:w-full hover:bg-slate-600' onClick={generateEWayBill}>Download</button>
        </div>
      </div>
      </>
    );
  };

  export default EWayBill;
