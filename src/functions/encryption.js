import { DO_NOT_DECRYPT } from "../components/Constants/constants";
import { formatCard } from "./format";

var CryptoJS = require("crypto-js");

// One way hashing for the password
export function hash(pass, acc, n) {
  pass = CryptoJS.enc.Base64.parse(pass);
  acc = CryptoJS.enc.Base64.parse(acc);

  // HMAC = salt wont be the same for everyone
  let comb = CryptoJS.HmacSHA512(pass, acc);

  // We use pbkdf 5k times (might change in the future)
  let pbkdf2 = CryptoJS.PBKDF2(comb, acc, {
    keySize: 512 / 32,
    iterations: n,
  });

  return CryptoJS.enc.Hex.stringify(pbkdf2);
}

// AES decryption of data with hashed password
export function decrypt(data, pass) {
  for (let i = 0; i < data.length; i++) {
    for (var key in data[i]) {
      // Avoids encrypting data like dates or pk
      if (data[i][key] !== "" && !DO_NOT_DECRYPT.includes(key))
        data[i][key] = CryptoJS.AES.decrypt(data[i][key], pass).toString(
          CryptoJS.enc.Utf8
        );

      // If its a card we add the spaces too EX: 0000 0000 0000 0000
      if (key === "number" && data[i]["type"] === "card")
        data[i][key] = formatCard(data[i][key]);
    }
  }
  return data;
}

// AES encryption of data with hashed pass
export function encrypt(object, pass) {
  for (var key in object) {
    if (
      object[key] !== "" &&
      key !== "type" &&
      key !== "salt" &&
      key !== "hash" &&
      key !== "pk"
    )
      object[key] = CryptoJS.AES.encrypt(object[key], pass).toString();
  }
  return object;
}
