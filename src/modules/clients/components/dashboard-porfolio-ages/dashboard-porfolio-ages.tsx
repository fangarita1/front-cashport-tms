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
      <div className={styles.legends}>
        <div className={styles.legend}>
          <div className={styles.circle} style={{ backgroundColor: "#eafa88" }}></div>
          Corriente
        </div>
        <div className={styles.legend}>
          <div className={styles.circle} style={{ backgroundColor: "#daf04d" }}></div>
          30 días
        </div>
        <div className={styles.legend}>
          <div className={styles.circle} style={{ backgroundColor: "#cae234" }}></div>
          60 días
        </div>
        <div className={styles.legend}>
          <div className={styles.circle} style={{ backgroundColor: "#b9d121" }}></div>
          90 días
        </div>
        <div className={styles.legend}>
          <div className={styles.circle} style={{ backgroundColor: "#a3b914" }}></div>
          120 días
        </div>
        <div className={styles.legend}>
          <div className={styles.circle} style={{ backgroundColor: "#9eae38" }}></div>
          +120 días
        </div>
      </div>
    </div>
  );
};

export default DashboardPortfolioAges;
