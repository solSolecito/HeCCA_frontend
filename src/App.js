import { Header } from "./components/Header.js";
import { Main } from "./components/main/Main.js";
import React, { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("/api/post")
      .then((response) => {
        setData(response.data);
        alert(data[0]);
      })
      .catch(() => {
        alert("Algo fue mal!");
      });
  });

  return (
    <div className="App">
      <Header />
      <Main />
    </div>
  );
}

export default App;
