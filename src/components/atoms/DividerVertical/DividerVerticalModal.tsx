import React from "react";
import "./dividerModal.scss";

interface DividerProps {
  type?: number;
  Color?: string;
}

export const DividerVerticalModal: React.FC<DividerProps> = ({ type, Color }) => {
  let backgroundColor;

  switch (type) {
    case 1:
      backgroundColor = "#00A3FF";

      break;
    case 2:
      backgroundColor = "#9747FF";
      break;
    case 3:
      backgroundColor = "#FF7A00";
      break;
    default:
      backgroundColor = "#00A3FF";
      break;
  }

  if (Color) {
    return <div className="divides" style={{ backgroundColor: Color }} />;
  }
  return <div className="divides" style={{ backgroundColor }} />;
};
