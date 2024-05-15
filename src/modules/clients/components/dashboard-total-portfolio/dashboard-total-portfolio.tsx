import { FC } from "react";
import styles from "./dashboard-total-portfolio.module.scss";
import DashboardGenericItem from "../dashboard-generic-item";

interface DashboardTotalPortfolioProps {
  className?: string;
}

const DashboardTotalPortfolio: FC<DashboardTotalPortfolioProps> = ({ className }) => {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      <DashboardGenericItem name="Total cartera" value="$175.230" unit="M" />
      <img src="/images/graph-1.svg" alt="Graph" className={styles.img} />
    </div>
  );
};

export default DashboardTotalPortfolio;
