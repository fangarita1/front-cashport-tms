import { FC, useContext } from "react";
import Image from "next/image";
import styles from "./dashboard-budget.module.scss";
import DashboardGenericItem from "../dashboard-generic-item";
import { ClientDetailsContext } from "../../containers/client-details/client-details";
import { formatMillionNumber, formatMoney } from "@/utils/utils";

interface DashboardBudgetProps {
  className?: string;
}

const DashboardBudget: FC<DashboardBudgetProps> = ({ className }) => {
  const { portfolioData } = useContext(ClientDetailsContext);
  const formattedBudget = formatMillionNumber(portfolioData?.data_wallet?.budget_ammount);
  const budget = formatMoney(formattedBudget);
  return (
    <div className={`${styles.wrapper} ${className}`}>
      <DashboardGenericItem name="Presupuesto" value={budget} unit="M" />
      <Image src="/images/graph-3.svg" alt="Graph" className={styles.img} width={86} height={56} />
    </div>
  );
};

export default DashboardBudget;
