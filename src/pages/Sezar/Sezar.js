import React, { useState } from "react";
import { toast } from "react-toastify";

import list from "./list";

function Sezar() {
  const [text, setText] = useState("");
  const [key, setKey] = useState("");
  const [result, setResult] = useState("");

  const handleSetKey = (e) => {

    if (text === "") {
      toast.warning("Iltimos matnni kiriting !!!");
      return;
    }
    const { value } = e.target;

    setKey(value);
  };

  const handleSubmit = (type) => {
    if (!text || !key) {
      toast.warning("Iltimos matn va kalitni kiriting !");
    }

    let result = [];

    for (let i = 0; i < text.length; i++) {
      let data = encOrDeEnc(text[i], type);
      result.push(data);
    }
    result = result.join("");
    setResult(result);
  };

  const encOrDeEnc = (value, type) => {
    value = value.toLowerCase();
    let length = list.length;

    let a;
    if (type === "encrypt") {
      a = list.indexOf(value) + parseInt(key);
    } else {
      a = list.indexOf(value) - parseInt(key);
    }

    let b = a % length;

    while (b < 0) {
      b += length;
    }

    return list[b];
  };

  return (
    <main className="container">
      <h1 className="text-center">Sezar</h1>

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
            type="number"
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

export default Sezar;
