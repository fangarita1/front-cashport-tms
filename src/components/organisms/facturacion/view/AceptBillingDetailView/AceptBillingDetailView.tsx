"use client";
import {
  Button,
  Collapse,
  CollapseProps,
  ConfigProvider,
  Flex,
  message,
  Modal,
  Typography
} from "antd";
import { CaretDoubleRight, CaretDown, CaretLeft, DotsThree, Truck } from "phosphor-react";
import { getBillingDetailsById } from "@/services/billings/billings";
import styles from "./AceptBillingDetailView.module.scss";
import { useState, useEffect } from "react";
import { NoveltyTable } from "@/components/molecules/tables/NoveltyTable/Novelty";
import { number } from "yup";
import Link from "next/link";
import ModalBillingAction from "@/components/molecules/modals/ModalBillingAction/ModalBillingAction";

const Text = Typography;

interface AceptBillingDetailProps {
  params: { id: string };
}

export default function AceptBillingDetailView({ params }: AceptBillingDetailProps) {
  console.log(params.id);
  const [key, setKey] = useState<number | null>(null);
  const [billingData, setBillingData] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  console.log("billingData", billingData);
  useEffect(() => {
    const fetchBillingDetails = async () => {
      try {
        const response = await getBillingDetailsById(params.id);
        console.log(response);
        if (response && response.journeys) {
          setBillingData(response);
          console.log(response);
        } else {
          console.error("No se encontraron detalles de facturación.");
        }
      } catch (error) {
        console.error("Error fetching billing details:", error);
      }
    };

    fetchBillingDetails();
  }, [params.id]);
  const TitleComponent = ({ state, id }: { state: string; id: number }) => (
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
  );

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: <TitleComponent state="Carga" id={1} />,
      children: (
        <div>
          <NoveltyTable />
        </div>
      ),
      showArrow: false
    }
  ];
  const items2: CollapseProps["items"] = [
    {
      key: "2",
      label: <TitleComponent state="Carga" id={2} />,
      children: (
        <div>
          <NoveltyTable />
        </div>
      ),
      showArrow: false
    }
  ];

  return (
    <>
      {contextHolder}
      <div className={styles.card}>
        <div className={styles.linkButtonsContainer}>
          <Link href="/facturacion" className={styles.link}>
            <CaretLeft size={20} />
            <div>Detalle de TR {params.id}</div>
          </Link>

          <div className={styles.btnContainer}>
            <Button
              className={styles.actionBtn}
              type="text"
              size="large"
              onClick={() => setIsModalVisible(true)}
            >
              <DotsThree size={24} />
              <Text className={styles.text}>Generar acción</Text>
            </Button>
          </div>
        </div>

        <Flex className={styles.wrapper}>
          <Flex className={styles.topInfo}>
            <Flex className={styles.left}>
              <div className={styles.vehicle}>
                <b>Coltanques</b>
              </div>
              <br />
              <div className={styles.vehicle}>
                <b>Total servicio</b>
              </div>
            </Flex>
            <Flex className={styles.right}>
              <div className={styles.total}>
                <b>$19.000.000</b>
              </div>
            </Flex>
          </Flex>
        </Flex>

        <div className={styles.collapsableContainer}>
          <div className={styles.collapsable}>
            <Collapse
              onChange={(item) => setKey(Number(item[0]))}
              expandIconPosition="end"
              ghost
              items={items}
            />
          </div>
          <div className={styles.collapsable}>
            <Collapse
              onChange={(item) => setKey(Number(item[0]))}
              expandIconPosition="end"
              ghost
              items={items2}
            />
          </div>
        </div>
        <ModalBillingAction
          isOpen={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          idTR={billingData?.billing?.id ?? 0}
          totalValue={billingData?.billing?.fare ?? 0}
          billingStatus={billingData?.billing?.statusDesc}
          messageApi={messageApi}
        />
      </div>
    </>
  );
}
