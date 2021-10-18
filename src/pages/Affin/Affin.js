import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

import list from "./list";

function Affin() {
  const [text, setText] = useState("");
  const [keyA, setKeyA] = useState("");
  const [keyB, setKeyB] = useState("");
  const [result, setResult] = useState("");
  const keyARef = useRef(null);

  //   Ekub
  function gcd_two_numbers(x, y) {
    x = parseInt(x);
    y = parseInt(y);
    x = Math.abs(x);
    y = Math.abs(y);

    while (y) {
      var t = y;
      y = x % y;
      x = t;
    }
    return x;
  }

  const changeKeyA = (e) => {
    setKeyA(e.target.value);
  };

  const changeKeyB = (e) => {
    const { value } = e.target;
    let length = list.length;
    if (value >= length) {
      toast.warning("B kalit qiymati " + length + " dan kichik bo`lishi shart");
      return;
    }
    setKeyB(value);
  };

  const checkValueKeyA = () => {
    let length = list.length;

    let result = gcd_two_numbers(keyA, length);
    if (keyA && result !== 1) {
      toast.warning(
        "A kalit " + length + " soni bilan o`zaro tub bo`lishi shart"
      );
      setKeyA("");
      keyARef.current.focus();
    }
  };

  const encrypt = () => {
    const txt = text.toLowerCase();
    let length = txt.length;
    let arr = [];

    for (let i = 0; i < length; i++) {
      let res = encryptCalc(txt[i]);
      arr.push(res);
    }

    setResult(() => arr.join(""));
  };

  const encryptCalc = (word) => {
    let x = list.indexOf(word);
    let length = list.length;

    console.log(parseInt(keyB));

    let result = (parseInt(keyA) * x + parseInt(keyB)) % length;

    return list[result];
  };

  const deEncrypt = () => {
    const txt = text.toLowerCase();
    let length = txt.length;
    let arr = [];

    for (let i = 0; i < length; i++) {
      let res = deEncryptCalc(txt[i]);
      arr.push(res);
    }

    setResult(() => arr.join(""));
  };

  const deEncryptCalc = (word) => {
    let x = list.indexOf(word);
    let length = list.length;
    let a = findA();

    let result = a * (x - keyB);

    while (result < 0) {
      result += length;
    }

    result = result % 26;

    return list[result];
  };

  const findA = () => {
    let length = list.length;
    let result = 1;

    for (let i = 0; i < length; i++) {
      let num = (keyA * i) % 26;
      if (num === 1) {
        result = i;
        break;
      }
    }

    return result;
  };

  return (
    <Wrapper className="container">
      <h1 className="text-center">Affin</h1>

      <section>
        <div className="form-group">
          <label htmlFor="text">Text</label>
          <input
            type="text"
            id="text"
            className="form-control"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="form-group my-3 ">
          <label htmlFor="keya">Key A</label>
          <input
            type="number"
            id="keya"
            className="form-control"
            value={keyA}
            onChange={changeKeyA}
            onBlur={checkValueKeyA}
            ref={keyARef}
          />
        </div>
        <div className="form-group">
          <label htmlFor="keyb">Key B</label>
          <input
            type="number"
            id="keyb"
            className="form-control"
            value={keyB}
            onChange={changeKeyB}
          />
        </div>
      </section>

      <section>
        <div className="block-right d-flex gap-4">
          <button type="button" className="btn btn-primary" onClick={encrypt}>
            Encrypt
          </button>
          <button type="button" className="btn btn-info" onClick={deEncrypt}>
            DeEncrypt
          </button>
        </div>
      </section>

      <section>
        <h1>
          Result : <b className="text-success"> {result}</b>{" "}
        </h1>
      </section>
    </Wrapper>
  );
}

export default Affin;

const Wrapper = styled.main`
  display: flex;
  gap: 2rem;
  flex-direction: column;
`;
