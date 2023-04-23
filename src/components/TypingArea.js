import { Component, useEffect, useState } from "react";

const TypingArea = ({ data }) => {
  const [inputData, setInputData] = useState([]);
  const [copyInputData, setCopyInputData] = useState([]);

  const newId = () => Math.random() * 100;

  const handleData = (d) => {
    if (d.type === "letters") {
      const newData = [];
      const getRandomInt = (max) => {
        let r = Math.floor(Math.random() * max);
        return newData.length &&
          newData[newData.length - 1].letter === d.value[r]
          ? getRandomInt(d.value.length)
          : d.value[r];
      };
      const l = d.value;

      for (let x = 0; x <= l.length + 20; x++) {
        newData.push({
          letter: getRandomInt(d.value.length),
          id: newId(),
        });
      }
      return newData;
    } else {
      return d.value.split("").map((x) => {
        return { letter: x, id: newId() };
      });
    }
  };
  const checkLetters = (dt) => {
    let newData = JSON.parse(JSON.stringify(inputData));

    for (let x = 0; x <= newData.length - 1; x++) {
      if (dt[x] === newData[x].letter) {
        newData[x].complete = true;
      } else if (dt[x] === undefined) {
        newData[x].complete = "";
      } else {
        newData[x].complete = false;
      }
    }

    setInputData(newData);
  };

  const handleTyping = (e) => {
    let cd = [...copyInputData];

    if (e.key === "Backspace") {
      cd.pop();
    } else if (cd.length !== inputData.length) {
      cd.push(e.key);
    }
    setCopyInputData([...cd]);
    checkLetters(cd);
  };

  useEffect(() => {
    setInputData(handleData(data));
  }, []);

  useEffect(() => {
    window.addEventListener("keyup", handleTyping);

    return () => window.removeEventListener("keyup", handleTyping);
  }, [inputData.length, copyInputData]);

  const refresh = () => {
    let h = handleData(data);
    setCopyInputData([]);
    setInputData(h);
  };

  return (
    <div className="typing-area-con">
      <div className="typing-operation">
        <button onClick={() => window.location.reload(false)}>«</button>
        {data.type === "letters" && <button onClick={refresh}>↻</button>}
      </div>

      <p className="typing-area">
        {inputData.map((x) => (
          <span
            className={
              x.letter === " "
                ? `empty-letter ${
                    x.complete === true
                      ? "complete"
                      : x.complete === false
                      ? "error"
                      : ""
                  }`
                : x.complete === true
                ? "complete"
                : x.complete === false
                ? "error"
                : ""
            }
            key={x.id}
          >
            {x.letter !== " " ? x.letter : "A"}
          </span>
        ))}
      </p>
    </div>
  );
};

export default TypingArea;
