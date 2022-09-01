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

const ToDlhCcfolia=(json:any, key:string):CharacterClipboardData=>{
	const data:Character={
		name: `'${json.base.name}' ${json.base.nameKana}`,
		memo: json.base.memo,
		externalUrl: `https://character-sheets.appspot.com/dlh/edit.html?key=${key}`,
		status:[
			{label:"ライフ", value: Number(json.energy.life.current), max:Number(json.energy.life.max)},
			{label:"サニティ", value: Number(json.energy.sanity.current), max:Number(json.energy.sanity.max)},
			{label:"クレジット", value: Number(json.energy.credit.current), max:Number(json.energy.credit.max)},
			{label:"ターン", value: 0, max:20}
		],
		params:[
			{label: "肉体", value: json.ability.body.value},
			{label: "環境", value: json.ability.env.value},
			{label: "精神", value: json.ability.mental.value},
		],
		iconUrl: null,
		faces:[{iconUrl: null,label:""}],
    x:2,
    y:2,
    active:true,
	}

	return {kind:"character", data:data}
}

export {ToDlhCcfolia}