const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
  urlEndpoint: process.env.URL_ENDPOINT,
});

async function uploadFile(file, fileName, folder) {
  return await imagekit.upload({
    file,
    fileName,
    folder,
  });
}

module.exports = { imagekit, uploadFile };
