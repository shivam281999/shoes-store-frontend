import ProductDetailsCrousel from '@/components/ProductDetailsCrousel'
import Wrapper from '@/components/Wrapper'
import ReactMarkdown from "react-markdown";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import React,{useState} from 'react'
import RelatedProducts from '@/components/RelatedProducts';
import { useSelector, useDispatch } from 'react-redux'

import { fetchDataFromApi } from '@/utils/api';
import { addToCart } from '@/store/cartSlice';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { getDiscountedPricePercentage } from "@/utils/helper";

// import { useState } from 'react';

fetchDataFromApi
ProductDetailsCrousel
Wrapper
const ProductDetails = ({product,products}) => {
    const [selectedSize,setSelectedSize] = useState()
    const [showError,setShowError]=useState(false)
    const dispatch = useDispatch()

    const p = product?.data?.[0]?.attributes;

    const notify =() =>{
        toast.success('Success. Check your cart!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
    }

  return (
    <div className='w-full md:py-20'>
    <ToastContainer/>
<Wrapper><div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
{/* left colum start */}
<div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
    <ProductDetailsCrousel images={p.image.data}/>
</div>
{/* left column end */}
{/* right column start */}
<div className="flex-[1] py-3">
{/* product title */}
<div className="text-[34px] font-semibold mb-2 leading-tight">
    {p.name}
</div>
{/* product subtitle */}
<div className='text-lg font-semibold mb-5'>
    {p.subtitle}
</div>
{/* product price */}
<div className="flex items-center">
                            <p className="mr-2 text-lg font-semibold">
                                MRP : &#8377;{p.price}
                            </p>
                            {p.original_price && (
                                <>
                                    <p className="text-base  font-medium line-through">
                                        &#8377;{p.original_price}
                                    </p>
                                    {/* <p className="ml-auto text-base font-medium text-green-500">
                                        {getDiscountedPricePercentage(
                                            p.original_price,
                                            p.price
                                        )}
                                        % off
                                    </p> */}
                                </>
                            )}
                        </div>
<div className='text-md font-medium text-black/[0.5]'>
include all taxes

</div>
<div className='text-md font-medium text-black/[0.5] mb-20'>

{`(Also include all aplicable duties)`}
</div>
{/* product size range */}
<div className='mb-10'>
{/* Heading start */}

    <div className='flex justify-between mb-2'>
<div className='text-md font-semibold'>Select size</div>
<div className='text-md font'>Select guid</div>

    </div>
    {/* Heading end */}
    {/* size start */}
    <div id="sizeGrid" className='grid grid-cols-3 gap-2'>
    {p.size.data.map((item,i)=>(
        
        <div key={i}    className={`border rounded-md text-center py-3 font-medium ${
                                            item.enabled
                                                ? "hover:border-black cursor-pointer"
                                                : "cursor-not-allowed bg-black/[0.1] opacity-50"
                                        } ${
                                            selectedSize === item.size
                                                ? "border-black"
                                                : ""
                                        }`}
                                          onClick={() => {
                                            setSelectedSize(item.size);
                                            setShowError(true);
                                        }}
                                        >
    {item.size}</div>
    ))}

{/* <div className='border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer'>
    Uk 6
</div>
<div className='border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer'>
    Uk 6
</div>
<div className='border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer'>
    Uk 6
</div>
<div className='border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer'>
    Uk 6
</div>
<div className='border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer'>
    Uk 6
</div>
<div className='border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer'>
    Uk 6
</div>
<div className='border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer'>
    Uk 6
</div>

<div className='border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer'>
    Uk 6
</div>
<div className='border rounded-md text-center py-3 font-medium cursor-not-allowed bg-black/[0.1] opacity-50'>
    Uk 6
</div> */}
    </div>
    {/* size end */}
{/* show error start */}
{showError &&

<div className="text-red-600 mt-1">
                                    Size selection is required
                                </div>
}
                                {/* show error end */}

</div>
{/* product size range end */}
{/* add to cart button start */}
<button
            className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
                            onClick={() => {
                                if (!selectedSize) {
                                    setShowError(true);
                                    document
                                        .getElementById("sizesGrid")
                                        .scrollIntoView({
                                            block: "center",
                                            behavior: "smooth",
                                        });
                                } else {
                                    dispatch(
                                        addToCart({
                                            ...product?.data?.[0],
                                            selectedSize,
                                            oneQuantityPrice: p.price,
                                        })
                                    );
                                    notify();
                                }
                            }}
        >
                                Add to Cart
                            </button>
                            {/* add to button end */}
                            {/* wishlist button start */}
                            <button className="w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 mb-10">
                            Whishlist</button>

                            {/* wishlist button end */}
                            <div>
<div className='text-lg font-bold mb-5'>PRODUCT DETAILS</div>
<div className='markdown text-md mb-5'>
<ReactMarkdown>

{p.description}
</ReactMarkdown></div>
</div> 
{/* <div className='text-md mb-5'>executed product detail pages are one of the best ways to avoid returns, abandoned carts, and customer dissatisfaction. This is partially because purchasing errors are greatly reduced when every product detail is easy to find. However, this is only possible if you ensure all information, pricing, and product images are 100% accurate</div> */}

</div>

{/* right column end */}
</div>
<RelatedProducts products={products}/>
</Wrapper>

    </div>
  )
}

export default ProductDetails


export async function getStaticPaths() {
    const products = await fetchDataFromApi("/api/products?populate=*");
    const paths = products?.data?.map((p) => ({
        params: {
            slug: p.attributes.slug,
        },
    }));
    return {
        paths,
        fallback: false,
    };
}


export async function getStaticProps({ params: { slug } }) {
    const product = await fetchDataFromApi(
        `/api/products?populate=*&filters[slug][$eq]=${slug}`
    );
    const products = await fetchDataFromApi(
        `/api/products?populate=*&[filters][slug][$ne]=${slug}`
    );

    return {
        props: {
            product,
            products,
        },
    };
}

        
    