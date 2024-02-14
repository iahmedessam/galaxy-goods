import React from 'react'
import styles from './Counter.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { increment } from '../../Redux/counterSlice'

export default function Counter() {

    //Redux Counter
    const counter = useSelector((state) => state.counter)
    const dispatch = useDispatch()

    return <>
        <p>{counter}</p>
        <input type="button" value='increment' onClick={() => dispatch(increment())} />
    </>
}
