const ImageKit = require("imagekit");

const imagekit = new ImageKit({
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY,
    urlEndpoint: process.env.URL_ENDPOINT,
});

// Optional helper function (keep it if you want)
async function uploadFile(file, fileName, folder = "/habitracker/journals") {
    const response = await imagekit.upload({
        file,
        fileName,
        folder
    });

    return response;
}

// EXPORT BOTH
module.exports = {
    imagekit,
    uploadFile
};
