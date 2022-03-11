import {ToDX3rdCcfolia} from "./DX3rd"

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

const VampireBloodSystemSort=(json:any, key:string):CharacterClipboardData|null=>{
  switch(json.game){
    case "dx3":
      return ToDX3rdCcfolia(json, key)
    default:
      alert("対応していないシステムです")
      return null
  }
}

export default VampireBloodSystemSort;