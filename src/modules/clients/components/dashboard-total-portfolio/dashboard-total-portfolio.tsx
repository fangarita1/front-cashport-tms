import { FC, useContext } from "react";
import Image from "next/image";
import DashboardGenericItem from "../dashboard-generic-item";
import { ClientDetailsContext } from "../../containers/client-details/client-details";
import { formatMoney } from "@/utils/utils";
import styles from "./dashboard-total-portfolio.module.scss";

interface DashboardTotalPortfolioProps {
  className?: string;
}

const DashboardTotalPortfolio: FC<DashboardTotalPortfolioProps> = ({ className }) => {
  const { portfolioData } = useContext(ClientDetailsContext);
  const totalWallet = formatMoney(portfolioData?.total_wallet);

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <DashboardGenericItem name="Total cartera" value={totalWallet} unit="M" />
      <Image src="/images/graph-1.svg" alt="Graph" className={styles.img} width={48} height={62} />
    </div>
  );
};

export default DashboardTotalPortfolio;
