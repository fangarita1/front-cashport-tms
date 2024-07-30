"use client";
import { Col, Flex, Steps } from "antd";
import Link from "next/link";
import Buttons from "../../detail/components/buttons/buttons";
import { CaretLeft } from "@phosphor-icons/react";
import { mockProviderDetail } from "../../detail/mockdata";
import SolicitationDetail from "../../detail/components/solicitationDetail/solicitationDetail";
import { formatMoney } from "@/utils/utils";
import styles from "./ProviderDetailView.module.scss";

interface ProviderDetailProps {
  params: { id: string };
}

export default function ProviderDetailView({ params }: ProviderDetailProps) {

  return (
    <Flex className={styles.wrapper}>
      <Link href="/proveedores" className={styles.link}>
        <CaretLeft size={20} />
        <div>Detalle de TR {params.id}</div>
      </Link>
      <Flex className={styles.stepper}>
          <Col span={16}>
            <Flex justify="space-evenly">
              <Steps
                style={{ width: "100%" }}
                size="small"
                current={0}
                iconPrefix="-"
                items={[
                  {
                    title: "Detalle solicitud"
                  },
                  {
                    title: "Asignación de vehículo y conductor"
                  },
                  {
                    title: "Confirmar servicio"
                  }
                ]}
              />
            </Flex>
          </Col>
      </Flex>
      <Flex className={styles.topInfo}>
        <Flex className={styles.left}>
            <div className={styles.vehicle}><b>{mockProviderDetail.vehicle}</b></div>
            <div>Origen: <b>Base Cota</b> - Destino: <b>Acacias</b></div>
        </Flex>
        <hr style={{ borderTop: "1px solid #DDDDDD" }} />
        <Flex className={styles.right}>
          <div className={styles.total}><b>{formatMoney(mockProviderDetail.total)}</b></div>
          <div>{mockProviderDetail.travelDetail}</div>
        </Flex>
      </Flex>

      <SolicitationDetail providerDetail={mockProviderDetail}/>

      <Buttons isLeftButtonActive={false} isRightButtonActive={false} />
    </Flex>
  );
}
