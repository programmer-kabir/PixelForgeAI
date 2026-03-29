"use client";

import { useState } from "react";
import Sidebar from "../component/Sidebar";
import Gallery from "../component/Gallery";

const Layout = () => {
  // 🔥 ALL STATE HERE
  const [prompt, setPrompt] = useState("");
  const [template, setTemplate] = useState("None");
  const [ratio, setRatio] = useState("16:9");
  const [count, setCount] = useState(4);
  const [images, setImages] = useState([]);
  const [token, setToken] = useState(null);
  // 🔥 generate handler
  const handleGenerate = async () => {
    if (!token) {
      alert("Add token first!");
      return;
    }

    const res = await fetch("http://localhost:5000/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        template,
        ratio,
        count,
        token,
      }),
    });

    const data = await res.json();
    console.log(data);
    if (data.status === "success") {
      setImages((prev) => [...data.images, ...prev]);
    } else {
      alert(data.msg);
    }
  };
  return (
    <div className="h-screen flex overflow-hidden">
      {/* Sidebar */}
      <div className="hidden lg:block">
        <Sidebar
          prompt={prompt}
          setPrompt={setPrompt}
          template={template}
          setTemplate={setTemplate}
          ratio={ratio}
          setRatio={setRatio}
          count={count}
          setCount={setCount}
          onGenerate={handleGenerate}
          token={token}
          setToken={setToken}
        />
      </div>

      {/* Mobile */}
      <div className="lg:hidden w-full">
        <Sidebar
          prompt={prompt}
          setPrompt={setPrompt}
          template={template}
          setTemplate={setTemplate}
          ratio={ratio}
          setRatio={setRatio}
          count={count}
          setCount={setCount}
          onGenerate={handleGenerate}
        />
      </div>

      {/* Gallery */}
      <div className="flex-1 overflow-y-auto">
        <Gallery images={images} />
      </div>
    </div>
  );
};

export default Layout;
