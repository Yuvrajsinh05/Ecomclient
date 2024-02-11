import React from 'react'

function Filterbyprice({ Range }) {
  // console.log("Range", Range)
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

          {Range && Object.entries(Range)?.map(([range, count], index) => {
            return (
              <div key={index} className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id={`checkbox-${index}`}
                />
                <label className="custom-control-label" htmlFor={`checkbox-${index}`}>
                  {range}
                </label>
                <span className="badge border font-weight-normal" style={{ color: "black" }}>{count}</span>
              </div>
            );
          })}


        </form>
      </div>
    </>
  )
}

export default Filterbyprice
