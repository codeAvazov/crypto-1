/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function A51() {
  const [text, setText] = useState("");
  const [key, setKey] = useState("");
  const [result, setResult] = useState("");

  const changeKey = (e) => {
    const { value } = e.target;
    if (value.length > 8) {
      toast.warning("Kalit 8 baytdan yoki undan kichik qiymat qabul qilsin !");
      return;
    }

    setKey(value);
  };

  const handleEncrypt = () => {
    // Step - one

    const listBase2 = keyToBase2();

    // Step - two
    let { x, y, z } = separateToRegisters(listBase2);

    // Step - three
    const textBase2 = textToBase2();

    // Step - four
    let generateKey = [];

    for (let i = 0; i < textBase2.length; i++) {
      let majorValue = getMajor(x[8], y[10], z[10]);

      x = updateRegisters(x, majorValue, "x");
      y = updateRegisters(y, majorValue, "y");
      z = updateRegisters(z, majorValue, "z");

      let tempKey = decMod2([
        x[x.length - 1],
        y[y.length - 1],
        z[z.length - 1],
      ]);
      generateKey.push(tempKey);
    }

    encryptText(textBase2, generateKey);
  };

  const encryptText = (tb, gk) => {
    tb = tb.map((i) => +i);
    let length = tb.length;
    let resArr = [];

    for (let i = 0; i < length; i++) {
      let v = decMod2([tb[i], gk[i]]);
      resArr.push(v);
    }
    setResult(resArr.join(""));
  };

  const updateRegisters = (arr, major, register) => {
    let index = register === "x" ? 8 : 10;
    let decArr =
      register === "x"
        ? [arr[13], arr[16], arr[17], arr[18]]
        : register === "y"
        ? [arr[20], arr[21]]
        : [arr[7], arr[20], arr[21], arr[22]];

    if (arr[index] == major) {
      let v = decMod2(decArr);
      arr.unshift(v.toString());
      arr.pop();
    }

    return arr;
  };

  const keyToBase2 = () => {
    let key = convertKey();
    let arr = [];
    let length = key.length;

    for (let i = 0; i < length; i++) {
      var charCode = key[i].charCodeAt(0).toString(2);
      charCode = charCode.toString().split("");

      while (charCode.length < 8) {
        charCode = ["0", ...charCode];
      }

      arr = [...arr, ...charCode];
    }

    return arr;
  };

  const convertKey = () => {
    let textLen = 8;
    let newKey = key;

    let i = 0;
    while (textLen > newKey.length) {
      newKey += newKey[i];
      i += 1;
    }

    return newKey;
  };

  const textToBase2 = () => {
    let arr = [];
    let length = text.length;

    for (let i = 0; i < length; i++) {
      var charCode = text[i].charCodeAt(0).toString(2);
      charCode = charCode.toString().split("");

      arr = [...arr, ...charCode];
    }

    return arr;
  };

  const separateToRegisters = (list) => {
    let x = list.slice(0, 19);
    let y = list.slice(19, 41);
    let z = list.slice(41);

    return { x, y, z };
  };

  const getMajor = (...arr) => {
    let one = 0,
      zero = 0;

    arr.forEach((i) => (i == 1 ? (one += 1) : (zero += 1)));

    return one > zero ? 1 : 0;
  };

  const decMod2 = (arr) => {
    let length = arr.length;
    let t = 0;

    for (let i = 0; i < length; i++) {
      t = clac(t, arr[i]);
    }

    function clac(a, b) {
      if (a == 0 && b == 0) {
        return 0;
      }
      if (a == 1 && b == 1) {
        return 0;
      }
      return 1;
    }

    return t;
  };

  return (
    <main className="container">
      <h1 className="text-center">A 5 / 1</h1>

      <div className="form">
        <div className="form-group">
          <label className="form-label" htmlFor="text">
            Text
          </label>
          <input
            type="text"
            id="text"
            className="form-control"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="form-group my-4 ">
          <label className="form-label" htmlFor="key">
            Key
          </label>
          <input
            type="text"
            id="key"
            className="form-control"
            value={key}
            onChange={changeKey}
          />
        </div>
        <div className="block-right d-flex gap-4 ">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleEncrypt}
          >
            Encrypt
          </button>
          <button type="button" className="btn btn-info">
            DeEncrypt
          </button>
        </div>
      </div>

      <footer className="mt-3">
        <h1>
          Result : <span className="text-success">{result}</span>
        </h1>
      </footer>
    </main>
  );
}
