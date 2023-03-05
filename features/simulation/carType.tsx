import React from "react";
import CarToggle from "../../component/organisms/rapForm/carToggle";
import { PriceConv } from "../../utils/dataConv";
import { ApiDataType } from "../api/type";
import { useWatch } from "react-hook-form";

interface CarCarProps {
  control: any;
  setValue: any;
  apiData: ApiDataType;
}

// sClass
export const LightCar = ({ control, setValue, apiData }: CarCarProps) => {
  const getElectoralClass: "unity" | "general" | "ad" = useWatch({
    control,
    name: "electoralClass",
  });
  return (
    <>
      <CarToggle
        control={control}
        name={"carType.s"}
        options={[
          {
            label: "軽ハイトワゴン",
            value: "heightWagon",
            priceLabel: PriceConv(apiData?.s.heightWagon[getElectoralClass].unitPrice.car),
            image: "contact/image/car/sClass/heightWagon.png",
          },
          {
            label: "軽ハコバン",
            value: "boxVan",
            priceLabel: PriceConv(apiData?.s.boxVan[getElectoralClass].unitPrice.car),
            image: "contact/image/car/sClass/boxVan.png",
          },
          {
            label: "コンパクトカー",
            value: "compact",
            priceLabel: PriceConv(apiData?.s.compact[getElectoralClass].unitPrice.car),
            image: "contact/image/car/sClass/compact.png",
          },
        ]}
      />
    </>
  );
};

// mClass
export const CompactCar = ({ control, setValue, apiData }: CarCarProps) => {
  const getElectoralClass: "unity" | "general" | "ad" = useWatch({
    control,
    name: "electoralClass",
  });
  return (
    <>
      <CarToggle
        control={control}
        name={"carType.m"}
        options={[
          {
            label: "カローラ フィルダー",
            value: "corollaFielder",
            priceLabel: PriceConv(apiData?.m.corollaFielder[getElectoralClass].unitPrice.car),
            image: "contact/image/car/mClass/corollaFielder.png",
          },
          {
            label: "トヨタ シエンタ",
            value: "shienta",
            priceLabel: PriceConv(apiData?.m.shienta[getElectoralClass].unitPrice.car),
            image: "contact/image/car/noImage.png",
          },
          {
            label: "プロボックス",
            value: "proBox",
            priceLabel: PriceConv(apiData?.m.proBox[getElectoralClass].unitPrice.car),
            image: "contact/image/car/mClass/proBox.png",
          },
        ]}
      />
    </>
  );
};

// lClass
export const StandardCar = ({ control, setValue, apiData }: CarCarProps) => {
  const getElectoralClass: "unity" | "general" | "ad" = useWatch({
    control,
    name: "electoralClass",
  });
  return (
    <>
      <CarToggle
        control={control}
        name={"carType.l"}
        options={[
          {
            label: "NOAH",
            value: "noah",
            priceLabel: PriceConv(apiData?.l.noah[getElectoralClass].unitPrice.car),
            image: "contact/image/car/lClass/noah.png",
          },
          {
            label: "タウンエース",
            value: "townAce",
            priceLabel: PriceConv(apiData?.l.townAce[getElectoralClass].unitPrice.car),
            image: "contact/image/car/lClass/townAce.png",
          },
        ]}
      />
    </>
  );
};

// llClass
export const VanCar = ({ control, setValue, apiData }: CarCarProps) => {
  const getElectoralClass: "unity" | "general" | "ad" = useWatch({
    control,
    name: "electoralClass",
  });
  return (
    <>
      <CarToggle
        control={control}
        name={"carType.ll"}
        options={[
          {
            label: "regiusaceAce(標準ボディ)",
            value: "regiusaceAceBasic",
            priceLabel: PriceConv(apiData?.ll.regiusaceAceBasic[getElectoralClass].unitPrice.car),
            image: "contact/image/car/noImage.png",
          },
          {
            label: "regiusaceAce(ワイドボディ)",
            value: "regiusaceAceWide",
            priceLabel: PriceConv(apiData?.ll.regiusaceAceWide[getElectoralClass].unitPrice.car),
            image: "contact/image/car/llClass/regiusaceAceWide.png",
          },
        ]}
      />
    </>
  );
};
