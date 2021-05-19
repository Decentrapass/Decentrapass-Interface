import { DO_NOT_DECRYPT } from "../components/Constants/constants";
import { formatCard } from "./format";

var CryptoJS = require("crypto-js");

export function hash(pass, acc) {
  pass = CryptoJS.enc.Base64.parse(pass);
  acc = CryptoJS.enc.Base64.parse(acc);

  let comb = CryptoJS.HmacSHA512(pass, acc);

  let pbkdf2 = CryptoJS.PBKDF2(comb, acc, {
    keySize: 512 / 32,
    iterations: 5000,
  });

  return CryptoJS.enc.Hex.stringify(pbkdf2);
}

export function decrypt(data, pass) {
  for (let i = 0; i < data.length; i++) {
    for (var key in data[i]) {
      // Avoids encrypting data like dates or pk
      if (data[i][key] !== "" && !DO_NOT_DECRYPT.includes(key))
        data[i][key] = CryptoJS.AES.decrypt(data[i][key], pass).toString(
          CryptoJS.enc.Utf8
        );

      if (key === "number" && data[i]["type"] === "card")
        data[i][key] = formatCard(data[i][key]);
    }
  }
  return data;
}

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
