import { CaretLeft } from "phosphor-react";
import styles from "./BackButton.module.scss";

export const BackButton = ({ title, href }: { title: string; href: string }) => {
  return (
    <a href={href} className={styles.link}>
      <CaretLeft size={20} weight="bold" />
      <p>{title}</p>
    </a>
  );
};
