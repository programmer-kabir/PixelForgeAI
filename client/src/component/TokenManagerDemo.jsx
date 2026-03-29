import { useState } from "react";
import { KeyRound } from "lucide-react";

export default function TokenManagerDemo() {
  const [open, setOpen] = useState(false);
  const [tokenInput, setTokenInput] = useState("");
  const [tokens, setTokens] = useState([]);

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
    setTokenInput(""); // clear input
  };

  return (
    <div className="p-5">
      {/* Modal */}
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
                  <span className="truncate">{t.value.slice(0, 10)}...</span>
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
    </div>
  );
}
