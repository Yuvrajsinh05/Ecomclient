import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { likeProductAsync } from "../../fetures/likedProductsSlice"

function DisplayProduct({ displaydata }) {
  return (
    <>
      {displaydata?.map((prods,index) => {
        return (
          <DisplayItem prods={prods} key={prods._id} />
        )
      })}
    </>
  )
}


export default DisplayProduct



function DisplayItem({prods}) {
  const dispatch = useDispatch()
  const CustomerId = useSelector(state => { return state?.login?.user?.Userdata?._id});

  const handleLikeProduct = async () => {
    try {
      await dispatch(likeProductAsync(prods._id , [] ,CustomerId));
    } catch (error) {
      console.error('Error liking product:', error);
      // Handle errors or display an error message
    }
  };

  
  return (
    <>
      <div  className="col-lg-3 col-md-4 col-sm-4 pb-1" >
        <div className="product-item bg-light mb-4">
          <div className="product-img position-relative overflow-hidden">
            <img
              className="img-fluid w-100" style={{ height: "250px" }}
              src={prods?.image || prods?.imageUrl}
              alt=""
            />
            <div className="product-action">
              <Link className="btn btn-outline-dark btn-square" to={`/shopdetail/${prods?._id}`}>
                <i className="fa fa-shopping-cart"></i>
              </Link>
              <Link onClick={handleLikeProduct} className="btn btn-outline-dark btn-square" to="">
                <i className="far fa-heart"></i>
              </Link>
            </div>
          </div>

          <div  className="text-center py-4">
            <Link style={{display:'list-item' ,padding:'0.3rem'}} className="h6 text-decoration-none text-truncate" to="">
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