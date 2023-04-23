import { useState } from "react";

const InputData = ({ updateData }) => {
  const [letters, setLetters] = useState("");
  const [pharse, setPharse] = useState("");

  const handleData = (e) => {
    e.preventDefault();
    let data;
    if (letters) {
      data = {
        type: "letters",
        value: letters.trim(),
      };
    } else if (pharse) {
      data = {
        type: "pharse",
        value: pharse.trim(),
      };
    } else {
      return;
    }
    updateData(data);
  };

  const unVisibleStyle = {
    opacity: 0.2,
    pointerEvents: "none",
    userSelect: "none",
  };

  return (
    <form className="input-data" onSubmit={(e) => handleData(e)}>
      <p>Choose and write what you want to practice</p>
      <label style={pharse ? unVisibleStyle : null}>
        <p>Random Letters</p>
        <input
          type="text"
          value={letters}
          onChange={(e) => setLetters(e.target.value)}
          placeholder=". . ."
        />
      </label>
      <p>or</p>
      <label style={letters ? unVisibleStyle : null}>
        <p>Full Phrase</p>
        <textarea
          value={pharse}
          onChange={(e) => setPharse(e.target.value)}
          placeholder="..."
        ></textarea>
      </label>
      <button type="submit">Start</button>
    </form>
  );
};

export default InputData;
