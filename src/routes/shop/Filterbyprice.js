import React, { useEffect, useState } from 'react';

function Filterbyprice({ Range, setSelectedPrices, selectedPrices, isAllPrice, setIsAllPrice }) {
  const [sumCount, setSumCount] = useState(0); // Initialize sumCount as a number

  // Function to handle changes in the "All Price" checkbox
  function handleAllChange() {
    if (isAllPrice) {
      setSelectedPrices([]); // Clear selected prices
    } else {
      const allPrices = Object.keys(Range || {});
      setSelectedPrices(allPrices); // Set selected prices to all available prices
    }
    setIsAllPrice(!isAllPrice); // Toggle isAllPrice state
  }

  // Function to handle individual price selection
  function handlePrices(price) {
    const updatedPrices = selectedPrices.includes(price)
      ? selectedPrices.filter(p => p !== price) // Remove price if already selected
      : [...selectedPrices, price]; // Add price if not selected
    setSelectedPrices(updatedPrices);
  }

  // Calculate and update the sumCount whenever Range changes
  useEffect(() => {
    let totalCount = 0;
    if (Range) {
      Object.values(Range).forEach(count => {
        totalCount += count;
      });
    }
    setSumCount(totalCount); // Update sumCount
  }, [Range]); // Run this effect only when Range changes

  return (
    <>
      <div className="bg-light p-4 mb-30">
        <form>
          <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
            <input
              type="checkbox"
              className="custom-control-input"
              id="price-all"
              onChange={handleAllChange}
              checked={isAllPrice}
            />
            <label className="custom-control-label" htmlFor="price-all">
              All Price
            </label>
            <span style={{ color: 'black' }} className="badge border text-dark font-weight-normal">{sumCount}</span>
          </div>

          {/* Render checkboxes for each price range */}
          {Range && Object.entries(Range)?.map(([range, count], index) => (
            <div key={index} className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
              <input
                type="checkbox"
                className="custom-control-input"
                id={`checkbox-${index}`}
                onChange={() => handlePrices(range)}
                checked={selectedPrices.includes(range)} // Check if the price is selected
              />
              <label className="custom-control-label" htmlFor={`checkbox-${index}`}>
                {range}
              </label>
              <span className="badge border font-weight-normal" style={{ color: "black" }}>{count}</span>
            </div>
          ))}
        </form>
      </div>
    </>
  );
}

export default Filterbyprice;
