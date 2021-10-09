import React, { useState } from "react";
import { toast } from "react-toastify";

import table from "./table";

function Vernam() {
  const [text, setText] = useState("");
  const [key, setKey] = useState("");
  const [result, setResult] = useState("");

  const handleSetKey = (e) => {
    if (text === "") {
      toast.warning("Iltimos matnni kiriting !!!");
      return;
    }
    const { value } = e.target;

    if (text.length < value.length) {
      toast.warning(
        "Kalit Matn uzunligiga teng yoki kichik son bo`lishi kerak !!! "
      );
      return;
    }

    setKey(e.target.value);
  };

  const handleSubmit = (type) => {
    let newKey = convertKey();

    if (type === "encrypt") {
      encrypt(newKey);
      return;
    }
    deEncrypt(newKey);
  };

  const encrypt = (newKey) => {
    let arr = [];
    for (let i = 0; i < newKey.length; i++) {
      const number = dec(text[i], newKey[i]);
      const result = findSymbol(number);
      arr.push(result);
    }
    setResult(arr.join(""));
  };

  const deEncrypt = (newKey) => {
    let arr = [];

    for (let i = 0; i < newKey.length; i++) {
      const number = dec(text[i], newKey[i]);
      const res = findSymbol(number);
      arr.push(res);
    }
    setResult(arr.join(""));
  };

  const dec = (a, b) => {
    let arr = [];

    a = table[a];
    b = table[b];

    for (let i = 0; i < a.length; i++) {
      if (a[i] === b[i]) {
        arr.push(0);
        continue;
      }
      arr.push(1);
    }

    return arr.join("");
  };

  const findSymbol = (n) => {
    for (let key in table) {
      if (table[key] === n) {
        return key;
      }
    }
  };

  const convertKey = () => {
    let textLen = text.length;
    let newKey = key;

    let i = 0;
    while (textLen > newKey.length) {
      newKey += newKey[i];
      i += 1;
    }

    return newKey;
  };

  return (
    <div className="container">
      <h1 className="text-center">Vernam</h1>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
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
        <br />
        <div className="form-group">
          <label className="form-label" htmlFor="key">
            Key
          </label>
          <input
            type="text"
            id="key"
            className="form-control"
            value={key}
            onChange={handleSetKey}
          />
        </div>
        <br />
        <div className="block-right d-flex gap-4 ">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleSubmit("encrypt")}
          >
            Encrypt
          </button>
          <button
            type="button"
            className="btn btn-info"
            onClick={() => handleSubmit("deEncrypt")}
          >
            DeEncrypt
          </button>
        </div>
      </form>

      <section className="mt-3">
        <h1>
          Result : <span className="text-success">{result}</span>
        </h1>
      </section>
    </div>
  );
}

export default Vernam;
