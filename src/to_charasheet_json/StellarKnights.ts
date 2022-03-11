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

export {ToStellarKnightsCcfolia}