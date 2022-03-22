//type定義はココフォリアにペーストするための形式
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

const ToStellarKnightsCcfolia=(json:any,key:string):CharacterClipboardData=>{
  console.log(json);

  const skillList=()=>{
    //ブリンガーのスキルをループで取得し、それを配列にしている
    return Object.keys(json.skills).map((key)=>{return {label:`${Number(key)+1}:${json.skills[key].name}`, value: 0, max: 0}})
  }

  const data:Character={
    name:json.base.name,
    memo:json.base.phrase,
    externalUrl:`https://character-sheets.appspot.com/stellar/edit.html?key=${key}`,
    status:[
      {label:"耐久力", value: json.status.hp, max: json.status.hp},
      {label:"防御力", value: json.status.defense, max: json.status.defense},
      //{label:"チャージ", value: json.status.charge, max: 0},
      ...skillList()//配列で帰ってきてるのでスプレッド構文で配列の[]を外している
    ],
    iconUrl:null,
    faces:[{iconUrl: null,label:""}],
    x:2,
    y:2,
    active:true,
  }
  return {kind:"character", data:data}
}

const ToStellarKnightsUdonarium=(json:any):string=>{
  const skillList=():string[]=>{
    //ブリンガーのスキルをループで取得し、それを配列にしている
    return Object.keys(json.skills).map((key)=>{return `<data name="${key+1}:${json.skills[key].name}" type="numberResource" currentValue="0">null</data>`})
  }


  const data:string=`<?xml version="1.0" encoding="UTF-8"?>
<character location.name="table" location.x="0" location.y="0" posZ="0" rotate="0" roll="0" hideInventory="false" nonTalkFlag="false" overViewWidth="270" overViewMaxHeight="250" chatColorCode.0="#000000" chatColorCode.1="#FF0000" chatColorCode.2="#0099FF" syncDummyCounter="0">
  <data name="character">
    <data name="image">
      <data type="image" name="imageIdentifier"></data>
    </data>
    <data name="common">
      <data name="name">${json.base.name}</data>
      <data name="size">1</data>
    </data>
    <data name="detail">
      <data name="リソース">
        <data type="numberResource" currentValue="${json.status.hp}" name="耐久力">${json.status.hp}</data>
        <data type="numberResource" currentValue="${json.status.charge}" name="チャージ">${json.status.charge}</data>
        <data name="ブーケ" type="numberResource" currentValue="0"></data>
        <data name="防御力" type="numberResource" currentValue="${json.status.defense}">${json.status.defense}</data>
      </data>
      <data name="情報">
        <data type="note" name="説明">${json.base.phrase}</data>
      </data>
      <data name="スキル">
        ${skillList().join("")}
      </data>
      <data name="立ち絵位置">
        <data type="numberResource" currentValue="0" name="POS">11</data>
      </data>
      <data name="コマ画像">
        <data type="numberResource" currentValue="0" name="ICON">0</data>
      </data>
    </data>
    <data name="buff">
    <data name="バフ/デバフ"></data>
  </data>
</data>
<chat-palette dicebot="DiceBot">
</chat-palette>
<buff-palette dicebot="DiceBot">
</buff-palette>
</character>
  `

  return data;
}

export {ToStellarKnightsCcfolia, ToStellarKnightsUdonarium}