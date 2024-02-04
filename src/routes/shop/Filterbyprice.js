import React from 'react'

function Filterbyprice({ Range }) {
  return (
    <>
      <div className="bg-light p-4 mb-30">
        <form>
          <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
            <input
              type="checkbox"
              className="custom-control-input"
              id="price-all"
            />
            <label className="custom-control-label" htmlFor="price-all">
              All Price
            </label>
            {/* <span className="badge border font-weight-normal">1000</span> */}
          </div>

          {Range?.map((price,index) => {
            return (
              <>
                <div key={index} className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id={index}
                  />
                  <label className="custom-control-label" htmlFor={index}>
                     {price}
                  </label>
                  {/* <span className="badge border text-dark font-weight-normal">-</span> */}
                </div>
              </>
            )
          })}
        </form>
      </div>
    </>
  )
}

export default Filterbyprice
