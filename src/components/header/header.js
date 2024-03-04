// import {} from "./style.css"
import { useEffect, useState } from "react"
import { getApiCall } from "../../requests/requests"
import { FilterHead } from "./Filterhead"
import { Link, useNavigate } from 'react-router-dom';
import { Categories } from '../../requests/adminreq'
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../routes/login/loginSlice";
import styles from "./header.module.css"

export const Header = () => {

    const [categories, setCategories] = useState([])
    const location = useLocation()


    useEffect(() => {
        getCategories()
    }, [])

    const getCategories = async () => {
        let res = await getApiCall(Categories.getAllcategories)
        if (Array?.isArray(res)) {
            setCategories(res)
        }
    }

    return (

        <>
            {location.pathname !== '/' && (
                <>
                    <ConfigHead />
                    <FilterHead categories={categories} />

                </>
            )}
        </>
    )
}

export function ConfigHead() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userName = useSelector(state => state?.login?.user?.Userdata?.Name)

    return (
        <>
            <div className="container-fluid">
                <div className="row bg-secondary py-1 px-xl-5">
                    <div className="col-lg-9 d-none d-lg-block">
                        <div className=" h-100 ">
                            <div class={styles.header}>
                                <div class={styles.scrolling_text}>As a developer, I am actively engaged in the enhancement of this platform. Please note that this environment is intended solely for educational purposes. Continuous learning is integral to our journey, as we strive to achieve excellence and innovation ThankYou! 😊</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3  text-center text-lg-right">
                        <div className="d-inline-flex align-items-center">
                            <div className="btn-group">
                                <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">My Account</button>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <button className="dropdown-item" onClick={() => navigate('/profile')} type="button">My Profile</button>
                                    <button className="dropdown-item" onClick={() => dispatch(logout(), navigate('/'))} type="button">Log Out</button>
                                </div>
                            </div>
                        </div>
                        <div className="d-inline-flex align-items-center d-block d-lg-none">
                            <Link to="/" className="btn px-0 ml-2">
                                <i className="fas fa-heart text-dark"></i>
                                <span className="badge text-dark border border-dark rounded-circle" style={{ paddingBottom: "2px" }}>0</span>
                            </Link>
                            <Link to="/" className="btn px-0 ml-2">
                                <i className="fas fa-shopping-cart text-dark"></i>
                                <span className="badge text-dark border border-dark rounded-circle" style={{ paddingBottom: "2px" }}>0</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="row align-items-center bg-light py-3 px-xl-5 d-none d-lg-flex">
                    <div className="col-lg-4">
                        <Link to="/dashboard" className="text-decoration-none">
                            <span className="h1 text-uppercase text-primary bg-dark px-2">Multi</span>
                            <span className="h1 text-uppercase text-dark bg-primary px-2 ml-n1">Shop</span>
                        </Link>
                    </div>
                    <div className="col-lg-4 col-6 text-left">
                        <form action="">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Search for products" />
                                <div className="input-group-append">
                                    <span className="input-group-text bg-transparent text-primary">
                                        <i className="fa fa-search"></i>
                                    </span>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-4 col-6 text-right">
                 <p className="m-0">Hey ,<b>{userName}</b></p>
                    </div>
                </div>
            </div>
        </>
    )
}


