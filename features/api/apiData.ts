//
// APIデータを仮定義する。
// 将来的にはファイアーベースから値を取得する予定。
//
// 各単価のセットを行っており、nullの場合は計算&表示を行わない。
// takingPlatform(登壇)の場合は、booleanで表示非表示を切り替える。
//
// 単価がnullでtakingPlatformの何かの値がtrueの場合は、計算＆表示を行わない。
//

import { ApiDataType } from "./type";
import { boxVan } from "./carApiData/s/boxVan";
import { heightWagon } from "./carApiData/s/heightWagon";
import { compact } from "./carApiData/s/compact";
import { corollaFielder } from "./carApiData/m/corollaFielder";
import { proBox } from "./carApiData/m/proBox";
import { shienta } from "./carApiData/m/shienta";
import { noah } from "./carApiData/l/noah";
import { townAce } from "./carApiData/l/townAce";
import { regiusaceAceWide } from "./carApiData/ll/regiusaceAceWide";
import { regiusaceAceBasic } from "./carApiData/ll/regiusaceAceBasic";

export const apiData: ApiDataType = {
  s: {
    heightWagon: heightWagon,
    boxVan: boxVan,
    compact: compact,
  },
  m: {
    corollaFielder: corollaFielder,
    shienta: shienta,
    proBox: proBox,
  },
  l: {
    noah: noah,
    townAce: townAce,
  },
  ll: {
    regiusaceAceBasic: regiusaceAceBasic,
    regiusaceAceWide: regiusaceAceWide,
  },

  //
  // オプション
  //

  // ワイヤレスマイク
  mikeValue: {
    unity: 22000,
    general: 16500,
    ad: 16500,
  },
  // SDカード料金
  sdPrice: {
    unity: 27500,
    general: 22000,
    ad: 22000,
  },
  // ワイヤレスインカム料金
  incomePrice: {
    unity: 22000,
    general: 16500,
    ad: 16500,
  },
  // ハンドスピーカー
  handSpeaker: {
    unity: 55000,
    general: 27500,
    ad: 27500,
  },
  // Bluetoothユニット料金
  bluetoothUnit: {
    unity: 22000,
    general: 16500,
    ad: 16500,
  },
  // 保険単価
  insuranceValue: {
    basic: {
      unity: 3300,
      general: 3300,
      ad: 3300,
    },
    takingPlatform: {
      unity: 4400,
      general: 4400,
      ad: 4400,
    },
  },
};
