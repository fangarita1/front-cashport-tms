import React from "react";
import { DatePicker } from "antd";
import { Calendar } from "phosphor-react";
import "./inputDate.scss";

interface InputDateProps {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
}

export const InputDate: React.FC<InputDateProps> = ({ selectedDate, onDateChange }) => {
  const handleDateChange = (date: Date | null) => {
    onDateChange(date);
  };

  return (
    <div className="date-picker__container">
      <DatePicker
        value={selectedDate}
        onChange={handleDateChange}
        format="YYYY-MM-DD"
        suffixIcon={<Calendar className="date-picker__container__suffix__icon" />}
        className="date-picker__container__picker"
      />
    </div>
  );
};
