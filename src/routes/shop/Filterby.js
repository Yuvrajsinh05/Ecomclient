import React, { useEffect, useState } from 'react'
import FilterbyBrand from './FilterbyBrand'
import Filterbyprice from './Filterbyprice'
import Filterbysize from './Filterbysize'

function Filterby({filter}) {
  const [Brands , setBrands] = useState([])
  const [Range , setRange] = useState([])

  useEffect(()=>{
     if(filter.lenght!=0){
      setBrands(filter?.Brands)
      setRange(filter?.Range)
     }
  },[filter])

  return (
    <>
        <div className="col-lg-3 col-md-4">
            <h5 className="section-title position-relative text-uppercase mb-3">
              <span className="bg-secondary pr-3">Filter by price</span>
            </h5>

           <Filterbyprice Range={Range}/>

            <h5 className="section-title position-relative text-uppercase mb-3">
              <span className="bg-secondary pr-3">Filter by Brand</span>
            </h5>
           <FilterbyBrand Brands={Brands} />

            {/* <h5 className="section-title position-relative text-uppercase mb-3"> */}
              {/* <span className="bg-secondary pr-3">Filter by size</span> */}
            {/* </h5> */}
          {/* <Filterbysize/> */}
          </div>
    </>
  )
}

export default Filterby
