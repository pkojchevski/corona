import _ from "lodash";

export function csvJSON(csv) {
  const lines = csv.split("\n");
  const result = [];

  let headers = lines[0].split(",");
  headers[0] = "Province";
  headers[1] = "Country";

  headers = headers.map((header, index) =>
    index < 4 ? header : "date" + header
  );

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i]) continue;
    const obj = {};
    let currentLine = [];
    if (lines[i].indexOf('"') > -1) {
      if (lines[i][0] === ",") lines[i] = "xx" + lines[i];
      currentLine = [...lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g)];
    } else {
      currentLine = [...lines[i].split(",")];
    }

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentLine[j];
    }
    result.push(obj);
  }
  return result;
}

export function sumCountryQty(arr) {
  let newArr = [];
  let el;
  let duplicateInd = [];
  for (let i = 0; i < arr.length; i++) {
    el = null;
    if (!duplicateInd.includes(i)) {
      for (let j = i + 1; j < arr.length - 1; j++) {
        if (
          arr[i].Country.toLowerCase().trim() ===
          arr[j].Country.toLowerCase().trim()
        ) {
          Object.keys(arr[i]).forEach(key => {
            if (key.includes("date")) {
              el = arr[i];
              el[key] = arr[j][key] ? +el[key] + +arr[j][key] : el[key];
              duplicateInd.push(j);
            }
          });
        }
      }
      if (el) newArr.push(el);
      if (!el) newArr.push(arr[i]);
    }
  }
  return newArr;
}

export function mergeObjectsInArray(arr) {
  let groupedItems = [];
  arr.forEach(e => {
    if (groupedItems.findIndex(x => x.Country === e.Country) < 0) {
      arr.filter(x => x.Country === e.Country);
      groupedItems.push({ ...e });
    }
  });
  return groupedItems;
}

const deepMergeSum = (obj1, obj2) => {
  return Object.keys(obj1).reduce((acc, key) => {
    if (typeof obj2[key] === "object") {
      acc[key] = deepMergeSum(obj1[key], obj2[key]);
    } else if (obj2.hasOwnProperty(key) && !isNaN(parseFloat(obj2[key]))) {
      acc[key] = +obj1[key] + +obj2[key];
    }
    return acc;
  }, {});
};
