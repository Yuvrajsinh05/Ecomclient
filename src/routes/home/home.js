import Carousel from "./carousel/carousel";
import Featured from "./feature/featured";
import { CategoriesComp } from "./categories/categories";
import { Products } from "./products/Products";
import { Offer } from "./offer/offer";
import { Vendor } from "./vendor/vendor";
import { Header } from "../../components/header/header";
import {} from "./style.css"
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Home (){

  const navigate =useNavigate();

  useEffect(()=>{
       if(!window.localStorage.ecomtoken){
        navigate('/')
       }
  },[])
  console.log("home component")
    return(
        <>
        <Header/>
        <div >
          <Carousel/>
          <Featured/>
          <CategoriesComp/>
          <Products/>
          <Offer/>
          <Products/> 
          <Link to="#" className="btn btn-primary back-to-top"><i className="fa fa-angle-double-up"></i></Link>
          </div>
        </>
    )
}