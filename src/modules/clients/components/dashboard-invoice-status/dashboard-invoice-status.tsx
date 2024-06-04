import { FC } from "react";
import DashboardGenericItem from "../dashboard-generic-item";
import styles from "./dashboard-invoice-status.module.scss";

interface DashboardInvoiceStatusProps {
  className?: string;
}

const DashboardInvoiceStatus: FC<DashboardInvoiceStatusProps> = ({ className }) => {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      <div className={styles.name}>Estatus de facturas</div>
      <div className={styles.list}>
        <DashboardGenericItem name="Sin conciliar" value="$54.950" unit="M" quantity={957} />
        <DashboardGenericItem name="Conciliadas" value="$54.950" unit="M" quantity={957} />
        <DashboardGenericItem name="Saldos" value="$54.950" unit="M" quantity={957} />
      </div>
    </div>
  );
};

export default DashboardInvoiceStatus;
