import React from 'react'

function FilterbyBrand({ Brands }) {
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

          {
            Brands?.map((brand, index) => {
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
                    <span className="badge border font-weight-normal">150</span>
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
