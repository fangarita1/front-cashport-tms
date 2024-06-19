import { FC, useContext } from "react";
import DashboardGenericItem from "../dashboard-generic-item";
import styles from "./dashboard-invoice-status.module.scss";
import { ClientDetailsContext } from "../../containers/client-details/client-details";
import { formatMoney } from "@/utils/utils";

interface DashboardInvoiceStatusProps {
  className?: string;
}

const DashboardInvoiceStatus: FC<DashboardInvoiceStatusProps> = ({ className }) => {
  const { portfolioData } = useContext(ClientDetailsContext);

  const totalUnreconciled = formatMoney(portfolioData?.info_invioce.total_invoice_unreconciled);
  const totalReconciled = formatMoney(portfolioData?.info_invioce.total_invoice_reconciled);
  const totalBalance = formatMoney(portfolioData?.info_invioce.total_balances);

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <div className={styles.name}>Estatus de facturas</div>
      <div className={styles.list}>
        <DashboardGenericItem
          name="Sin conciliar"
          value={totalUnreconciled}
          unit="M"
          quantity={957}
        />
        <DashboardGenericItem name="Conciliadas" value={totalReconciled} unit="M" quantity={957} />
        <DashboardGenericItem name="Saldos" value={totalBalance} unit="M" quantity={957} />
      </div>
    </div>
  );
};

export default DashboardInvoiceStatus;
