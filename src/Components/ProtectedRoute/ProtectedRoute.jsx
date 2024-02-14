import React from 'react'
import styles from './ProtectedRoute.module.css'
import { useSelector } from 'react-redux'
import Login from '../Login/Login'

export default function ProtectedRoute(props) {

    const token = useSelector((state) => state.token.token) //Redux Token

    return <>
        {token === null ? <Login></Login> : props.children}
    </>
}
