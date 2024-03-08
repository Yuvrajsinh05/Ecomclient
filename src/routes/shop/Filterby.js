import React, { useEffect, useState } from 'react'
import FilterbyBrand from './FilterbyBrand'
import Filterbyprice from './Filterbyprice'
import Filterbysize from './Filterbysize'
import { getApiCall, postApiCall } from '../../requests/requests'
import { ProductCalls } from '../../requests/adminreq'

function Filterby({ filter, subcategory, category, setDisplaydata, displaydataClone }) {
  const [Brands, setBrands] = useState([])
  const [Range, setRange] = useState([])
  const [selectedPrices, setSelectedPrices] = useState([])
  const [selectedBrands, setSelectedBrands] = useState([])
  const [isAllPrice, setIsAllPrice] = useState(false)
  const [isAllBrand, setIsAllBrands] = useState(false)
  useEffect(() => {
    if (filter?.length != 0) {
      setBrands(filter?.Brands)
      setRange(filter?.PriceRange)
    }
    setIsAllBrands(false)
    setIsAllPrice(false)
    setSelectedBrands([])
    setSelectedPrices([])
  }, [filter])

  useEffect(() => {
    if (selectedPrices.length == Object.keys(Range).length) {
      if (selectedPrices.length == 0) return;
      return setIsAllPrice(true)
    }
    setIsAllPrice(false)
  }, [selectedPrices])

  useEffect(() => {
    if (selectedBrands.length == Object.keys(Brands).length) {
      if (selectedBrands.length == 0) return;
      return setIsAllBrands(true)
    }
    setIsAllBrands(false)
  }, [selectedBrands])


  async function filterProducts() {
    // Parse numbers and find minimum and maximum
    let minNumber = Number.MAX_VALUE;
    let maxNumber = Number.MIN_VALUE;
    if (selectedPrices.length == 0 && selectedBrands.length==0) {
      return setDisplaydata(displaydataClone)
    }
    selectedPrices.forEach(range => {
      let [start, end] = range.split(" - ").map(Number);
      if (start < minNumber) minNumber = start;
      if (end > maxNumber) maxNumber = end;
    });

    let body = {
      category: category,
      subCategory: subcategory,
      price: { min: minNumber, max: maxNumber },
      brands: selectedBrands
    }

    const filterProducts = await postApiCall(ProductCalls.filterProducts, body)
    setDisplaydata(filterProducts.data)

  }

  useEffect(() => {
    filterProducts()
  }, [selectedBrands, selectedPrices])
  return (
    <>
      <div className="col-lg-3 col-md-4">
        <h5 className="section-title position-relative text-uppercase mb-3">
          <span className="bg-secondary pr-3">Filter by price</span>
        </h5>

        <Filterbyprice Range={Range} isAllPrice={isAllPrice} setSelectedPrices={setSelectedPrices} setIsAllPrice={setIsAllPrice} selectedPrices={selectedPrices} />

        <h5 className="section-title position-relative text-uppercase mb-3">
          <span className="bg-secondary pr-3">Filter by Brand</span>
        </h5>
        <FilterbyBrand Brands={Brands} isAllBrand={isAllBrand} setIsAllBrands={setIsAllBrands} setSelectedBrands={setSelectedBrands} selectedBrands={selectedBrands} />
      </div>
    </>
  )
}

export default Filterby
