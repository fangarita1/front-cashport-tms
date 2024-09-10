import React, { FC } from "react";
import styles from "./SectionTitle.module.scss";

interface SectionTitleProps {
  title: string;
  className?: string; // Optional additional class for styling
}

export const SectionTitle: FC<SectionTitleProps> = ({ title, className }) => {
  return <p className={`${styles.heading} ${className}`}>{title}</p>;
};
