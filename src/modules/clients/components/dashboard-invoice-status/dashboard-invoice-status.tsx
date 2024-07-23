import { FC, useContext } from "react";
import DashboardGenericItem from "../dashboard-generic-item";
import styles from "./dashboard-invoice-status.module.scss";
import { ClientDetailsContext } from "../../containers/client-details/client-details";
import { formatMillionNumber, formatMoney } from "@/utils/utils";

interface DashboardInvoiceStatusProps {
  className?: string;
}

const DashboardInvoiceStatus: FC<DashboardInvoiceStatusProps> = ({ className }) => {
  const { portfolioData } = useContext(ClientDetailsContext);

  const formattedTotalUnreconciled = formatMillionNumber(
    portfolioData?.info_invioce.total_invoice_unreconciled.total_value
  );
  const totalUnreconciled = formatMoney(formattedTotalUnreconciled.num.toFixed());

  const formattedTotalReconciled = formatMillionNumber(
    portfolioData?.info_invioce.total_invoice_reconciled.total_value
  );
  const totalReconciled = formatMoney(formattedTotalReconciled.num.toFixed());

  const formattedTotalBalance = formatMillionNumber(
    portfolioData?.info_invioce.total_balances.total_value
  );
  const totalBalance = formatMoney(formattedTotalBalance.num.toFixed());

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <div className={styles.name}>Estatus de facturas</div>
      <div className={styles.list}>
        <DashboardGenericItem
          name="Sin conciliar"
          value={totalUnreconciled}
          unit={formattedTotalUnreconciled.formatted ? "M" : ""}
          quantity={portfolioData?.info_invioce.total_invoice_unreconciled.count}
        />
        <DashboardGenericItem
          name="Conciliadas"
          value={totalReconciled}
          unit={formattedTotalReconciled.formatted ? "M" : ""}
          quantity={portfolioData?.info_invioce.total_invoice_reconciled.count}
        />
        <DashboardGenericItem
          name="Saldos"
          value={totalBalance}
          unit={formattedTotalBalance.formatted ? "M" : ""}
          quantity={portfolioData?.info_invioce.total_balances.count}
        />
      </div>
    </div>
  );
};

export default DashboardInvoiceStatus;
