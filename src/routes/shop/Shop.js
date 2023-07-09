import React, { useState } from "react";
import Filterby from "./Filterby";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getApiCall } from "../../requests/requests";
import DisplayProduct from "./DisplayProducts";
import { Header } from "../../components/header/header";
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom";
import { ProdcutsWrtCate } from "../../requests/adminreq";

function Shop() {

  const [displaydata, setDisplaydata] = useState([])
  const location = useLocation();
  const navigate = useNavigate()

  useEffect(() => {
    if (!window.localStorage.ecomtoken) {
      navigate('/')
    } 
  }, [])

  useEffect(() => {
    getCatString();
  }, [location.search]);



  async function getCatString() {

    if (window?.location?.search) {
      let urlCategoryString = await decodeURIComponent(window?.location?.search)
      let urlCategoryStringSplited = urlCategoryString?.split("?")[1].trim()
      fungetApiCall(urlCategoryStringSplited);
    }
  }



  async function fungetApiCall(StringSplited) {

    try {

      if (StringSplited) {
        const encoded = encodeURIComponent(StringSplited);
        let tempstr;
        if (StringSplited == "Mobiles&Accessories" || StringSplited == "Computers&Accessories") {
          tempstr = "Electronics"
        } else if (
          StringSplited == "Men's Clothing" ||
          StringSplited == "Women's Clothing" ||
          StringSplited == "Jewelry" ||
          StringSplited == "Children's Clothing" ||
          StringSplited == "Sunglasses"
        ) { tempstr = "Fashion" }
        console.log("response",await `${ProdcutsWrtCate}/${tempstr}/${encoded}`)
        if (!tempstr || !encoded) return;
        let response = await getApiCall(`${ProdcutsWrtCate.getProductsById}/${tempstr}/${encoded}`);
        console.log("response",response)
        setDisplaydata(response?.data)
      }
    } catch (error) {
      console.error(error);
    }
  }

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

          <Filterby />

          <div className="col-lg-9 col-md-8">
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


              <DisplayProduct displaydata={displaydata} />

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Shop;
