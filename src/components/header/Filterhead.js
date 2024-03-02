import { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { CustomerCart } from "../../requests/adminreq"
import { getApiCall } from "../../requests/requests"
// import { UseSelector } from "'react-redux'"
import { useSelector } from "react-redux"


export function FilterHead({ categories }) {

    const [cartData, setCartData] = useState()
    const [storedData, setStoredData] = useState([])
    const navigate = useNavigate()
    const likedProducts = useSelector(state => { return state?.likedProducts }); // Assuming 'likedProducts' is your slice name
    const CustomerId = useSelector(state => { return state?.login?.user?.Userdata?._id });

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    const toggleDropdown = (event) => {
        event.stopPropagation(); // Prevent event propagation
        setIsOpen(!isOpen);
    };


    useEffect(() => {
        setStoredData(likedProducts.likedProducts)
    }, [likedProducts])

    useEffect(() => {
        getcustomercart()
    }, [])


    async function getcustomercart() {
        const getcart = await getApiCall(`${CustomerCart.getCartById}?id=${CustomerId}`)
        setCartData(getcart?.data);
    }

    console.log("isOpen", isOpen)
    return (
        <>
            <div className="container-fluid bg-dark mb-30">
                <div className="row px-xl-5">

                    <div className="col-lg-3 d-none d-lg-block">
                        <a className="btn d-flex align-items-center justify-content-between bg-primary w-100" onClick={toggleDropdown} style={{ height: "65px", padding: "0 30px", cursor: 'pointer' }}>
                            <h6 className="text-dark m-0"><i className="fa fa-bars mr-2"></i>Categories</h6>
                            <i className={`fa ${isOpen ? 'fa-angle-up' : 'fa-angle-down'} text-dark`}></i>
                        </a>
                        <nav className={`collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 bg-light ${isOpen ? 'show' : ''}`} ref={dropdownRef} style={{ width: "calc(100% - 30px)", zIndex: "999" }}>
                            <div className="navbar-nav w-100">
                                {categories.length !== 0 && categories?.map((cate, index) => <Catemenu ParentCate={cate} setIsOpen={setIsOpen} categories={cate?.SubCategories} key={index} />)}
                            </div>
                        </nav>
                    </div>

                    <div className="col-lg-9">
                        <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
                            <a href="" className="text-decoration-none d-block d-lg-none">
                                <span className="h1 text-uppercase text-dark bg-light px-2">Multi</span>
                                <span className="h1 text-uppercase text-light bg-primary px-2 ml-n1">Shop</span>
                            </a>
                            <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                                <div className="navbar-nav mr-auto py-0" id="navItems">
                                    <Link to="/OpenShop" style={{ color: "rgb(255,211,51)" }}>  <li className="nav-item nav-link">Shop</li>  </Link>
                                    <Link to="/shoppingcart" style={{ color: "rgb(255,211,51)" }}>   <li className="nav-item nav-link">Shopping Cart</li> </Link>
                                    <Link to="/contact" style={{ color: "rgb(255,211,51)" }}>   <li className="nav-item nav-link">Contact</li> </Link>

                                </div>
                                <div className="navbar-nav ml-auto py-0 d-none d-lg-block">
                                    <p onClick={() => { navigate("/liked", { state: { LikedProductsIds: storedData } }) }} className="btn px-0">
                                        <i className="fas fa-heart text-primary"></i>
                                        <span className="badge text-secondary border border-secondary rounded-circle" style={{ paddingBottom: "2px" }}>{storedData.length}</span>
                                    </p>
                                    <p onClick={() => { navigate("/shoppingcart") }} className="btn px-0 ml-3">
                                        <i className="fas fa-shopping-cart text-primary"></i>
                                        <span className="badge text-secondary border border-secondary rounded-circle" style={{ paddingBottom: "2px" }}>{cartData?.items?.length || 0}</span>
                                    </p>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>

        </>
    )
}

function Catemenu({ categories, ParentCate, setIsOpen }) {
    let navigate = useNavigate()
    return (
        categories?.map((subcat, index) => {
            if (subcat?.SubType != undefined) {
                return (
                    <div className="nav-item dropdown dropright" key={index}>
                        <Link className="nav-link dropdown-toggle" data-toggle="dropdown">{subcat?.type}<i className="fa fa-angle-right float-right mt-1"></i></Link>
                        <div className="dropdown-menu position-absolute rounded-0 border-0 m-0">
                            {subcat?.SubType?.map((subT, index) => {
                                return (
                                    <p onClick={() => {
                                        setIsOpen(false)
                                        navigate('/shop', { state: { state1: subT, state2: ParentCate } })
                                    }


                                    } className="dropdown-item" key={index}>{subT?.Name}</p>
                                )
                            })}
                        </div>
                    </div>
                )
            } else {
                return (
                    <p onClick={() => {
                        setIsOpen(false)
                        navigate('/shop', { state: { state1: subcat, state2: ParentCate } })
                    }} key={index} className="nav-item nav-link">{subcat?.type}</p>
                )
            }
        }))
}
