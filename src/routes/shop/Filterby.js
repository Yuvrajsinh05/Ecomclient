import React from 'react'
import Filterbycolor from './Filterbycolor'
import Filterbyprice from './Filterbyprice'
import Filterbysize from './Filterbysize'

function Filterby() {
  
  return (
    <>
        <div className="col-lg-3 col-md-4">
            <h5 className="section-title position-relative text-uppercase mb-3">
              <span className="bg-secondary pr-3">Filter by price</span>
            </h5>

           <Filterbyprice/>

            <h5 className="section-title position-relative text-uppercase mb-3">
              <span className="bg-secondary pr-3">Filter by Brand</span>
            </h5>
           <Filterbycolor/>

            <h5 className="section-title position-relative text-uppercase mb-3">
              <span className="bg-secondary pr-3">Filter by size</span>
            </h5>
          <Filterbysize/>
          </div>
    </>
  )
}

export default Filterby
