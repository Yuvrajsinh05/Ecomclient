import { useEffect, useState } from "react"
import { Header } from "../../components/header/header"
import { getApiCall, getApiCallWithBody } from "../../requests/requests"
import { ProductCalls } from "../../requests/adminreq"
import { useLocation, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { likeProductAsync } from "../../fetures/likedProductsSlice"





export const Liked = () => {
  const [displaydata, setDisplaydata] = useState([])
  const location = useLocation()
  const likedProducts = useSelector(state => { return state?.likedProducts });


  useEffect(() => {
    getLikedDataCall()
  }, [likedProducts])

  async function getLikedDataCall() {
    const fetchData = await getApiCall(`${ProductCalls.getMultplieProducesWithIds}?idArray=${encodeURIComponent(JSON.stringify(likedProducts.likedProducts))}`);
    setDisplaydata(fetchData?.data);
  }

  console.log("likedProducts",likedProducts)

  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row px-xl-5">
          <div className="col-12">
            <nav className="breadcrumb bg-light mb-30">
              <Link className="breadcrumb-item text-dark" to="#">
                Home
              </Link>
              <Link className="breadcrumb-item text-dark" to="#">
                Shop
              </Link>
              <span className="breadcrumb-item active">Shop List</span>
            </nav>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row px-xl-5">

          {/* <Filterby  filter={filter}/> */}

          <div className="col-lg-12  col-md-8">
            <div className="row pb-3">
              <div className="col-12 pb-1">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <div>
                    <button className="btn btn-sm btn-light">
                      <i className="fa fa-th-large"></i>
                    </button>
                    <button className="btn btn-sm btn-light ml-2">
                      <i className="fa fa-bars"></i>
                    </button>
                  </div>
                  <div className="ml-2">
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn btn-sm btn-light dropdown-toggle"
                        data-toggle="dropdown"
                      >
                        Sorting
                      </button>
                      <div className="dropdown-menu dropdown-menu-right">
                        <Link className="dropdown-item" to="#">
                          Latest
                        </Link>
                        <Link className="dropdown-item" to="#">
                          Popularity
                        </Link>
                        <Link className="dropdown-item" to="#">
                          Best Rating
                        </Link>
                      </div>
                    </div>
                    <div className="btn-group ml-2">
                      <button
                        type="button"
                        className="btn btn-sm btn-light dropdown-toggle"
                        data-toggle="dropdown"
                      >
                        Showing
                      </button>
                      <div className="dropdown-menu dropdown-menu-right">
                        <Link className="dropdown-item" to="#">
                          10
                        </Link>
                        <Link className="dropdown-item" to="#">
                          20
                        </Link>
                        <Link className="dropdown-item" to="#">
                          30
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              {displaydata?.map((prods, index) => {
                return (
                  <DisplayItem prods={prods} key={prods._id} />
                )
              })}

            </div>
          </div>
        </div>
      </div>



    </>
  )
}


function DisplayItem({ prods }) {
  // const dispatch = useDispatch()
  const dispatch = useDispatch();

  const handleLikeProduct = async () => {
    try {
      await dispatch(likeProductAsync(prods?._id));
    } catch (error) {
      console.error('Error liking product:', error);
      // Handle errors or display an error message
    }
  };

  return (
    <>
      <div style={{ height: '320px' }} className="col-lg-2 col-md-4 col-sm-4 pb-1" >
        <div className="product-item bg-light mb-4">
          <div className="product-img position-relative overflow-hidden">
            <img
              className="img-fluid w-100" style={{ height: "200px" }}
              src={prods?.image || prods?.imageUrl}
              alt=""
            />
            <div className="product-action">
              <Link className="btn btn-outline-dark btn-square" to={`/shopdetail/${prods?._id}`}>
                <i className="fa fa-shopping-cart"></i>
              </Link>
              <Link onClick={handleLikeProduct} className="btn btn-outline-dark btn-square" to="">
                <i className="far fa-heart fa-solid"></i>
              </Link>

            </div>
          </div>
          <div className="text-center py-4">
            <Link className="h6 text-decoration-none text-truncate" to="">
              {prods?.name || prods?.model}
            </Link>
            <div className="d-flex align-items-center justify-content-center mt-2">
              <h5>{`₹${prods.price}`}</h5>
              <h6 className="text-muted ml-2">
                <del>{`₹${prods.price}`}</del>
              </h6>
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