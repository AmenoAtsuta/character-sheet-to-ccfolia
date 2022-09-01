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
		commands:`DCLx 肉体デスチャート(xにはマイナス値を記入)\n
		DCSx 精神デスチャート(xにはマイナス値を記入)\n
		DCCx 環境デスチャート(xにはマイナス値を記入)\n
		DLH${json.skills.body.s1.total} 白兵判定\n
		DLH${json.skills.body.s2.total} 射撃判定\n
		DLH${json.skills.body.s3.total} 運動判定\n
		DLH${json.skills.body.s4.total} 生存判定\n
		DLH${json.skills.body.s5.total} 操縦判定\n
		DLH${json.skills.mental.s1.total} 霊能判定\n
		DLH${json.skills.mental.s2.total} 心理判定\n
		DLH${json.skills.mental.s3.total} 意志判定\n
		DLH${json.skills.mental.s4.total} 知覚判定\n
		DLH${json.skills.mental.s5.total} 追憶判定\n
		DLH${json.skills.env.s1.total} 作戦判定\n
		DLH${json.skills.env.s2.total} 隠密判定\n
		DLH${json.skills.env.s3.total} 交渉判定\n
		DLH${json.skills.env.s4.total} 科学判定\n
		DLH${json.skills.env.s5.total} 経済判定\n
		HNC ヒーローネームチャート\n
		RNCJ リアルネームチャート(日本)\n
		RNCO リアルネームチャート(海外)`
	}

	return {kind:"character", data:data}
}

export {ToDlhCcfolia}