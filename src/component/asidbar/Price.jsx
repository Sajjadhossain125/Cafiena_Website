import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

function Price() {
  const [open ] = useState(true);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  return (
    <div className="border-b border-gray-300 pb-4">
      {/* Header */}
      <div className="flex justify-between items-center py-3">
        <h3 className="text-sm font-semibold tracking-wide text-gray-900">
          PRICE
        </h3>

        {/* <button onClick={() => setOpen(!open)}>
          {open ? <Minus size={16} /> : <Plus size={16} />}
        </button> */}
      </div>

      {/* Content */}
      {open && (
        <>
          {/* Highest Price Row */}
          <div className="flex justify-between items-center text-sm text-gray-700 mb-3">
           

            <button
              onClick={() => {
                setMinPrice("");
                setMaxPrice("");
              }}
              className="text-gray-900 underline text-xs"
            >
              Reset
            </button>
          </div>

          {/* Min / Max Inputs */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex flex-col">
              <label className="text-xs text-gray-500 mb-1">Min price:</label>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="0"
                className="border border-gray-300 rounded-md px-3 py-1 text-sm w-[110px]"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xs text-gray-500 mb-1">Max price:</label>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="675"
                className="border border-gray-300 rounded-md px-3 py-1 text-sm w-[110px]"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-[1px] bg-gray-200 mt-3"></div>
        </>
      )}
    </div>
  );
}

export default Price;
