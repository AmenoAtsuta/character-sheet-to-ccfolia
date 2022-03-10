/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import fetchJsonp from "fetch-jsonp"
import {Button} from '@material-ui/core';
import { styled } from '@mui/material/styles'
import {ToStellarKnightsCcfolia} from "./to_charasheet_json/StellarKnights"
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
    .then((json)=>{
      console.log(json);
      switch(system){
        case "stellar":
          setResCharaSheet(ToStellarKnightsCcfolia(json,sheetId))
          break
      }
    })
    .catch(err=>console.log(err))
  },[])

  const copyCharaSheetJson=()=>{
    navigator.clipboard.writeText(JSON.stringify(resCharaSheet))
    .then(()=>{
      console.log('クリップボードへのコピーに成功');
    })
    .catch((err)=>{console.log(err)})
  }

  
  return (
    <div className="App">
      <Button variant="contained" onClick={()=>copyCharaSheetJson()}>
        ココフォリア出力用にコピー
      </Button>
    </div>
  );
}

export default App;
