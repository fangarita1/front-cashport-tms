import { FC, useContext } from "react";
import DashboardGenericItem from "../dashboard-generic-item";
import styles from "./dashboard-alerts.module.scss";
import { ClientDetailsContext } from "../../containers/client-details/client-details";
import { formatMillionNumber, formatMoney } from "@/utils/utils";

interface DashboardAlertsProps {
  className?: string;
}

const DashboardAlerts: FC<DashboardAlertsProps> = ({ className }) => {
  const { portfolioData } = useContext(ClientDetailsContext);

  const formattedOpenAlerts = formatMillionNumber(
    portfolioData?.invoice_alerts?.accounting_updates?.total_value
  );
  const openAlerts = formatMoney(formattedOpenAlerts);
  const formattedDiscounts = formatMillionNumber(
    portfolioData?.invoice_alerts?.financial_discounts?.discount.total_value
  );
  const discount = formatMoney(formattedDiscounts);
  const formattedCreditNotes = formatMillionNumber(
    portfolioData?.invoice_alerts?.financial_discounts?.creditNote.total_value
  );
  const creditNotes = formatMoney(formattedCreditNotes);

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <div className={styles.name}>Alertas</div>
      <div className={styles.list}>
        <DashboardGenericItem
          name="Novedades abiertas"
          value={openAlerts}
          unit="M"
          quantity={portfolioData?.invoice_alerts?.accounting_updates?.count}
        />
        <DashboardGenericItem
          name="DPP disponibles"
          value={discount}
          unit="M"
          quantity={portfolioData?.invoice_alerts?.financial_discounts.discount?.count}
        />
        <DashboardGenericItem
          name="NC disponibles"
          value={creditNotes}
          unit="M"
          quantity={portfolioData?.invoice_alerts?.financial_discounts.creditNote?.count}
        />
      </div>
    </div>
  );
};

export default DashboardAlerts;
