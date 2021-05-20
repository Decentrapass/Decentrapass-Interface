import { IF } from "../components/Constants/AddInterfaces";
import { TYPES } from "../components/Constants/constants";

export const formatCard = (card) => {
  let result = "";
  for (let i = 0; i < card.length; i += 4) {
    result += card.substring(i, i + 4) + " ";
  }
  return result.substring(0, result.length - 1);
};

export async function formatData(numItems, contract, acc) {
  let arr = [];
  let count = 0;
  for (let i = 0; i < numItems; i++) {
    let itemData = await contract.objects(acc, i).call();

    let type = itemData[0];

    if (itemData[1] != "") {
      let ipfsData;
      let url = "https://gateway.ipfs.io/ipfs/" + itemData[1];

      let res = await fetch(url);
      ipfsData = await res.text();

      let receivedData = ipfsData.split(",");

      let data = {
        numId: count++,
        id: i,
        type: TYPES[type],
      };

      let correspondingIF = Object.keys(IF[TYPES[type]]);

      for (let j = 0; j < receivedData.length; j++) {
        data[correspondingIF[j]] = receivedData[j];
      }

      arr.push(data);
    }
  }

  return arr;
}

export function formatItem(type, item, id, nextId) {
  let data = {
    numId: id,
    id: nextId,
    type: TYPES[type],
  };

  let correspondingIF = Object.keys(IF[TYPES[type]]);

  for (let j = 0; j < item.length; j++) {
    data[correspondingIF[j]] = item[j];
  }

  return data;
}

export function formatSend(data) {
  let str = "";
  for (const item of data) {
    str += item + ",";
  }
  return str.substring(0, str.length - 1);
}

export function formatAccount(acc, n) {
  acc = acc || "";
  let shortAcc =
    acc.substring(0, n + 2) + "..." + acc.substring(acc.length - n, acc.length);

  return shortAcc;
}
