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

import { Confirmation } from "../../detail/components/Confirmation/Confirmation";
import { useMapbox } from "@/utils/logistics/useMapBox";
import { CustomStepper } from "../../detail/components/Stepper/Stepper";
import { getTravelFreightDuration } from "@/utils/logistics/maps";
import {
  DataCarga,
  DriverDocument,
  IAceptCarrierAPI,
  Material,
  VehicleDocument
} from "@/types/logistics/carrier/carrier";

interface AceptCarrierDetailProps {
  params: { id: string };
}
export type FormMode = "edit" | "view";

export interface IDocumentAPI {
  id_document_type: number;
  description: string;
  entity_type: number;
  optional: boolean;
  url: string | null;
}

export interface IDriverAPI {
  id: number;
  name: string;
  last_name: string;
  phone: string;
  licence: string;
  licence_category: string;
  document_complete: number;
  company_id: number;
  company: string;
  driver_documents: IDocumentAPI[];
}
export interface IVehicleAPI {
  id: number;
  plate_number: string;
  brand: string;
  line: string;
  active: boolean;
  created_at: string;
  created_by: string;
  modified_at: string;
  modified_by: string;
  id_carrier: number;
  id_vehicle_type: number;
  model: string;
  year: number;
  color: string;
  country: string;
  aditional_info: string;
  gps_link: string;
  gps_user: string;
  gps_password: string;
  has_gps: boolean;
  vehicle_documents: IDocumentAPI[];
}

export default function AceptCarrierDetailView({ params }: Readonly<AceptCarrierDetailProps>) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [view, setView] = useState<"detail" | "asignation" | "confirmation">("detail");
  const [formMode, setFormMode] = useState<FormMode>("view");
  const [isNextStepActive, setIsNextStepActive] = useState<boolean>(true);
  const [vehicleSelectedId, setVehicleSelectedId] = useState<number | null>(null);
  const [driversSelectedIds, setDriversSelectedIds] = useState<number[]>([]);
  const [vehiclesOptions, setVehiclesOptions] = useState<any[]>([]);
  const [driversOptions, setDriversOptions] = useState<any[]>([]);
  const [driversMandatoryDocs, setDriversMandatoryDocs] = useState<DriverDocument[]>([]);
  const [vehicleMandatoryDocs, setVehicleMandatoryDocs] = useState<VehicleDocument[]>([]);
  const [currentDrivers, setCurrentDrivers] = useState<IDriverAPI[]>([]);
  const [currentVehicle, setCurrentVehicle] = useState<IVehicleAPI | null>(null);

  const [observation, setObservation] = useState<any>(null);
  const router = useRouter();
  const [carrier, setCarrier] = useState<IAceptCarrierAPI>();

  const [messageApi, contextHolder] = message.useMessage();

  const mapsAccessToken =
    "pk.eyJ1IjoiamNib2JhZGkiLCJhIjoiY2x4aWgxejVsMW1ibjJtcHRha2xsNjcxbCJ9.CU7FHmPR635zv6_tl6kafA"; //import.meta.env.VITE_MAP_BOX_ACCESS_TOKEN,

  const { routeGeometry, distance, timetravel, mapContainerRef } = useMapbox({
    start_longitude: carrier?.start_longitude ?? 0,
    start_latitude: carrier?.start_latitude ?? 0,
    end_longitude: carrier?.end_longitude ?? 0,
    end_latitude: carrier?.end_latitude ?? 0,
    geometry: carrier?.geometry,
    centerMap: carrier?.id_service_type == 2,
    mapsAccessToken
  });

  const [dataCarga, setDataCarga] = useState<DataCarga[]>([]);

  useEffect(() => {
    return () => {
      setView("detail");
    };
  }, []);

  useEffect(() => {
    loadTransferRequests();
  }, []);

  const setCurrentData = (data: IAceptCarrierAPI) => {
    const { drivers, vehicle, observation } = data;
    setVehicleSelectedId(vehicle?.id ?? null);
    setDriversSelectedIds(drivers.map((d) => d.id ?? null));
    observation && setObservation(observation);
  };

  const loadTransferRequests = async () => {
    if (carrier != undefined) return;
    setIsLoading(true);
    try {
      const result = await getAceptCarrierRequestById(params.id);
      if (result?.data?.data) {
        const to: IAceptCarrierAPI = result.data.data;
        console.log("TO", to);
        setCurrentData(to);
        const canEdit = to?.statusdesc === "Por confirmar";
        setFormMode(canEdit ? "edit" : "view");
        const driversResult = await getDriverByCarrierId(to?.id_carrier);
        setDriversOptions(driversResult.data.data);
        const vehiclesResult = await getVehiclesByCarrierId(to?.id_carrier);
        setVehiclesOptions(vehiclesResult.data.data);
        setCarrier(to);
        to.carrier_request_material_by_trip?.forEach(async (mat) => {
          mat?.material?.forEach(async (m) => {
            const newvalue: Material = m;
            setDataCarga((dataCarga) => [...dataCarga, { ...newvalue, quantity: mat.units }]);
          });
        });
        setDriversMandatoryDocs(to?.driver_documents);
        setVehicleMandatoryDocs(to?.vehicle_documents);
        setCurrentDrivers(to?.drivers);
        setCurrentVehicle(to?.vehicle);
      }
    } catch (error) {
      console.error("Error loading transfer requests", error);
    } finally {
      setIsLoading(false);
    }
  };
  const vehicleAndDriverRef = useRef<any>(null);

  const submitCarrierRequest = async (
    carrierId: string,
    requestId: string,
    vehicleId: string,
    driverIds: string[],
    status: string,
    observation: string
  ) => {
    try {
      setIsLoading(true);
      await postCarrierRequest(carrierId, requestId, vehicleId, driverIds, status, observation);
      messageApi.open({
        content: "Aceptado"
      });
      router.push("/logistics/acept_carrier");
    } catch (error) {
      messageApi.open({
        content: "Hubo un problema aceptando la orden"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = async () => {
    if (vehicleAndDriverRef.current) {
      vehicleAndDriverRef.current.handleSubmitDriverVehicleForm();
    }
    if (view === "detail") {
      setView("asignation");
    } else if (view === "asignation") {
      setView("confirmation");
    } else {
      await submitCarrierRequest(
        String(carrier?.id_carrier),
        params.id,
        String(vehicleSelectedId),
        driversSelectedIds.map(String),
        "1",
        observation
      );
    }
  };

  const handleBack = () => {
    if (view === "detail") router.push("/logistics/acept_carrier");
    if (view === "confirmation") setView("asignation");
    else if (view === "asignation") setView("detail");
  };

  const handleReject = async () => {
    try {
      setIsLoading(true);
      const res = await postCarrierReject(String(carrier?.id_carrier), String(carrier?.id));
      if (res) {
        messageApi.open({
          content: "Rechazado"
        });
      }
      router.push("/logistics/acept_carrier");
    } catch (error) {
      messageApi.open({
        content: "Hubo un problema rechazando la orden"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const currentStepIndex = view === "detail" ? 0 : view === "asignation" ? 1 : 2;
  const isLastStep = view === "confirmation";
  const canContinue = formMode === "edit" || (formMode === "view" && !isLastStep);

  const steps = [
    { title: "Detalle solicitud", disabled: false },
    { title: "Asignación de vehículo y conductor", disabled: false },
    { title: "Confirmar servicio", disabled: false }
  ];

  const renderView = () => {
    switch (view) {
      case "detail":
        return (
          <SolicitationDetail
            providerDetail={carrier}
            dataCarga={dataCarga}
            setIsNextStepActive={setIsNextStepActive}
            service_type={carrier?.service_type}
            geometry={routeGeometry}
            distance={distance}
            timetravel={
              carrier?.id_service_type !== 2
                ? timetravel
                : getTravelFreightDuration(carrier?.start_date, carrier?.end_date)
            }
            mapContainerRef={mapContainerRef}
          />
        );
      case "asignation":
        return (
          <VehicleAndDriverAsignation
            setIsNextStepActive={setIsNextStepActive}
            driversOptions={driversOptions}
            vehiclesOptions={vehiclesOptions}
            setDriversSelectedIds={setDriversSelectedIds}
            setVehicleSelectedId={setVehicleSelectedId}
            ref={vehicleAndDriverRef}
            driversSelectedIds={driversSelectedIds}
            vehicleSelectedId={vehicleSelectedId}
            formMode={formMode}
            driversMandatoryDocs={driversMandatoryDocs}
            vehicleMandatoryDocs={vehicleMandatoryDocs}
            currentDrivers={currentDrivers}
            currentVehicle={currentVehicle}
          />
        );
      case "confirmation":
      default:
        return (
          <Confirmation
            setIsNextStepActive={setIsNextStepActive}
            driverSelected={driversOptions?.filter((driver) =>
              driversSelectedIds.includes(driver.id)
            )}
            vehicleSelected={vehiclesOptions.find((a) => a.id === vehicleSelectedId)}
            setObservation={setObservation}
            isNextStepActive={isNextStepActive}
            formMode={formMode}
            currentObservation={observation}
          />
        );
    }
  };

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
              {carrier?.fee_description && (
                <p className={styles.text}>{carrier?.fee_description}</p>
              )}
            </Col>
          </Flex>
          {renderView()}
          <Buttons
            canContinue={canContinue}
            isRightButtonActive={isNextStepActive}
            isLeftButtonActive={true}
            handleNext={handleNext}
            handleBack={handleBack}
            handleReject={handleReject}
            isLastStep={isLastStep}
          />
        </Skeleton>
      </Flex>
    </>
  );
}
