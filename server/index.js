const express = require("express");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// 🔥 templates load
const templates = require("./data/templates.json");

// 🔥 ratio map
function mapRatio(ratio) {
  if (ratio === "16:9") return "IMAGE_ASPECT_RATIO_LANDSCAPE";
  if (ratio === "9:16") return "IMAGE_ASPECT_RATIO_PORTRAIT";
  if (ratio === "1:1") return "IMAGE_ASPECT_RATIO_SQUARE";
  return "IMAGE_ASPECT_RATIO_LANDSCAPE";
}

// 🔥 TEST ROUTE
app.get("/", (req, res) => {
  res.send("Server Running 🔥");
});

// 🔥 MAIN GENERATE API
app.post("/api/generate", async (req, res) => {
  try {
    const { prompt, template, ratio, count, token } = req.body;

    if (!token) {
      return res.json({ status: "error", msg: "No token provided" });
    }

    // 🔥 TEMPLATE APPLY
    let finalPrompt = prompt;

    if (template && template !== "None") {
      const t = templates[template];
      if (t && t.t2i) {
        finalPrompt = t.t2i.replace("{subject}", prompt);
      }
    }

    // 🔥 API CALL
    const apiRes = await axios.post(
      "https://aisandbox-pa.googleapis.com/v1:runImageFx",
      {
        userInput: {
          prompts: [finalPrompt],
          candidatesCount: count || 4,
          seed: Math.floor(Math.random() * 999999),
        },
        clientContext: {
          sessionId: ";" + Date.now(),
          tool: "IMAGE_FX",
        },
        modelInput: {
          modelNameType: "IMAGEN_3_5",
        },
        aspectRatio: mapRatio(ratio),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    const imgs = apiRes.data?.imagePanels?.[0]?.generatedImages || [];

    if (!imgs.length) {
      return res.json({
        status: "error",
        msg: "No images returned",
      });
    }

    const savedImages = [];

    // 🔥 ensure folder
    const dir = path.join(__dirname, "public", "generated");

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // 🔥 SAVE IMAGES
    for (let img of imgs) {
      const fileName = `${Date.now()}-${Math.random()}.jpg`;
      const filePath = path.join(dir, fileName);

      fs.writeFileSync(filePath, Buffer.from(img.encodedImage, "base64"));

      savedImages.push(`http://localhost:5000/generated/${fileName}`);
    }

    return res.json({
      status: "success",
      images: savedImages,
    });
  } catch (err) {
    console.log("ERROR:", err.response?.data || err.message);

    return res.json({
      status: "error",
      msg: err.response?.data?.error?.message || err.message,
    });
  }
});

// 🔥 static folder (important for images)
app.use(
  "/generated",
  express.static(path.join(__dirname, "public", "generated")),
);

app.listen(port, () => {
  console.log(`Server running on port ${port} 🚀`);
});
