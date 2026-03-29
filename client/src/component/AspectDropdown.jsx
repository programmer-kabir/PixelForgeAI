"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function AspectDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = [
    { label: "Landscape (16:9)", value: "16:9" },
    { label: "Portrait (9:16)", value: "9:16" },
    { label: "Square (1:1)", value: "1:1" },
    { label: "Mobile Port (3:4)", value: "3:4" },
    { label: "Mobile Land (4:3)", value: "4:3" },
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
      <label className="text-[10px] text-gray-500">ASPECT RATIO</label>

      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between px-3 py-2 border rounded text-xs"
      >
        <span>{selected?.label}</span>
        <ChevronDown size={16} />
      </button>

      {open && (
        <div className="absolute z-50 w-full bg-white border rounded shadow">
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
}
