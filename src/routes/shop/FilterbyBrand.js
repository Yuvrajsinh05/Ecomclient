import React, { useState, useEffect } from "react";

function FilterbyBrand({ Brands, setSelectedBrands, selectedBrands }) {
  const [sumCount, setSumCount] = useState(0);
  const [isAllBrand, setIsAllBrand] = useState(false);

  function handleAllBrandChange() {
    if (isAllBrand) {
      setSelectedBrands([]);
    } else {
      const allBrands = Object.keys(Brands || {});
      setSelectedBrands(allBrands);
    }
    setIsAllBrand(!isAllBrand);
  }

  function handleBrandSelection(brand) {
    const updatedBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter(b => b !== brand)
      : [...selectedBrands, brand];
    setSelectedBrands(updatedBrands);
  }

  useEffect(() => {
    let totalCount = 0;
    if (Brands) {
      Object.values(Brands).forEach(count => {
        totalCount += count;
      });
    }
    setSumCount(totalCount);
  }, [Brands]);

  return (
    <>
      <div className="bg-light p-4 mb-30">
        <form>
          <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
            <input
              type="checkbox"
              className="custom-control-input"
              id="brand-all"
              onChange={handleAllBrandChange}
              checked={isAllBrand}
            />
            <label className="custom-control-label" htmlFor="brand-all">
              All Brand
            </label>
            <span style={{ color: "black" }} className="badge border text-dark font-weight-normal">{sumCount}</span>
          </div>

          {Brands && Object.entries(Brands)?.map(([brand, count], index) => (
            <div key={index} className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
              <input
                type="checkbox"
                className="custom-control-input"
                id={`brand-checkbox-${index}`}
                onChange={() => handleBrandSelection(brand)}
                checked={selectedBrands.includes(brand)}
              />
              <label className="custom-control-label" htmlFor={`brand-checkbox-${index}`}>
                {brand}
              </label>
              <span className="badge border font-weight-normal" style={{ color: "black" }}>{count}</span>
            </div>
          ))}
        </form>
      </div>
    </>
  );
}

export default FilterbyBrand;
