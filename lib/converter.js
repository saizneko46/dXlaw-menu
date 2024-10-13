const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

// FFmpeg processing function
function ffmpeg(inputData, options = [], fileName = '', extension = '') {
  return new Promise(async (resolve, reject) => {
    try {
      const inputFilePath = path.join(__dirname, '../database', `${Date.now()}.${fileName}`);
      const outputFilePath = `${inputFilePath}.${extension}`;
      
      await fs.promises.writeFile(inputFilePath, inputData);
      
      const ffmpegProcess = spawn('ffmpeg', ['-y', '-i', inputFilePath, ...options, outputFilePath]);

      ffmpegProcess.on('error', reject);
      ffmpegProcess.on('close', async (exitCode) => {
        try {
          await fs.promises.unlink(inputFilePath);
          if (exitCode !== 0) {
            return reject(new Error(`FFmpeg exited with code ${exitCode}`));
          }
          const outputData = await fs.promises.readFile(outputFilePath);
          await fs.promises.unlink(outputFilePath);
          resolve(outputData);
        } catch (err) {
          reject(err);
        }
      });
    } catch (err) {
      reject(err);
    }
  });
}

// Convert to audio
function toAudio(inputData, fileName) {
  return ffmpeg(
    inputData,
    ['-vn', '-ac', '2', '-b:a', '128k', '-ar', '44100', '-f', 'mp3'],
    fileName,
    'mp3'
  );
}

// Convert to Opus audio
function toPTT(inputData, fileName) {
  return ffmpeg(
    inputData,
    ['-vn', '-c:a', 'libopus', '-b:a', '128k', '-vbr', 'on', '-compression_level', '10'],
    fileName,
    'opus'
  );
}

// Convert to video
function toVideo(inputData, fileName) {
  return ffmpeg(
    inputData,
    ['-c:v', 'libx264', '-c:a', 'aac', '-b:a', '128k', '-ar', '44100', '-crf', '32', '-preset', 'slow'],
    fileName,
    'mp4'
  );
}

module.exports = {
  toAudio,
  toPTT,
  toVideo,
  ffmpeg
};
