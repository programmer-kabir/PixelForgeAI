"use client";

import { useState } from "react";
import { Sparkles, Wand2, KeyRound } from "lucide-react";
import AspectDropdown from "./AspectDropdown";
import ImageCount from "./ImageCount";
import EnhanceTemplate from "./EnhanceTemplate";

export default function Sidebar({
  prompt,
  setPrompt,
  template,
  setTemplate,
  ratio,
  setRatio,
  count,
  setCount,
  onGenerate,
  token,
  setToken, // 🔥 important (parent theke ashbe)
}) {
  const [autoDownload, setAutoDownload] = useState(false);
  const [open, setOpen] = useState(false);

  const [tokenInput, setTokenInput] = useState("");
  const [tokens, setTokens] = useState([]);

  // ✅ Add + Set Token
  const handleAddToken = () => {
    if (!tokenInput.trim()) return;

    const newToken = {
      id: tokens.length + 1,
      value: tokenInput,
      usage: 0,
      timeLeft: "18h 57m",
      status: "Active",
    };

    setTokens([...tokens, newToken]);

    // 🔥 MAIN PART → parent e set hocche
    setToken(tokenInput);

    setTokenInput("");
  };
console.log(token)
  return (
    <aside className="w-full lg:w-80 h-auto lg:h-screen lg:sticky lg:top-0 bg-[#eeeeee] border-r border-gray-200 px-3 py-6 space-y-6">
      
      {/* Logo + Token Button */}
      <div className="bg-white px-2 py-3 rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-500 text-white p-2 rounded-xl shadow-sm">
            <Sparkles size={18} />
          </div>
          <h1 className="font-semibold text-gray-900 text-lg">
            PixelForge AI
          </h1>
        </div>

        {/* 🔥 Token Button */}
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-1 border border-gray-300 px-3 py-1 rounded text-xs bg-white hover:bg-gray-100"
        >
          <KeyRound size={14} />
          <span>{tokens.length}</span>
        </button>
      </div>

      {/* Prompt */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-500">PROMPT</label>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your image..."
          className="w-full p-3 rounded-xl border border-gray-300 bg-gray-50 outline-none text-sm resize-none"
          rows={3}
        />
      </div>

      {/* Ratio + Count */}
      <div className="grid grid-cols-2 gap-2">
        <AspectDropdown value={ratio} onChange={setRatio} />
        <ImageCount value={count} onChange={setCount} />
      </div>

      {/* Template */}
      <EnhanceTemplate onChange={setTemplate} />

      {/* Auto Download */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-700 font-medium">
          Auto Download
        </span>

        <button
          onClick={() => setAutoDownload(!autoDownload)}
          className={`w-11 h-6 rounded-full transition ${
            autoDownload ? "bg-indigo-500" : "bg-gray-300"
          }`}
        >
          <div
            className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition ${
              autoDownload ? "right-0.5" : "left-0.5"
            }`}
          />
        </button>
      </div>

      {/* Generate */}
      <button
        onClick={onGenerate}
        className="w-full py-2.5 rounded-xl bg-indigo-500 text-white font-medium text-sm hover:bg-indigo-600 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm"
      >
        <Wand2 size={16} />
        Generate
      </button>

      {/* Clear */}
      <button
        onClick={() => setPrompt("")}
        className="w-full py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 active:scale-[0.98] transition-all"
      >
        Clear
      </button>

      {/* ================= MODAL ================= */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          
          <div className="w-[500px] rounded-xl bg-white shadow-xl border border-gray-200 p-5 relative">
            
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Token Manager
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                ✕
              </button>
            </div>

            {/* Input */}
            <div className="flex gap-2 mb-4">
              <input
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                type="text"
                placeholder="Enter token..."
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleAddToken}
                className="px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add
              </button>
            </div>

            {/* Table */}
            <div className="text-sm">
              <div className="grid grid-cols-5 text-gray-500 border-b pb-2 mb-2">
                <span>#</span>
                <span>Token</span>
                <span>Usage</span>
                <span>Time Left</span>
                <span>Status</span>
              </div>

              {tokens.map((t, index) => (
                <div
                  key={t.id}
                  className="grid grid-cols-5 items-center text-gray-700 mb-1"
                >
                  <span>{index + 1}</span>
                  <span className="truncate">
                    {t.value.slice(0, 10)}...
                  </span>
                  <span>{t.usage}</span>
                  <span className="text-green-600">{t.timeLeft}</span>
                  <span className="text-green-600">{t.status}</span>
                </div>
              ))}

              {tokens.length === 0 && (
                <div className="text-center text-gray-400 py-3">
                  No tokens added
                </div>
              )}
            </div>
          </div>

          {/* Outside click */}
          <div
            onClick={() => setOpen(false)}
            className="absolute inset-0 -z-10"
          />
        </div>
      )}
    </aside>
  );
}