import { Collapse, CollapseProps } from "antd";
import styles from './InProcess.module.scss';
import { TransferOrdersState } from "@/utils/constants/transferOrdersState";
import { TransferOrdersTable } from "@/components/molecules/tables/TransferOrderTable/TransferOrderTable";

export const InProcess = () => {
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
      label: getTitile('2', 17),
      children: <TransferOrdersTable />,
    },
    {
      key: '3',
      label: getTitile('3', 17),
      children: <TransferOrdersTable />,
    },
    {
      key: '4',
      label: getTitile('4', 17),
      children: <TransferOrdersTable />,
    },
    {
      key: '5',
      label: getTitile('5', 17),
      children: <TransferOrdersTable />,
    },
    {
      key: '6',
      label: getTitile('6', 17),
      children: <TransferOrdersTable />,
    },
  ];

  return <Collapse ghost items={items} defaultActiveKey={['1']} />
}