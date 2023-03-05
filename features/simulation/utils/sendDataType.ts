export interface SendDataType {
  // レンタル区分
  electoralClass: "unity" | "general" | "ad";
  // 車クラス
  carClass: "s" | "m" | "l" | "ll";
  // 車種
  carType: {
    s: "heightWagon" | "boxVan" | "compact";
    m: "corollaFielder" | "shienta" | "proBox";
    l: "noah" | "townAce";
    ll: "regiusaceAceBasic" | "regiusaceAceWide";
  };

  takingPlatform: boolean;
  signalLight: "outLight" | "inLight"; // ライト区分
  ampSize: "60" | "150" | "300" | "600"; // アンプサイズ
  speaker: string; // スピーカー

  wirelessMike: boolean; // ワイヤレスマイク
  wirelessMikeNumber: number; //ワイヤレスマイク数
  sd: boolean; // SDカード
  wirelessIncome: boolean; // ワイヤレスインカム
  handSpeaker: boolean; // ハンドスピーカー
  bluetoothUnit: boolean; // Bluetoothユニット
  insurance: boolean;
  insuranceDays: number;
  bodyRapping: boolean; // ボディラッピング
}
