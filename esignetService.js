const jose = require("jose");
const { ESIGNET_AUD_URL, CLIENT_PRIVATE_KEY } = require("./config");
const { generateQRData } = require('@mosip/pixelpass')


const alg = "RS256";
const expirationTime = "1h";


/**
 * Triggers /oauth/token API on esignet service to fetch access token
 * @param {string} code auth code
 * @param {string} client_id registered client id
 * @param {string} redirect_uri validated redirect_uri
 * @param {string} grant_type grant_type
 * @returns access token
 */
const post_GetToken = async (
  data
) => {
  console.log(data)
  let t = generateQRData(JSON.stringify(data))
  return t
};


/**
 * Generates client assertion signedJWT
 * @param {string} clientId registered client id
 * @returns client assertion signedJWT
 */
const generateSignedJwt = async (clientId) => {
  // Set headers for JWT
  var header = {
    alg: alg,
    typ: "JWT",
  };

  var payload = {
    iss: clientId,
    sub: clientId,
    aud: ESIGNET_AUD_URL,
  };

  var decodeKey = Buffer.from(CLIENT_PRIVATE_KEY, 'base64')?.toString();
  console.log("decodeKey", decodeKey)
  const jwkObject = JSON.parse(decodeKey);
  const privateKey = await jose.importJWK(jwkObject, alg);
  // var privateKey = await jose.importPKCS8(CLIENT_PRIVATE_KEY, alg);

  const jwt = new jose.SignJWT(payload)
    .setProtectedHeader(header)
    .setIssuedAt()
    .setExpirationTime(expirationTime)
    .sign(privateKey);
  var l = await jwt
  console.log("l========" + l)
  return jwt;
};




module.exports = {
  post_GetToken: post_GetToken
};
