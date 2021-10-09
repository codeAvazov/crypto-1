import React, { useState } from "react";
import { toast } from "react-toastify";

import list from "./list";

function Vijner() {
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
    let newList = generateList(newKey);

    if (type === "encrypt") {
      encrypt(newKey, newList);
      return;
    }
    deEncrypt(newKey, newList);
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

  const generateList = (newKey) => {
    let newList = [];

    for (let i = 0; i < newKey.length; i++) {
      newList[i] = generateArr(newKey[i]);
    }

    return newList;
  };

  const generateArr = (keyItem) => {
    let index = list.indexOf(keyItem);
    let length = list.length;
    let arr = [keyItem];

    if (index === length) {
      index = 0;
    } else {
      index += 1;
    }

    while (length > arr.length) {
      if (index >= length) {
        index = 0;
      }
      arr.push(list[index]);
      index += 1;
    }

    return arr;
  };

  const encrypt = (newKey, newList) => {
    let data = [];

    for (let i = 0; i < newKey.length; i++) {
      let textIndex = list.indexOf(text[i]);
      data.push(newList[i][textIndex]);
    }

    setResult(data.join(""));
  };

  const deEncrypt = (newKey, newList) => {
    let data = [];

    for (let i = 0; i < newKey.length; i++) {
      let index = newList[i].indexOf(text[i]);

      data.push(list[index]);
    }

    setResult(data.join(""));
  };

  return (
    <main className="container">
      <h1 className="text-center">Vijner</h1>

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
    </main>
  );
}

export default Vijner;
