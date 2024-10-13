const fs = require('fs');
const toMs = require('ms');
const premium = JSON.parse(fs.readFileSync("./database/premium.json"));

const addPremiumUser = (userId, duration, premiumList) => {
  const existingUser = premium.find(user => user.id === userId);
  if (existingUser) {
    existingUser.expired += toMs(duration);
  } else {
    const newUser = {
      id: userId,
      expired: Date.now() + toMs(duration)
    };
    premiumList.push(newUser);
  }
  fs.writeFileSync('./database/premium.json', JSON.stringify(premiumList));
};

const getPremiumPosition = (userId, premiumList) => {
  return premiumList.findIndex(user => user.id === userId);
};

const getPremiumExpired = (userId, premiumList) => {
  const user = premiumList.find(user => user.id === userId);
  return user ? user.expired : null;
};

const checkPremiumUser = (userId, premiumList) => {
  return premiumList.some(user => user.id === userId);
};

module.exports = {
  addPremiumUser,
  getPremiumExpired,
  getPremiumPosition,
  checkPremiumUser
};
