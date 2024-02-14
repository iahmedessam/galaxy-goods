// ProductDetails.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductDetails } from '../../Redux/productDetailsSlice';
import { decrement, increment } from '../../Redux/counterSlice';

export function ProductDetails() {

    //Redux product details & counter
    const productDetails = useSelector(state => state.productDetails.productDetails);
    const images = useSelector(state => state.productDetails.images);
    const imagesLength = useSelector(state => state.productDetails.imagesLength);
    const counter = useSelector(state => state.counter);
    const dispatch = useDispatch();

    const { productId } = useParams();

    const [loading, setLoading] = useState(true);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        dispatch(getProductDetails(productId))
            .then(() => {
                setLoading(false)
            });
    }, [dispatch, productId]);

    function next() {
        setCurrentImageIndex((prevImg) => (prevImg + 1) % images.length);
    };
    function back() {
        setCurrentImageIndex((prevImg) => (prevImg - 1 + images.length) % images.length);
    };

    return (
        <>
            {loading ?
                <p>Loading...</p>
                :
                <div className='my-4 sm:container mx-auto sm:grid grid-cols-2  '>
                    
                    <div className='w-80 flex items-start justify-center m-auto relative'>
                        {/* Arrows slider */}
                        <div><button onClick={next} className='arrowRight start-full bottom-1/2'></button></div>
                        <div><button onClick={back} className='arrowLeft end-full bottom-1/2'></button></div>
                        {/* Images */}
                        <img src={images[currentImageIndex]} alt="" />
                        {/* Images navigation */}
                        <div className='absolute flex top-96'>
                            {(() => {
                                const elements = [];
                                for (let i = 0; i < imagesLength; i++) {
                                    elements.push(
                                        <div key={i} className={`w-2 h-2 bg-black m-1 rounded-full ${currentImageIndex === i ? 'bg-blue-500' : 'opacity-30'}`}></div>
                                    );
                                }
                                return elements;
                            })()}
                        </div>
                    </div>
                    
                    <div className='w-fit flex flex-wrap flex-col justify-center p-6 '>
                        <div>
                            <h2 className='mb-3 text-3xl font-semibold'>{productDetails.title}</h2>
                            <p className='mb-3 opacity-75 pr-4'>{productDetails.description}</p>
                        </div>

                        <div className='mb-5 flex justify-between'>
                            <p className='text-2xl font-semibold'>{productDetails.price}<span className='font-normal opacity-75'> EGP</span></p>
                        </div>

                        <div className='flex items-center'>
                            {/* Counter buttons */}
                            <div className='flex items-center'>
                                <button type='button' onClick={() => dispatch(increment())} className='font-bold bg-gray-100 py-2.5 px-4 mr-2'>+</button>
                                <p className='bg-gray-100 p-2.5 px-4 mr-2'>{counter}</p>
                                {counter <= 0 ?
                                    <button type='button' disabled onClick={() => dispatch(decrement())} className='font-bold bg-gray-100 py-2.5 px-4 mr-2'>-</button>
                                    :
                                    <button type='button' onClick={() => dispatch(decrement())} className='font-bold bg-gray-100 py-2.5 px-4 mr-2'>-</button>
                                }
                            </div>
                            {/* Add to cart button */}
                            <button type='button' className='group xs:w-full sm:w-auto text-white p-2 bg-orange-500 hover:bg-white hover:text-black'>
                                <svg fill="none" viewBox="0 0 24 24" strokeidth="1.5" stroke="currentColor" className="mb-1 mr-2 h-6 w-6 inline text-center hover:text-black ">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                </svg>
                                Add to cart&nbsp;&nbsp;
                            </button>
                        </div>

                    </div>
                </div>
            }
        </>
    );
};

export default ProductDetails;
