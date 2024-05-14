import { FC } from "react";
import DashboardGenericItem from "../dashboard-generic-item";
import styles from "./dashboard-alerts.module.scss";

interface DashboardAlertsProps {
  className?: string;
}

const DashboardAlerts: FC<DashboardAlertsProps> = ({ className }) => {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      <div className={styles.name}>Alertas</div>
      <div className={styles.list}>
        <DashboardGenericItem name="Novedades abiertas" value="$54.950" unit="M" quantity={957} />
        <DashboardGenericItem name="DPP disponibles" value="$54.950" unit="M" quantity={957} />
        <DashboardGenericItem name="NC disponibles" value="$54.950" unit="M" quantity={957} />
      </div>
    </div>
  );
};

export default DashboardAlerts;
