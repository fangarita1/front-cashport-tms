import { FC } from "react";
import styles from "./dashboard-generic-item.module.scss";

interface DashboardGenericItemProps {
  name: string;
  value: string;
  badgeText?: string;
  unit?: string;
  quantity?: number;
}

const DashboardGenericItem: FC<DashboardGenericItemProps> = ({
  name,
  badgeText,
  value,
  unit,
  quantity
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>
        {name}
        {badgeText && <div className={styles.percentageBadge}>{badgeText}</div>}
      </div>
      <div className={styles.value}>
        {value} {unit && <span>{unit}</span>}
        {quantity && <div className={styles.quantity}>{quantity}</div>}
      </div>
    </div>
  );
};

export default DashboardGenericItem;
