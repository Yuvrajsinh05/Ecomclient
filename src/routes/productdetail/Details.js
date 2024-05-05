import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { getApiCall, postApiCall } from "../../requests/requests";
import { useNavigate } from "react-router-dom";
import { CustomerCart, ProdcutsWrtCate } from "../../requests/adminreq";
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import styles from "./details.module.css"
import { fetchUserFromStorage } from "../login/loginSlice";

function Details() {
  const isAuthenticated = useSelector(state => state.login.isAuthenticated);
  const CustomerId = useSelector(state => { return state?.login?.user?.Userdata?._id });
  const { productId } = useParams();
  const [proDetail, setProDetail] = useState([])
  const [counter, setCounter] = useState(1)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    getProdDetail()
  }, [])

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/")
    }
  }, [])

  const getProdDetail = async () => {
    let res = await getApiCall(`${ProdcutsWrtCate.getProductDetailById}/${productId}`)
    setProDetail(res?.data[0])
  }

  async function handlecartmenu(e) {
    e.preventDefault();
    let data = {
      product_id: productId,
      product_name: proDetail?.name,
      quantity: counter,
      price: proDetail?.price,
      Prodcategory: proDetail?.category,
      Prodtype: proDetail?.type
    }
    let addCart = await postApiCall(`${CustomerCart.createcart}?id=${CustomerId}`, data)
    if (addCart.status == 200) {
      dispatch(fetchUserFromStorage())
      navigate("/shoppingcart")
    }
  }



  const handleraddcounter = (e) => {
    e.preventDefault();
    let count = parseInt(counter)
    count++
    setCounter(count)
  }
  const handlermvcounter = (e) => {
    e.preventDefault();
    if (counter > 0) {
      let count = parseInt(counter)
      count--
      setCounter(count)
    } else {
      alert("fuck you dumb!!!")
    }
  }
  return (
    <>
      {/* <Header /> */}
      <div className="container-fluid">
        <div className="row px-xl-5">
          <div className="col-12">
            <nav className="breadcrumb bg-light mb-30">
              <Link className="breadcrumb-item text-dark" to="#">Home</Link>
              <Link className="breadcrumb-item text-dark" to="#">Shop</Link>
              <span className="breadcrumb-item active">Shop Detail</span>
            </nav>
          </div>
        </div>
      </div>
      <div className="container-fluid pb-5">
        {proDetail.length == 0 ? (<>
          <div className={styles.centerLoader}>
            <b><CircularProgress color="inherit" /></b>
                         
          </div>
        </>) :

          (
            <>
              <div className="row px-xl-5">
                <div className="col-lg-5 mb-30">
                  <div id="product-carousel" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner bg-light">
                      <div className="carousel-item active">
                        <img className="w-100" style={{ height: "500px" }} src={proDetail?.image || proDetail?.imageUrl} alt="carousel" />
                      </div>
                      <div className="carousel-item">
                        <img className="w-100 " style={{ height: "500px" }} src={proDetail?.image || proDetail?.imageUrl} alt="carousel" />
                      </div>
                      <div className="carousel-item">
                        <img className="w-100" style={{ height: "500px" }} src={proDetail?.image || proDetail?.imageUrl} alt="carousel" />
                      </div>
                      <div className="carousel-item">
                        <img className="w-100" style={{ height: "500px" }} src={proDetail?.image || proDetail?.imageUrl} alt="carousel" />
                      </div>
                    </div>
                    <Link className="carousel-control-prev" to="#product-carousel" data-slide="prev">
                      <i className="fa fa-2x fa-angle-left text-dark"></i>
                    </Link>
                    <Link className="carousel-control-next" to="#product-carousel" data-slide="next">
                      <i className="fa fa-2x fa-angle-right text-dark"></i>
                    </Link>
                  </div>
                </div>

                <div className="col-lg-7 h-auto mb-30">
                  <div className="h-100 bg-light p-30">
                    <h3>{proDetail?.name || proDetail?.model}</h3>
                    <div className="d-flex mb-3">
                      <div className="text-primary mr-2">
                        <small className="fas fa-star"></small>
                        <small className="fas fa-star"></small>
                        <small className="fas fa-star"></small>
                        <small className="fas fa-star-half-alt"></small>
                        <small className="far fa-star"></small>
                      </div>
                      <small className="pt-1">(99 Reviews)</small>
                    </div>
                    <h3 className="font-weight-semi-bold mb-4">₹{proDetail?.price}</h3>
                    <p className="mb-4">{proDetail?.description}</p>

                    <form onSubmit={(e) => handlecartmenu(e)}>
                      <div className="d-flex align-items-center mb-4 pt-2">
                        <div className="input-group quantity mr-3" style={{ width: "130px" }}>
                          <div className="input-group-btn">
                            <button className="btn btn-primary btn-minus" onClick={(e) => handlermvcounter(e)}>
                              <i className="fa fa-minus"></i>
                            </button>
                          </div>
                          <p className="form-control bg-secondary border-0 text-center" >{counter}</p>
                          <div className="input-group-btn">
                            <button className="btn btn-primary btn-plus" onClick={(e) => handleraddcounter(e)}>
                              <i className="fa fa-plus"></i>
                            </button>
                          </div>
                        </div>

                      </div>
                      <button className="btn btn-primary px-3" type="submit"><i className="fa fa-shopping-cart mr-1" ></i> Add To
                                                Cart</button>
                    </form>

                    <div className="d-flex pt-2">
                      <strong className="text-dark mr-2">Share on:</strong>
                      <div className="d-inline-flex">
                        <Link className="text-dark px-2" to="">
                          <i className="fab fa-facebook-f"></i>
                        </Link>
                        <Link className="text-dark px-2" to="">
                          <i className="fab fa-twitter"></i>
                        </Link>
                        <Link className="text-dark px-2" to="">
                          <i className="fab fa-linkedin-in"></i>
                        </Link>
                        <Link className="text-dark px-2" to="">
                          <i className="fab fa-pinterest"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )

        }

        {/* <div className="row px-xl-5">
                    <div className="col">
                        <div className="bg-light p-30">
                            <div className="nav nav-tabs mb-4">
                                <Link className="nav-item nav-link text-dark active" data-toggle="tab" to="#tab-pane-1">Description</Link>
                                <Link className="nav-item nav-link text-dark" data-toggle="tab" to="#tab-pane-2">Information</Link>
                                <Link className="nav-item nav-link text-dark" data-toggle="tab" to="#tab-pane-3">Reviews (0)</Link>
                            </div>
                            <div className="tab-content">
                                <div className="tab-pane fade show active" id="tab-pane-1">
                                    <h4 className="mb-3">Product Description</h4>
                                    <p>Eos no lorem eirmod diam diam, eos elitr et gubergren diam sea. Consetetur vero aliquyam invidunt duo dolores et duo sit. Vero diam ea vero et dolore rebum, dolor rebum eirmod consetetur invidunt sed sed et, lorem duo et eos elitr, sadipscing kasd ipsum rebum diam. Dolore diam stet rebum sed tempor kasd eirmod. Takimata kasd ipsum accusam sadipscing, eos dolores sit no ut diam consetetur duo justo est, sit sanctus diam tempor aliquyam eirmod nonumy rebum dolor accusam, ipsum kasd eos consetetur at sit rebum, diam kasd invidunt tempor lorem, ipsum lorem elitr sanctus eirmod takimata dolor ea invidunt.</p>
                                    <p>Dolore magna est eirmod sanctus dolor, amet diam et eirmod et ipsum. Amet dolore tempor consetetur sed lorem dolor sit lorem tempor. Gubergren amet amet labore sadipscing clita clita diam clita. Sea amet et sed ipsum lorem elitr et, amet et labore voluptua sit rebum. Ea erat sed et diam takimata sed justo. Magna takimata justo et amet magna et.</p>
                                </div>
                                <div className="tab-pane fade" id="tab-pane-2">
                                    <h4 className="mb-3">Additional Information</h4>
                                    <p>Eos no lorem eirmod diam diam, eos elitr et gubergren diam sea. Consetetur vero aliquyam invidunt duo dolores et duo sit. Vero diam ea vero et dolore rebum, dolor rebum eirmod consetetur invidunt sed sed et, lorem duo et eos elitr, sadipscing kasd ipsum rebum diam. Dolore diam stet rebum sed tempor kasd eirmod. Takimata kasd ipsum accusam sadipscing, eos dolores sit no ut diam consetetur duo justo est, sit sanctus diam tempor aliquyam eirmod nonumy rebum dolor accusam, ipsum kasd eos consetetur at sit rebum, diam kasd invidunt tempor lorem, ipsum lorem elitr sanctus eirmod takimata dolor ea invidunt.</p>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item px-0">
                                                    Sit erat duo lorem duo ea consetetur, et eirmod takimata.
                                                </li>
                                                <li className="list-group-item px-0">
                                                    Amet kasd gubergren sit sanctus et lorem eos sadipscing at.
                                                </li>
                                                <li className="list-group-item px-0">
                                                    Duo amet accusam eirmod nonumy stet et et stet eirmod.
                                                </li>
                                                <li className="list-group-item px-0">
                                                    Takimata ea clita labore amet ipsum erat justo voluptua. Nonumy.
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-md-6">
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item px-0">
                                                    Sit erat duo lorem duo ea consetetur, et eirmod takimata.
                                                </li>
                                                <li className="list-group-item px-0">
                                                    Amet kasd gubergren sit sanctus et lorem eos sadipscing at.
                                                </li>
                                                <li className="list-group-item px-0">
                                                    Duo amet accusam eirmod nonumy stet et et stet eirmod.
                                                </li>
                                                <li className="list-group-item px-0">
                                                    Takimata ea clita labore amet ipsum erat justo voluptua. Nonumy.
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="tab-pane-3">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h4 className="mb-4">1 review for "Product Name"</h4>
                                            <div className="media mb-4">
                                                <img src="./publicassest/img/user.jpg" alt="Image" className="img-fluid mr-3 mt-1" style={{ width: "45px" }} />
                                                <div className="media-body">
                                                    <h6>John Doe<small> - <i>01 Jan 2045</i></small></h6>
                                                    <div className="text-primary mb-2">
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star-half-alt"></i>
                                                        <i className="far fa-star"></i>
                                                    </div>
                                                    <p>Diam amet duo labore stet elitr ea clita ipsum, tempor labore accusam ipsum et no at. Kasd diam tempor rebum magna dolores sed sed eirmod ipsum.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <h4 className="mb-4">Leave a review</h4>
                                            <small>Your email address will not be published. Required fields are marked *</small>
                                            <div className="d-flex my-3">
                                                <p className="mb-0 mr-2">Your Rating * :</p>
                                                <div className="text-primary">
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star"></i>
                                                </div>
                                            </div>
                                            <form>
                                                <div className="form-group">
                                                    <label htmlFor="message">Your Review *</label>
                                                    <textarea id="message" cols="30" rows="5" className="form-control"></textarea>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="name">Your Name *</label>
                                                    <input type="text" className="form-control" id="name" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="email">Your Email *</label>
                                                    <input type="email" className="form-control" id="email" />
                                                </div>
                                                <div className="form-group mb-0">
                                                    <input type="submit" value="Leave Your Review" className="btn btn-primary px-3" />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
      </div>
    </>
  )
}

export default Details
