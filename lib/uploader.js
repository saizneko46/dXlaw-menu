const axios = require("axios");
const BodyForm = require("form-data");
const { fromBuffer } = require("file-type");
const fetch = require("node-fetch");
const fs = require('fs');
const cheerio = require('cheerio');

function uploadToTelegraPh(filePath) {
  return new Promise(async (resolve, reject) => {
    if (!fs.existsSync(filePath)) {
      return reject(new Error("File not found"));
    }
    try {
      const form = new BodyForm();
      form.append("file", fs.createReadStream(filePath));
      const response = await axios({
        url: "https://telegra.ph/upload",
        method: "POST",
        headers: {
          ...form.getHeaders()
        },
        data: form
      });
      resolve('https://telegra.ph' + response.data[0].src);
    } catch (error) {
      reject(new Error(String(error)));
    }
  });
}

async function uploadFileToUgu(filePath) {
  return new Promise(async (resolve, reject) => {
    const form = new BodyForm();
    form.append("files[]", fs.createReadStream(filePath));
    try {
      const response = await axios({
        url: "https://uguu.se/upload.php",
        method: 'POST',
        headers: {
          'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
          ...form.getHeaders()
        },
        data: form
      });
      resolve(response.data.files[0]);
    } catch (error) {
      reject(error);
    }
  });
}

function convertWebPToMP4(filePath) {
  return new Promise((resolve, reject) => {
    const form = new BodyForm();
    form.append("new-image-url", '');
    form.append("new-image", fs.createReadStream(filePath));
    
    axios({
      method: "POST",
      url: "https://s6.ezgif.com/webp-to-mp4",
      data: form,
      headers: {
        'Content-Type': "multipart/form-data; boundary=" + form._boundary
      }
    }).then(({ data }) => {
      const $ = cheerio.load(data);
      const fileValue = $("input[name='file']").attr("value");
      const convertForm = new BodyForm();
      convertForm.append("file", fileValue);
      convertForm.append('convert', "Convert WebP to MP4!");
      
      axios({
        method: "POST",
        url: "https://ezgif.com/webp-to-mp4/" + fileValue,
        data: convertForm,
        headers: {
          'Content-Type': "multipart/form-data; boundary=" + convertForm._boundary
        }
      }).then(({ data }) => {
        const $ = cheerio.load(data);
        const videoSrc = "https:" + $("div#output > p.outfile > video > source").attr("src");
        resolve({
          status: true,
          message: "Created By MRHRTZ",
          result: videoSrc
        });
      }).catch(reject);
    }).catch(reject);
  });
}

async function uploadToFloNime(buffer, options = {}) {
  const { ext } = (await fromBuffer(buffer)) || options.ext;
  const form = new BodyForm();
  form.append("file", buffer, "tmp." + ext);
  
  const response = await fetch("https://flonime.my.id/upload", {
    method: "POST",
    body: form
  });
  return await response.json();
}

module.exports = {
  uploadToTelegraPh,
  uploadFileToUgu,
  convertWebPToMP4,
  uploadToFloNime
};
