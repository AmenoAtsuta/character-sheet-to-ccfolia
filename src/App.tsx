/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import fetchJsonp from "fetch-jsonp"
import {Button, TextField, Link} from '@material-ui/core';
import { css } from '@emotion/react'
import { styled } from '@mui/material/styles'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {indigo, red} from '@mui/material/colors'
import {ToStellarKnightsCcfolia} from "./to_charasheet_json/StellarKnights"
import './App.css';

const darkTheme=createTheme({
  palette:{
    mode: 'dark',
  },
  typography:{
    fontFamily:[
      "Noto Sans JP",
      "Lato"
    ].join(",")
  }
});

const App:React.VFC=()=>{
  const [system,setSystem]=useState<string>("stellar")
  const [sheetId,setSheetId]=useState<string>("")
  const [resCharaSheet,setResCharaSheet]=useState({});

  const inputForms=css`
    margin: 2.5% 0;
  `
  const inputId=css`
    width:40%;
  `

  const howToUseUl=css`
    width:70%;
    margin:0 auto;
  `

  const howToUseLi=css`
    list-style-type:demical;
    margin:2% 0;
  `

  const spanEmphasis=css`
    color:red;
  `

  useEffect(()=>{
    if(sheetId!=="" && system!==""){
      fetchJsonp(`https://character-sheets.appspot.com/${system}/display?ajax=1&key=${sheetId}`,{
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
      .catch((err)=>{
        console.log(err)
      })
  }
  },[sheetId,system])

  const InputForm:React.VFC=()=>{
    return (
      <div css={inputForms}>
        <form>
          <TextField variant="standard" label="ここにIDをペースト" onChange={idHandleChange} value={sheetId} css={inputId} />
        </form>
      </div>
    )
  }

  const PageFooter:React.FC=()=>{
    return (
      <footer>
        <p>このプログラムのライセンス:CC BY-NC-SA 4.0 ただしNCの部分はYoutubeなどの動画配信サイトでTRPG動画の収益化は認めます</p>
        <p>作者:熱田アメノ <Link href="https://twitter.com/AmenoAtsuta" underline="hover">Twitter</Link> <Link href="https://www.youtube.com/channel/UCcNBKvsZBMPMJTwNaraELHg" underline="hover">Youtube</Link></p>
      </footer>
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
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <h1>ココフォリア用コマ作成ツール</h1>
        <h2>概要</h2>
        <p>
          キャラクターシート倉庫からキャラシを取得して、ココフォリアへとペーストしコマを作成できるツールです。<br/>
          現在アルファ版として銀剣のステラナイツにのみ対応しています。<br/>
          将来的にはキャラクターシート保管庫への対応、及び他システムへの対応(アリアンロッド2Eやダブルクロス3rd辺りが優先になりそう。CoCは優秀な先駆者様がいるので対応予定は現状ありません。)<br/>
          ココフォリアだけでなく、ユドナリウムへの出力にも対応したいと思っています。
        </p>
        <h2>使い方</h2>
        <ul css={howToUseUl}>
          <li css={howToUseLi}>キャラクターシート倉庫のキャラシページからIDをコピーする(URLのhttps://character-sheets.appspot.com/stellar/edit.html?key=<span css={spanEmphasis}>[ここに書いてある長い英数字の羅列がID]</span>)</li>
          <li css={howToUseLi}>"ここにIDをペースト"と書いてあるところにコピーしたキャラシIDをペースト</li>
          <li css={howToUseLi}>"ココフォリア出力用にコピー"ボタンをクリックして、"クリップボードにコピーしました"と表示されれば成功</li>
          <li css={howToUseLi}>ココフォリアにペーストするとコマが出来上がります</li>
        </ul>
        <InputForm/>
        <Button variant="contained" onClick={()=>copyCharaSheetJson()}>
          ココフォリア出力用にコピー
        </Button>
        <PageFooter/>
      </div>
    </ThemeProvider>
  );
}

export default App;
