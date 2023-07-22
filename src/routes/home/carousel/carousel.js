import { useEffect, useState } from "react"
import { Images } from "../../../assets/images"
import { HomeCorousel } from "../../../requests/adminreq"
import { getApiCall } from "../../../requests/requests"
import { Link } from "react-router-dom"
// import pornnhub from "pornnhub";

export default function Carousel() {
 
    const [sliders , setSliders]= useState([])

    useEffect(()=>{
        getslider()
    },[])

    const getslider=async()=>{
        let res = await getApiCall(HomeCorousel.getHomecorousel)
        setSliders(res)
    }
 
    return (
        <>
            <div className="container-fluid mb-3">
                <div className="row px-xl-5">
                    <div className="col-lg-8">
                        <div id="header-carousel" className="carousel slide carousel-fade mb-30 mb-lg-0" data-ride="carousel">
                            <ol className="carousel-indicators">
                                <li data-target="#header-carousel" data-slide-to="0" className="active"></li>
                                <li data-target="#header-carousel" data-slide-to="1"></li>
                                <li data-target="#header-carousel" data-slide-to="2"></li>
                            </ol>
                          
                            <div className="carousel-inner">
                                <div className="carousel-item position-relative active" style={{ height: "430px" }}>
                                    <img className="position-absolute w-100 h-100" src={sliders[0]?.imageUrl|| Images.carousel_1} style={{ objectFit: "cover" }} />
                                    <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                        <div className="p-3" style={{ maxWidth: "700px" }}>
                                            <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">{sliders[0]?.category}</h1>
                                            <p className="mx-md-5 px-5 animate__animated animate__bounceIn">{sliders[0]?.description}</p>
                                            <Link className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp" to={'/shop?%20Women%27s%20Clothing'}>Shop Now</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="carousel-item position-relative" style={{ height: "430px" }}>
                                    <img className="position-absolute w-100 h-100" src={sliders[1]?.imageUrl|| Images.carousel_2}  style={{ objectFit: "cover" }} />
                                    <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                        <div className="p-3" style={{ maxWidth: "700px" }}>
                                            <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">{sliders[1]?.category}</h1>
                                            <p className="mx-md-5 px-5 animate__animated animate__bounceIn">{sliders[1]?.description}</p>
                                            <Link className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp" to={'/shop?%20Men%27s%20Clothing'}>Shop Now</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="carousel-item position-relative" style={{ height: "430px" }}>
                                    <img className="position-absolute w-100 h-100" src={sliders[2]?.imageUrl|| Images.carousel_3}  style={{ objectFit: "cover" }} />
                                    <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                        <div className="p-3" style={{ maxWidth: "700px" }}>
                                            <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">{sliders[2]?.category}</h1>
                                            <p className="mx-md-5 px-5 animate__animated animate__bounceIn">{sliders[2]?.description}</p>
                                            <Link className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp" to={'/shop?%20Children%27s%20Clothing'}>Shop Now</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="product-offer mb-30" style={{ height: "200px" }}>
                            <img className="img-fluid" src={Images.offer_1} alt="" />
                            <div className="offer-text">
                                <h6 className="text-white text-uppercase">Save 20%</h6>
                                <h3 className="text-white mb-3">Special Offer</h3>
                                <Link to="" className="btn btn-primary">Shop Now</Link>
                            </div>
                        </div>
                        <div className="product-offer mb-30" style={{ height: "200px" }}>
                            <img className="img-fluid"  src={Images.offer_2}alt="" />
                            <div className="offer-text">
                                <h6 className="text-white text-uppercase">Save 20%</h6>
                                <h3 className="text-white mb-3">Special Offer</h3>
                                <Link to="" className="btn btn-primary">Shop Now</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}