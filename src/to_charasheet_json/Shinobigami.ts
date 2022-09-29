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

type SkillType = {
  [key: string]: string[]
}

const ToShinobigamiCcfolia=(json:any, key:string):CharacterClipboardData=>{
  const skills:SkillType={
    "器術":["絡繰術","火術","水術","針術","仕込み","衣装術","縄術","登術","拷問術","壊器術","掘削術"],
    "体術":["騎乗術","砲術","手裏剣術","手練","身体操術","歩法","走法","飛術","骨法術","刀術","怪力"],
    "忍術":["生存術","潜伏術","遁走術","盗聴術","腹話術","隠形術","変装術","香術","分身の術","隠蔽術","第六感"],
    "謀術":["医術","毒術","罠術","調査術","詐術","対人術","遊芸","九ノ一の術","傀儡の術","流言の術","経済力"],
    "戦術":["兵糧術","鳥獣術","野戦術","地の利","意気","用兵術","記憶術","見敵術","暗号術","伝達術","人脈"],
    "妖術":["異形化","召喚術","死霊術","結界術","封術","言霊術","幻術","瞳術","千里眼の術","憑依術","呪術"]
  }


  const targetValue=()=>{
    const haveSkills=Object.keys(json.learned).map((key)=>{
      if(json.learned[key].id)console.log(json.learned[key].id.match(/\d+/)[0]+','+json.learned[key].id.match(/\d+/g)[1])
      if(json.learned[key].id)return [Number(json.learned[key].id.match(/\d+/g)[1]),Number(json.learned[key].id.match(/\d+/)[0])]
      else return null
    })
    haveSkills.shift()

    const gap=(element:number,objectIndex:number)=>{
      let gapMinus:number=0;
      if(element-objectIndex!==0){
        if(json.skills.a==="1"){
          if((element===0 && objectIndex>0) || (element>=1 && objectIndex<1))--gapMinus
        }
        if(json.skills.b==="1"){
          if((element<=1 && objectIndex>1) || (element>=2 && objectIndex<2))--gapMinus
        }
        if(json.skills.c==="1"){
          if((element<=2 && objectIndex>2) || (element>=3 && objectIndex<3))--gapMinus
        }
        if(json.skills.d==="1"){
          if((element<=3 && objectIndex>3) || (element>=4 && objectIndex<3))--gapMinus
        }
        if(json.skills.e==="1"){
          if((element<=4 && objectIndex>4) || (element>=5 && objectIndex<5))--gapMinus
        }
      }
      return gapMinus
    }

    const targetValuesArray=Object.keys(skills).map((key:string, objectIndex:number)=>{
      return skills[key].map((field,index:number)=>{
        return Math.min(...haveSkills.map((element)=>{
          return Math.abs(((element as number[])[0] - objectIndex) * 2) + gap((element as number[])[0], objectIndex) + Math.abs((element as number[])[1]-index)
        }))
      })
    })
    console.log(targetValuesArray)

    let palette=""
    targetValuesArray.forEach((name,nameIndex)=>{
      palette+=`${Object.keys(skills)[nameIndex]}\n`
      name.forEach((row,rowIndex)=>{
        palette+=`2d6>=${5+targetValuesArray[nameIndex][rowIndex]} ${skills[Object.keys(skills)[nameIndex]][rowIndex]}判定\n`
      })
    })
    console.log(palette)
    return palette
  }

  targetValue()

	const data:Character={
		name: json.base.name,
    memo: `年齢:${json.base.age}\n信念:${json.base.belief}\n階級:${json.base.level}\n${json.base.memo ? json.base.memo : ""}`,
    externalUrl:`https://character-sheets.appspot.com/shinobigami/edit.html?key=${key}`,
    status:[
      {label:"生命力", value:6, max:0},
      {label:"忍具", value:2, max:0}
    ],
    iconUrl:null,
    faces:[{iconUrl:null, label:""}],
    x:2,
    y:2,
    active:true,
    commands:`${targetValue()}
ST シーン表\n
FT ファンブル表\n
ET 感情表\n
WT 変調表\n
BT 戦場表\n
GWT 戦国変調表\n
MT 異形表\n
RTT ランダム特技決定表(末尾につける数字によって分野指定可能1器術 2体術 3忍術 4謀術 5戦術 6妖術)\n
RCT ランダム分野表\n
CST 都市シーン表\n
MST 館シーン表\n
DST 出島シーン表\n
TST トラブルシーン表\n
NST 日常シーン表\n
KST 回想シーン表\n
TKST 東京シーン表\n
GST 戦国シーン表\n
GAST 学校シーン表\n
KYST 京都シーン表\n
JBST 神社仏閣シーン表\n
KFT 怪ファンブル表\n
KWT 怪変調表\n
AKST 秋空に雪舞えばシーン表\n
CLST 災厄シーン表\n
DXST 出島EXシーン表\n
HLST 斜歯ラボシーン表\n
NTST 夏の終わりシーン表\n
PLST 培養プラントシーン表\n
HC 中忍試験シーン表\n
HT 滅びの塔シーン表\n
HK 影の街でシーン表\n
HY 夜行列車シーン表\n
HO 病院シーン表\n
HR 龍動シーン表\n
HM 密室シーン表\n
HS 催眠シーン表`
	}

  return {kind:"character", data:data}
}

export {ToShinobigamiCcfolia}