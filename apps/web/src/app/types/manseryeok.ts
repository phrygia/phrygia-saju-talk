export type Ohaeng = "목" | "화" | "토" | "금" | "수";

export interface JuCheongan {
  hanja: string;
  hangul: string;
  ohaeng: Ohaeng;
}

export interface JuJiji {
  hanja: string;
  hangul: string;
  ohaeng: Ohaeng;
}

export interface Jijanggan {
  hanja: string;
  hangul: string;
  sipshin: string;
}

export interface Ju {
  sipshin: string;
  cheongan: JuCheongan;
  jiji: JuJiji;
  jijiSipshin: string;
  jijanggan: Jijanggan[];
  gilshin: string;
  sibishinsal: string;
  sibiUnseong: {
    main: string;
    sub: string;
  };
}

export interface SajupaljaData {
  year: Ju;
  month: Ju;
  day: Ju;
  hour: Ju;
  gongmang: string;
}

export interface OhaengBunpo {
  mok: number;
  hwa: number;
  to: number;
  geum: number;
  su: number;
}

export interface SipshinBunpo {
  bigyeop: number;
  sigwansik: number;
  jaeseong: number;
  gwanseong: number;
  inseong: number;
}

export interface SeongHyangData {
  positive: string[];
  negative: string[];
  teukjing: string;
  jaeneung: string;
  gwan: string;
  geongang: string;
  tip: string;
}

export interface DaeunPeriod {
  age: number;
  sipshin: string;
  cheongan: JuCheongan;
  jiji: JuJiji;
  jijiSipshin: string;
  sibiUnseong: {
    cheongan: string;
    jiji: string;
  };
}

export interface Daeun {
  startAge: number;
  description: string;
  periods: DaeunPeriod[];
}

export interface SeunYear {
  age: number;
  year: number;
  sipshin: string;
  cheongan: JuCheongan;
  jiji: JuJiji;
  jijiSipshin: string;
  sibiUnseong: {
    cheongan: string;
    jiji: string;
  };
}

export interface WolunMonth {
  month: number;
  sipshin: string;
  cheongan: JuCheongan;
  jiji: JuJiji;
  jijiSipshin: string;
  sibiUnseong: string;
}

export interface Wolun {
  year: number;
  months: WolunMonth[];
}

export interface ManseryeokData {
  sajupalja: SajupaljaData;
  ohaengBunpo: OhaengBunpo;
  sipshinBunpo: SipshinBunpo;
  seongHyang: SeongHyangData;
  daeun: Daeun;
  seun: SeunYear[];
  wolun: Wolun;
}
