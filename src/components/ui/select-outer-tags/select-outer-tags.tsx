import { Select, Typography } from "antd";
import { useState } from "react";
import {
  ControllerRenderProps,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  FieldError as OriginalFieldError
} from "react-hook-form";
import { X } from "phosphor-react";
import "./select-outer-tags.scss";

export interface OptionType {
  value: number;
  label: string;
}

type ExtendedFieldError =
  | OriginalFieldError
  | Merge<OriginalFieldError, FieldErrorsImpl<{ value: number; label: string }>>;

interface PropsGeneralSelect<T extends FieldValues> {
  errors: ExtendedFieldError | undefined;
  field: ControllerRenderProps<T, any>;
  title: string;
  placeholder: string;
  options: { value: number; label: string }[] | undefined;
  loading?: boolean;
  customStyleContainer?: React.CSSProperties;
  hiddenTags?: boolean;
  titleAbsolute?: boolean;
  // eslint-disable-next-line no-unused-vars
  addedOnchangeBehaviour?: (value: OptionType[], deletedValue: OptionType[]) => void;
}

const SelectOuterTags = <T extends FieldValues>({
  errors,
  field,
  title,
  placeholder,
  options,
  loading = false,
  customStyleContainer,
  hiddenTags,
  titleAbsolute,
  addedOnchangeBehaviour
}: PropsGeneralSelect<T>) => {
  const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([]);

  const handleChange = (value: OptionType[]) => {
    const deletedValue = selectedOptions.filter(
      (prevOption) => !value.some((option) => option.value === prevOption.value)
    );

    setSelectedOptions(value);
    field.onChange(value);

    if (addedOnchangeBehaviour) addedOnchangeBehaviour(value, deletedValue);
  };

  const usedOptions = options?.map((option) => {
    return {
      value: option.value,
      label: option.label,
      className: "selectOptions"
    };
  });

  const handleDeleteSelected = (option: OptionType) => {
    const newSelectedOptions = selectedOptions.filter(
      (selectedOption) => selectedOption.value !== option.value
    );
    setSelectedOptions(newSelectedOptions);
    field.onChange(newSelectedOptions);
  };

  return (
    <div className="selectOuterTags" style={customStyleContainer}>
      <h4 className={`inputTitle ${titleAbsolute && "-absolute"}`}>{title}</h4>
      <Select
        {...field}
        variant="borderless"
        mode="multiple"
        tagRender={(props) => <div> {props.disabled} </div>}
        placeholder={placeholder}
        showSearch={false}
        className={errors ? "inputError" : "inputRegular"}
        popupClassName="selectDrop"
        loading={loading}
        optionLabelProp="label"
        value={selectedOptions}
        onChange={handleChange}
        options={usedOptions}
        labelInValue
      />
      {selectedOptions.length > 0 && (
        <div className={`selectPlaceholder ${titleAbsolute && "-absolute"}`}>{placeholder}</div>
      )}
      {errors && <Typography.Text className="textError">{title} es obligatorio *</Typography.Text>}
      {!hiddenTags ? (
        <div className="selectedOptions">
          {selectedOptions.map((option) => (
            <div className="selectedOptions__tag" key={option.value}>
              <p key={option.value}>{option.label}</p>
              <X className="deleteTag" onClick={() => handleDeleteSelected(option)} size={14} />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default SelectOuterTags;
