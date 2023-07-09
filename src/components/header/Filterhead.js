import { Link } from "react-router-dom"


export function FilterHead({ categories }) {
    return (
        <>
            <div className="container-fluid bg-dark mb-30">
                <div className="row px-xl-5">

                    <div className="col-lg-3 d-none d-lg-block">
                        <a className="btn d-flex align-items-center justify-content-between bg-primary w-100" data-toggle="collapse" href="#navbar-vertical" style={{ height: "65px", padding: "0 30px" }}>
                            <h6 className="text-dark m-0"><i className="fa fa-bars mr-2"></i>Categories</h6>
                            <i className="fa fa-angle-down text-dark"></i>
                        </a>
                        <nav className="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 bg-light" id="navbar-vertical" style={{ width: "calc(100% - 30px)", zIndex: "999" }}>
                            <div className="navbar-nav w-100">
                                {categories.map((cate, index) => { return <Catemenu categories={cate?.SubCategories} key={index} /> })}
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
                                    <Link to="/" style={{ color: "rgb(245,245,245)" }}>  <li className="nav-item nav-link active">Home</li> </Link>
                                    <Link to="/shop" style={{ color: "rgb(255,211,51)" }}>  <li className="nav-item nav-link">Shop</li>  </Link>
                                    <Link to="/shopdetail" style={{ color: "rgb(255,211,51)" }}> <li className="nav-item nav-link ">Shop Detail</li> </Link>
                                    <div className="nav-item dropdown">
                                        <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" style={{ color: "rgb(245,245,245)" }}>Pages <i className="fa fa-angle-down mt-1"></i></a>
                                        <div className="dropdown-menu bg-primary rounded-0 border-0 m-0">
                                            <Link to="/shoppingcart" >   <li className="dropdown-item" >Shopping Cart</li> </Link>
                                            <Link to="/checkout">  <li className="dropdown-item">Checkout</li>  </Link>
                                        </div>
                                    </div>
                                    <Link to="/contact" style={{ color: "rgb(255,211,51)" }}>   <li className="nav-item nav-link">Contact</li> </Link>

                                </div>
                                <div className="navbar-nav ml-auto py-0 d-none d-lg-block">
                                    <a href="" className="btn px-0">
                                        <i className="fas fa-heart text-primary"></i>
                                        <span className="badge text-secondary border border-secondary rounded-circle" style={{ paddingBottom: "2px" }}>0</span>
                                    </a>
                                    <a href="" className="btn px-0 ml-3">
                                        <i className="fas fa-shopping-cart text-primary"></i>
                                        <span className="badge text-secondary border border-secondary rounded-circle" style={{ paddingBottom: "2px" }}>0</span>
                                    </a>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>

        </>
    )
}

function Catemenu({ categories }) {
    return (
        categories.map((subcat, index) => {
            if (subcat?.SubType != undefined) {
                return (
                    <div className="nav-item dropdown dropright" key={index}>
                        <Link className="nav-link dropdown-toggle" data-toggle="dropdown">{subcat?.type}<i className="fa fa-angle-right float-right mt-1"></i></Link>
                        <div className="dropdown-menu position-absolute rounded-0 border-0 m-0">
                            {subcat.SubType.map((subT, index) => {
                                return (
                                    <Link to={`/shop? ${subT?.Name}`} className="dropdown-item" key={index}>{subT?.Name}</Link>
                                )
                            })}
                        </div>
                    </div>
                )
            } else {
                return (
                    <Link to={`/shop?${subcat?.type}`} key={index} className="nav-item nav-link">{subcat?.type}</Link>
                )
            }
        }))
}
