/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import fetchJsonp from "fetch-jsonp"
import {Button, TextField, Link} from '@material-ui/core';
import { css } from '@emotion/react'
import { styled } from '@mui/material/styles'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {indigo, red} from '@mui/material/colors'
import { List, ListItem, ListItemText, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {ToStellarKnightsCcfolia, ToStellarKnightsUdonarium} from "./to_charasheet_json/StellarKnights"
import VampireBloodSystemSort from './to_charasheet_json/VampireBloodSystemSorting';
import './App.css';

//ココフォリア出力用のtype定義
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
  const [system,setSystem]=useState<string>("stellar")//システム識別用のstate
  const [sheetId,setSheetId]=useState<string>("")//キャラシIDを保存するstate
  const [resCharaSheet,setResCharaSheet]=useState({})//APIで帰ってきたJSON保存用のstate
  const [charaSheetUrl,setCharaSheetUrl]=useState<string>("")//キャラシが保管してあるURLを保存するstate

  //以下emotionによるCSS記述
  const inputForms=css`
    margin: 2% 0;
  `
  const inputId=css`
    width:80%;
  `

  const howToUseUl=css`
    width:70%;
    margin:0 auto;
  `

  const howToUseLi=css`
    list-style-type:demical;
    margin:1% 0;
  `

  const systemListLi=css`
    width:15%;
    margin:0 auto;
    text-align:center;
    &:hover{
      cursor: default;
    }
  `

  const buttons=css`
    margin:0 2.5%!important;
  `

  /*const spanEmphasis=css`
    color:red;
  `*/

  //以下Reactコンポーネント
  const InputForm:React.VFC=()=>{
    return (
      <div css={inputForms}>
        <form>
          {/*Material UIで用意されているコンポーネントであるTextFieldを使用している*/}
          <TextField variant="standard" label="ここにURLをペースト" onChange={idHandleChange} value={charaSheetUrl} css={inputId} name="url" />
        </form>
      </div>
    )
  }

  const PageFooter:React.VFC=()=>{
    return (
      <footer>
        <p>このプログラムのライセンス:CC BY-NC-SA 4.0 ただしNCの部分はYoutubeなどの動画配信サイトでTRPG動画の収益化は認めます</p>
        <p>作者:熱田アメノ <Link href="https://twitter.com/AmenoAtsuta" underline="hover">Twitter</Link> <Link href="https://www.youtube.com/channel/UCcNBKvsZBMPMJTwNaraELHg" underline="hover">Youtube</Link></p>
      </footer>
    )
  }

  //以下コンポーネント以外の関数

  const handleSubmit=()=>{//submit時に実行される関数
    console.log(sheetId)
    if(charaSheetUrl.includes("character-sheets.appspot.com") && sheetId!==""){//キャラクターシート倉庫のURLである場合、かつIDが入力されている場合に実行
      console.log(`https://character-sheets.appspot.com/${system}/display?ajax=1&key=${sheetId}`)
      fetchJsonp(`https://character-sheets.appspot.com/${system}/display?ajax=1&key=${sheetId}`,{
        jsonpCallback: 'callback',
      })//JSONPを取得するための非同期通信を開始
      .then((res)=>{return res.json()})//返り値をオブジェクトに変換
      .then((json)=>{
        console.log(json);
        switch(system){//システムにより処理を分岐
          case "stellar"://ステラナイツの場合
            setResCharaSheet(ToStellarKnightsCcfolia(json,sheetId))
            copyCharaSheetJson(ToStellarKnightsCcfolia(json,sheetId))//クリップボードにコピーする関数の呼び出し
            break
          default:
            alert("対応していないシステムです")
        }
      })
      .catch((err)=>{//一連の処理中(主にJSONP取得時)にエラーが発生したときに呼び出される
        console.log(err)
        alert("キャラシの取得に失敗しました")
      })
    }else if(charaSheetUrl.includes("charasheet.vampire-blood.net") && sheetId!==""){
      fetchJsonp(`https://charasheet.vampire-blood.net/${sheetId}.js`,{
        jsonpCallback: 'callback',
      })
      .then((res)=>{return res.json()})//返り値をオブジェクトに変換
      .then((json)=>{
        console.log(json)
        copyCharaSheetJson(VampireBloodSystemSort(json,sheetId))
      })
      .catch((err)=>{//一連の処理中(主にJSONP取得時)にエラーが発生したときに呼び出される
        console.log(err)
        alert("キャラシの取得に失敗しました")
      })
    }
  }

  const handleSubmitUdonarium=()=>{//submit時に実行される関数
    console.log(sheetId)
    if(charaSheetUrl.includes("character-sheets.appspot.com") && sheetId!==""){//キャラクターシート倉庫のURLである場合、かつIDが入力されている場合に実行
      console.log(`https://character-sheets.appspot.com/${system}/display?ajax=1&key=${sheetId}`)
      fetchJsonp(`https://character-sheets.appspot.com/${system}/display?ajax=1&key=${sheetId}`,{
        jsonpCallback: 'callback',
      })//JSONPを取得するための非同期通信を開始
      .then((res)=>{return res.json()})//返り値をオブジェクトに変換
      .then((json)=>{
        console.log(json);
        switch(system){//システムにより処理を分岐
          case "stellar"://ステラナイツの場合
            const FileSaver = require('file-saver');
            const blob = new Blob([ToStellarKnightsUdonarium(json)], {type: "text/xml;charset=utf-8"});
            FileSaver.saveAs(blob, `${json.base.name}.xml`);
            break
          default:
            alert("対応していないシステムです")
        }
      })
      .catch((err)=>{//一連の処理中(主にJSONP取得時)にエラーが発生したときに呼び出される
        console.log(err)
        alert("キャラシの取得に失敗しました")
      })
    }else if(charaSheetUrl.includes("charasheet.vampire-blood.net") && sheetId!==""){
      fetchJsonp(`https://charasheet.vampire-blood.net/${sheetId}.js`,{
        jsonpCallback: 'callback',
      })
      .then((res)=>{return res.json()})//返り値をオブジェクトに変換
      .then((json)=>{
        console.log(json)
        copyCharaSheetJson(VampireBloodSystemSort(json,sheetId))
      })
      .catch((err)=>{//一連の処理中(主にJSONP取得時)にエラーが発生したときに呼び出される
        console.log(err)
        alert("キャラシの取得に失敗しました")
      })
    }
  }

  const copyCharaSheetJson=(res:CharacterClipboardData|null):void=>{//JSONをクリップボードにコピーする関数
    if(!res){return}
    navigator.clipboard.writeText(JSON.stringify(res))//JSONオブジェクトをstringに変換してからクリップボードにコピーしている
    .then(()=>{
      console.log('クリップボードへのコピーに成功')
      alert("クリップボードにコピーしました")
    })
    .catch((err)=>{console.log(err)})//コピー処理で問題があったときに呼び出し
  }

  /*
  入力されたURLが変化したときに呼び出される
  こんな変な処理にしたのはsetSheetIdでIDをセットしても非同期故に(おそらく)再レンダリングまでstateが反映されないため
  先にstateに打ち込んでしまおうという脳筋的解決
  誰かいい処理方法があったら教えて下さい
  */
  useEffect(()=>{
    if(charaSheetUrl.includes("character-sheets.appspot.com")){
      setSheetId(charaSheetUrl.slice(charaSheetUrl.indexOf("key=")+4))//URLにkey=より後ろのIDをセット
      setSystem(charaSheetUrl.slice(charaSheetUrl.indexOf("com/")+4,charaSheetUrl.indexOf("/",charaSheetUrl.indexOf("com/")+4)))//URLから.com/の後ろの次の/までのシステムが書いてある部分を取得
      //setSheetId(charaSheetUrl.slice(charaSheetUrl.indexOf("key=")+4))
      console.log(sheetId)
      console.log(system)
    }else if(charaSheetUrl.includes("charasheet.vampire-blood.net")){
      setSheetId(charaSheetUrl.slice(charaSheetUrl.indexOf("net/")+4))
    }
  },[charaSheetUrl])

  const idHandleChange=(event:React.ChangeEvent<HTMLInputElement>)=>{//Reactおなじみのテキストボックスに入力された値を制御する関数
    setCharaSheetUrl(event.target.value)
  }

  
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <h1>ココフォリア用コマ作成ツール</h1>
        <h2>概要</h2>
        <p>
          キャラクターシート倉庫およびキャラクター保管所からキャラシを取得して、ココフォリアへとペーストしコマを作成できるツールです。<br/>
          将来的には他システムへの対応(アリアンロッド2E辺りが優先になりそう。CoCは優秀な先駆者様がいますが若干足りない部分があるのでもしかしたら対応するかも。)<br/>
          現在、試験的にステラナイツのみユドナリウムに対応しています。
        </p>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <h2>対応システム</h2>
          </AccordionSummary>
          <AccordionDetails>
          <h3>キャラクターシート倉庫様</h3>
          <List component="nav">
            <ListItem divider button alignItems='center' css={systemListLi}>
              <ListItemText primary="銀剣のステラナイツ" />
            </ListItem>
          </List>
          <h3>キャラクター保管所様</h3>
          <List component="nav">
            <ListItem divider button alignItems='center' css={systemListLi}>
              <ListItemText primary="ダブルクロス3rd" />
            </ListItem>
          </List>
          </AccordionDetails>
        </Accordion>
        <h2>使い方</h2>
        <ul css={howToUseUl}>
          <li css={howToUseLi}>キャラクターシート倉庫またはキャラクター保管所のキャラシページからURLをコピーする</li>
          <li css={howToUseLi}>"ここにIDをペースト"と書いてあるところにコピーしたURLをペースト</li>
          <li css={howToUseLi}>"ココフォリア出力用にコピー"ボタンをクリックして、"クリップボードにコピーしました"と表示されれば成功</li>
          <li css={howToUseLi}>ココフォリアにペーストするとコマが出来上がります</li>
        </ul>
        <InputForm/>
        <Button css={buttons} variant="contained" onClick={handleSubmit} >
          ココフォリア出力用にコピー
        </Button>
        <Button css={buttons} variant="contained" onClick={handleSubmitUdonarium} >
          ユドナリウム出力用にダウンロード
        </Button>
        <PageFooter/>
      </div>
    </ThemeProvider>
  );
}

export default App;
