import React from 'react'

function Filterbycolor() {
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
                    All Color
                  </label>
                  <span className="badge border font-weight-normal">1000</span>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="color-1"
                  />
                  <label className="custom-control-label" htmlFor="color-1">
                    Black
                  </label>
                  <span className="badge border font-weight-normal">150</span>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="color-2"
                  />
                  <label className="custom-control-label" htmlFor="color-2">
                    White
                  </label>
                  <span className="badge border font-weight-normal">295</span>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="color-3"
                  />
                  <label className="custom-control-label" htmlFor="color-3">
                    Red
                  </label>
                  <span className="badge border font-weight-normal">246</span>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="color-4"
                  />
                  <label className="custom-control-label" htmlFor="color-4">
                    Blue
                  </label>
                  <span className="badge border font-weight-normal">145</span>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="color-5"
                  />
                  <label className="custom-control-label" htmlFor="color-5">
                    Green
                  </label>
                  <span className="badge border font-weight-normal">168</span>
                </div>
              </form>
            </div>
    </>
  )
}

export default Filterbycolor
