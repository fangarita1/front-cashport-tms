import { Collapse, CollapseProps } from "antd";
import styles from './Request.module.scss';
import { TransferOrdersState } from "@/utils/constants/transferOrdersState";
import { TransferOrdersTable } from "@/components/molecules/tables/TransferOrderTable/TransferOrderTable";

export const Request = () => {
  const getTitile = (stateId: string, number: number) => {
    const getState = TransferOrdersState.find((f) => f.id === stateId);
    return (
      <div className={styles.mainTitle}>
        <div className={styles.titleContainer}>
          <div className={styles.textContainer} style={{ backgroundColor: getState?.bgColor }}>{getState?.name}</div>
          <div className={`${styles.textContainer} ${styles.subTextContainer}`}>
            <span>TR</span>
            <span className={styles.number}>{number}</span>
          </div>
        </div>
      </div>
    )
  }

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: getTitile('7', 17),
      children: <TransferOrdersTable />,
    },
    {
      key: '2',
      label: getTitile('8', 17),
      children: <TransferOrdersTable />,
    },
    {
      key: '3',
      label: getTitile('9', 17),
      children: <TransferOrdersTable />,
    },
  ];

  return <Collapse ghost items={items} defaultActiveKey={['1']} />
}