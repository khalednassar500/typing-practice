import { useEffect, useState } from "react";
import "../styles/App.css";
import InputData from "./InputData";
import TypingArea from "./TypingArea";
import { Route, Routes } from "react-router-dom";

function App() {
  const [data, setData] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    let counter;
    if (data) {
      setLoader(true);
      counter = setTimeout(() => {
        setLoader(false);
      }, 1000);
    }

    return () => clearTimeout(counter);
  }, [data]);

  return (
    <div className="App">
      <div className="logo">
        <h1>Typing Practice</h1>
      </div>

      <main>
        {loader && (
          <div className="loading-page">
            <p>◍</p>
            <p>◍</p>
            <p>◍</p>
          </div>
        )}
        {!loader && !data && (
          <>
            <p className="description">
              Unlock the power of fast and accurate typing on keyboards with
              this application, and take your productivity to the next level.{" "}
              <br />
              Start typing like a pro today!
            </p>
            <InputData
              updateData={(d) => {
                setData(d);
              }}
            />
          </>
        )}

        {!loader && data && <TypingArea data={data} />}
      </main>
    </div>
  );
}

export default App;
