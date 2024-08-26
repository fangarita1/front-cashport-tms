import { Flex, Select, Typography } from "antd";
import "./general-select.scss";
import {
  ControllerRenderProps,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  FieldError as OriginalFieldError
} from "react-hook-form";
import { useEffect, useState } from "react";

type ExtendedFieldError =
  | OriginalFieldError
  | Merge<OriginalFieldError, FieldErrorsImpl<{ value: number | string; label: string }>>;

interface PropsGeneralSelect<T extends FieldValues> {
  errors?: ExtendedFieldError | undefined;
  field: ControllerRenderProps<T, any>;
  title?: string;
  placeholder: string;
  options: { value: number | string; label: string }[] | undefined | string[];
  loading?: boolean;
  customStyleContainer?: React.CSSProperties;
  titleAbsolute?: boolean;
  errorSmall?: boolean;
}

const GeneralSelect = <T extends FieldValues>({
  errors,
  field,
  title,
  placeholder,
  options,
  loading,
  customStyleContainer,
  titleAbsolute,
  errorSmall
}: PropsGeneralSelect<T>) => {
  const [usedOptions, setUsedOptions] = useState<
    {
      value: number | string;
      label: string;
      className: string;
    }[]
  >();

  useEffect(() => {
    if (!options) setUsedOptions(undefined);
    if (Array.isArray(options)) {
      const formattedOptions = options?.map((option) => {
        if (typeof option === "string") {
          return {
            value: option,
            label: option,
            className: "selectOptions"
          };
        }
        return {
          value: option.value,
          label: option.label,
          className: "selectOptions"
        };
      });

      setUsedOptions(formattedOptions);
    }
  }, [options]);

  return (
    <Flex vertical style={customStyleContainer} className="generalSelectContainer">
      {title && <h4 className={`inputTitle ${titleAbsolute && "-absolute"}`}>{title}</h4>}
      <Select
        placeholder={placeholder}
        className={errors ? "selectInputError" : "selectInputCustom"}
        loading={loading}
        variant="borderless"
        optionLabelProp="label"
        {...field}
        popupClassName="selectDrop"
        options={usedOptions}
        labelInValue
      />
      {errors && (
        <Typography.Text className={`textError ${errorSmall && "-smallFont"}`}>
          {title} es obligatoria *
        </Typography.Text>
      )}
    </Flex>
  );
};

export default GeneralSelect;
