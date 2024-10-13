const fs = require('fs');

// Function to add an AFK user
const addAfkUser = (id, time, reason, afkList) => {
  const afkUser = {
    id,
    time,
    reason
  };
  afkList.push(afkUser);
  fs.writeFileSync('./database/afk-user.json', JSON.stringify(afkList, null, 2));
};

// Function to check if a user is AFK
const checkAfkUser = (userId, afkList) => {
  return afkList.some(user => user.id === userId);
};

// Function to get the reason for being AFK
const getAfkReason = (userId, afkList) => {
  const afkUser = afkList.find(user => user.id === userId);
  return afkUser ? afkUser.reason : null;
};

// Function to get the time a user has been AFK
const getAfkTime = (userId, afkList) => {
  const afkUser = afkList.find(user => user.id === userId);
  return afkUser ? afkUser.time : null;
};

// Function to get the ID of an AFK user
const getAfkId = (userId, afkList) => {
  const afkUser = afkList.find(user => user.id === userId);
  return afkUser ? afkUser.id : null;
};

// Function to get the position of an AFK user in the list
const getAfkPosition = (userId, afkList) => {
  return afkList.findIndex(user => user.id === userId);
};

module.exports = {
  addAfkUser,
  checkAfkUser,
  getAfkReason,
  getAfkTime,
  getAfkId,
  getAfkPosition
};
