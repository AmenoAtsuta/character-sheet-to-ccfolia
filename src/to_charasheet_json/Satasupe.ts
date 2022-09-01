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
    initiative: Number(json.base.power.initiative),
    externalUrl:`https://character-sheets.appspot.com/satasupe/edit.html?key=${key}`,
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
    commands:`${json.base.abl.combat.value}R 戦闘判定\n
${json.base.abl.crime.value}R 犯罪判定\n
${json.base.abl.culture.value}R 教養判定\n
${json.base.abl.life.value}R 生活判定\n
${json.base.abl.love.value}R 恋愛判定\n
${json.base.gift.body.value}R 肉体判定\n
${json.base.gift.mind.value}R 精神判定\n
SR${json.base.emotion} 性業値判定\n
TAGT タグ決定表\n
FumbleT 命中判定ファンブル表\n
FatalT 致命傷表\n
FatalVT 乗り物致命傷表\n
CrimeIET 犯罪情報イベント表\n
LifeIET 生活情報イベント表\n
LoveIET 恋愛情報イベント表\n
CultureIET 教養情報イベント表\n
CombatIHT 戦闘情報イベント表\n
CrimeIHT 犯罪情報ハプニング表\n
LifeIHT 生活情報ハプニング表\n
LoveIHT 恋愛情報ハプニング表\n
CultureIHT 教養情報ハプニング表\n
CombatIHT 戦闘情報ハプニング表\n
RomanceFT ロマンスファンブル表\n
AccidentT アクシデント表\n
GeneralAT 汎用アクシデント表\n
AfterT その後表\n
KusaiMT 臭い飯表\n
EnterT 登場表\n
PayT 落とし前表\n
TimeUT 時間切れ表\n
BudTT バッドトリップ表\n
NPCT NPCの年齢と好みを一括出力\n
GetgT ガラクタ報酬表\n
GetzT 実用品報酬表\n
GetnT 値打ち物報酬表\n
GetkT 奇天烈報酬表\n
MinamiRET ミナミ遭遇表\n
ChinatownRET 中華街遭遇表\n
WarshipLandRET 軍艦島遭遇表\n
CivicCenterRET 官庁街遭遇表\n
DowntownRET 十三遭遇表\n
ShaokinRET 沙京遭遇表\n
LoveLoveRET らぶらぶ遭遇表\n
AjitoRET アジト遭遇表\n
JigokuSpaRET 地獄湯遭遇表\n
JailHouseRET JAIL HOUSE遭遇表\n
TreatmentIT 治療イベント表\n
CollegeIT 大学イベント表\n
GETSST 「サタスペ」のベースとアクセサリを出力(GETSSTのあとにアクセサリ数を入力、省略時1)
`,
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