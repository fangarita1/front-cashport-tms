import { FC } from "react";
import styles from "./dashboard-porfolio-ages.module.scss";

interface DashboardPortfolioAgesProps {
  className?: string;
}

const DashboardPortfolioAges: FC<DashboardPortfolioAgesProps> = ({ className }) => {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      <div className={styles.name}>Edades de la cartera</div>
      <div className={styles.img}></div>
    </div>
  );
};

export default DashboardPortfolioAges;
