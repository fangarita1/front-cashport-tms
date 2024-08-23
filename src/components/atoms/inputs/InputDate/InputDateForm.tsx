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
  readOnly?: boolean;
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
  readOnly = false
}: InputDateFormProps) => {
  return (
    <Flex vertical className={`datePickerContainer ${className}`}>
      {!hiddenTitle && <p className="input-date-custom-title">{titleInput}</p>}
      <Controller
        name={nameInput}
        rules={{ required: true, ...validationRules }}
        control={control}
        render={({ field }) => (
          <DatePicker
            readOnly={readOnly}
            {...field}
            onChange={(date) => field.onChange(date)}
            size="large"
            disabled={disabled}
            placeholder={placeholder || `Selecciona una fecha`}
            suffixIcon={<Calendar className="dateInputForm__icon" />}
            className={error ? "dateInputFormError" : "dateInputForm"}
          />
        )}
      />
      {error && (
        <Typography.Text className="textError" type="danger">
          {error?.message || `${titleInput} es obligatorio *`}
        </Typography.Text>
      )}
    </Flex>
  );
};
