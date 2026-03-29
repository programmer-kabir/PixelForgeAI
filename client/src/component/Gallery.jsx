"use client";

import { Image as ImageIcon } from "lucide-react";

export default function Gallery({ images = [] }) {
  return (
    <main className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-xl font-bold mb-4">Your Gallery</h2>

      {/* ❌ Empty State */}
      {images.length === 0 && (
        <div className="text-center text-gray-400 py-20">
          <ImageIcon size={40} className="mx-auto mb-2" />
          No images yet
        </div>
      )}

      {/* ✅ Images Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {images.map((img, i) => (
            <div
              key={i}
              className="bg-white border rounded-2xl overflow-hidden shadow-sm group"
            >
              <img
                src={img}
                alt="generated"
                className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Hover actions (optional 🔥) */}
              <div className="p-2 flex justify-between text-xs">
                <a
                  href={img}
                  download
                  className="text-indigo-500 hover:underline"
                >
                  Download
                </a>

                <button
                  onClick={() => window.open(img, "_blank")}
                  className="text-gray-500 hover:text-black"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
