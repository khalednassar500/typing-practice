import { Component, useEffect, useState } from "react";

const TypingArea = ({ data }) => {
  const [inputData, setInputData] = useState([]);
  const [copyInputData, setCopyInputData] = useState([]);
  const [timer, setTimer] = useState("");
  const [intialTime, setIntilaTime] = useState("");
  const [updateTime, setUpdateTime] = useState({
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });

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

      if (cd.length === inputData.length) {
        setIntilaTime("stop");
      }
    } else {
      setIntilaTime("stop");
      return;
    }
    setCopyInputData([...cd]);
    checkLetters(cd);
    if (!intialTime && timer && intialTime !== "stop") {
      setIntilaTime(new Date());
    }
  };

  useEffect(() => {
    setInputData(handleData(data));
  }, []);

  useEffect(() => {
    let counter;
    if (intialTime && intialTime !== "stop") {
      counter = setInterval(() => {
        const startDate = new Date(intialTime); // Start date
        const endDate = new Date();
        const startTimestamp = startDate.getTime();
        const endTimestamp = endDate.getTime();
        // Calculate the time difference in milliseconds
        const timeDifference = endTimestamp - startTimestamp;
        // Calculate the minutes and seconds
        const minutes = Math.floor(timeDifference / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        const milliseconds = timeDifference % 1000;
        setUpdateTime({ minutes, seconds, milliseconds });
      }, 1);
    }
    return () => clearInterval(counter);
  }, [intialTime, updateTime]);

  useEffect(() => {
    window.addEventListener("keyup", handleTyping);

    return () => window.removeEventListener("keyup", handleTyping);
  }, [inputData.length, copyInputData]);

  const refresh = () => {
    let h = handleData(data);
    setCopyInputData([]);
    setInputData(h);
    setIntilaTime("");
    setUpdateTime({
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });
  };

  return (
    <div className="typing-area-con">
      {timer && (
        <div className="timer-con">
          <p>
            {updateTime.minutes +
              " : " +
              updateTime.seconds +
              " : " +
              updateTime.milliseconds}
          </p>
        </div>
      )}
      <div className="typing-operation">
        <button onClick={() => window.location.reload(false)}>«</button>
        <button
          className="timer"
          style={timer ? { background: "#67d5b5" } : {}}
          onClick={() => {
            let ta = timer ? "" : "1";
            setTimer(ta);
            setIntilaTime("");
            setUpdateTime({
              minutes: 0,
              seconds: 0,
              milliseconds: 0,
            });
          }}
        >
          &#x1F570;
        </button>
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
