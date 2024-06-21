import React, { useState } from "react";
import { DatePicker } from "antd";
import { Calendar } from "phosphor-react";
import "./inputDate.scss";

export const InputDate: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
    } else {
    }
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
