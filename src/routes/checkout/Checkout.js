import React from 'react'
import Billingaddrs from './Billingaddrs'
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

function Checkout() {
  const navigate = useNavigate
  useEffect(()=>{
    if(!window.localStorage.ecomtoken){
      navigate('/')
    }
},[])
  return (
    <>
     
    <div className="container-fluid">
        <div className="row px-xl-5">
            <div className="col-12">
                <nav className="breadcrumb bg-light mb-30">
                    <Link className="breadcrumb-item text-dark" href="#">Home</Link>
                    <Link className="breadcrumb-item text-dark" href="#">Shop</Link>
                    <span className="breadcrumb-item active">Checkout</span>
                </nav>
            </div>
        </div>
    </div>
   <Billingaddrs/>
   
    </>
  )
}

export default Checkout
