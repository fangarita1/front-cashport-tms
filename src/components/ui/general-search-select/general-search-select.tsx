import { Flex, Select, SelectProps, Tag, Typography } from "antd";
import "./general-search-select.scss";
import {
  ControllerRenderProps,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  FieldError as OriginalFieldError
} from "react-hook-form";
import { X } from "phosphor-react";
import { useEffect, useState } from "react";

type TagRender = SelectProps["tagRender"];

type ExtendedFieldError =
  | OriginalFieldError
  | Merge<OriginalFieldError, FieldErrorsImpl<{ value: number; label: string }>>;

interface PropsGeneralSelect<T extends FieldValues> {
  errors: ExtendedFieldError | undefined;
  field: ControllerRenderProps<T, any>;
  title: string;
  placeholder: string;
  options: { value: number; label: string }[] | string[] | undefined;
  loading?: boolean;
  customStyleContainer?: React.CSSProperties;
}

const GeneralSearchSelect = <T extends FieldValues>({
  errors,
  field,
  title,
  placeholder,
  options,
  loading = false,
  customStyleContainer
}: PropsGeneralSelect<T>) => {
  const [usedOptions, setUsedOptions] = useState<
    {
      value: number | string;
      label: string;
    }[]
  >();

  useEffect(() => {
    if (!options) setUsedOptions(undefined);
    if (Array.isArray(options)) {
      const formattedOptions = options?.map((option) => {
        if (typeof option === "string") {
          return {
            value: option,
            label: option
          };
        }
        return {
          value: option.value,
          label: option.label
        };
      });

      setUsedOptions(formattedOptions);
    }
  }, [options]);

  // const usedOptions = options?.map((option) => {
  //   return {
  //     value: option.value,
  //     label: option.label
  //   };
  // });

  const tagRender: TagRender = (props) => {
    const { label, onClose, closable } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        className="customTag"
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        closeIcon={
          <button className="customTag__closebtn" onClick={onClose}>
            <X size={12} />
          </button>
        }
      >
        {label}
      </Tag>
    );
  };

  return (
    <Flex vertical className="selectTitleAndError" style={customStyleContainer}>
      <h4 className="inputTitle">{title}</h4>
      <Select
        {...field}
        mode="tags"
        suffixIcon={null}
        tagRender={tagRender}
        maxTagCount={"responsive"}
        optionFilterProp="label"
        placeholder={placeholder}
        className={errors ? "selectSearchCustomError" : "selectSearchCustom"}
        loading={loading}
        variant="borderless"
        optionLabelProp="label"
        popupClassName="selectSearchCustomDrop"
        options={usedOptions}
        labelInValue
      />
      {errors && <Typography.Text className="textError">{title} es obligatorio *</Typography.Text>}
    </Flex>
  );
};

export default GeneralSearchSelect;
