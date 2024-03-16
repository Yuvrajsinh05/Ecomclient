import { useEffect, useState } from "react"
import { getApiCall } from "../../../requests/requests";
import { ProductCalls, dashboardClothing } from "../../../requests/adminreq";
import { Link ,Outlet} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import styles from "./openshop.module.css"
import { likeProductAsync } from "../../../fetures/likedProductsSlice";

export const Products = () => {

    const [featuredProds, setFeaturedProds] = useState([])
    const [displayFeatd, setDisplayFeatd] = useState([])

    useEffect(() => {
        getFeaturedProducts()
    }, [])

    const getFeaturedProducts = async () => {
        let mens = await getApiCall(dashboardClothing.MensCloth);
        let womens = await getApiCall(dashboardClothing.WomensCloth);
        let kids = await getApiCall(dashboardClothing.Kids);
    
        let temp = [];
        let displayFeatures = [];
    
        for (var i = 0; i < mens?.data?.length; i++) {
            temp.push(mens?.data[i]);
        }
        for (var i = 0; i < womens?.data?.length; i++) {
            temp.push(womens?.data[i]);
        }
        temp = temp.sort(() => Math.random() - 0.5);

        // Ensure uniqueness while selecting the first 8 elements
        displayFeatures = Array?.from(new Set(temp))?.slice(0, 12);
    
        setFeaturedProds(temp);
        setDisplayFeatd(displayFeatures);
    };
    


    return (
        <>
            <div className="container-fluid pt-5 pb-3">
                <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4"><span className="bg-secondary pr-3">Featured Products</span></h2>
                <div className="row px-xl-5">
                    {displayFeatd?.map((fpro, index) => {
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

    let dispatch = useDispatch()
    const CustomerId = useSelector(state => { return state?.login?.user?.Userdata?._id});
    const handleLikeProduct = async () => {
        try {
          await dispatch(likeProductAsync(fpro._id , [] ,CustomerId));
        } catch (error) {
          console.error('Error liking product:', error);
          // Handle errors or display an error message
        }
      };
    return (
        <>
              <div style={{height:'320px'}} className={styles.product_container} >
                <div className="product-item bg-light mb-4">
                    <div className="product-img position-relative overflow-hidden">
                        <img style={{height:"200px"}} className="img-fluid w-100" src={fpro?.image} alt="" />
                        <div className="product-action">
                            <Link className="btn btn-outline-dark btn-square" to={`/shopdetail/${fpro?._id}`}><i className="fa fa-shopping-cart"></i></Link>
                            <Link className="btn btn-outline-dark btn-square"  onClick={handleLikeProduct}><i className="far fa-heart"></i></Link>
                            {/* <Link className="btn btn-outline-dark btn-square" href=""><i className="fa fa-sync-alt"></i></Link> */}
                            {/* <Link className="btn btn-outline-dark btn-square" href=""><i className="fa fa-search"></i></Link> */}
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