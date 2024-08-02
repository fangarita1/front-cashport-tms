"use client";
import { Col, Flex } from "antd";
import Link from "next/link";
import Buttons from "../../detail/components/Buttons/Buttons";
import { CaretLeft } from "@phosphor-icons/react";
import { mockProviderDetail } from "../../detail/mockdata";
import SolicitationDetail from "../../detail/components/SolicitationDetail/SolicitationDetail";
import VehicleAndDriverAsignation from "../../detail/components/VehicleAndDriverAsignation/VehicleAndDriverAsignation";
import { formatMoney } from "@/utils/utils";
import { useEffect, useState } from "react";
import { CheckCircleOutlined } from "@ant-design/icons";
import styles from "./AceptCarrierDetailView.module.scss";
import { getTransferRequestById } from "@/services/logistics/transfer-requests";
import { ICarrierRequestDetail } from "@/types/logistics/schema";

interface AceptCarrierDetailProps {
  params: { id: string };
}

export default function AceptCarrierDetailView({ params }: AceptCarrierDetailProps) {
  const [view, setView] = useState<"detail" | "asignation" | "confirmation">("detail");
  const [carrier, setCarrier] = useState<ICarrierRequestDetail | any>();

  useEffect(() => {
    return () => {
      setView("detail");
    };
  }, []);

  useEffect(() => {
    loadTransferOrders();
  }, []);

  const loadTransferOrders = async () => {
    const result = await getTransferRequestById("3");
    setCarrier(result.data.data);
  };

  const handleNext = () => {
    if (view === "detail") setView("asignation");
    else if (view === "asignation") setView("confirmation");
  };

  const handleBack = () => {
    if (view === "confirmation") setView("asignation");
    else if (view === "asignation") setView("detail");
  };

  const currentStepIndex = view === "detail" ? 0 : view === "asignation" ? 1 : 2;

  const steps = [
    { title: "Detalle solicitud" },
    { title: "Asignación de vehículo y conductor" },
    { title: "Confirmar servicio" }
  ];

  return (
    <Flex className={styles.wrapper}>
      <Link href="/logistics/requests" className={styles.link}>
        <CaretLeft size={20} />
        <div>Detalle de TR {params.id}</div>
      </Link>
      <Flex className={styles.stepper}>
        <Col span={16}>
          <Flex justify="space-evenly" style={{ width: "100%" }}>
            {steps.map((step, index) => {
              const isCurrentStep = index === currentStepIndex;
              const isCompletedStep = index < currentStepIndex;
              const stepColor = isCurrentStep ? "#141414" : isCompletedStep ? "#CBE71E" : "#969696";
              const fontWeight = isCurrentStep ? "bold" : "normal";
              return (
                <>
                  <Flex>{index > 0 && <span style={{ margin: "0 8px", width: "" }}>-</span>}</Flex>
                  <Flex key={index} align="center">
                    <Flex align="center">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          background: stepColor,
                          color: "white",
                          fontWeight: fontWeight
                        }}
                      >
                        {isCompletedStep ? (
                          <CheckCircleOutlined style={{ color: "white" }} />
                        ) : (
                          index + 1
                        )}
                      </div>
                      <div style={{ marginLeft: 8, color: stepColor, fontWeight: fontWeight }}>
                        {step.title}
                      </div>
                    </Flex>
                  </Flex>
                </>
              );
            })}
          </Flex>
        </Col>
      </Flex>
      <Flex className={styles.topInfo}>
        <Flex className={styles.left}>
          <div className={styles.vehicle}>
            <b>{mockProviderDetail.vehicle}</b>
          </div>
          <div>
            Origen: <b>Base Cota</b> - Destino: <b>Acacias</b>
          </div>
        </Flex>
        <hr style={{ borderTop: "1px solid #DDDDDD" }} />
        <Flex className={styles.right}>
          <div className={styles.total}>
            <b>{formatMoney(mockProviderDetail.total)}</b>
          </div>
          <div>{mockProviderDetail.travelDetail}</div>
        </Flex>
      </Flex>

      {view === "detail" ? (
        <SolicitationDetail providerDetail={mockProviderDetail} />
      ) : view === "asignation" ? (
        <VehicleAndDriverAsignation />
      ) : (
        <SolicitationDetail providerDetail={mockProviderDetail} />
      )}

      <Buttons
        isRightButtonActive={view !== "confirmation"}
        isLeftButtonActive={view !== "detail"}
        handleNext={handleNext}
        handleBack={handleBack}
      />
    </Flex>
  );
}
