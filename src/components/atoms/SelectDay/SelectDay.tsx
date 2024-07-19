import { useState } from "react";
import "./selectDay.scss";

type Option = {
  value: string;
  label: string;
};
export const SelectDay = () => {
  const [selected, setSelected] = useState<Option>({
    value: "",
    label: ""
  });

  const handleSelected = (option: Option) => {
    setSelected(option);
  };

  return (
    <div className="selectDayContainer">
      {options.map((option) => (
        <div
          className={`selectDayContainer__day ${option.label === selected.label && "-selected"}`}
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
