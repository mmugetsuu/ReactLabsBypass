const AES = require('aes-js');
const axios = require('axios');

class BypassProtectionError extends Error {
  constructor(message) {
    super(message);
    this.name = "BypassProtectionError";
  }
}

const extractCookie = (htmlContent) => {
  const decodedPage = htmlContent.replace(/\\x([A-F0-9]{2})/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)));

  const cryptoKeys = decodedPage.match(/[a-f0-9]{32}/g);
  if (!cryptoKeys) {
    throw new BypassProtectionError("No keys");
  }

  const [encryptionKey, Vector, encryptedData] = cryptoKeys.map(AES.utils.hex.toBytes);

  const cookieNameMatch = decodedPage.match(/[a-z0-9]{32}","cookie","(?<name>[^"=]+)/i);
  if (!cookieNameMatch || !cookieNameMatch.groups) {
    throw new BypassProtectionError("No name cookie");
  }

  const cookieName = cookieNameMatch.groups.name;
  const decryptedBytes = new AES.ModeOfOperation.cbc(encryptionKey, Vector).decrypt(encryptedData);
  const cookieValue = AES.utils.hex.fromBytes(decryptedBytes);

  const cookieInfoMatch = decodedPage.match(/(?<info>expires=[^"]]+)/i);
  const cookieInfo = cookieInfoMatch && cookieInfoMatch.groups ? cookieInfoMatch.groups.info : null;

  return {
    cookie: `${cookieName}=${cookieValue}${cookieInfo ? "; " + cookieInfo : ";"}`,
    cookieName,
    cookieValue,
    cookieInfo
  };
};

const bypassReact = async ({ url, headers = {} }) => {
  const initialResponse = await axios.get(url, { headers });
  const pageContent = initialResponse.data;

  if (pageContent.includes('navigator.userAgent') || pageContent.includes('slowAES')) {
    console.log('Bypass...');
    try {
      const { cookie } = extractCookie(pageContent);
      headers['Cookie'] = cookie;
      console.log('Bypassed...');
      const finalResponse = await axios.get(url, { headers });
      return finalResponse.data;  
    } catch (error) {
      console.error('Error bypass:', error);
      throw error;
    }
  } else {
    console.log('No shield...');
    return pageContent;  
  }
};


if (typeof module !== 'undefined' && module.exports) {
  module.exports = { bypassReact };
}


if (typeof define === 'function' && define.amd) {
  define(() => ({ bypassReact }));
}


if (typeof exports === 'object') {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.bypassReact = bypassReact;
}
