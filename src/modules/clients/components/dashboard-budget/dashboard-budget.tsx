import { FC } from "react";
import styles from "./dashboard-budget.module.scss";
import DashboardGenericItem from "../dashboard-generic-item";

interface DashboardBudgetProps {
  className?: string;
}

const DashboardBudget: FC<DashboardBudgetProps> = ({ className }) => {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      <DashboardGenericItem name="Presupuesto" value="$54.540" unit="M" />
      <img src="/images/graph-3.svg" alt="Graph" className={styles.img} />
    </div>
  );
};

export default DashboardBudget;
