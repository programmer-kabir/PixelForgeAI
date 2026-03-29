"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const ImageCount = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = [
    { label: "1 Image", value: 1 },
    { label: "2 Images", value: 2 },
    { label: "3 Images", value: 3 },
    { label: "4 Images", value: 4 },
    { label: "6 Images", value: 6 },
    { label: "8 Images", value: 8 },
  ];

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="text-[10px] font-medium text-gray-500">
        IMAGE COUNT
      </label>

      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2 rounded border border-gray-200 bg-gray-50 text-xs"
      >
        <span>{selected?.label}</span>
        <ChevronDown size={16} className={open ? "rotate-180" : ""} />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-xl border bg-white shadow-lg">
          {options.map((item) => (
            <button
              key={item.value}
              onClick={() => {
                onChange(item.value); // ✅ parent update
                setOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-xs ${
                value === item.value
                  ? "bg-indigo-50 text-indigo-600"
                  : "hover:bg-gray-50"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCount;
