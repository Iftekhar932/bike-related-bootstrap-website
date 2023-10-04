/* 
toBase64 function name = base64Converter
replaceSpecialChars function name = characterReplacerFunction
*/

step :::1

const base64Converter = (obj) => {
  const str = JSON.stringify(obj);
  // returns string converted to base64
  return Buffer.from(str).toString("base64"); // "Buffer.from(str)" makes a Buffer encoded to "base64" out of "str"
};

// Base64 Strings contain symbols that are misinterpreted when used in a URL. so they're going to be replaced
const characterReplacerFunction =
  ("/[+=/]/g",
  function (charToReplace) {
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
