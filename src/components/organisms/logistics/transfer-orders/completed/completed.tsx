import { TransferOrdersState } from "@/utils/constants/transferOrdersState";
import styles from './completed.module.scss';
import { Collapse, CollapseProps } from "antd";
import { TransferOrdersTable } from "@/components/molecules/tables/TransferOrderTable/TransferOrderTable";

export const Completed = () => {
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
      label: getTitile('1', 17),
      children: <TransferOrdersTable />,
    },
    {
      key: '2',
      label: getTitile('10', 17),
      children: <TransferOrdersTable />,
    },
    {
      key: '3',
      label: getTitile('11', 17),
      children: <TransferOrdersTable />,
    },
  ];

  return <Collapse ghost items={items} defaultActiveKey={['1']} />
}