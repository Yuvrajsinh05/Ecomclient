import React from "react";
import { Images } from "../../../assets/images";


export const Vendor = () => {
  return (
    <>
      <div className="container-fluid  py-5">
        <div className="row px-xl-5">
          <div className="col">
            <div className="owl-carousel vendor-carousel">
              <div className="bg-light p-4">
                <img src={Images.vendor_1} alt="vendor" />
              </div>
              <div className="bg-light p-4">
                <img src={Images.vendor_2} alt="vendor" />
              </div>
              <div className="bg-light p-4">
                <img src={Images.vendor_3} alt="vendor" />
              </div>
              <div className="bg-light p-4">
                <img src={Images.vendor_4} alt="vendor" />
              </div>
              <div className="bg-light p-4">
                <img src={Images.vendor_5} alt="vendor" />
              </div>
              <div className="bg-light p-4">
                <img src={Images.vendor_6} alt="vendor" />
              </div>
              <div className="bg-light p-4">
                <img src={Images.vendor_7} alt="vendor" />
              </div>
              <div className="bg-light p-4">
                <img src={Images.vendor_8} alt="vendor" />
              </div> 
            </div> 
          </div>
        </div>
      </div>
    </>
  )
}