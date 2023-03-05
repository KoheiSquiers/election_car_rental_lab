import { ClassType } from "../../type";

// ハイエース（ワイドボディ）のAPIデータを定義

export const regiusaceAceWide: ClassType = {
  // 統一地方選挙
  unity: {
    unitPrice: {
      car: 1500000,
      ampSize: {
        "60": null,
        "150": null,
        "300": null,
        "600": 0,
      },
      signalLight: {
        outLight: null,
        inLight: 0,
      },
      takingPlatform: 0,
    },
    takingPlatformChangeDisplay: true,
    takingPlatformFix: true,
    changeDisplay: {
      ampSize: {
        "60": false,
        "150": false,
        "300": false,
        "600": true,
      },
      signalLight: {
        outLight: false,
        inLight: true,
      },
    },
  },

  // 一般地方選挙
  general: {
    unitPrice: {
      car: 955000,
      ampSize: {
        "60": null,
        "150": null,
        "300": null,
        "600": 0,
      },
      signalLight: {
        outLight: null,
        inLight: 0,
      },
      takingPlatform: 0,
    },
    takingPlatformChangeDisplay: true,
    takingPlatformFix: false,
    changeDisplay: {
      ampSize: {
        "60": false,
        "150": false,
        "300": false,
        "600": true,
      },
      signalLight: {
        outLight: false,
        inLight: true,
      },
    },
  },

  // 広告宣伝社
  ad: {
    unitPrice: {
      car: 770000,
      ampSize: {
        "60": null,
        "150": null,
        "300": null,
        "600": 0,
      },
      signalLight: {
        outLight: null,
        inLight: 0,
      },
      takingPlatform: 0,
    },
    takingPlatformChangeDisplay: true,
    takingPlatformFix: false,
    changeDisplay: {
      ampSize: {
        "60": false,
        "150": false,
        "300": false,
        "600": true,
      },
      signalLight: {
        outLight: false,
        inLight: true,
      },
    },
  },
};
