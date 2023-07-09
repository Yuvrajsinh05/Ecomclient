import { Link } from "react-router-dom"

function DisplayProduct({ displaydata }) {
  return (
    <>
      {displaydata.map((prods,index) => {
        return (
          <DisplayItem prods={prods} key={prods._id} />
        )
      })}
    </>
  )
}


export default DisplayProduct



function DisplayItem({prods}) {
  return (
    <>
      <div  className="col-lg-4 col-md-6 col-sm-6 pb-1" >
        <div className="product-item bg-light mb-4">
          <div className="product-img position-relative overflow-hidden">
            <img
              className="img-fluid w-100" style={{ height: "370px" }}
              src={prods?.image || prods?.imageUrl}
              alt=""
            />
            <div className="product-action">
              <Link className="btn btn-outline-dark btn-square" to={`/shopdetail/${prods?._id}`}>
                <i className="fa fa-shopping-cart"></i>
              </Link>
              <Link className="btn btn-outline-dark btn-square" to="">
                <i className="far fa-heart"></i>
              </Link>
              <Link className="btn btn-outline-dark btn-square" to="">
                <i className="fa fa-sync-alt"></i>
              </Link>
              <Link className="btn btn-outline-dark btn-square" to="">
                <i className="fa fa-search"></i>
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