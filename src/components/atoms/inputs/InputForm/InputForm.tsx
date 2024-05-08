import { Flex, Input, Typography } from "antd";

import { Control, Controller, FieldError } from "react-hook-form";

import "./inputform.scss";

interface Props {
  titleInput: string;
  nameInput: string;
  control: Control<any> | undefined;
  error: FieldError | undefined;
  typeInput?: string;
  customStyle?: any;
  hiddenTitle?: boolean;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const InputForm = ({
  titleInput,
  nameInput,
  typeInput = "text",
  control,
  error,
  customStyle = {},
  hiddenTitle = false,
  placeholder = "",
  disabled
}: Props) => {
  return (
    <Flex vertical className="containerInput" style={customStyle}>
      {!hiddenTitle && (
        <Typography.Title className="input-form-title" level={5}>
          {titleInput}
        </Typography.Title>
      )}
      <Controller
        name={nameInput as string}
        rules={{ required: true, maxLength: 123 }}
        control={control}
        disabled={disabled}
        render={({ field }) => (
          <Input
            type={typeInput}
            className={!error ? "inputForm" : "inputFormError"}
            variant="borderless"
            placeholder={placeholder?.length > 0 ? placeholder : titleInput}
            {...field}
          />
        )}
      />
      <Typography.Text className="textError">
        {error && `${titleInput} es obligatorio *`}
      </Typography.Text>
    </Flex>
  );
};
