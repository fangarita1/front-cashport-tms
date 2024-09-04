import { Select, Typography } from "antd";

import "./SelectInputForm.scss";

interface Props {
  placeholder?: string;
  error: any;
  field: any;
  selected?: any;
  options: { id: number; value: string }[];
  loading?: boolean;
  allowClear?: boolean;
}

export const SelectInputForm = ({
  placeholder = "Selecciona",
  error,
  field,
  selected,
  options,
  loading = false,
  allowClear = false
}: Props) => {
  const optionsFormated = options.map((option: { id: number; value: string }) => {
    return {
      value: option.id,
      label: option.value
    };
  });

  return (
    <>
      <Select
        placeholder={placeholder}
        className={error ? "selectInputFormError" : "selectInputForm"}
        variant="borderless"
        optionLabelProp="label"
        {...field}
        options={optionsFormated}
        loading={loading}
        allowClear={allowClear}
      />
      {error && (
        <Typography.Text type="danger" className="textMessageError">
          Campo es obligatorio *
        </Typography.Text>
      )}
    </>
  );
};
