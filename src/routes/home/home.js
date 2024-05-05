import React from "react";
import Carousel from "./carousel/carousel";
import Featured from "./feature/featured";
import { CategoriesComp } from "./categories/categories";
import { Products } from "./products/Products";
import { } from "./style.css"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const isAuthenticated = useSelector(state => state.login.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/")
    }
  }, [])


  return (
    <>
      {isAuthenticated && <div >
        <Carousel />
        <Featured />
        <CategoriesComp />
        <Products />
        <Link onClick={() => {
          window.scrollTo(0, 0)
        }} className="btn btn-primary back-to-top"><i className="fa fa-angle-double-up"></i></Link>
      </div>}

    </>
  )
}