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
    commands:`C値や固定値がエフェクトなどによって変化する場合は適宜変えてください\n
${json.skill_total[0].replace('r','dx')} 白兵判定\n
${json.skill_total[1].replace('r','dx')+json.armer_total_dodge} 回避判定\n
${json.skill_total[2].replace('r','dx')} 運転判定\n
${json.skill_total[3].replace('r','dx')} 射撃判定\n
${json.skill_total[4].replace('r','dx')} 知覚判定\n
${json.skill_total[5].replace('r','dx')} 芸術判定\n
${json.skill_total[6].replace('r','dx')} RC判定\n
${json.skill_total[7].replace('r','dx')} 意志判定\n
${json.skill_total[8].replace('r','dx')} 知識判定\n
${json.skill_total[9].replace('r','dx')} 交渉判定\n
${json.skill_total[10].replace('r','dx')} 調達判定\n
${json.skill_total[11].replace('r','dx')} 情報判定\n
ET 感情表`
  }

  return {kind:"character", data:data}
}

export {ToDX3rdCcfolia}