const {
  proto,
  delay,
  getContentType
} = require("@whiskeysockets/baileys");
const chalk = require("chalk");
const fs = require('fs');
const axios = require('axios');
const moment = require("moment-timezone");
const {
  sizeFormatter
} = require("human-readable");
const util = require("util");
const Jimp = require("jimp");
const unixTimestampSeconds = (_0x9755e5 = new Date()) => Math.floor(_0x9755e5.getTime() / 0x3e8);
exports.unixTimestampSeconds = unixTimestampSeconds;
exports.generateMessageTag = _0x255ba6 => {
  0x0;
  let _0x41dc7a = exports.unixTimestampSeconds().toString();
  if (_0x255ba6) {
    _0x41dc7a += '.--' + _0x255ba6;
  }
  return _0x41dc7a;
};
exports.processTime = (_0x4f0ea4, _0x445274) => {
  return moment.duration(_0x445274 - moment(_0x4f0ea4 * 0x3e8)).asSeconds();
};
exports.getRandom = _0x1de5c3 => {
  return '' + Math.floor(Math.random() * 0x2710) + _0x1de5c3;
};
exports.getBuffer = async (_0x4b2d16, _0x4be99d) => {
  try {
    if (_0x4be99d) {
      _0x4be99d;
    } else {
      ({});
    }
    const _0x5363b6 = await axios({
      'method': "get",
      'url': _0x4b2d16,
      'headers': {
        'DNT': 0x1,
        'Upgrade-Insecure-Request': 0x1
      },
      ..._0x4be99d,
      'responseType': "arraybuffer"
    });
    return _0x5363b6.data;
  } catch (_0x508a4c) {
    return _0x508a4c;
  }
};
exports.getImg = async (_0x2cd695, _0x6506b4) => {
  try {
    if (_0x6506b4) {
      _0x6506b4;
    } else {
      ({});
    }
    const _0x5b020a = await axios({
      'method': "get",
      'url': _0x2cd695,
      'headers': {
        'DNT': 0x1,
        'Upgrade-Insecure-Request': 0x1
      },
      ..._0x6506b4,
      'responseType': "arraybuffer"
    });
    return _0x5b020a.data;
  } catch (_0x59c771) {
    return _0x59c771;
  }
};
exports.fetchJson = async (_0x538b58, _0x583e5e) => {
  try {
    if (_0x583e5e) {
      _0x583e5e;
    } else {
      ({});
    }
    const _0x1316e8 = await axios({
      'method': "GET",
      'url': _0x538b58,
      'headers': {
        'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36"
      },
      ..._0x583e5e
    });
    return _0x1316e8.data;
  } catch (_0x4ae794) {
    return _0x4ae794;
  }
};
exports.runtime = function (_0x1167bb) {
  _0x1167bb = Number(_0x1167bb);
  var _0x40409c = Math.floor(_0x1167bb / 86400);
  var _0x158904 = Math.floor(_0x1167bb % 86400 / 0xe10);
  var _0x3ca803 = Math.floor(_0x1167bb % 0xe10 / 0x3c);
  var _0x4be33a = Math.floor(_0x1167bb % 0x3c);
  var _0x2375a2 = _0x40409c > 0x0 ? _0x40409c + (_0x40409c == 0x1 ? " day, " : " days, ") : '';
  var _0x32cda1 = _0x158904 > 0x0 ? _0x158904 + (_0x158904 == 0x1 ? " hour, " : " hours, ") : '';
  var _0x275ee5 = _0x3ca803 > 0x0 ? _0x3ca803 + (_0x3ca803 == 0x1 ? " minute, " : " minutes, ") : '';
  var _0x4c5af6 = _0x4be33a > 0x0 ? _0x4be33a + (_0x4be33a == 0x1 ? " second" : " seconds") : '';
  return _0x2375a2 + _0x32cda1 + _0x275ee5 + _0x4c5af6;
};
exports.clockString = _0x53f5e0 => {
  let _0x3d72bf = isNaN(_0x53f5e0) ? '--' : Math.floor(_0x53f5e0 / 0x36ee80);
  let _0x1e766e = isNaN(_0x53f5e0) ? '--' : Math.floor(_0x53f5e0 / 0xea60) % 0x3c;
  let _0x4dcd2b = isNaN(_0x53f5e0) ? '--' : Math.floor(_0x53f5e0 / 0x3e8) % 0x3c;
  return [_0x3d72bf, _0x1e766e, _0x4dcd2b].map(_0x12c843 => _0x12c843.toString().padStart(0x2, 0x0)).join(':');
};
exports.sleep = async _0x25e9e2 => {
  return new Promise(_0x49c73b => setTimeout(_0x49c73b, _0x25e9e2));
};
exports.isUrl = _0x2b9df3 => {
  return _0x2b9df3.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'));
};
exports.getTime = (_0x104f60, _0x5b422f) => {
  return _0x5b422f ? moment(_0x5b422f).locale('id').format(_0x104f60) : moment.tz("Asia/Jakarta").locale('id').format(_0x104f60);
};
exports.formatDate = (_0x3f2614, _0x270e7f = 'id') => {
  let _0x30d6f5 = new Date(_0x3f2614);
  return _0x30d6f5.toLocaleDateString(_0x270e7f, {
    'weekday': "long",
    'day': "numeric",
    'month': "long",
    'year': "numeric",
    'hour': "numeric",
    'minute': "numeric",
    'second': "numeric"
  });
};
exports.tanggal = _0x33faa2 => {
  myMonths = ["Januari", "Februari", 'Maret', "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  myDays = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum’at", "Sabtu"];
  var _0x215a0b = new Date(_0x33faa2);
  var _0x316cc7 = _0x215a0b.getDate();
  bulan = _0x215a0b.getMonth();
  var _0x4a6c99 = _0x215a0b.getDay();
  var _0x4a6c99 = myDays[_0x4a6c99];
  var _0x51fd4b = _0x215a0b.getYear();
  var _0x182568 = _0x51fd4b < 0x3e8 ? _0x51fd4b + 0x76c : _0x51fd4b;
  return _0x4a6c99 + ", " + _0x316cc7 + " - " + myMonths[bulan] + " - " + _0x182568;
};
exports.jam = (_0x4f67e8, _0x3ccc44 = {}) => {
  let _0x2e0c5c = _0x3ccc44.format ? _0x3ccc44.format : "HH:mm";
  let _0x383d51 = _0x3ccc44?.["timeZone"] ? moment(_0x4f67e8).tz(timeZone).format(_0x2e0c5c) : moment(_0x4f67e8).format(_0x2e0c5c);
  return '' + _0x383d51;
};
exports.formatp = sizeFormatter({
  'std': "JEDEC",
  'decimalPlaces': 0x2,
  'keepTrailingZeroes': false,
  'render': (_0x53d6c3, _0x531e3d) => _0x53d6c3 + " " + _0x531e3d + 'B'
});
exports.json = _0x1f1232 => {
  return JSON.stringify(_0x1f1232, null, 0x2);
};
function format(..._0x456a84) {
  return util.format(..._0x456a84);
}
exports.logic = (_0x174677, _0x172494, _0x198403) => {
  if (_0x172494.length !== _0x198403.length) {
    throw new Error("Input and Output must have same length");
  }
  for (let _0x628484 in _0x172494) if (util.isDeepStrictEqual(_0x174677, _0x172494[_0x628484])) {
    return _0x198403[_0x628484];
  }
  return null;
};
exports.generateProfilePicture = async _0x2c3162 => {
  const _0x5e18a8 = await Jimp.read(_0x2c3162);
  const _0x3c47f6 = _0x5e18a8.getWidth();
  const _0x433fb5 = _0x5e18a8.getHeight();
  const _0x37a048 = _0x5e18a8.crop(0x0, 0x0, _0x3c47f6, _0x433fb5);
  return {
    'img': await _0x37a048.scaleToFit(0x2d0, 0x2d0).getBufferAsync(Jimp.MIME_JPEG),
    'preview': await _0x37a048.scaleToFit(0x2d0, 0x2d0).getBufferAsync(Jimp.MIME_JPEG)
  };
};
exports.bytesToSize = (_0x2208f8, _0x26b835 = 0x2) => {
  if (_0x2208f8 === 0x0) {
    return "0 Bytes";
  }
  const _0x283f87 = _0x26b835 < 0x0 ? 0x0 : _0x26b835;
  const _0x363143 = ["Bytes", 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const _0x47b26d = Math.floor(Math.log(_0x2208f8) / Math.log(0x400));
  return parseFloat((_0x2208f8 / Math.pow(0x400, _0x47b26d)).toFixed(_0x283f87)) + " " + _0x363143[_0x47b26d];
};
exports.getSizeMedia = _0x3db319 => {
  return new Promise((_0x5e061e, _0x264824) => {
    if (/http/.test(_0x3db319)) {
      axios.get(_0x3db319).then(_0x3602aa => {
        let _0x4d6a05 = parseInt(_0x3602aa.headers['content-length']);
        let _0x15c006 = exports.bytesToSize(_0x4d6a05, 0x3);
        if (!isNaN(_0x4d6a05)) {
          _0x5e061e(_0x15c006);
        }
      });
    } else {
      if (Buffer.isBuffer(_0x3db319)) {
        let _0x5b3e1b = Buffer.byteLength(_0x3db319);
        let _0x37d458 = exports.bytesToSize(_0x5b3e1b, 0x3);
        if (!isNaN(_0x5b3e1b)) {
          _0x5e061e(_0x37d458);
        }
      } else {
        _0x264824("error gatau apah");
      }
    }
  });
};
exports.parseMention = (_0x93d3b8 = '') => {
  return [..._0x93d3b8.matchAll(/@([0-9]{5,16}|0)/g)].map(_0x326d71 => _0x326d71[0x1] + "@s.whatsapp.net");
};
exports.getGroupAdmins = _0x2b83bf => {
  let _0x265191 = [];
  for (let _0x275b22 of _0x2b83bf) {
    if (_0x275b22.admin === 'superadmin') {
      _0x265191.push(_0x275b22.id);
    } else if (_0x275b22.admin === 'admin') {
      _0x265191.push(_0x275b22.id);
    } else {
      '';
    }
  }
  return _0x265191 || [];
};
exports.smsg = (_0x392b63, _0x2d8011, _0x380e4e) => {
  if (!_0x2d8011) {
    return _0x2d8011;
  }
  let _0x31ed0d = proto.WebMessageInfo;
  if (_0x2d8011.key) {
    _0x2d8011.id = _0x2d8011.key.id;
    _0x2d8011.isBaileys = _0x2d8011.id.startsWith("BAE5") && _0x2d8011.id.length === 0x10;
    _0x2d8011.chat = _0x2d8011.key.remoteJid;
    _0x2d8011.fromMe = _0x2d8011.key.fromMe;
    _0x2d8011.isGroup = _0x2d8011.chat.endsWith('@g.us');
    _0x2d8011.sender = _0x392b63.decodeJid(_0x2d8011.fromMe && _0x392b63.user.id || _0x2d8011.participant || _0x2d8011.key.participant || _0x2d8011.chat || '');
    if (_0x2d8011.isGroup) {
      _0x2d8011.participant = _0x392b63.decodeJid(_0x2d8011.key.participant) || '';
    }
  }
  if (_0x2d8011.message) {
    _0x2d8011.mtype = getContentType(_0x2d8011.message);
    _0x2d8011.msg = _0x2d8011.mtype == 'viewOnceMessage' ? _0x2d8011.message[_0x2d8011.mtype].message[getContentType(_0x2d8011.message[_0x2d8011.mtype].message)] : _0x2d8011.message[_0x2d8011.mtype];
    _0x2d8011.body = _0x2d8011.message.conversation || _0x2d8011.msg.caption || _0x2d8011.msg.text || _0x2d8011.mtype == "listResponseMessage" && _0x2d8011.msg.singleSelectReply.selectedRowId || _0x2d8011.mtype == "buttonsResponseMessage" && _0x2d8011.msg.selectedButtonId || _0x2d8011.mtype == "viewOnceMessage" && _0x2d8011.msg.caption || _0x2d8011.text;
    let _0xf7127f = _0x2d8011.quoted = _0x2d8011.msg.contextInfo ? _0x2d8011.msg.contextInfo.quotedMessage : null;
    _0x2d8011.mentionedJid = _0x2d8011.msg.contextInfo ? _0x2d8011.msg.contextInfo.mentionedJid : [];
    if (_0x2d8011.quoted) {
      let _0x561afa = getContentType(_0xf7127f);
      _0x2d8011.quoted = _0x2d8011.quoted[_0x561afa];
      if (["productMessage"].includes(_0x561afa)) {
        _0x561afa = getContentType(_0x2d8011.quoted);
        _0x2d8011.quoted = _0x2d8011.quoted[_0x561afa];
      }
      if (typeof _0x2d8011.quoted === "string") {
        _0x2d8011.quoted = {
          'text': _0x2d8011.quoted
        };
      }
      _0x2d8011.quoted.mtype = _0x561afa;
      _0x2d8011.quoted.id = _0x2d8011.msg.contextInfo.stanzaId;
      _0x2d8011.quoted.chat = _0x2d8011.msg.contextInfo.remoteJid || _0x2d8011.chat;
      _0x2d8011.quoted.isBaileys = _0x2d8011.quoted.id ? _0x2d8011.quoted.id.startsWith("BAE5") && _0x2d8011.quoted.id.length === 0x10 : false;
      _0x2d8011.quoted.sender = _0x392b63.decodeJid(_0x2d8011.msg.contextInfo.participant);
      _0x2d8011.quoted.fromMe = _0x2d8011.quoted.sender === (_0x392b63.user && _0x392b63.user.id);
      _0x2d8011.quoted.text = _0x2d8011.quoted.text || _0x2d8011.quoted.caption || _0x2d8011.quoted.conversation || _0x2d8011.quoted.contentText || _0x2d8011.quoted.selectedDisplayText || _0x2d8011.quoted.title || '';
      _0x2d8011.quoted.mentionedJid = _0x2d8011.msg.contextInfo ? _0x2d8011.msg.contextInfo.mentionedJid : [];
      _0x2d8011.getQuotedObj = _0x2d8011.getQuotedMessage = async () => {
        if (!_0x2d8011.quoted.id) {
          return false;
        }
        let _0x58eaf1 = await _0x380e4e.loadMessage(_0x2d8011.chat, _0x2d8011.quoted.id, _0x392b63);
        return exports.smsg(_0x392b63, _0x58eaf1, _0x380e4e);
      };
      let _0x2d2364 = _0x2d8011.quoted.fakeObj = _0x31ed0d.fromObject({
        'key': {
          'remoteJid': _0x2d8011.quoted.chat,
          'fromMe': _0x2d8011.quoted.fromMe,
          'id': _0x2d8011.quoted.id
        },
        'message': _0xf7127f,
        ...(_0x2d8011.isGroup ? {
          'participant': _0x2d8011.quoted.sender
        } : {})
      });
      _0x2d8011.quoted["delete"] = () => _0x392b63.sendMessage(_0x2d8011.quoted.chat, {
        'delete': _0x2d2364.key
      });
      _0x2d8011.quoted.copyNForward = (_0x2cb6a2, _0x37ff8d = false, _0x350090 = {}) => _0x392b63.copyNForward(_0x2cb6a2, _0x2d2364, _0x37ff8d, _0x350090);
      _0x2d8011.quoted.download = () => _0x392b63.downloadMediaMessage(_0x2d8011.quoted);
    }
  }
  if (_0x2d8011.msg.url) {
    _0x2d8011.download = () => _0x392b63.downloadMediaMessage(_0x2d8011.msg);
  }
  _0x2d8011.text = _0x2d8011.msg.text || _0x2d8011.msg.caption || _0x2d8011.message.conversation || _0x2d8011.msg.contentText || _0x2d8011.msg.selectedDisplayText || _0x2d8011.msg.title || '';
  _0x2d8011.reply = (_0x45d248, _0x18f033 = _0x2d8011.chat, _0x11c037 = {}) => Buffer.isBuffer(_0x45d248) ? _0x392b63.sendMedia(_0x18f033, _0x45d248, "file", '', _0x2d8011, {
    ..._0x11c037
  }) : _0x392b63.sendText(_0x18f033, _0x45d248, _0x2d8011, {
    ..._0x11c037
  });
  _0x2d8011.copy = () => exports.smsg(_0x392b63, _0x31ed0d.fromObject(_0x31ed0d.toObject(_0x2d8011)));
  _0x2d8011.copyNForward = (_0x29c35a = _0x2d8011.chat, _0x80df0e = false, _0x456d90 = {}) => _0x392b63.copyNForward(_0x29c35a, _0x2d8011, _0x80df0e, _0x456d90);
  return _0x2d8011;
};
exports.reSize = (_0x540775, _0x324472, _0x195b0d) => {
  return new Promise(async (_0x2f5486, _0x46faa7) => {
    var _0x3ff121 = await Jimp.read(_0x540775);
    var _0x17ddbf = await _0x3ff121.resize(_0x324472, _0x195b0d).getBufferAsync(Jimp.MIME_JPEG);
    _0x2f5486(_0x17ddbf);
  });
};
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright("Update " + __filename));
  delete require.cache[file];
  require(file);
});