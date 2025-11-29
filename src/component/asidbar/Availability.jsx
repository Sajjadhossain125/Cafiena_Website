import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

function Availability() {
  const [open] = useState(true);
  const [selected, setSelected] = useState([]);

  const options = [
    { label: "In stock", count: 7 },
    { label: "Out of stock", count: 1 },
  ];

  const toggleOption = (label) => {
    setSelected((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  return (
    <div className="border-b border-gray-300 pb-4">
      {/* Header */}
      <div className="flex justify-between items-center py-3">
        <h3 className="text-sm font-semibold tracking-wide text-gray-900">
          AVAILABILITY
        </h3>
        {/* <button onClick={() => setOpen(!open)}>
          {open ? <Minus size={16} /> : <Plus size={16} />}
        </button> */}
      </div>

      {/* Selected + Reset Row */}
      {open && (
        <>
          <div className="flex justify-between items-center text-sm text-gray-700 mb-3">
            <span>{selected.length} selected</span>
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

          {/* Divider */}
          <div className="w-full h-[1px] bg-gray-200 mt-4"></div>
        </>
      )}
    </div>
  );
}

export default Availability;
