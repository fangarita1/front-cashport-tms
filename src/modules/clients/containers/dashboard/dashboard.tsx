import { FC } from "react";
import styles from "./dashboard.module.scss";
import DashboardTotalPortfolio from "../../components/dashboard-total-portfolio";
import DashboardExpiredPortfolio from "../../components/dashboard-expired-portfolio";
import DashboardBudget from "../../components/dashboard-budget";
import DashboardPortfolioAges from "../../components/dashboard-porfolio-ages";
import DashboardInvoiceStatus from "../../components/dashboard-invoice-status";
import DashboardAlerts from "../../components/dashboard-alerts";
import DashboardGenericItem from "../../components/dashboard-generic-item";
import DashboardSellsVsPayments from "../../components/dashboard-sells-vs-payments";
import DashboardHistoricDso from "../../components/dashboard-historic-dso";

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.a}>
        <DashboardTotalPortfolio className={styles.item} />
        <DashboardExpiredPortfolio className={styles.item} />
        <DashboardBudget className={styles.item} />
        <DashboardPortfolioAges className={styles.item} />
        <DashboardInvoiceStatus className={styles.item} />
        <DashboardAlerts className={styles.item} />
      </div>
      <div className={styles.b}>
        <div className={styles.item}>
          <div className={styles.list}>
            <DashboardGenericItem name="R. aplicado" value="$54.950" unit="M" badgeText="12%" />
            <DashboardGenericItem name="R. aplicado" value="$54.950" unit="M" badgeText="12%" />
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.list}>
            <DashboardGenericItem name="Cupo" value="$54.950" unit="M" badgeText="12%" />
          </div>
        </div>
        <div className={styles.dso}>
          <div className={styles.label}>DSO</div>
          <div className={styles.value}>75</div>
        </div>
      </div>
      <div className={styles.c}>
        <DashboardSellsVsPayments className={styles.item} />
        <DashboardHistoricDso className={styles.item} />
      </div>
    </div>
  );
};

export default Dashboard;
