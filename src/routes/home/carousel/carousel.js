import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Images } from "../../../assets/images";
import { HomeCorousel } from "../../../requests/adminreq";
import { getApiCall } from "../../../requests/requests";

export default function Carousel() {
    const [sliders, setSliders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getSlider();
    }, []);

    const getSlider = async () => {
        try {
            const res = await getApiCall(HomeCorousel.getHomecorousel);
            setSliders(res);
        } catch (error) {
            console.error("Error fetching sliders: ", error);
        }
    };

    return (
        <div className="container-fluid mb-3">
            <div className="row px-xl-5">
                <div className="col-lg-8">
                    <div id="header-carousel" className="carousel slide carousel-fade mb-30 mb-lg-0" data-ride="carousel">
                        <ol className="carousel-indicators">
                            {sliders.map((slider, index) => (
                                <li key={index} data-target="#header-carousel" data-slide-to={index} className={index === 0 ? "active" : ""}></li>
                            ))}
                        </ol>
                        <div className="carousel-inner">
                            {sliders.map((slider, index) => (
                                <div key={index} className={`carousel-item position-relative ${index === 0 ? "active" : ""}`} style={{ height: "430px" }}>
                                    <img className="position-absolute w-100 h-100" src={slider.imageUrl || Images.carousel_1} alt={`Carousel Image ${index}`} style={{ objectFit: "cover" }} />
                                    <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                        <div className="p-3" style={{ maxWidth: "700px" }}>
                                            <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">{slider.Name}</h1>
                                            <p className="mx-md-5 px-5 animate__animated animate__bounceIn">{slider.description}</p>
                                            <p className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp" onClick={() => navigate('/OpenShop', { state: slider.Name })}>Shop Now</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    {sliders.slice(0, 2).map((offer, index) => (
                        <div key={index} className="product-offer mb-30" style={{ height: "200px" }}>
                            <img className="img-fluid" src={index === 0 ? Images.offer_1 : Images.offer_2} alt={`Offer Image ${index}`} />
                            <div className="offer-text">
                                <h6 className="text-white text-uppercase">Save 20%</h6>
                                <h3 className="text-white mb-3">Special Offer</h3>
                                <Link to="" className="btn btn-primary">Shop Now</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
