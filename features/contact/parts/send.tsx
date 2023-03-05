import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useQState } from "../../../hooks/library/useQstate";
import {
  CarClassConv,
  CarTypeConv,
  ContactType,
  DayConv,
  ElectoralClassConv,
  LocationConv,
  OptionConv,
  ParliamentClassConv,
  PiecesConv,
  PriceTaxConv,
  SignalLightConv,
  SpeakerConv,
  WattConv,
} from "../../../utils/dataConv";
import { init, send } from "emailjs-com";

import { InputValue } from "../contactControl";
import { SendDataType } from "../../simulation/utils/sendDataType";
import { CalcDataType } from "../../simulation/calc/calcSimulation";

interface ConfirmationProps {
  inputData: InputValue;
  setStepper: any;
}

interface ConfLabelProps {
  label: string;
  value: string | number;
}

const ConfLabel = ({ label, value }: ConfLabelProps) => {
  return (
    <>
      <Grid xs={12} sm={6} sx={{ textAlign: { xs: "center", md: "left" } }}>
        <Typography fontWeight={"bold"}>【 {label} 】</Typography>
      </Grid>
      <Grid xs={12} sm={6} sx={{ textAlign: { xs: "center", sm: "left" } }}>
        <Typography>{value}</Typography>
      </Grid>
    </>
  );
};

//
// メール送信
//
const Send = ({ inputData, setStepper }: ConfirmationProps) => {
  const [sendData] = useQState<SendDataType>(["sendData"]);
  const [calcData] = useQState<CalcDataType>(["calcData"]);

  const [open, setOpen] = useState<boolean>(false);

  const sendMail = () => {
    const userID = process.env.NEXT_PUBLIC_USER_ID;
    const serviceID = process.env.NEXT_PUBLIC_SERVICE_ID;
    const templateID = process.env.NEXT_PUBLIC_TEMPLATE_ID;

    if (userID !== undefined && serviceID !== undefined && templateID !== undefined) {
      // undefinedでなければ、init(userID)で初期化を実行
      init(userID);

      const template_param = {
        name: inputData?.name, //"お名前"
        furigana: inputData?.furigana, //"フリガナ"
        postCode: inputData?.postCode, //"郵便番号"
        address: inputData?.address, //"住所"
        tel: inputData?.tel, //"電話番号"
        mail: inputData?.mail, //"メールアドレス"

        officePostCode: inputData?.officePostCode, //"選挙事務所郵便番号"
        officeAddress: inputData?.officeAddress, //"選挙事務所住所"
        officeTel: inputData?.officeTel, //"選挙事務所電話番号"
        liabilityName: inputData?.liabilityName, //"選挙責任者（今後の窓口の方）"
        contactType: ContactType(inputData?.contactType), //"当社との連絡方法"

        startDateTime: inputData?.startDateTime, // "納車日時"
        startLocation: LocationConv(inputData?.startLocation), // "納車場所"
        startOther: inputData?.startOther, // "その他の場合の入力フォーム"
        endDateTime: inputData?.endDateTime, // "引取日時"
        endLocation: LocationConv(inputData?.endLocation), // "引取場所"
        endOther: inputData?.endOther, // "その他の場合の入力フォーム"
        note: inputData?.note, //"備考"

        electoralClass: ElectoralClassConv(sendData?.electoralClass), // 選挙区分
        electionArea: inputData?.electionArea.label, // 選挙エリア
        parliamentClass: ParliamentClassConv(inputData?.parliamentClass), // 議会区分
        notificationDate: inputData?.notificationDate, // 告示日

        carClass: CarClassConv(sendData?.carClass), // 車種クラス
        carType: CarTypeConv(sendData?.carType[sendData?.carClass]), // 車種タイプ
        signalLight: SignalLightConv(sendData?.signalLight), // ライト区分
        ampSize: WattConv(sendData?.ampSize), // アンプサイズ
        speaker: SpeakerConv(sendData?.speaker), // スピーカー

        // オプション
        wirelessMike: OptionConv(sendData?.wirelessMike), // ワイヤレスマイク
        wirelessMikeNumber: sendData?.wirelessMike ? sendData?.wirelessMikeNumber : null, //ワイヤレスマイク数
        sd: OptionConv(sendData?.sd), // SDカード
        wirelessIncome: OptionConv(sendData?.wirelessIncome), // ワイヤレスインカム
        handSpeaker: OptionConv(sendData?.handSpeaker), // ハンドスピーカー
        bluetoothUnit: OptionConv(sendData?.bluetoothUnit), // Bluetoothユニット
        insurance: OptionConv(sendData?.insurance), //保険
        insuranceDays: sendData?.insurance ? sendData?.insuranceDays : null, // 保険日数
        bodyRapping: OptionConv(sendData?.bodyRapping), // ボディラッピング

        //金額
        subTotalPrice: PriceTaxConv(calcData?.subTotalPrice),
        optionTotalPrice: PriceTaxConv(calcData?.optionTotalPrice),
        totalPrice: PriceTaxConv(calcData?.totalPrice),
      };

      send(serviceID, templateID, template_param, "tvR3Qt2HckYv81QKY").then(() => {
        setStepper(2);
        setOpen(false);
      });
    }
  };

  //
  // 初回レンダリング時にステッパーをセット
  //
  useEffect(() => {
    setStepper(1);
  }, []);

  return (
    <Container maxWidth="xs">
      <Grid container rowSpacing={2}>
        <Grid xs={12}>
          <Typography variant={"caption"}>
            下記の入力内容に相違ないようでしたら「送信する」ボタンを押してください。
            内容の変更を行う場合は「戻る」ボタンを押してください。
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider sx={{ mb: 2 }} />
        </Grid>

        {/**/}
        {/* 選挙情報 */}
        {/**/}
        <Grid xs={12}>
          <Typography>選挙情報</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <ConfLabel label={"議会区分"} value={ParliamentClassConv(inputData.parliamentClass)} />
            <ConfLabel label={"選挙区"} value={inputData.electionArea.label} />
            <ConfLabel label={"告示日"} value={inputData.notificationDate} />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Divider sx={{ mb: 2, mt: 2 }} />
        </Grid>

        {/**/}
        {/* 基本内容 */}
        {/**/}
        <Grid xs={12}>
          <Typography>基本内容</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <ConfLabel label={"お名前"} value={inputData.name} />
            <ConfLabel label={"フリガナ"} value={inputData.furigana} />
            <ConfLabel label={"郵便番号"} value={inputData.postCode} />
            <ConfLabel label={"住所"} value={inputData.address} />
            <ConfLabel label={"電話番号"} value={inputData.tel} />
            <ConfLabel label={"メールアドレス"} value={inputData.mail} />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Divider sx={{ mb: 2, mt: 2 }} />
        </Grid>
        {/**/}
        {/* 選挙事務所情報 */}
        {/**/}
        <Grid xs={12} sx={{ pt: 2 }}>
          <Typography>選挙事務所情報</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <ConfLabel label={"選挙事務所郵便番号"} value={inputData.officePostCode} />
            <ConfLabel label={"選挙事務所住所"} value={inputData.officeAddress} />
            <ConfLabel label={"選挙事務所電話番号"} value={inputData.officeTel} />
            <ConfLabel label={"選挙責任者"} value={inputData.liabilityName} />
            <ConfLabel label={"当社との連絡方法"} value={ContactType(inputData.contactType)} />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Divider sx={{ mb: 2, mt: 2 }} />
        </Grid>

        {/**/}
        {/* 納車・引取り情報 */}
        {/**/}
        <Grid xs={12} sx={{ pt: 2 }}>
          <Typography>納車・引取情報</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            {/* 納車 */}
            <ConfLabel label={"納車日時"} value={inputData.startDateTime} />
            <ConfLabel label={"納車場所"} value={LocationConv(inputData.startLocation)} />
            {inputData.startLocation === "other" && (
              <ConfLabel label={"その他の納車場所"} value={inputData.startOther} />
            )}
            {/* 引き取り */}
            <ConfLabel label={"引取日時"} value={inputData.endDateTime} />
            <ConfLabel label={"引取場所"} value={LocationConv(inputData.endLocation)} />
            {inputData.endLocation === "other" && (
              <ConfLabel label={"その他の引取場所"} value={inputData.endOther} />
            )}
            <ConfLabel label={"備考"} value={inputData.note} />{" "}
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ mb: 2, mt: 2 }} />
        </Grid>

        {/**/}
        {/* レンタル車両情報 */}
        {/**/}
        <Grid xs={12} sx={{ pt: 2 }}>
          <Typography>レンタル車両情報</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <ConfLabel
              label={"レンタル区分"}
              value={ElectoralClassConv(sendData?.electoralClass)}
            />
            <ConfLabel label={"選挙エリア"} value={inputData?.electionArea?.label} />
            <ConfLabel label={"議会区分"} value={ParliamentClassConv(inputData?.parliamentClass)} />
            {/*TODO*/}
            <ConfLabel label={"車種クラス"} value={CarClassConv(sendData?.carClass)} />
            <ConfLabel label={"車種"} value={CarTypeConv(sendData?.carType[sendData?.carClass])} />
            <ConfLabel label={"ライト区分"} value={SignalLightConv(sendData?.signalLight)} />
            <ConfLabel label={"アンプサイズ"} value={WattConv(sendData?.ampSize)} />
            <ConfLabel label={"スピーカー"} value={SpeakerConv(sendData?.speaker)} />
            <ConfLabel label={"レンタル車両金額"} value={PriceTaxConv(calcData?.subTotalPrice)} />
            <Grid item xs={12}>
              <Divider sx={{ mb: 2, mt: 2 }} />
            </Grid>
          </Grid>
        </Grid>

        {/**/}
        {/* オプション追加 */}
        {/**/}
        <Grid xs={12} sx={{ pt: 2 }}>
          <Typography>オプション追加</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            {/* オプション */}
            <ConfLabel label={"ワイヤレスマイク"} value={OptionConv(sendData?.wirelessMike)} />
            {sendData?.wirelessMike && (
              <ConfLabel
                label={"ワイヤレスマイク数"}
                value={PiecesConv(sendData?.wirelessMikeNumber)}
              />
            )}
            <ConfLabel label={"SDカード"} value={OptionConv(sendData?.sd)} />
            <ConfLabel label={"ワイヤレスインカム"} value={OptionConv(sendData?.wirelessIncome)} />
            <ConfLabel label={"ハンドスピーカー"} value={OptionConv(sendData?.handSpeaker)} />
            <ConfLabel label={"Bluetoothユニット"} value={OptionConv(sendData?.bluetoothUnit)} />
            <ConfLabel label={"保険"} value={OptionConv(sendData?.insurance)} />
            {sendData?.insurance && (
              <ConfLabel label={"保険日数"} value={DayConv(sendData?.insuranceDays)} />
            )}
            <ConfLabel label={"ボディラッピング"} value={OptionConv(sendData?.bodyRapping)} />
            <ConfLabel label={"オプション金額"} value={PriceTaxConv(calcData?.optionTotalPrice)} />
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ mb: 2, mt: 2 }} />
        </Grid>
        <ConfLabel label={"合計金額"} value={PriceTaxConv(calcData?.totalPrice)} />

        <Grid item xs={6}>
          <Box textAlign={{ xs: "left", sm: "center" }} padding={2}>
            <Button
              variant={"outlined"}
              centerRipple={true}
              onClick={() => {
                setStepper(0);
              }}
            >
              戻る
            </Button>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box textAlign={{ xs: "right", sm: "right" }} padding={2}>
            <Button
              variant={"contained"}
              centerRipple={true}
              onClick={() => {
                sendMail();
                setOpen(true);
              }}
            >
              送信
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
};

export default Send;

// const sendMail = async () => {
//   const userID = process.env.NEXT_PUBLIC_USER_ID;
//   const serviceID = process.env.NEXT_PUBLIC_SERVICE_ID;
//   const templateID = process.env.NEXT_PUBLIC_TEMPLATE_ID;
//
//   if (userID !== undefined && serviceID !== undefined && templateID !== undefined) {
//     // undefinedでなければ、init(userID)で初期化を実行
//     init(userID);
//
//     // /*pdf document*/
//     // const element = <Quote sendData={sendData} calcData={calcData} />;
//     // const myPdf = pdf();
//     // myPdf.updateContainer(element);
//     // const blob = await myPdf.toBlob();
//     //
//     // /*create blob*/
//     // var file = new File([blob], "pdfname.pdf", {
//     //   lastModified: new Date().getTime(),
//     // });
//     // /*create file*/
//     //
//     //
//     // const reader = new FileReader();
//     //
//     // // base64に変換
//     // reader.onload = function () {
//     //   const b64 = reader.result;
//     //   console.log(b64);
//     //   return b64;
//     // };
//     //
//     // reader.readAsDataURL(blob);
//     //
//
//     const template_param = {
//       // Attachments: btoa("aaaaa"),
//       // pdf: (reader.onload = function () {
//       //   const b64 = reader.result;
//       //   console.log(b64);
//       //   return b64;
//       // }),
//       // test: (reader.onload = function () {
//       //   const b64 = reader.result;
//       //   console.log(b64);
//       //   return b64;
//       // }),
//       // test1: (reader.onload = function () {
//       //   const b64 = reader.result;
//       //   console.log(b64);
//       //   return b64;
//       // }),
//
//       name: inputData?.name, //"お名前"
//       furigana: inputData?.furigana, //"フリガナ"
//       postCode: inputData?.postCode, //"郵便番号"
//       address: inputData?.address, //"住所"
//       tel: inputData?.tel, //"電話番号"
//       mail: inputData?.mail, //"メールアドレス"
//
//       officePostCode: inputData?.officePostCode, //"選挙事務所郵便番号"
//       officeAddress: inputData?.officeAddress, //"選挙事務所住所"
//       officeTel: inputData?.officeTel, //"選挙事務所電話番号"
//       liabilityName: inputData?.liabilityName, //"選挙責任者（今後の窓口の方）"
//       contactType: inputData?.contactType, //"当社との連絡方法"
//
//       startDateTime: inputData?.startDateTime, // "納車日時"
//       startLocation: inputData?.startLocation, // "納車場所"
//       startOther: inputData?.startOther, // "その他の場合の入力フォーム"
//       endDateTime: inputData?.endDateTime, // "引取日時"
//       endLocation: inputData?.endLocation, // "引取場所"
//       endOther: inputData?.endOther, // "その他の場合の入力フォーム"
//       compact: inputData?.compact, //"備考"
//
//       electoralClass: sendData?.electoralClass, // 選挙区分
//       electionArea: sendData?.electionArea.label, // 選挙エリア
//       parliamentClass: sendData?.parliamentClass, // 議会区分
//
//       carClass: sendData?.carClass, // 車種クラス
//       carType: sendData?.carType[sendData?.carClass], // 車種タイプ
//       signalLight: sendData?.signalLight, // ライト区分
//       ampSize: sendData?.ampSize, // アンプサイズ
//       speaker: sendData?.speaker, // スピーカー
//
//       // オプション
//       wirelessMike: sendData?.wirelessMike, // ワイヤレスマイク
//       wirelessMikeNumber: sendData?.wirelessMikeNumber, //ワイヤレスマイク数
//       sd: sendData?.sd, // SDカード
//       wirelessIncome: sendData?.wirelessIncome, // ワイヤレスインカム
//       handSpeaker: sendData?.handSpeaker, // ハンドスピーカー
//       bluetoothUnit: sendData?.bluetoothUnit, // Bluetoothユニット
//       insurance: sendData?.insurance, //保険
//       insuranceDays: sendData?.insuranceDays, // 保険日数
//       bodyRapping: sendData?.bodyRapping, // ボディラッピング
//
//       //金額
//       subTotalPrice: calcData?.subTotalPrice,
//       optionTotalPrice: calcData?.optionTotalPrice,
//       totalPrice: calcData?.totalPrice,
//     };
//
//     send(serviceID, templateID, template_param, "tvR3Qt2HckYv81QKY", {
//       content: reader.result,
//     }).then(() => {
//       setStepper(2);
//     });
//   }
// };
