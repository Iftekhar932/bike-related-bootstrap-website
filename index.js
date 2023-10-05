/* 
toBase64 function name = base64Converter
replaceSpecialChars function name = characterReplacer
*/

const base64Converter = (obj) => {
  const str = JSON.stringify(obj);
  // returns string converted to base64
  return Buffer.from(str).toString("base64"); // "Buffer.from(str)" makes a Buffer encoded to "base64" out of "str"
};

// Base64 Strings contain symbols that are misinterpreted when used in a URL. so they're going to be replaced
const characterReplacer = function (encodedString) {
  return encodedString?.replace("/[+=/]/g", function (charToReplace) {
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
const postReplaceHeader = characterReplacer(encodedHeader);

console.log("💓💓💓", postReplaceHeader);

// a sample payload
const payload = {
  iss: "a_random_server_name", //information about the server that issued the token
  exp: 872990, // tokens expiry date in milliseconds
  // information about some random user
  name: "John Bobo",
  email: "myemail@test.com",
  isHuman: true,
};

const encodedPayload = base64Converter(payload);
const postEncodedPayload = characterReplacer(encodedPayload);

console.log(postEncodedPayload);
