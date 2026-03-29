import axios from "axios";
import fs from "fs";
import path from "path";
import templates from "../../../data/templates.json";
// ✅ 🔥 এখানেই বসাবি
function mapRatio(ratio) {
  if (ratio === "16:9") return "IMAGE_ASPECT_RATIO_LANDSCAPE";
  if (ratio === "9:16") return "IMAGE_ASPECT_RATIO_PORTRAIT";
  if (ratio === "1:1") return "IMAGE_ASPECT_RATIO_SQUARE";
  return "IMAGE_ASPECT_RATIO_LANDSCAPE";
}

export async function POST(req) {
  try {
    const body = await req.json();

    const { prompt, template, ratio, count, token } = body;

    if (!token) {
      return Response.json({ status: "error", msg: "No token provided" });
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
    const res = await axios.post(
      "https://aisandbox-pa.googleapis.com/v1:runImageFx",
      {
        userInput: {
          prompts: [finalPrompt],
          candidatesCount: count || 4,
          seed: Math.floor(Math.random() * 999999), // 🔥 ADD
        },

        clientContext: {
          sessionId: ";" + Date.now(), // 🔥 ADD
          tool: "IMAGE_FX",
        },

        modelInput: {
          modelNameType: "IMAGEN_3_5", // 🔥 ADD
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

    const imgs = res.data?.imagePanels?.[0]?.generatedImages || [];

    const savedImages = [];

    const dir = path.join(process.cwd(), "public", "generated");

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // 🔥 SAVE IMAGES
    for (let img of imgs) {
      const fileName = `${Date.now()}-${Math.random()}.jpg`;

      const filePath = path.join(
        process.cwd(),
        "public",
        "generated",
        fileName,
      );

      fs.writeFileSync(filePath, Buffer.from(img.encodedImage, "base64"));

      savedImages.push(`/generated/${fileName}`);
    }

    return new Response(
      JSON.stringify({
        status: "success",
        images: savedImages,
      }),
      {
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    console.log("ERROR:", err.response?.data || err.message);

    return new Response(
      JSON.stringify({
        status: "error",
        msg: err.response?.data?.error?.message || err.message,
      }),
      {
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
