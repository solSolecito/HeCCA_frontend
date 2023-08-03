import { Header } from './../components/header/Header.js';
import { Main } from './../components/main/Main.js';
import React, { useState, useEffect } from 'react';
import { pythonConnection } from './../services/caPython.js'

import './App.css';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    pythonConnection().then(
      data => {
        setData(data);
        console.log(data)
      }
    )
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="App">
      <Header />
      <Main />
    </div>
  );
}

export default App;
