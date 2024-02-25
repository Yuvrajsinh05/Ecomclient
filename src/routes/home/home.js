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
  const isAuthenticated2 = useSelector(state =>  console.log("stateOFRedux",state));
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/')
    }
  }, [])

  
  const no = {
    "login": {
        "user": {
            "userID": "65584a13f6659d9c16282aeb",
            "iat": 1708849737,
            "exp": 1708936137
        },
        "isAuthenticated": true
    },
    "likedProducts": {
        "likedProducts": [
            "641436714ec4aae457053b00",
            "640a1935bbef8a68de72edce",
            "640a1935bbef8a68de72edcd",
            "64bbafc909e88f3991861e10",
            "64bbafc909e88f3991861e12",
            "641436714ec4aae457053afd",
            "64bbafc909e88f3991861e14",
            "641436714ec4aae457053b06",
            "64bbafc909e88f3991861e1d",
            "64bbafc909e88f3991861e0c",
            "64bbafc909e88f3991861e0f",
            "64bbafc909e88f3991861e07",
            "640a1935bbef8a68de72edc7"
        ]
    }
}

  const check ={
    "login": {
        "user": {
            "status": 200,
            "message": "Authentication successful!",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NTU4NGExM2Y2NjU5ZDljMTYyODJhZWIiLCJpYXQiOjE3MDg4NDk3MzcsImV4cCI6MTcwODkzNjEzN30.Z88fpB8AVx1gk0lpGxbG26AsXrZWMsz6AvrBKDzFxjg",
            "user": {
                "name": "yuvrajsinh",
                "email": "yuvrajsinh73598@gmail.com",
                "_id": "65584a13f6659d9c16282aeb",
                "savedProducts": [
                    "641436714ec4aae457053b00",
                    "640a1935bbef8a68de72edce",
                    "640a1935bbef8a68de72edcd",
                    "64bbafc909e88f3991861e10",
                    "64bbafc909e88f3991861e12",
                    "641436714ec4aae457053afd",
                    "64bbafc909e88f3991861e14",
                    "641436714ec4aae457053b06",
                    "64bbafc909e88f3991861e1d",
                    "64bbafc909e88f3991861e0c",
                    "64bbafc909e88f3991861e0f",
                    "64bbafc909e88f3991861e07",
                    "640a1935bbef8a68de72edc7"
                ]
            }
        },
        "isAuthenticated": true
    },
    "likedProducts": {
        "likedProducts": [
            "641436714ec4aae457053b00",
            "640a1935bbef8a68de72edce",
            "640a1935bbef8a68de72edcd",
            "64bbafc909e88f3991861e10",
            "64bbafc909e88f3991861e12",
            "641436714ec4aae457053afd",
            "64bbafc909e88f3991861e14",
            "641436714ec4aae457053b06",
            "64bbafc909e88f3991861e1d",
            "64bbafc909e88f3991861e0c",
            "64bbafc909e88f3991861e0f",
            "64bbafc909e88f3991861e07",
            "640a1935bbef8a68de72edc7"
        ]
    }
}
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