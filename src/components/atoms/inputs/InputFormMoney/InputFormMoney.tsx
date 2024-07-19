import { Flex, Input, InputNumber, Typography } from "antd";
import { Control, Controller, FieldError, RegisterOptions } from "react-hook-form";
import "./inputFormMoney.scss";
import { formatMoney } from "@/utils/utils";

interface Props {
  titleInput?: string;
  nameInput: string;
  control: Control<any> | undefined;
  error: FieldError | undefined;
  typeInput?: string;
  customStyle?: any;
  hiddenTitle?: boolean;
  placeholder?: string;
  disabled?: boolean;
  validationRules?: RegisterOptions;
  className?: string;
  readOnly?: boolean;
  // eslint-disable-next-line no-unused-vars
  changeInterceptor?: (value: any) => void;
}

export const InputFormMoney = ({
  titleInput,
  nameInput,
  control,
  error,
  customStyle = {},
  hiddenTitle = false,
  placeholder = "",
  disabled,
  validationRules,
  className,
  readOnly,
  changeInterceptor
}: Props) => {
  return (
    <Flex vertical className={`containerInput__format ${className}`} style={customStyle}>
      {!hiddenTitle && (
        <Typography.Title className="input-form-title" level={5}>
          {titleInput}
        </Typography.Title>
      )}
      <Controller
        name={nameInput}
        rules={{ required: true, maxLength: 123, ...validationRules }}
        control={control}
        disabled={disabled}
        render={({ field: { onChange, value, ...field } }) => (
          <InputNumber
            readOnly={readOnly}
            type="text"
            className={!error ? `inputForm ${readOnly && "-readOnly"}` : "inputFormError"}
            variant="borderless"
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            placeholder={placeholder?.length > 0 ? placeholder : titleInput}
            onChange={(e) => {
              onChange(e);
              changeInterceptor?.(e);
            }}
            {...field}
          />
        )}
      />
      <Typography.Text className="textError">
        {error ? (error.message ? ` ${error.message}` : `${titleInput} es obligatorio *`) : ""}
      </Typography.Text>
    </Flex>
  );
};
