import { FC } from "react";
import styles from "./dashboard-expired-portfolio.module.scss";
import DashboardGenericItem from "../dashboard-generic-item";

interface DashboardExpiredPortfolioProps {
  className?: string;
}

const DashboardExpiredPortfolio: FC<DashboardExpiredPortfolioProps> = ({ className }) => {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      <DashboardGenericItem name="C. vencida" badgeText="12%" value="$34.230" unit="M" />
      <div className={styles.img}></div>
    </div>
  );
};

export default DashboardExpiredPortfolio;
