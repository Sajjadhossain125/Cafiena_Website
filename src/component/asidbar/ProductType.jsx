import React, { useState } from "react";

function ProductType() {
const [selected, setSelected] = useState([]);

const options = [
{ label: "Coffee", count: 0 },
];

const toggleOption = (label) => {
setSelected((prev) =>
prev.includes(label)
? prev.filter((item) => item !== label)
: [...prev, label]
);
};

return ( <div className="pb-4">
{/* Selected + Reset */} <div className="flex justify-between items-center text-sm text-gray-700 mb-3"> <span>{selected.length} Selected</span>


    <button
      onClick={() => setSelected([])}
      className="text-gray-900 underline text-xs"
    >
      Reset
    </button>
  </div>

  {/* Options */}
  <div className="space-y-3">
    {options.map((item) => (
      <div
        key={item.label}
        className="flex justify-between items-center text-sm text-gray-800"
      >
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={selected.includes(item.label)}
            onChange={() => toggleOption(item.label)}
            className="w-4 h-4"
          />
          {item.label}
        </label>

        <span className="text-gray-500 text-sm">({item.count})</span>
      </div>
    ))}
  </div>
</div>


);
}

export default ProductType;
