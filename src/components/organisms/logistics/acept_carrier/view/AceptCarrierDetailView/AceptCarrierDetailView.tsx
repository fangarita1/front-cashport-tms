"use client";
import { Col, Flex, message } from "antd";
import Link from "next/link";
import Buttons from "../../detail/components/Buttons/Buttons";
import { CaretLeft } from "@phosphor-icons/react";
import SolicitationDetail from "../../detail/components/SolicitationDetail/SolicitationDetail";
import VehicleAndDriverAsignation from "../../detail/components/VehicleAndDriverAsignation/VehicleAndDriverAsignation";
import { formatMoney } from "@/utils/utils";
import { useEffect, useRef, useState } from "react";
import styles from "./AceptCarrierDetailView.module.scss";
import { getTransferRequestById } from "@/services/logistics/transfer-requests";
import { IMaterial, ITransferRequestDetail } from "@/types/logistics/schema";

interface AceptCarrierDetailProps {
  params: { id: string };
}

export default function AceptCarrierDetailView({ params }: AceptCarrierDetailProps) {
  const [view, setView] = useState<"detail" | "asignation" | "confirmation">("detail");
  const [isNextStepActive, setIsNextStepActive] = useState<boolean>(true);
  const [vehicleSelected, setVehicleSelected] = useState<number>(0);
  const [driversSelected, setDriverSelected] = useState<number[]>([0]);

  const [carrier, setCarrier] = useState<ITransferRequestDetail>();

  const [messageApi, contextHolder] = message.useMessage();

  /* Agendamiento */
  const origin = useRef<any>([]);
  const destination = useRef<any>([]);

  const [dataCarga, setDataCarga] = useState<IMaterial[]>([]);

  /* MAPBOX */
  const [routeGeometry, setRouteGeometry] = useState<any>(null);
  const [routeInfo, setRouteInfo] = useState([]);
  const [distance, setDistance] = useState<any>(null);
  const [timetravel, setTimeTravel] = useState<any>(null);

  useEffect(() => {
    return () => {
      setView("detail");
    };
  }, []);

  useEffect(() => {
    loadTransferRequests();
  }, []);

  const loadTransferRequests = async () => {
    if (carrier != undefined) return;
    //when there is more Id to consult, erase the "6" directly ID and leave the params
    // cont result = await getTransferRequestId(params.id);
    const result = await getTransferRequestById("6");
    if (result.data.data.length > 0) {
      const to: ITransferRequestDetail = result.data.data[0];
      //console.log(to);
      setCarrier(to);
      origin.current = [to.start_location?.longitude, to.start_location?.latitude];
      destination.current = [to.end_location?.longitude, to.end_location?.latitude];
      const routes = to.geometry;
      setRouteInfo(routes);
      // Check if any routes are returned
      if (routes !== undefined) {
        const { distance, duration, geometry } = routes[0];
        setRouteGeometry(geometry); // Set the route geometry
        setDistance(parseFloat((distance / 1000).toFixed(2)) + " Km");
        var date = new Date();
        date.setSeconds(duration);
        var hrs = date.toISOString().substr(11, 5);
        setTimeTravel(hrs + " Hrs");
      }

      to.transfer_request_material?.forEach(async (mat) => {
        mat?.material?.forEach(async (m) => {
          const newvalue: IMaterial = m;
          newvalue.quantity = mat.quantity;
          //console.log("newValue:", newvalue);
          await setDataCarga((dataCarga) => [...dataCarga, newvalue]);
        });
      });
    }
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

  console.log("carrier:", carrier);
  console.log("vehicle:", vehicleSelected, "drivers:", driversSelected, "isNextStepActive?", isNextStepActive);

  return (
    <>
      {contextHolder}
      <Flex className={styles.wrapper}>
        <Link href="/logistics/acept_carrier" className={styles.link}>
          <CaretLeft size={20} />
          <div>Detalle de TR {params.id}</div>
        </Link>
        <Flex className={styles.stepper}>
          <Col span={16}>
            <Flex justify="space-evenly" style={{ width: "100%" }}>
              {steps.map((step, index) => {
                const isCurrentStep = index === currentStepIndex;
                const isCompletedStep = index < currentStepIndex;
                const stepColor = isCurrentStep
                  ? "#141414"
                  : isCompletedStep
                    ? "#CBE71E"
                    : "#969696";
                const fontWeight = isCurrentStep ? "bold" : "normal";
                return (
                  <>
                    <Flex>
                      {index > 0 && <span style={{ margin: "0 8px", width: "" }}>-</span>}
                    </Flex>
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
                          {isCompletedStep ? index + 1 : index + 1}
                        </div>
                        <div style={{ marginLeft: 8, fontWeight: fontWeight }}>{step.title}</div>
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
              <b>{carrier?.vehicles}</b>
            </div>
            <div>
              Origen: <b>{carrier?.start_location?.description}</b> - Destino:{" "}
              <b>{carrier?.end_location?.description}</b>
            </div>
          </Flex>
          <hr style={{ borderTop: "1px solid #DDDDDD" }} />
          <Flex className={styles.right}>
            <div className={styles.total}>
              <b>{formatMoney(carrier?.amount)}</b>
            </div>
            <div>
              {distance} KM contrato #{/*carrier?.id_pricing*/}
            </div>
          </Flex>
        </Flex>

        {view === "detail" ? (
          <SolicitationDetail
            providerDetail={carrier}
            dataCarga={dataCarga}
            setIsNextStepActive={setIsNextStepActive}
          />
        ) : view === "asignation" ? (
          <VehicleAndDriverAsignation
            setIsNextStepActive={setIsNextStepActive}
            drivers={carrier?.driver_by_carrier_request}
            vehicles={carrier?.transfer_request_vehicles_sugest}
            setDriver={setDriverSelected}
            setVehicle={setVehicleSelected}
          />
        ) : (
          <SolicitationDetail
            providerDetail={carrier}
            dataCarga={dataCarga}
            setIsNextStepActive={setIsNextStepActive}
          />
        )}

        <Buttons
          isRightButtonActive={isNextStepActive}
          isLeftButtonActive={view !== "detail"}
          handleNext={handleNext}
          handleBack={handleBack}
        />
      </Flex>
    </>
  );
}
