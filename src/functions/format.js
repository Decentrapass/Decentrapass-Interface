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
  // "Google,google.com,dmelchor,dmh672@gmail.com,abcdefg12345,this should be a note"
  let arr = [];
  let count = 0;
  for (let i = 0; i < numItems; i++) {
    let itemData = await contract.objects(acc, i).call();

    let type = itemData[0];
    let receivedData = itemData[1].split(",");
    let displayed = itemData[2];

    if (displayed) {
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
