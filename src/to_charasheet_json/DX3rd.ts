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

const ToDX3rdCcfolia=(json:any, key:string):CharacterClipboardData=>{
  const roiceCount=()=>{
    let count=0
    json.roice_type.forEach((type:string)=>{if(type!=="1")++count})
    return count
  }

  const data:Character={
    name: json.data_title,
    memo: json.pc_making_memo,
    initiative: Number(json.armer_total_act),
    externalUrl: `https://charasheet.vampire-blood.net/${key}`,
    status:[
      {label: "HP", value: json.NP5, max: json.NP5},
      {label: "侵食率", value: json.NP6, max: 100},
      {label: "ロイス", value: roiceCount(), max: roiceCount()},
      {label: "財産点", value: json.money_point, max: json.money_point}
    ],
    params:[
      {label: "肉体", value: json.NP1},
      {label: "感覚", value: json.NP2},
      {label: "精神", value: json.NP3},
      {label: "社会", value: json.NP4},
      {label: "移動", value: json.NP8},
      {label: "装甲", value: json.armer_total_def},
      {label: "回避", value: json.armer_total_dodge}
    ],
    iconUrl: null,
    faces:[{iconUrl: null, label: ""}],
    x: 2,
    y: 2,
    active: true,
    commands:``
  }

  return {kind:"character", data:data}
}

export {ToDX3rdCcfolia}