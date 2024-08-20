"use client";
import { Col, Divider, Flex, message, Skeleton } from "antd";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Buttons from "../../detail/components/Buttons/Buttons";
import { CaretLeft } from "@phosphor-icons/react";
import SolicitationDetail from "../../detail/components/SolicitationDetail/SolicitationDetail";
import VehicleAndDriverAsignation from "../../detail/components/VehicleAndDriverAsignation/VehicleAndDriverAsignation";
import { formatMoney } from "@/utils/utils";
import { useEffect, useRef, useState } from "react";
import styles from "./AceptCarrierDetailView.module.scss";
import {
  getAceptCarrierRequestById,
  getDriverByCarrierId,
  getVehiclesByCarrierId,
  postCarrierReject,
  postCarrierRequest
} from "@/services/logistics/acept_carrier";
import { ICarrierRequestDetail, IMaterial } from "@/types/logistics/schema";
import { Confirmation } from "../../detail/components/Confirmation/Confirmation";
import { useMapbox } from "@/utils/logistics/useMapBox";
import { CustomStepper } from "../../detail/components/Stepper/Stepper";

interface AceptCarrierDetailProps {
  params: { id: string };
}

export default function AceptCarrierDetailView({ params }: Readonly<AceptCarrierDetailProps>) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [view, setView] = useState<"detail" | "asignation" | "confirmation">("detail");
  const [isNextStepActive, setIsNextStepActive] = useState<boolean>(true);
  const [vehicleSelected, setVehicleSelected] = useState<number>(0);
  const [driversSelected, setDriverSelected] = useState<number[]>([0]);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [drivers, setDrivers] = useState<any[]>([]);
  const [observation, setObservation] = useState<any>(null);
  const router = useRouter();

  const [carrier, setCarrier] = useState<ICarrierRequestDetail>();

  const [messageApi, contextHolder] = message.useMessage();

  const mapsAccessToken =
    "pk.eyJ1IjoiamNib2JhZGkiLCJhIjoiY2x4aWgxejVsMW1ibjJtcHRha2xsNjcxbCJ9.CU7FHmPR635zv6_tl6kafA"; //import.meta.env.VITE_MAP_BOX_ACCESS_TOKEN,

  const { routeGeometry, distance, timetravel, mapContainerRef } = useMapbox({
    start_longitude: carrier?.start_longitude ?? 0,
    start_latitude: carrier?.start_latitude ?? 0,
    end_longitude: carrier?.end_longitude ?? 0,
    end_latitude: carrier?.end_latitude ?? 0,
    geometry: carrier?.geometry,
    centerMap: carrier?.id_service_type == 3,
    mapsAccessToken
  });

  const [dataCarga, setDataCarga] = useState<IMaterial[]>([]);

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
    setIsLoading(true);
    try {
      const result = await getAceptCarrierRequestById(params.id);
      if (result?.data?.data?.length > 0) {
        const to: ICarrierRequestDetail = result.data.data[0];
        const driversResult = await getDriverByCarrierId(to?.id_carrier);
        setDrivers(driversResult.data.data);
        const vehiclesResult = await getVehiclesByCarrierId(to?.id_carrier);
        setVehicles(vehiclesResult.data.data);
        setCarrier(to);
        to.carrier_request_material_by_trip?.forEach(async (mat) => {
          mat?.material?.forEach(async (m) => {
            const newvalue: IMaterial = m;
            setDataCarga((dataCarga) => [...dataCarga, { ...newvalue, quantity: mat.units }]);
          });
        });
      }
    } catch (error) {
      console.error("Error loading transfer requests", error);
    } finally {
      setIsLoading(false);
    }
  };
  const vehicleAndDriverRef = useRef<any>(null);

  const handleNext = async () => {
    if (vehicleAndDriverRef.current) {
      vehicleAndDriverRef.current.handleSubmitDriverVehicleForm();
    }
    if (view === "detail") {
      setView("asignation");
    } else if (view === "asignation") {
      setView("confirmation");
    } else {
      await postCarrierRequest(
        String(carrier?.id_carrier),
        String(carrier?.id),
        String(vehicleSelected),
        driversSelected.map(String),
        "1",
        observation
      );
      messageApi.open({
        content: "Aceptado"
      });
      router.push("/logistics/acept_carrier");
    }
  };

  const handleBack = () => {
    if (view === "detail") router.push("/logistics/acept_carrier");
    if (view === "confirmation") setView("asignation");
    else if (view === "asignation") setView("detail");
  };

  const handleReject = async () => {
    console.log("handleReject", "id carrier", carrier?.id_carrier, "id", carrier?.id);
    await postCarrierReject(String(carrier?.id_carrier), String(carrier?.id));
    messageApi.open({
      content: "Rechazado"
    });
    router.push("/logistics/acept_carrier");
  };

  const currentStepIndex = view === "detail" ? 0 : view === "asignation" ? 1 : 2;

  const steps = [
    { title: "Detalle solicitud" },
    { title: "Asignación de vehículo y conductor" },
    { title: "Confirmar servicio" }
  ];

  return (
    <>
      {contextHolder}
      <Flex className={styles.wrapper}>
        <Link href="/logistics/acept_carrier" className={styles.link}>
          <CaretLeft size={20} weight="bold" />
          <p className={`${styles.text} ${styles.strongText}`}>Detalle de TR {params.id}</p>
        </Link>
        <CustomStepper steps={steps} currentStepIndex={currentStepIndex} />
        <Skeleton active loading={isLoading}>
          <Flex className={styles.sectionWraper} style={{ marginBottom: "2rem" }}>
            <Col span={11}>
              <div className={styles.vehicle}>
                <p className={styles.subtitle}>{carrier?.vehicles}</p>
              </div>
              <div>
                <p className={styles.text}>
                  Origen: <b>{carrier?.start_location}</b> - Destino: <b>{carrier?.end_location}</b>
                </p>
              </div>
            </Col>
            <Col span={2}>
              <Divider type="vertical" className={styles.divider} />
            </Col>
            <Col
              span={11}
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                flexDirection: "column"
              }}
            >
              <p className={styles.heading}>{formatMoney(carrier?.amount)}</p>
              <p className={styles.text}>
                {distance} KM contrato #{/*carrier?.id_pricing*/}
              </p>
            </Col>
          </Flex>
          {view === "detail" ? (
            <SolicitationDetail
              providerDetail={carrier}
              dataCarga={dataCarga}
              setIsNextStepActive={setIsNextStepActive}
              service_type={carrier?.service_type}
              geometry={routeGeometry}
              distance={distance}
              timetravel={timetravel}
              mapContainerRef={mapContainerRef}
            />
          ) : view === "asignation" ? (
            <VehicleAndDriverAsignation
              setIsNextStepActive={setIsNextStepActive}
              drivers={drivers}
              vehicles={vehicles}
              setDrivers={setDriverSelected}
              setVehicle={setVehicleSelected}
              ref={vehicleAndDriverRef}
              currentDrivers={driversSelected}
              currentVehicle={vehicleSelected}
            />
          ) : (
            <Confirmation
              setIsNextStepActive={setIsNextStepActive}
              driverSelected={drivers?.filter((driver) => driversSelected.includes(driver.id))}
              vehicleSelected={vehicles.find((a) => a.id === vehicleSelected)}
              setObservation={setObservation}
              isNextStepActive={isNextStepActive}
            />
          )}
          <Buttons
            isRightSectionVisible={true} //CAMBIAR ! carrier?.statusdesc === "Por confirmar"
            isRightButtonActive={isNextStepActive}
            isLeftButtonActive={true}
            handleNext={handleNext}
            handleBack={handleBack}
            handleReject={handleReject}
            isLastStep={view === "confirmation"}
          />
        </Skeleton>
      </Flex>
    </>
  );
}
