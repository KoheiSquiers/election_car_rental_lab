import { useGetWindowSize } from "../../hooks/useGetWindowSize";
import { useQState } from "../../hooks/library/useQstate";
import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  SelectChangeEvent,
  Step,
  StepButton,
  Stepper,
  Typography,
} from "@mui/material";
import Layout from "../../component/templates/layout";
import InputForm from "./parts/input";
import Send from "./parts/send";
import Finish from "./parts/finish";

export interface InputValue {
  // 選挙情報
  parliamentClass: "chairman" | "chaief";
  electionArea: { label: string; value: string };
  notificationDate: string;

  name: string; //"お名前"
  furigana: string; //"フリガナ"
  postCode: string; //"郵便番号"
  address: string; //"住所"
  tel: string; //"電話番号"

  officePostCode: string; //"選挙事務所郵便番号"
  officeAddress: string; //"選挙事務所住所"
  officeTel: string; //"選挙事務所電話番号"

  mail: string; //"メールアドレス"
  mailCheck: string; // "確認用メールアドレス"

  liabilityName: string; //"選挙責任者（今後の窓口の方）"
  contactType: string; //"当社との連絡方法"

  startDateTime: string; // "納車日時"
  startLocation: string; // "納車場所"
  startOther: string; // "その他の場合の入力フォーム"

  endDateTime: string; // "引取日時"
  endLocation: string; // "引取場所"
  endOther: string; // "その他の場合の入力フォーム"

  note: string; //"備考"
}

export const ContactControl = () => {
  const windowSize = useGetWindowSize();

  const [sendData] = useQState<any>(["sendData"]);
  const [calcData] = useQState<any>(["calcData"]);

  // formType Change
  const [formTypeChange, setFormTypeChange] = useState<any>("outlined");
  const handleChangeForm = (event: SelectChangeEvent) => {
    setFormTypeChange(event.target.value);
  };

  //
  // react hook form
  //
  const defaultValues: InputValue = {
    parliamentClass: "chairman",
    electionArea: { label: "", value: "" },
    notificationDate: "",

    name: "", //"お名前"
    furigana: "", //"フリガナ"
    postCode: "", //"郵便番号"
    address: "", //"住所"
    tel: "", //"電話番号"
    mail: "", //"メールアドレス"
    mailCheck: "", // "確認用メールアドレス"

    officePostCode: "", //"選挙事務所郵便番号"
    officeAddress: "", //"選挙事務所住所"
    officeTel: "", //"選挙事務所電話番号"
    liabilityName: "", //"選挙責任者（今後の窓口の方）"
    contactType: "", //"当社との連絡方法"

    startDateTime: "", // "納車日時"
    startLocation: "", // "納車場所"
    startOther: "", // "その他の場合の入力フォーム"
    endDateTime: "", // "引取日時"
    endLocation: "", // "引取場所"
    endOther: "", // "その他の場合の入力フォーム"
    note: "", //"備考"
  };
  const [inputData, setInputData] = useState(defaultValues);

  // stepper utils
  const [stepper, setStepper] = useState<number>(0);

  return (
    <>
      <Layout>
        <Grid container>
          {/*メインタイトル*/}
          <Grid item xs={9}>
            <Typography variant={"h5"}>お問合せ</Typography>
          </Grid>
          <Grid item xs={3}>
            <Box textAlign={"right"}>
              <Button variant="contained" size={"small"} href="http://senkyocar-labo.com/">
                TOP
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ mb: 2, mt: 2 }} />
          </Grid>

          {/*ステッパー*/}
          <Grid item xs={12}>
            <Box sx={{ pb: 4 }}>
              <Container maxWidth="sm">
                <Stepper activeStep={stepper}>
                  <Step>
                    <StepButton>入力</StepButton>
                  </Step>

                  <Step>
                    <StepButton>確認</StepButton>
                  </Step>

                  <Step>
                    <StepButton>完了</StepButton>
                  </Step>
                </Stepper>
              </Container>
            </Box>
          </Grid>

          {/*メインフォーム*/}
          <Grid item xs={12}>
            {/*入力*/}
            {stepper === 0 && (
              <InputForm
                setInputData={setInputData}
                inputData={inputData}
                setStepper={setStepper}
              />
            )}

            {/*確認*/}
            {stepper === 1 && <Send inputData={inputData} setStepper={setStepper} />}

            {/*送信*/}
            {stepper === 2 && <Finish setStepper={setStepper} />}
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};
