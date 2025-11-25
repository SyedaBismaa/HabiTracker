const express = require("express");
const router = express.Router();

const upload = require("../middlewares/multer");
const auth = require("../middlewares/auth.middlewares");
const { imagekit } = require("../service/Imagekit.service");
const { updateProfile } = require("../controllers/user.controller");

// TEST Upload API
router.post("/test-upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const uploadResult = await imagekit.upload({
      file: req.file.buffer.toString("base64"),
      fileName: `test_${Date.now()}.jpg`,
      folder: "/habitracker/tests"
    });

    res.json({
      message: "Image Uploaded Successfully",
      url: uploadResult.url
    });

  } catch (error) {
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
});

// Profile Update API
router.put("/update-profile", auth, upload.single("avatar"), updateProfile);

module.exports = router;
