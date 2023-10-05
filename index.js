/* 
toBase64 function name = base64Converter
replaceSpecialChars function name = characterReplacer
*/

const crypto = require("crypto");

const base64Converter = (obj) => {
  const str = JSON.stringify(obj);
  // returns string converted to base64
  return Buffer.from(str).toString("base64"); // "Buffer.from(str)" makes a Buffer encoded to "base64" out of "str"
};

// Base64 Strings contain symbols that are misinterpreted when used in a URL. so they're going to be replaced
const characterReplacer = function (encodedString) {
  return encodedString?.replace(/[+=/]/g, function (charToReplace) {
    // create a regex to match any of the characters =,+ or / and replace them with their // substitutes
    switch (charToReplace) {
      case "=":
        return "";
      case "+":
        return "-";
      case "/":
        return "_";
    }
  });
};

// dummy header
const header = {
  alg: "HS256",
  typ: "JWT",
};
const encodedHeader = base64Converter(header);
const postReplaceHeaderForJWT = characterReplacer(encodedHeader);

// a sample payload
const payload = {
  iss: "a_random_server_name", //information about the server that issued the token
  exp: 872990, // tokens expiry date in milliseconds
  // information about some random user
  name: "John lobo",
  email: "myemail@test.com",
  isHuman: true,
};

const encodedPayload = base64Converter(payload);
const postReplacePayloadForJWT = characterReplacer(encodedPayload);

const signCreation = (
  postReplaceHeaderForJWT,
  postReplacePayloadForJWT,
  secret
) => {
  // create a HMAC(hash based message authentication code) using sha256 hashing alg
  let signature = crypto.createHmac("sha256", secret);
  console.log("✨ 🌟  signature:", signature);

  // use the update method to hash a string formed from our postReplaceHeaderForJWT, a period "." and postReplacePayloadForJWT
  signature.update(postReplaceHeaderForJWT + "." + postReplacePayloadForJWT);
  console.log("✨ 🌟  signature:", signature);

  // signature needs to be converted to base64 to make it usable
  signature = signature.digest("base64"); //digest( ) method is an inbuilt function of the crypto module's Hash class
  console.log("✨ 🌟  signature:", signature);
  /* This is used to create the digest of the data which is passed when creating the hash. For example, when we create a hash we first create an instance of Hash using crypto. */

  // of course we need to clean the base64 string of URL special characters
  signature = characterReplacer(signature);
  console.log("✨ 🌟  signature:", signature);
  return signature;
};

const secret = crypto.randomBytes(32).toString("hex");
const signature = signCreation(
  postReplaceHeaderForJWT,
  postReplacePayloadForJWT,
  secret
);

console.log(signature);
