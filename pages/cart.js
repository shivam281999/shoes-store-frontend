
"use client";


import React,{useMemo, useState} from 'react'
import Image from "next/image";
import Link from "next/link";
import Wrapper from "@/components/Wrapper";
import CartItem from "@/components/CartItem";
import { useSelector } from "react-redux";
import {loadStripe} from '@stripe/stripe-js';
import { makePaymentRequest } from '@/utils/api';
// import { checkout } from './checkout';
import StripeCheckout from 'react-stripe-checkout';


// const stripePromise = loadStripe(
//     process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
// );
const Cart = () => {
    const[loading,setLoading]=useState(false);
    const {cartItems} = useSelector((state => state.cart))
const subTotal =useMemo(()=>{
return cartItems.reduce((total,val)=> total + val.attributes.price, 0)
},[cartItems]);
// const handlePayment = async () => {
//     try {
//         setLoading(true);
//         const stripe = await stripePromise;
//         const res = await makePaymentRequest("/api/order", {
//             products: cartItems,
//         });
//         await stripe.redirectToCheckout({
//             sessionId: res.stripeSession.id,
//         });
//     } catch (error) {
//         setLoading(false);
//         console.log(error);
//     }
// };

  return (
    <div className='w-full md:py-20'>
    <Wrapper>
    {cartItems.length > 0 && (

        <>
   {/* heading and paragraph  start*/}
   <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
                            <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
                                Shopping Cart
                            </div>
                        </div>

              {/* heading and paragraph  end*/}
              
                        {/* CART CONTENT START */}
                        <div className="flex flex-col lg:flex-row gap-12 py-10">
                            {/* CART ITEMS START */}
                            <div className="flex-[2]">
                                <div className="text-lg font-bold">
                                    Cart Items
                                </div>{cartItems.map((item)=>(
                                    <CartItem key={item.id}  data={item}/>
                                ))}
                            
                                
                                </div>
                                {/* cart item end */}
                                {/* smmary start */}
                                <div className='flex-[1]'>
                                <div className='text-lg font-bold'>Summary</div>

<div className='p-5 my-5 bg-black/[0.05] rounded-xl'>
<div className='flex justify-between'>
    <div className='uppercase text-md md:text-lg font-medium text-black'>SubTotal</div>
    <div className='text-md md:text-lg font-medium text-black'>&#8377; {subTotal}</div>
</div>
<div className="text-sm md:text-md py-5 border-t mt-5">
                                        The subtotal reflects the total price of
                                        your order, including duties and taxes,
                                        before any applicable discounts. It does
                                        not include delivery costs and
                                        international transaction fees.
                                    </div>
</div>


                                {/* BUTTON START */}
                                {/* <button
                                    className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex items-center gap-2 justify-center"  
                                    onClick={handlePayment} 
                                    // onClick={(()=>{
                                    //     checkout({
                                    //         lineItems:[{price:"price_1NtRnjSHgH4HTRrrbB5EpGIZ",quantity:1}]
                                    //     })
                                    // })}
                                
                                >
                                    Checkout
                                    {loading && <img src="/spinner.svg" />}</button>


                                    <button
                                    className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex items-center gap-2 justify-center"  
                                    // onClick={handlePayment} 
                                    onClick={(()=>{
                                        checkout({
                                            lineItems:[{price:"price_1NtRnjSHgH4HTRrrbB5EpGIZ",quantity:1}]
                                        })
                                    })}
                                
                                >
                                    Checkout
                                    {loading && <img src="/spinner.svg" />}</button> */}


<StripeCheckout 
name='shoe store'
// amount={price}
currency='INR'
shippingAddress={true}
billingAddress={true}
zipCode={true}

>

                                    <button
                                    className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex items-center gap-2 justify-center"  
                                    // onClick={handlePayment} 
                                    // onClick={(()=>{
                                    //     checkout({
                                    //         lineItems:[{price:"price_1NtRnjSHgH4HTRrrbB5EpGIZ",quantity:1}]
                                    //     })
                                    // })}
                                
                                >
                                    Checkout
                                    {loading && <img src="/spinner.svg" />}</button>

</StripeCheckout>
                                </div>



                                
                                {/* summary end */}
                                </div>
{/* cart contant end */}
    </>
   
    )}
     
{/* this is empty screen */}{
    cartItems.length <1 &&
<div className="flex-[2] flex flex-col items-center pb-[50px] md:-mt-14">
<Image src="/viratshoes.jpg" width={300} height={300} className='w-[300px] md:w-[400px]' />
<span className="text-xl font-bold">
                            Your cart is empty
                        </span>
                        <span className="text-center mt-4">
                            Looks like you have not added anything in your cart.
                            <br />
                            Go ahead and explore top categories.
                        </span>
                        <Link
                            href="/"
                            className="py-4 px-8 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt-8"
                        >
                            Continue Shopping
                             APNI DUKAAN
                        </Link>     

</div>}

    </Wrapper>
    
    Cart</div>
  )
}

export default Cart