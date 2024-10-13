const axios = require("axios");

const quote = async (text, userName, userPhotoUrl) => {
  const requestBody = {
    type: "quote",
    format: 'png',
    backgroundColor: '#FFFFFF',
    width: 512,
    height: 768,
    scale: 2,
    messages: [{
      entities: [],
      avatar: true,
      from: {
        id: 1,
        name: userName,
        photo: {
          url: userPhotoUrl
        }
      },
      text: text,
      replyMessage: {}
    }]
  };

  try {
    const response = await axios.post("https://quote-api.bokov68872.repl.co/generate", requestBody, {
      headers: {
        'Content-Type': "application/json"
      }
    });
    
    const imageBuffer = Buffer.from(response.data.result.image, "base64");
    return {
      status: '200',
      creator: "AdrianTzy",
      result: imageBuffer
    };
  } catch (error) {
    console.error("Error generating quote:", error);
    return {
      status: '500',
      message: "Failed to generate quote."
    };
  }
};

module.exports = {
  quote
};
