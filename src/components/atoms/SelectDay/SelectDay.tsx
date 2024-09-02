import { useEffect, useState } from "react";
import "./selectDay.scss";

type Option = {
  value: string;
  label: string;
};
type SelecDayProps = {
  value: Option[];
  // eslint-disable-next-line no-unused-vars
  onChange: (options: Option[]) => void;
  disabled?: boolean;
  readonly?: boolean;
};

export const SelectDay = ({ value, onChange, disabled, readonly }: SelecDayProps) => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>(value);

  const handleSelected = (option: Option) => {
    if (disabled) return;
    if (readonly) return;
    if (selectedOptions?.some((selected) => selected.value === option.value)) {
      setSelectedOptions(selectedOptions?.filter((selected) => selected !== option));
      return;
    }
    setSelectedOptions([...selectedOptions, option]);
  };

  useEffect(() => {
    onChange(selectedOptions);
  }, [selectedOptions]);

  useEffect(() => {
    if (disabled) {
      setSelectedOptions([]);
      onChange([]);
    }
  }, [disabled]);

  return (
    <div className={`selectDayContainer`}>
      {selectDayOptions.map((option) => (
        <div
          className={`selectDayContainer__day ${selectedOptions.some((selected) => selected.value === option.value) ? "-selected" : ""} ${disabled ? "-disabled" : ""} ${readonly ? "-readOnly" : ""}`.trim()}
          onClick={() => handleSelected(option)}
          key={option.value}
        >
          <p className="selectDayContainer__day__label">{option.label}</p>
        </div>
      ))}
    </div>
  );
};

export const selectDayOptions: Option[] = [
  { value: "Domingo", label: "D" },
  { value: "Lunes", label: "L" },
  { value: "Martes", label: "M" },
  { value: "Miércoles", label: "X" },
  { value: "Jueves", label: "J" },
  { value: "Viernes", label: "V" },
  { value: "Sábado", label: "S" }
];
