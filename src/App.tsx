/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import fetchJsonp from "fetch-jsonp"
import {Button, TextField} from '@material-ui/core';
import { styled } from '@mui/material/styles'
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@emotion/react";
import {ToStellarKnightsCcfolia} from "./to_charasheet_json/StellarKnights"
import logo from './logo.svg';
import './App.css';
import { alertTitleClasses } from '@mui/material';

const App:React.VFC=()=>{
  const [system,setSystem]=useState<string>("stellar")
  const [sheetId,setSheetId]=useState<string>("")
  const [resCharaSheet,setResCharaSheet]=useState({});

  useEffect(()=>{
    if(sheetId!=="" && system!==""){
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
  }
  },[sheetId,system])

  const IdInputForm:React.VFC=()=>{
    return (
      <div>
        <form>
          <TextField variant="standard" onChange={idHandleChange} value={sheetId} />
        </form>
      </div>
    )
  }

  const copyCharaSheetJson=():void=>{
    navigator.clipboard.writeText(JSON.stringify(resCharaSheet))
    .then(()=>{
      console.log('クリップボードへのコピーに成功')
      alert("クリップボードにコピーしました")
    })
    .catch((err)=>{console.log(err)})
  }

  const idHandleChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
    setSheetId(event.target.value)
  }

  
  return (
    <div className="App">
      <IdInputForm/>
      <Button variant="contained" onClick={()=>copyCharaSheetJson()}>
        ココフォリア出力用にコピー
      </Button>
    </div>
  );
}

export default App;
