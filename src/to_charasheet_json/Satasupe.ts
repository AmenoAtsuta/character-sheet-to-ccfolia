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

const ToSatasupeCcfolia=(json:any,key:string):CharacterClipboardData=>{
  console.log(json);

  const skillList=()=>{
    //ブリンガーのスキルをループで取得し、それを配列にしている
    return Object.keys(json.skills).map((key)=>{return {label:`${Number(key)+1}:${json.skills[key].name}`, value: 0, max: 0}})
  }

  const data:Character={
    name:json.base.name,
    memo:`故郷:${json.base.homeland} 性別:${json.base.sex} 年齢:${json.base.age}
外見:${json.base.style} チーム:${json.base.team}
好き:${json.base.likes} 嫌い:${json.base.dislikes} 好みのタイプ:${json.base.favorites}
好きな映画:${json.base.movie}
言語:${json.base.langueges}
${json.base.memo}`,
    initiative: json.base.power.initiative,
    externalUrl:`https://character-sheets.appspot.com/stellar/edit.html?key=${key}`,
    status:[
      {label:"肉体点", value: 10, max: 10},
      {label:"精神点", value: 10, max: 10},
      {label:"サイフ", value: Number(json.base.abl.life.value)-Number(json.cond.wallet.value), max: json.base.abl.life.value},
      {label:"性業値", value: json.base.emotion, max: 13}
    ],
    params:[
      {label:"戦闘", value: json.base.abl.combat.value},
      {label:"犯罪", value: json.base.abl.crime.value},
      {label:"教養", value: json.base.abl.culture.value},
      {label:"生活", value: json.base.abl.life.value},
      {label:"恋愛", value: json.base.abl.love.value},
      {label:"反応力", value: json.base.power.initiative},
      {label:"攻撃力", value: json.base.power.attack},
      {label:"破壊力", value: json.base.power.destroy},
      {label:"肉体", value: json.base.gift.body.value},
      {label:"精神", value: json.base.gift.mind.value},
    ],
    iconUrl:null,
    faces:[{iconUrl: null,label:""}],
    x:2,
    y:2,
    active:true,
  }
  return {kind:"character", data:data}
}

const ToSatasupeUdonarium=(json:any):string=>{
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

export {ToSatasupeCcfolia, ToSatasupeUdonarium}