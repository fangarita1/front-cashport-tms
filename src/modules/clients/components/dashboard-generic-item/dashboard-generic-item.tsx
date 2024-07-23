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
        <p className={styles.text}>{name}</p>

        {badgeText && <div className={styles.percentageBadge}>{badgeText}</div>}
      </div>
      <div className={styles.value}>
        <p className={styles.total}>{value}</p>
        {unit && <span>{unit}</span>}
        {quantity !== undefined && quantity !== null && quantity !== 0 && (
          <p className={styles.quantity}>{quantity}</p>
        )}
      </div>
    </div>
  );
};

export default DashboardGenericItem;
