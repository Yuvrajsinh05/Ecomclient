import { Images } from "../../../assets/images";
import { Link } from "react-router-dom"

export const Offer=()=>{
    return(
        <>
            <div className="container-fluid pt-5 pb-3">
        <div className="row px-xl-5">
            <div className="col-md-6">
                <div className="product-offer mb-30" style={{height: "300px"}}>
                    <img className="img-fluid" src={Images.offer_1} alt=""/>
                    <div className="offer-text">
                        <h6 className="text-white text-uppercase">Save 20%</h6>
                        <h3 className="text-white mb-3">Special Offer</h3>
                        <Link href="" className="btn btn-primary">Shop Now</Link>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="product-offer mb-30" style={{height: "300px"}}>
                    <img className="img-fluid" src={Images.offer_2} alt=""/>
                    <div className="offer-text">
                        <h6 className="text-white text-uppercase">Save 20%</h6>
                        <h3 className="text-white mb-3">Special Offer</h3>
                        <Link href="" className="btn btn-primary">Shop Now</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
        </>
    )
}