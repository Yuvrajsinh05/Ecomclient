import { useEffect, useState } from "react"
import { getApiCall } from "../../../requests/requests";
import { ProductCalls, dashboardClothing } from "../../../requests/adminreq";
import { Link ,Outlet} from "react-router-dom"

export const Products = () => {

    const [featuredProds, setFeaturedProds] = useState([])
    const [displayFeatd, setDisplayFeatd] = useState([])

    useEffect(() => {
        getFeaturedProducts()
    }, [])

    const getFeaturedProducts = async () => {
        let mens = await getApiCall(dashboardClothing.MensCloth)
        let womens = await getApiCall(dashboardClothing.WomensCloth)
        let kids = await getApiCall(dashboardClothing.Kids)

        console.log("mens..",mens,womens,kids)
        let temp = []
        let displayFeatures = []

        for (var i = 0; i < mens?.data?.length; i++) {
            temp.push(mens?.data[i])
        }
        for (var i = 0; i < womens?.data?.length; i++) {
            temp.push(womens?.data[i])
        }
        for (var i = 0; i < temp?.length; i++) {
            for (var j = 0; displayFeatures?.length < 8; j++) {
                displayFeatures?.push(temp[Math.floor(Math.random() * temp.length)])
            }
        }
        setFeaturedProds(temp)
        setDisplayFeatd(displayFeatures)
    }


    return (
        <>
            <div className="container-fluid pt-5 pb-3">
                <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4"><span className="bg-secondary pr-3">Featured Products</span></h2>
                <div className="row px-xl-5">
                    {displayFeatd.map((fpro, index) => {
                        return(
                        <FeaturedCard fpro={fpro} key={index} />
                        )
                    })}
                </div>
                <Outlet />
            </div>
        </>
    )
}



function FeaturedCard({fpro}) {
    return (
        <>
            <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                <div className="product-item bg-light mb-4">
                    <div className="product-img position-relative overflow-hidden">
                        <img style={{height:"280px"}} className="img-fluid w-100" src={fpro?.image} alt="" />
                        <div className="product-action">
                            <Link className="btn btn-outline-dark btn-square" to={`/shopdetail/${fpro?._id}`}><i className="fa fa-shopping-cart"></i></Link>
                            <Link className="btn btn-outline-dark btn-square" href=""><i className="far fa-heart"></i></Link>
                            <Link className="btn btn-outline-dark btn-square" href=""><i className="fa fa-sync-alt"></i></Link>
                            <Link className="btn btn-outline-dark btn-square" href=""><i className="fa fa-search"></i></Link>
                        </div>
                    </div>
                    <div className="text-center py-4">
                        <Link className="h6 text-decoration-none text-truncate" href="">{fpro?.model}</Link>
                        <div className="d-flex align-items-center justify-content-center mt-2">
                            <h5>{"₹"+ fpro?.price}</h5><h6 className="text-muted ml-2"><del>$123.00</del></h6>
                        </div>
                        <div className="d-flex align-items-center justify-content-center mb-1">
                            <small className="fa fa-star text-primary mr-1"></small>
                            <small className="fa fa-star text-primary mr-1"></small>
                            <small className="fa fa-star text-primary mr-1"></small>
                            <small className="fa fa-star text-primary mr-1"></small>
                            <small className="fa fa-star text-primary mr-1"></small>
                            <small>(99)</small>
                        </div>
                    </div>
                </div>
            </div>
            
            </>
    )
}