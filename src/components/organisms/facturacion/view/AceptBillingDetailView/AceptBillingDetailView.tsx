"use client";
import {
  Button,
  Col,
  Collapse,
  CollapseProps,
  ConfigProvider,
  Flex,
  message,
  Modal,
  Row,
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
import { BillingStatusEnum, IJourney, IIncident  } from "@/types/logistics/schema";
import { ItemType } from "rc-collapse/es/interface";
import { INovelty, IEvidence } from "@/types/novelty/INovelty";

const { Text } = Typography;

interface AceptBillingDetailProps {
  params: { id: string };
}

export default function AceptBillingDetailView({ params }: AceptBillingDetailProps) {
  console.log(params.id);
  const [key, setKey] = useState<number | null>(null);
  const [billingData, setBillingData] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [billingStatus, setBillingStatus] = useState<BillingStatusEnum | null>(null);

  const canMakeAnAction = billingStatus
    ? billingStatus === BillingStatusEnum.PorAceptar ||
      billingStatus === BillingStatusEnum.Preautorizado
    : false;
  const [messageApi, contextHolder] = message.useMessage();
  console.log("billingData", billingData);

  const fetchBillingDetails = async () => {
    try {
      const response = await getBillingDetailsById(params.id);
      console.log(response);
      if (response && response.journeys) {
        setBillingData(response);
        setBillingStatus(response.billing.statusDesc);
        console.log(response);
      } else {
        console.error("No se encontraron detalles de facturación.");
      }
    } catch (error) {
      console.error("Error fetching billing details:", error);
    }
  };

  useEffect(() => {
    if (params.id && !isModalVisible) fetchBillingDetails();
  }, [params.id, isModalVisible]);

  const TitleComponent = ({
    state,
    id,
    journey,
  }: {
    state: string;
    id: number;
    journey: IJourney;
  }) => (
    <div className={styles.header}>
      <div className={styles.stateContainer}>
        <Truck size={27} color="#FFFFFF" weight="fill" />
        <Text className={styles.state}>{state}</Text>
      </div>
      <div className={styles.fromto}>
        <div className={styles.fromtoContainer}>
          <Text className={styles.title}>Origen</Text>
          <Text className={styles.subtitle}>{journey.start_location_desc}</Text>
        </div>
        <div className={`${styles.fromtoContainer} ${styles.right}`}>
          <div>
            <Text className={styles.title}>Destino</Text>
            <Text className={styles.subtitle}>{journey.end_location_desc}</Text>
          </div>
          <CaretDown className={`${styles.caret} ${id === key ? styles.rotate : ''}`} size={24} />
        </div>
      </div>
      <div className={styles.resumContainer}>
        <div className={styles.resum}>
          <div className={styles.resumItem}>
            <Text className={styles.text}>Vehículo</Text>
            <Text className={`${styles.text} ${styles.bold}`}>
              {journey.trips[0]?.vehicle_type_desc} | {journey.trips[0]?.plate_number ?? 'N/A'}
            </Text>
          </div>
          <div className={styles.resumItem}>
            <Text className={styles.text}>Proveedor</Text>
            <Text className={`${styles.text} ${styles.bold}`}>
              {billingData?.billing.carrier ?? 'N/A'}
            </Text>
          </div>
          <div className={styles.resumItem}>
            <Text className={styles.text}>Conductor</Text>
            <Text className={`${styles.text} ${styles.bold}`}>
              {journey.trips[0]?.drivers ?? 'N/A'}
            </Text>
          </div>
        </div>
        <div className={`${styles.resum} ${styles.right}`}>
          <div className={`${styles.resumItem} ${styles.right}`}>
            <Text className={styles.text}>Tarifa base</Text>
            <Text className={styles.text}>${journey.trips[0]?.fare ?? 0}</Text>
          </div>
          <div className={`${styles.resumItem} ${styles.right}`}>
            <Text className={styles.text}>Sobrecosto</Text>
            <Text className={styles.text}>${journey.trips[0]?.overcost ?? 0}</Text>
          </div>
          <div className={`${styles.resumItem} ${styles.right}`}>
            <Text className={`${styles.text} ${styles.bold}`}>Total</Text>
            <Text className={`${styles.text} ${styles.bold}`}>
              ${journey.trips[0]?.total ?? 0}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );

  function convertIncidentToNovelty(incident: IIncident): INovelty {
    const evidence: IEvidence = {
      id: incident.id,
      novelty_id: incident.id, 
      name: incident.url_image.split('/').pop() || 'Evidencia', 
      url: incident.url_image,
      created_at: new Date(),
      updated_at: new Date(), 
    };

    return {
      id: incident.id,
      trip_id: incident.id_trip,
      novelty_type: incident.id_incident_type.toString(),
      observation: incident.description,
      value: incident.fare,
      status: incident.status_description,
      status_id: incident.status,
      created_by: incident.user,
      quantity: incident.units,
      evidences: [evidence]
    };
  }

  const collapseItems = billingData?.journeys.map((journey: IJourney, index: number) => {
    const allIncidents = journey.trips.reduce((acc: INovelty[], trip) => {
      return [...acc, ...trip.incidents.map(convertIncidentToNovelty)];
    }, []);

    return {
      key: journey.id.toString(),
      label: <TitleComponent state="Carga" id={index + 1} journey={journey} />,
      children: (
        <div>
          <NoveltyTable
            novelties={allIncidents}
            openDrawer={() => {}}
            handleShowDetails={() => {}}
          />
        </div>
      ),
      showArrow: false
    };
  }) || [];

  return (
    <>
      {contextHolder}
      <div className={styles.card}>
        <div className={styles.linkButtonsContainer}>
          <Link href="/facturacion" className={styles.link}>
            <CaretLeft size={20} weight="bold" />
            <div>Detalle de TR {params.id}</div>
          </Link>
          {canMakeAnAction && (
            <Button
              className={styles.actionBtn}
              type="text"
              size="large"
              onClick={() => setIsModalVisible(true)}
            >
              <DotsThree size={24} />
              <Text className={styles.text}>Generar acción</Text>
            </Button>
          )}
        </div>

        <Flex className={styles.boxContainer} vertical gap={16}>
          <Row>
            <div className={styles.headingText}>
              {billingData?.billing?.carrier ?? 'N/A'}
            </div>
          </Row>
          <Row>
            <Col span={12}>
              <div className={styles.headingText}>
                Total servicio
              </div>
            </Col>
            <Col
              span={12}
              style={{ display: "flex", justifyContent: "flex-end", borderLeft: "1px solid #DDD" }}
            >
              <div className={styles.titleText}>${billingData?.billing?.fare ?? 0}</div>
            </Col>
          </Row>
        </Flex>

        <div className={styles.collapsableContainer}>
          {collapseItems.map((item: ItemType) => (
            <div key={item.key} className={styles.collapsable}>
              <Collapse
                onChange={(item) => setKey(Number(item[0]))}
                expandIconPosition="end"
                ghost
                items={[item]}
              />
            </div>
          ))}
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
