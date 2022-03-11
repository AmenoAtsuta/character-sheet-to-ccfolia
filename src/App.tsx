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

type CharacterClipboardData = {
  kind: "character";
  data: Partial<Character>;
}

type Character = {
  name: string;
  memo: string;
  initiative?: number;
  externalUrl: string;
  status: {
    label: string;
    value: number;
    max: number;
  }[];
  params?: { label: string; value: string }[];
  iconUrl: string | null; // [!]
  faces: { iconUrl: string | null; label: string }[]; // [!]
  x: number; // [!]
  y: number; // [!]
  angle?: number;
  width?: number;
  height?: number;
  active: boolean; // [!]
  secret?: boolean;
  invisible?: boolean;
  hideStatus?: boolean;
  color?: string;
  commands?: string;
  owner?: string | null;
};

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
  const [charaSheetUrl,setCharaSheetUrl]=useState<string>("")

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

  const InputForm:React.VFC=()=>{
    return (
      <div css={inputForms}>
        <form>
          <TextField variant="standard" label="ここにURLをペースト" onChange={idHandleChange} value={charaSheetUrl} css={inputId} name="url" />
          <Button variant="contained" onClick={handleSubmit} >
          ココフォリア出力用にコピー
          </Button>
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

  const handleSubmit=()=>{
    console.log(sheetId)
    if(charaSheetUrl.includes("character-sheets.appspot.com") && sheetId!==""){
      console.log(`https://character-sheets.appspot.com/${system}/display?ajax=1&key=${sheetId}`)
      fetchJsonp(`https://character-sheets.appspot.com/${system}/display?ajax=1&key=${sheetId}`,{
        jsonpCallback: 'callback',
      })
      .then((res)=>{return res.json()})
      .then((json)=>{
        console.log(json);
        switch(system){
          case "stellar":
            setResCharaSheet(ToStellarKnightsCcfolia(json,sheetId))
            copyCharaSheetJson(ToStellarKnightsCcfolia(json,sheetId))
            break
        }
      }).then(()=>{
        console.log(resCharaSheet)
        
      })
      .catch((err)=>{
        console.log(err)
        alert("キャラシの取得に失敗しました")
      })
    }
  }

  const copyCharaSheetJson=(res:CharacterClipboardData):void=>{
    navigator.clipboard.writeText(JSON.stringify(res))
    .then(()=>{
      console.log('クリップボードへのコピーに成功')
      alert("クリップボードにコピーしました")
    })
    .catch((err)=>{console.log(err)})
  }

  useEffect(()=>{
    if(charaSheetUrl.includes("character-sheets.appspot.com")){
      setSheetId(charaSheetUrl.slice(charaSheetUrl.indexOf("key=")+4))
      setSystem(charaSheetUrl.slice(charaSheetUrl.indexOf("com/")+4,charaSheetUrl.indexOf("/",charaSheetUrl.indexOf("com/")+4)))
      //setSheetId(charaSheetUrl.slice(charaSheetUrl.indexOf("key=")+4))
      console.log(sheetId)
      console.log(system)
    }
  },[charaSheetUrl])

  const idHandleChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
    setCharaSheetUrl(event.target.value)
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
        <PageFooter/>
      </div>
    </ThemeProvider>
  );
}

export default App;
