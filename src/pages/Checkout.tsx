
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from '../redux/store';
import BillingInformation from '../components/common/Checkout/Billingform';
import PaymentInformation from '../components/common/Checkout/Paymentform';
import { FormValues ,CartItems} from '../redux/slices/checkout/checkoutSlice';

interface CartItem {
    id: number;
    title: string;
    quantity: number;
    totalPrice: number;
    // Add other properties as needed
}
// Define the structure of form values using TypeScript interface
interface FormValues {
    billingFirstName: string;
    billingLastName: string;
    billingEmail: string;
    billingPhoneNumber: string;
    billingAddressLine1: string;
    billingAddressLine2: string;
    billingCity: string;
    billingState: string;
    billingPostalCode: string;
    billingCountry: string;
    cardNumber: string;
    expirationDate: string;
    cvv: string;
    cardHolderName: string;

    cartItems: CartItem[];
}

// Define the Checkout component
const Checkout: React.FC = () => {
    const navigate=useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { enqueueSnackbar } = useSnackbar();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    // Initialize form values with empty strings
    const initialValues: FormValues = {
        billingFirstName: '',
        billingLastName: '',
        billingEmail: '',
        billingPhoneNumber: '',
        billingAddressLine1: '',
        billingAddressLine2: '',
        billingCity: '',
        billingState: '',
        billingPostalCode: '',
        billingCountry: '',
        cardNumber: '',
        expirationDate: '',
        cvv: '',
        cardHolderName: '',
     
        cartItems: [],
    };
    const validationSchema = Yup.object().shape({
        billingFirstName: Yup.string()
            .matches(/^[A-Za-z]+( [A-Za-z]+)*$/, 'First Name should only contain letters and spaces')
            .required('First Name must be required'),

        billingLastName: Yup.string()
            .matches(/^[A-Za-z]+( [A-Za-z]+)*$/, 'Last Name should only contain letters')
            .required('Last Name must be required'),
        billingEmail: Yup.string()
            .matches(
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                'Invalid email address'
            )
            .required('E- mail must be required'),
        billingPhoneNumber: Yup.string()
            .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
            .required('Phone number must be required'),
        billingAddressLine1: Yup.string().required('Address must be required'),
        billingAddressLine2: Yup.string().required('Address must be required'),
        billingCity: Yup.string().required('City must be required'),
        billingState: Yup.string().required('State must be required'),
        billingPostalCode: Yup.string()
            .matches(/^[0-9]{6}$/, 'Postal code must be 6 digits')
            .required('Postalcode must be required'),
        billingCountry: Yup.string().required('Country must be required'),
        cardNumber: Yup.string()
            .matches(/^\d{16}$/, 'Card Number must be a 16-digit number')
            .required('Card number must be required'),
        expirationDate: Yup.string()
            .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Use MM/YY format')
            .required('Required'),

        cvv: Yup.string()
            .matches(/^\d{3}$/, 'CVV must be exactly 3 digits')
            .required('CVV is required'),
        cardHolderName: Yup.string()
            .matches(/^[A-Za-z ]+$/, 'Only letters and spaces are allowed')
            .required('Holder name must be required'),
       
    });

    // Define the form submit handler
    const handleSubmit = (values: FormValues) => {
        dispatch(FormValues({ ...values,subtotal , discount,grandTotal})); 
    dispatch(CartItems(cartItems));
    enqueueSnackbar("Login successful!", { variant: "success" });
    setTimeout(() => {
      navigate("/order");
    }, 1000);
    };
    const subtotal = cartItems.reduce((total, item) => total + item.totalPrice, 0);

    // Calculate the discount
    const discount = subtotal > 500 ? subtotal * 0.1 : 0;

    // Calculate the grand total
    const grandTotal = subtotal - discount;
    // Render the Checkout component
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full md:w-3/4 flex flex-wrap">
                <h1 className="text-2xl font-semibold mb-4 text-center w-full">Checkout</h1>


                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    <Form className="flex flex-wrap w-full">

                        <div className="w-full md:w-1/2 p-4 bg-gray-100">
                            <BillingInformation initialValues={initialValues} />
                        </div>


                        <div className="w-full md:w-1/2 pl-4">
                            <div className="bg-gray-200 p-4">
                                <h2 className="text-lg font-semibold mb-2">Cart</h2>
                                {cartItems.length > 0 ? (
                                    <ul>
                                        {cartItems.map((item) => (
                                            <li key={item.id} className="mb-4 p-4 flex items-center border-b border-gray-300">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="w-16 h-16 object-cover mr-4 "
                                                />
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-lg font-semibold">
                                                            {item.title.length > 10 ? `${item.title.substring(0, 10)}...` : item.title}
                                                        </span>
                                                        <button className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center">
                                                            {item.quantity}
                                                        </button>
                                                        <span className="text-xl font-semibold">${item.totalPrice.toFixed(2)}</span>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>Your cart is empty.</p>
                                )}

                                {/* Total amount */}
                                <div className="flex justify-between items-center mt-4">
                                    <span className="text-lg font-semibold">Sub Total:</span>
                                    <span className="text-xl font-semibold flex flex-wrap ">
                                        <img width="30" height="30" src="https://img.icons8.com/fluency/30/rupee.png" alt="rupee" />
                                        {subtotal.toFixed(2)}
                                    </span>
                                </div>
                                <hr />
                                <div className="flex justify-between items-center mt-2 border-b border-gray-300">
                                    <span className="text-lg font-semibold">Discount (10%):</span>
                                    <span className="text-xl font-semibold text-green-500">
                                        -${discount.toFixed(2)}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-lg font-semibold">Grand Total:</span>
                                    <span className="text-xl font-semibold">
                                        ${grandTotal.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                            <div className="bg-gray-200 mt-5 p-4">
                                <PaymentInformation initialValues={initialValues} />
                            </div>
                        </div>



                        <div className="w-full mt-4 flex justify-center">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                            >
                                Place Order
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>


    );
};

export default Checkout;
