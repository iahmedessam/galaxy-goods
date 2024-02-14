import React from 'react'
import styles from './Cart.module.css'
import { useNavigate } from 'react-router-dom'

export default function Cart() {

    const navigation = useNavigate() //Navigation

    return <>
        <div className="container mx-auto mt-6">
            <button
                className='btn'
                onClick={() => navigation('/checkout')}
            >
                Porceed to Checkout
            </button>
        </div>
    </>
}