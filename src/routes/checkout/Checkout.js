import React from "react"
import Billingaddrs from "./Billingaddrs"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function Checkout() {
  const location = useLocation()
  const isAuthenticated = useSelector(state => state.login.isAuthenticated);
  const navigate = useNavigate()
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/")
    }
  }, [])

  
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
      <Billingaddrs amount={location?.state?.Amount} />

    </>
  )
}

export default Checkout
