import React from "react";
import { Controller } from "react-hook-form";
import ja from "date-fns/locale/ja";
import { RhfProps } from "./type";

import { Box, TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers-pro";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export interface DatePickerProps {
  name: string;
  label: string;

  required?: boolean;
  views?: Array<"year" | "day" | "month">;
  openTo?: "year" | "day" | "month";
  mask?: string;
  inputFormat?: string;
}

type RhfDateTimePickerProps = RhfProps & DatePickerProps;

const RhfDateTimePicker = ({
  control,
  errors,
  name,
  label,

  required = false,
  views = ["year", "month", "day"],
  openTo = "year",
  inputFormat = "yyyy/MM/dd",
  mask = "____/__/__",
}: RhfDateTimePickerProps) => {
  const styles = {
    mobiledialogprops: {
      ".MuiDatePickerToolbar-title": {
        fontSize: "1.5rem",
      },
    },
  };
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }): JSX.Element => (
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          adapterLocale={ja}
          dateFormats={{ monthAndYear: "yyyy年 MM月", year: "yyyy年" }} // カレンダー左上の日付表示 年選択を○○年表示
          localeText={{
            previousMonth: "前月を表示", // < のツールチップ
            nextMonth: "次月を表示", // > のツールチップ
            cancelButtonLabel: "キャンセル", // スマホ画面のCANCELボタン
            okButtonLabel: "選択", // スマホ画面のOKボタン
          }}
        >
          <DateTimePicker
            mask="___/__/__ __:__"
            inputFormat="yyyy/MM/dd H:mm"
            label={label}
            minDate={new Date()}
            value={field.value}
            onChange={(e): void => {
              field.onChange(e);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                required={required}
                fullWidth
                size={"medium"}
                variant={"outlined"}
                inputProps={{
                  ...params.inputProps,
                  placeholder: "yyyy/MM/dd H:mm",
                }}
                error={name in errors}
                helperText={errors[name]?.message}
              />
            )}
            DialogProps={{ sx: styles.mobiledialogprops }} // スマホ画面の左上 選択中日付表示 文字の大きさ調整
          />
        </LocalizationProvider>
      )}
    />
  );
};

export default RhfDateTimePicker;
