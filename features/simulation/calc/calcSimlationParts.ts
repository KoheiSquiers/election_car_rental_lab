import { apiData } from "../../api/apiData";
import { SendDataType } from "../utils/sendDataType";
import { UnitPriceType } from "../../api/type";

// export const electoralClass = (
//   inputValue: ElectoralClass,
// ) => {
//   switch (inputValue) {
//     case "union": //統一地方選挙
//       return apiData.electoralClass.union;
//     case "general": // 一般地方選挙
//       return apiData.electoralClass.general;
//     case "lowRep": // 衆・参議委員選挙
//       return apiData.electoralClass.lowRep;
//     case "advertisement": // 広告宣伝車
//       return apiData.electoralClass.advertisement;
//     default:
//       return 0;
//   }
// };

// 車料金
export const apiPrices = (inputValue: SendDataType): UnitPriceType => {
  switch (inputValue.carClass) {
    case "s":
      return sClass(inputValue.carType.s, inputValue.electoralClass);
    case "m":
      return mClass(inputValue.carType.m, inputValue.electoralClass);
    case "l":
      return lClass(inputValue.carType.l, inputValue.electoralClass);
    case "ll":
      return llClass(inputValue.carType.ll, inputValue.electoralClass);
  }
};

// レンタル区分
type ElectoralClass = "unity" | "general" | "ad";

// s
type sType = "heightWagon" | "boxVan" | "compact";
export const sClass = (typeS: sType, electoralClass: ElectoralClass): UnitPriceType => {
  switch (typeS) {
    case "heightWagon":
      return apiData.s.heightWagon[electoralClass];
    case "boxVan":
      return apiData.s.boxVan[electoralClass];
    case "compact":
      return apiData.s.compact[electoralClass];
  }
};

// m
type mType = "corollaFielder" | "shienta" | "proBox";
export const mClass = (typeM: mType, electoralClass: ElectoralClass): UnitPriceType => {
  switch (typeM) {
    case "corollaFielder":
      return apiData.m.corollaFielder[electoralClass];
    case "shienta":
      return apiData.m.shienta[electoralClass];
    case "proBox":
      return apiData.m.proBox[electoralClass];
  }
};

// l
type lType = "noah" | "townAce";
export const lClass = (typeM: lType, electoralClass: ElectoralClass): UnitPriceType => {
  switch (typeM) {
    case "noah":
      return apiData.l.noah[electoralClass];
    case "townAce":
      return apiData.l.townAce[electoralClass];
  }
};

// ll
type llType = "regiusaceAceBasic" | "regiusaceAceWide";
export const llClass = (typeM: llType, electoralClass: ElectoralClass): UnitPriceType => {
  switch (typeM) {
    case "regiusaceAceBasic":
      return apiData.ll.regiusaceAceBasic[electoralClass];
    case "regiusaceAceWide":
      return apiData.ll.regiusaceAceWide[electoralClass];
  }
};

// アンプサイズ
export const ampSize = (
  signalLight: "60" | "150" | "300" | "600",
  price: { 60: number|null, 150: number | null; 300: number | null; 600: number | null },
): number => {
  switch (signalLight) {
    case "60":
      return price[60] || 0;
    case "150":
      return price[150] || 0;
    case "300":
      return price[300] || 0;
    case "600":
      return price[600] || 0;
    default:
      return 0;
  }
};

// ライト区分
export const signalLight = (
  signalLight: "outLight" | "inLight",
  price: {
    outLight: number | null;
    inLight: number | null;
  },
): number => {
  switch (signalLight) {
    case "outLight": //外照明
      return price.outLight || 0;
    case "inLight": // 内照明
      return price.inLight || 0;
    default:
      return 0;
  }
};

// // スピーカー
// const speaker = () => {
//   switch (inputValue.speaker) {
//     case "twe":
//       return apiData.speaker.twe;
//     case "four":
//       return apiData.speaker.four;
//     default:
//       return 0;
//   }
// };

// // 未使用
// // 議会区分
// type parliamentClass = "chairman" | "chief";
//
// export const parliamentClass = (
//   inputValue: parliamentClass,
// ): number => {
//   switch (inputValue) {
//     case "chairman": // 議員
//       return apiData.electoralType.chairman;
//     case "chief": // 首長
//       return apiData.electoralType.chief;
//     default:
//       return 0;
//   }
// };
