import React, { useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

import {
  Base16ToBase2,
  PC1,
  shiftKeyList,
  PC2,
  IP,
  EBITSELECTION,
  Base10ToBase2,
  sTables,
  P,
  IP_1,
} from "./static";

export default function Des() {
  const [key, setKey] = useState("");
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const submit = (e) => {
    e.preventDefault();
    let procKey = key.toLowerCase();
    let procText = text.toLowerCase();
    let proccesObj = {};

    if (checkLengthKeyAndText(procKey, procText)) return;

    if (checkKeyAndText(procKey, procText)) {
      toast.warning(
        "Iltimos Matn va Kalit uchun 16-lik sanoq tizimidagi belgilardan foydalaning ! (0, 1, 2, ... , D, E, F)."
      );
      return;
    }

    // Generate Key
    procKey = keyOrTextBase16ToBase2(procKey);
    procKey = setLenKey56To64(procKey);
    procKey = setLenKeyPC1(procKey);
    procKey = shiftKey(procKey);
    procKey = setKeysLenPC2(procKey);

    // Generate Text
    procText = keyOrTextBase16ToBase2(procText);
    procText = shiftWithIP(procText);
    procText = breakTextToTwo(procText);

    // Round function
    proccesObj = startEncrypt(procKey, procText);
    let res = shiftWithIP_1(proccesObj[15]);
    res = convertBase2ToBase16(res);
    setResult(res);
  };

  const checkLengthKeyAndText = (k, t) => {
    let result = false;
    if (key.length !== 14) {
      toast.warning("Kalit uzunligi 14ta belgi(56-bit) bo`lishi kerak !");
      result = true;
    }
    if (text.length !== 16) {
      toast.warning("Matn uzunligi 16ta belgi(64-bit) bo`lishi kerak !");
      result = true;
    }

    return result;
  };

  const checkKeyAndText = (k, t) => {
    let result = false;
    let arr = Object.keys(Base16ToBase2);
    [...k].forEach((i) => {
      if (!arr.includes(i)) {
        result = true;
      }
    });
    [...t].forEach((i) => {
      if (!arr.includes(i)) {
        result = true;
      }
    });

    return result;
  };

  const keyOrTextBase16ToBase2 = (k) => {
    let result = "";
    [...k].forEach((i) => {
      let temp = Base16ToBase2[i];
      result += temp;
    });

    return result;
  };

  const setLenKey56To64 = (k) => {
    k = [...k];
    let resArr = [];

    for (let i = 0; i < 8; i++) {
      let arr7 = k.splice(0, 7);
      let arr8 = addOneOrZero(arr7);
      resArr = [...resArr, ...arr8];
    }
    return resArr;
  };

  const addOneOrZero = (arr) => {
    let n = 0;
    arr.forEach((i) => {
      if (i === 1) {
        n += 1;
      }
    });

    return n % 2 === 0 ? [...arr, "0"] : [...arr, "1"];
  };

  const setLenKeyPC1 = (k) => {
    let resArr = [];
    let len = k.length;
    for (let i = 0; i < len; i++) {
      if (!k[PC1[i] - 1]) continue;
      resArr.push(k[PC1[i] - 1]);
    }

    return resArr;
  };

  const shiftKey = (k) => {
    let roundKeys = [];
    let len = k.length;
    let c = k.splice(0, len / 2);
    let d = k;

    for (let i = 0; i < 16; i++) {
      let tempC = c.splice(0, shiftKeyList[i]);
      c = [...c, ...tempC];
      let tempD = d.splice(0, shiftKeyList[i]);
      d = [...d, ...tempD];

      roundKeys[i] = [...c, ...d];
    }

    return roundKeys;
  };

  const setKeysLenPC2 = (k) => {
    let len = k.length;
    let roundKeys = [];

    for (let i = 0; i < len; i++) {
      let tempArr = shiftWithPC2(k[i]);
      roundKeys.push(tempArr);
    }

    function shiftWithPC2(key) {
      let res = [];
      let len = key.length;
      for (let i = 0; i < len; i++) {
        if (!PC2[i]) continue;
        res.push(key[PC2[i] - 1]);
      }

      return res;
    }

    return roundKeys;
  };

  const shiftWithIP = (t) => {
    t = [...t];
    let len = t.length;
    let res = [];

    for (let i = 0; i < len; i++) {
      res.push(t[IP[i] - 1]);
    }

    return res;
  };

  const breakTextToTwo = (t) => {
    let L = t.splice(0, t.length / 2);
    let R = t;

    return {
      L,
      R,
    };
  };

  const startEncrypt = (k, t) => {
    let i = 0;
    let obj = {
      0: { key: k[0], text: t },
    };

    while (i < 16) {
      let tempR = shiftTextRightWithEbit(obj[i].text["R"]);

      let result = plusTextToKey(obj[i].key, tempR);
      result = shiftWithSTables(result);
      result = shiftWithP(result);
      result = addLandR(result, obj[i].text["L"]);

      if (i !== 15) {
        obj[i + 1] = {
          key: k[i + 1],
          text: { L: obj[i].text["R"], R: result },
        };
      }

      i += 1;
    }

    return obj;
  };

  const shiftTextRightWithEbit = (t) => {
    let len = EBITSELECTION.length;
    let res = [];

    for (let i = 0; i < len; i++) {
      res.push(t[EBITSELECTION[i] - 1]);
    }

    return res;
  };

  const plusTextToKey = (key, R) => {
    let len = key.length;
    let res = [];

    for (let i = 0; i < len; i++) {
      let tempValue = mod2(key[i], R[i]);
      res.push(tempValue);
    }
    return res;
  };

  const shiftWithSTables = (arr) => {
    arr = separateArr(arr);
    let len = arr.length;
    let res = [];

    for (let i = 0; i < len; i++) {
      let tempValue = changeValuesWithSTables(arr[i], i);
      res = [...res, ...tempValue];
    }

    return res;
  };

  const separateArr = (arr) => {
    let res = [];
    for (let i = 0; i < 8; i++) {
      let tempArr = arr.splice(0, 6);
      res.push(tempArr);
    }
    return res;
  };

  const changeValuesWithSTables = (arr, i) => {
    const table = sTables[`s-${i + 1}`];

    let y = "00" + arr[0] + arr[5];
    let x = arr[1] + arr[2] + arr[3] + arr[4];

    Object.keys(Base10ToBase2).forEach((j) => {
      if (Base10ToBase2[j] === y) {
        y = j;
      }
      if (Base10ToBase2[j] === x) {
        x = j;
      }
    });

    let tableValue = table[y][x];

    return Base10ToBase2[tableValue];
  };

  const shiftWithP = (arr) => {
    let len = arr.length;
    let res = [];

    for (let i = 0; i < len; i++) {
      res.push(arr[P[i] - 1]);
    }

    return res;
  };

  const addLandR = (r, l) => {
    let res = [];
    let len = r.length;

    for (let i = 0; i < len; i++) {
      let temp = mod2(l[i], r[i]);
      res.push(temp);
    }

    return res;
  };

  const shiftWithIP_1 = ({ text: { L, R } }) => {
    let res = [];
    let arr = [...R, ...L];
    let len = arr.length;

    for (let i = 0; i < len; i++) {
      res.push(arr[IP_1[i] - 1]);
    }

    return res;
  };

  const convertBase2ToBase16 = (arr) => {
    let tempArr = [];

    for (let i = 0; i < 16; i++) {
      let tempList = arr.splice(0, 4);
      tempArr.push(tempList);
    }

    let len = tempArr.length;
    let res = "";

    for (let i = 0; i < len; i++) {
      res += base2Tobase16(tempArr[i]);
    }

    return res;
  };

  const base2Tobase16 = (arr) => {
    arr = arr.join("");
    let res = "";

    Object.keys(Base16ToBase2).forEach((key) => {
      if (arr === Base16ToBase2[key]) {
        res = key;
      }
    });
    return res;
  };

  const mod2 = (x, y) => (x === y ? "0" : "1");

  return (
    <Wrapper className="container">
      <h1>DES</h1>
      <h6 style={{ color: "gray" }}>
        Matn va kalit 16lik sanoq sistemasida kiritilsin !!!
      </h6>
      <br />
      <form onSubmit={submit}>
        <div className="form-group">
          <label className="form-label">Text</label>
          <input
            type="text"
            className="form-control"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <br />
        <div className="form-group">
          <label className="form-label">Key</label>
          <input
            type="text"
            className="form-control"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
        </div>

        <br />
        <div className="text-end">
          <button type="submit" className="btn btn-primary">
            Encrypt
          </button>
        </div>
      </form>
      <br />

      <div>
        <h2>
          Result : <b className="text-success">{result}</b>
        </h2>
      </div>
      <br />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  h1 {
    text-align: center;
    margin: 1rem 0;
  }
`;
