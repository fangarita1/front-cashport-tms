"use client";
import { FC } from "react";
import { BellSimpleRinging, CaretDown } from "phosphor-react";
import styles from "./header.module.scss";

interface HeaderProps {
  title: string;
}

const Header: FC<HeaderProps> = ({ title }) => {
  return (
    <header className={styles.wrapper}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.actions}>
        <div className={styles.notifications}>
          <BellSimpleRinging />
        </div>
        <div className={styles.profile}>
          <div className={styles.img}></div>
          <CaretDown className={styles.arrow} />
        </div>
      </div>
    </header>
  );
};

export default Header;
