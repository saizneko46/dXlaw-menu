const fs = require('fs');
const { tmpdir } = require('os');
const Crypto = require('crypto');
const ff = require('fluent-ffmpeg');
const webp = require('node-webpmux');
const path = require('path');

// Convert image to WebP format
async function imageToWebp(imageData) {
  const webpFilePath = path.join(tmpdir(), `${Crypto.randomBytes(6).toString('hex')}.webp`);
  const jpgFilePath = path.join(tmpdir(), `${Crypto.randomBytes(6).toString('hex')}.jpg`);
  
  fs.writeFileSync(jpgFilePath, imageData);
  
  await new Promise((resolve, reject) => {
    ff(jpgFilePath)
      .on('error', reject)
      .on('end', resolve)
      .addOutputOptions([
        '-vcodec', 'libwebp',
        "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"
      ])
      .toFormat('webp')
      .save(webpFilePath);
  });

  const webpData = fs.readFileSync(webpFilePath);
  fs.unlinkSync(webpFilePath);
  fs.unlinkSync(jpgFilePath);
  return webpData;
}

// Convert video to WebP format
async function videoToWebp(videoData) {
  const webpFilePath = path.join(tmpdir(), `${Crypto.randomBytes(6).toString('hex')}.webp`);
  const mp4FilePath = path.join(tmpdir(), `${Crypto.randomBytes(6).toString('hex')}.mp4`);
  
  fs.writeFileSync(mp4FilePath, videoData);
  
  await new Promise((resolve, reject) => {
    ff(mp4FilePath)
      .on('error', reject)
      .on('end', resolve)
      .addOutputOptions([
        '-vcodec', 'libwebp',
        "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse",
        '-loop', '0',
        '-ss', '00:00:00',
        '-t', '00:00:05',
        '-preset', 'default',
        '-an',
        '-vsync', '0'
      ])
      .toFormat('webp')
      .save(webpFilePath);
  });

  const webpData = fs.readFileSync(webpFilePath);
  fs.unlinkSync(webpFilePath);
  fs.unlinkSync(mp4FilePath);
  return webpData;
}

// Write EXIF data for images
async function writeExifImg(imageData, exifData) {
  const webpImage = await imageToWebp(imageData);
  const webpFilePath = path.join(tmpdir(), `${Crypto.randomBytes(6).toString('hex')}.webp`);

  fs.writeFileSync(webpFilePath, webpImage);
  
  if (exifData.packname || exifData.author) {
    const webpImg = new webp.Image();
    const exifBuffer = createExifBuffer(exifData);

    await webpImg.load(webpFilePath);
    fs.unlinkSync(webpFilePath);
    webpImg.exif = exifBuffer;
    await webpImg.save(webpFilePath);
    return webpFilePath;
  }
}

// Write EXIF data for videos
async function writeExifVid(videoData, exifData) {
  const webpVideo = await videoToWebp(videoData);
  const webpFilePath = path.join(tmpdir(), `${Crypto.randomBytes(6).toString('hex')}.webp`);

  fs.writeFileSync(webpFilePath, webpVideo);
  
  if (exifData.packname || exifData.author) {
    const webpVid = new webp.Image();
    const exifBuffer = createExifBuffer(exifData);

    await webpVid.load(webpFilePath);
    fs.unlinkSync(webpFilePath);
    webpVid.exif = exifBuffer;
    await webpVid.save(webpFilePath);
    return webpFilePath;
  }
}

// Create EXIF buffer from data
function createExifBuffer(exifData) {
  const baseExif = Buffer.from([0x49, 0x49, 0x2a, 0x0, 0x8, 0x0, 0x0, 0x0, 0x1, 0x0, 0x41, 0x57, 0x7, 0x0, 0x0, 0x0, 0x0, 0x0, 0x16, 0x0, 0x0, 0x0]);
  const jsonExif = Buffer.from(JSON.stringify({
    'sticker-pack-id': 'https://github.com/nazedev/naze',
    'sticker-pack-name': exifData.packname,
    'sticker-pack-publisher': exifData.author,
    'emojis': exifData.categories || ['']
  }), 'utf-8');

  const combinedExif = Buffer.concat([baseExif, jsonExif]);
  combinedExif.writeUIntLE(jsonExif.length, 0xe, 4);
  return combinedExif;
}

// Write EXIF data based on input type
async function writeExif(data, exifData) {
  let imageData;

  if (/webp/.test(data.mimetype)) {
    imageData = data.data;
  } else if (/image/.test(data.mimetype)) {
    imageData = await imageToWebp(data.data);
  } else if (/video/.test(data.mimetype)) {
    imageData = await videoToWebp(data.data);
  } else {
    return null;
  }

  const webpFilePath = path.join(tmpdir(), `${Crypto.randomBytes(6).toString('hex')}.webp`);

  fs.writeFileSync(webpFilePath, imageData);
  
  if (exifData.packname || exifData.author) {
    const webpImg = new webp.Image();
    const exifBuffer = createExifBuffer(exifData);

    await webpImg.load(webpFilePath);
    fs.unlinkSync(webpFilePath);
    webpImg.exif = exifBuffer;
    await webpImg.save(webpFilePath);
    return webpFilePath;
  }
}

module.exports = {
  imageToWebp,
  videoToWebp,
  writeExifImg,
  writeExifVid,
  writeExif
};
