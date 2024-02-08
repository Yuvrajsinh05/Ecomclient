import React from 'react'

function FilterbyBrand({ Brands }) {
  console.log("BrandsBrandsBrandsBrandsBrands",Brands)
  return (
    <>
      <div className="bg-light p-4 mb-30">
        <form>
          <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
            <input
              type="checkbox"
              className="custom-control-input"
              id="color-all"
            />
            <label className="custom-control-label" htmlFor="price-all">
              All Brand
            </label>
            <span className="badge border font-weight-normal" style={{color:"black"}}>1000</span>
          </div>

          {Brands && Object.entries(Brands).map(([brand, count], index) => {
              return (
                <>
                  <div key={index} className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="color-1"
                    />
                    <label className="custom-control-label" htmlFor="color-1">
                      {brand}
                    </label>
                    <span className="badge border font-weight-normal" style={{ color: "black" }}>{count}</span>
                  </div>
                </>
              )
            })
          }
        </form>
      </div>
    </>
  )
}

export default FilterbyBrand
