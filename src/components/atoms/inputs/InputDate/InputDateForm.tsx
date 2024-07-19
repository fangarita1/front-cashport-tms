import React from "react";
import { DatePicker, Flex, Typography } from "antd";
import { Control, Controller, FieldError, RegisterOptions } from "react-hook-form";
import { Calendar } from "phosphor-react";

import "./inputDateFormStyle.scss";

interface InputDateFormProps {
  titleInput: string;
  nameInput: string;
  control: Control<any> | undefined;
  error: FieldError | undefined;
  hiddenTitle?: boolean;
  placeholder?: string;
  disabled?: boolean;
  validationRules?: RegisterOptions;
  className?: string;
  customStyleContainer?: React.CSSProperties;
  hiddenIcon?: boolean;
}

export const InputDateForm = ({
  titleInput,
  nameInput,
  control,
  error,
  hiddenTitle = false,
  placeholder = "",
  disabled,
  validationRules,
  className,
  customStyleContainer,
  hiddenIcon
}: InputDateFormProps) => {
  return (
    <Flex vertical className={`datePickerContainer ${className}`} style={customStyleContainer}>
      {!hiddenTitle && <p className="input-date-custom-title">{titleInput}</p>}
      <Controller
        name={nameInput}
        rules={{ required: true, ...validationRules }}
        control={control}
        render={({ field }) => (
          <DatePicker
            {...field}
            onChange={(date) => field.onChange(date)}
            value={field.value}
            size="large"
            disabled={disabled}
            placeholder={placeholder || `Select ${titleInput.toLowerCase()}`}
            suffixIcon={
              !hiddenIcon ? <Calendar weight="light" className="dateInputForm__icon" /> : false
            }
            className={!error ? "dateInputForm" : "dateInputFormError"}
          />
        )}
      />
      {error && (
        <Typography.Text className="textError">
          {error.message || `${titleInput} is required`}
        </Typography.Text>
      )}
    </Flex>
  );
};
