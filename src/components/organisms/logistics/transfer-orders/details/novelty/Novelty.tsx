import { Button, Collapse, CollapseProps, ConfigProvider, Typography } from "antd";
import { CaretDown, Truck } from "phosphor-react";
import styles from './novelty.module.scss';
import { useState } from "react";
import { NoveltyTable } from "@/components/molecules/tables/NoveltyTable/Novelty";

const Text = Typography

export const Novelty = () => {
  const [key, setKey] = useState<number | null>(null)
  const TitleComponent = ({ state, id }: { state: string, id: number }) => (
    <div className={styles.header}>
      <div className={styles.stateContainer}>
        <Truck size={27} color="#FFFFFF" weight="fill" />
        <Text className={styles.state}>{state}</Text>
      </div>
      <div className={styles.fromto}>
        <div className={styles.fromtoContainer}>
          <Text className={styles.title}>Origen</Text>
          <Text className={styles.subtitle}>CENTRO EMPRESARIAL DORADO PLAZA</Text>
        </div>
        <div className={`${styles.fromtoContainer} ${styles.right}`}>
          <div>
            <Text className={styles.title}>Destino</Text>
            <Text className={styles.subtitle}>BASE BARRANCABERMEJA</Text>
          </div>
          <CaretDown className={`${styles.caret} ${id === key && styles.rotate}`} size={24} />
        </div>
      </div>
      <div className={styles.resumContainer}>
        <div className={styles.resum}>
          <div className={styles.resumItem}>
            <Text className={styles.text}>Vehículo</Text>
            <Text className={`${styles.text} ${styles.bold}`}>C-350</Text>
          </div>
          <div className={styles.resumItem}>
            <Text className={styles.text}>Proveedor</Text>
            <Text className={`${styles.text} ${styles.bold}`}>Coltanques</Text>
          </div>
          <div className={styles.resumItem}>
            <Text className={styles.text}>Conductor</Text>
            <Text className={`${styles.text} ${styles.bold}`}>Miguel Martinez</Text>
          </div>
        </div>
        <div className={`${styles.resum} ${styles.right}`}>
          <div className={`${styles.resumItem} ${styles.right}`}>
            <Text className={styles.text}>Tarifa base</Text>
            <Text className={styles.text}>$ 17.000.000</Text>
          </div>
          <div className={`${styles.resumItem} ${styles.right}`}>
            <Text className={styles.text}>Sobrecosto</Text>
            <Text className={styles.text}>$ 0</Text>
          </div>
          <div className={`${styles.resumItem} ${styles.right}`}>
            <Text className={`${styles.text} ${styles.bold}`}>Total</Text>
            <Text className={`${styles.text} ${styles.bold}`}>$ 0</Text>
          </div>
        </div>
      </div>
    </div>
  )

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: <TitleComponent state="Carga" id={1} />,
      children: (
        <div>
          <NoveltyTable />
          <div className={styles.btnContainer}>
            <Button className={styles.btn} type="text" size="large">
              <Text className={styles.text}>Crear una novedad</Text>
            </Button>
          </div>
        </div>
      ),
      showArrow: false,
    },
  ];
  const items2: CollapseProps['items'] = [
    {
      key: '2',
      label: <TitleComponent state="Carga" id={2} />,
      children: (
        <div>
          <NoveltyTable />
          <div className={styles.btnContainer}>
            <Button className={styles.btn} type="text" size="large">
              <Text className={styles.text}>Crear una novedad</Text>
            </Button>
          </div>
        </div>
      ),
      showArrow: false,
    },
  ];

  return (
    <div className={styles.collapsableContainer}>
      <div className={styles.collapsable}>
        <Collapse onChange={(item) => setKey(Number(item[0]))} expandIconPosition="end" ghost items={items} />
      </div>
      <div className={styles.collapsable}>
        <Collapse onChange={(item) => setKey(Number(item[0]))} expandIconPosition="end" ghost items={items2} />
      </div>
    </div>
  )
}