"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import templates from "../data/templates.json";

const EnhanceTemplate = ({ onChange }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("None"); // ✅ string
  const dropdownRef = useRef(null);

  // ✅ JSON থেকে options বানানো
  const options = Object.keys(templates);

  // click outside close
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* FIXED LABEL */}
      <label className="text-[10px] font-medium text-gray-500">
        ENHANCE TEMPLATE
      </label>

      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2 rounded border border-gray-200 bg-gray-50 text-xs"
      >
        <span>{selected}</span>

        <ChevronDown
          size={16}
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-xl border border-gray-200 bg-white shadow-lg overflow-y-auto max-h-60">
          {options.map((item) => (
            <button
              key={item}
              onClick={() => {
                setSelected(item);
                setOpen(false);
                onChange?.(item); // 🔥 parent এ পাঠাবে
              }}
              className={`w-full text-left px-3 py-2 text-xs transition ${
                selected === item
                  ? "bg-indigo-50 text-indigo-600"
                  : "hover:bg-gray-50"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnhanceTemplate;
