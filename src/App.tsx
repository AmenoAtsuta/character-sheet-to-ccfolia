import React, { useEffect, useState } from 'react';
import fetchJsonp from "fetch-jsonp"
import logo from './logo.svg';
import './App.css';

const App:React.VFC=()=>{
  const [system,setSystem]=useState<string>("stellar")
  const [sheetId,setSheetId]=useState<string>("ahVzfmNoYXJhY3Rlci1zaGVldHMtbXByFwsSDUNoYXJhY3RlckRhdGEY4onv8QMM")
  const [resCharaSheet,setResCharaSheet]=useState({});

  useEffect(()=>{
    fetchJsonp(`http://character-sheets.appspot.com/${system}/display?ajax=1&key=${sheetId}`,{
      jsonpCallback: 'callback',
    })
    .then((res)=>{return res.json()})
    .then((json)=>{setResCharaSheet(json)})
    .then(()=>{console.log(resCharaSheet)})
    .catch(err=>console.log(err))

  },[])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
