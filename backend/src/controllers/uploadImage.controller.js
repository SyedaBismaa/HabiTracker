const uploadFile = require("../service/Imagekit.service");

async function uploadImage(req, res) {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const file = req.files.image;
    const base64 = file.data.toString("base64");

    const uploaded = await uploadFile(base64, file.name);

    res.status(200).json({
      message: "Image uploaded successfully",
      url: uploaded.url,
    });

  } catch (err) {
    res.status(500).json({
      message: "Image upload failed",
      error: err.message,
    });
  }
}

module.exports = uploadImage;
