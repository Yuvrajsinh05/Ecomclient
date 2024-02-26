import Carousel from "./carousel/carousel";
import Featured from "./feature/featured";
import { CategoriesComp } from "./categories/categories";
import { Products } from "./products/Products";
import { Offer } from "./offer/offer";
import { Vendor } from "./vendor/vendor";
import { Header } from "../../components/header/header";
import  Footer  from "../../components/footer/Footer"
import { } from "./style.css"
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const isAuthenticated = useSelector(state => state.login.isAuthenticated);
  const isAuthenticated2 = (state =>  console.log("stateOFRedux",state));
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/')
    }
  }, [])

  
  return (
    <>
      {/* <Header /> */}
      <div >
        <Carousel />
        <Featured />
        <CategoriesComp />
        <Products />
        {/* <Offer /> */}
        {/* <Products /> */}
        <Link onClick={() => {
          window.scrollTo(0, 0)
        }} className="btn btn-primary back-to-top"><i className="fa fa-angle-double-up"></i></Link>
      </div>
      <Footer />
    </>
  )
}