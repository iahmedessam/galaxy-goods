import React, { useEffect, useState } from 'react'
import styles from './Home.module.css'
import { getUserData } from '../../Redux/TokenSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../Redux/getProducts';
import { useNavigate } from 'react-router-dom';

export default function Home() {

    //Redux Products
    const products = useSelector(state => state.products.products);
    const dispatch = useDispatch();

    const navigate = useNavigate(); //Navigation

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(getUserData()); //Check for token
        dispatch(getProducts()).then(() => setLoading(false)); //Get products api after mounting
    }, [dispatch]);


    return (
        <>{loading ? <p>Loading...</p>
            :
            <div className='sm:container mx-auto mt-4'>

          
                <div className="grid grid-cols-5 gap-6  ">
                    {products.map(product => (
                        <div key={product.id} className='border border-md shadow-lg'>
                            <img src={product.imageCover} alt="" loading='lazy' />
                            <p className='truncate dark:text-white px-2'>{product.title}</p>
                            <p className='dark:text-white px-2'>£{product.price}</p>
                            <button className='btn' onClick={() => navigate(`productdetails/${product.id}`)}>Product</button>
                        </div>
                    ))}
                </div>
            </div>
        }
        </>
    )
}
