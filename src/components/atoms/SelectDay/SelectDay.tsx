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
};

export const SelectDay = ({ value, onChange, disabled }: SelecDayProps) => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>(value);

  const handleSelected = (option: Option) => {
    if (disabled) return;
    if (selectedOptions?.includes(option)) {
      setSelectedOptions(selectedOptions?.filter((selected) => selected !== option));
      return;
    }
    setSelectedOptions([...selectedOptions, option]);
  };

  useEffect(() => {
    onChange(selectedOptions);
  }, [selectedOptions]);

  useEffect(() => {
    setSelectedOptions([]);
    onChange([]);
  }, [disabled]);

  return (
    <div className={`selectDayContainer`}>
      {options.map((option) => (
        <div
          className={`selectDayContainer__day ${selectedOptions?.includes(option) && "-selected"} ${disabled && "-disabled"}`}
          onClick={() => handleSelected(option)}
          key={option.value}
        >
          <p className="selectDayContainer__day__label">{option.label}</p>
        </div>
      ))}
    </div>
  );
};

const options: Option[] = [
  { value: "Domingo", label: "D" },
  { value: "Lunes", label: "L" },
  { value: "Martes", label: "M" },
  { value: "Miércoles", label: "X" },
  { value: "Jueves", label: "J" },
  { value: "Viernes", label: "V" },
  { value: "Sábado", label: "S" }
];
