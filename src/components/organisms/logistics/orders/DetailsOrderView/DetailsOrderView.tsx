import { Flex, message, Row, Col, Spin } from "antd";
import React, { useRef, useEffect, useState } from "react";

// dayjs locale
import dayjs from "dayjs";
import "dayjs/locale/es-us";
dayjs.locale("es");

// mapbox
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

//schemas
import { IMaterial, ITransferOrder } from "@/types/logistics/schema";

//navigation
import { useRouter } from "next/navigation";

//api
import { getTransferOrderById } from "@/services/logistics/transfer-orders";
import { RouteMap } from "./components/RouteMap/RouteMap";
import { SummaryData } from "./components/SummaryData/SummaryData";
import { Responsibles } from "./components/Responsibles/Responsibles";
import AditionalInfo from "../../acept_carrier/detail/components/AditionalInfo/AditionalInfo";
import Materials from "../../acept_carrier/detail/components/Materials/Materials";

//styles
import styles from "./DetailsOrderView.module.scss";
import PrincipalButton from "@/components/atoms/buttons/principalButton/PrincipalButton";
import { useMapbox } from "@/utils/logistics/useMapBox";

interface Props {
  idOrder: string;
}

export const DetailsOrderView = ({ idOrder = "" }: Props) => {
  const { push } = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [transferOrder, setTransferOrder] = useState<ITransferOrder>();
  const [loading, setLoading] = useState<boolean>(true);

  const optionsFlexible = [
    { value: 0, label: "Exacto" },
    { value: 1, label: "+/- 1 día" },
    { value: 2, label: "+/- 2 días" },
    { value: 3, label: "+/- 3 días" }
  ];

  const [dataCarga, setDataCarga] = useState<IMaterial[]>([]);

  /* MAPBOX */
  const mapsAccessToken =
    "pk.eyJ1IjoiamNib2JhZGkiLCJhIjoiY2x4aWgxejVsMW1ibjJtcHRha2xsNjcxbCJ9.CU7FHmPR635zv6_tl6kafA"; //import.meta.env.VITE_MAP_BOX_ACCESS_TOKEN,

  const { routeGeometry, distance, timetravel, mapContainerRef } = useMapbox({
    start_longitude: transferOrder?.start_location?.longitude ?? 0,
    start_latitude: transferOrder?.start_location?.latitude ?? 0,
    end_longitude: transferOrder?.end_location?.longitude ?? 0,
    end_latitude: transferOrder?.end_location?.latitude ?? 0,
    geometry: transferOrder?.geometry,
    centerMap: transferOrder?.id_service_type == "2",
    mapsAccessToken
  });

  useEffect(() => {
    loadTransferOrder();
  });

  const loadTransferOrder = async () => {
    if (transferOrder != undefined) return;
    try {
      setLoading(true);
      const result = await getTransferOrderById(idOrder);
      if (result.data.data.length > 0) {
        const to: ITransferOrder = result.data.data[0];
        setTransferOrder(to);

        to.transfer_order_material?.forEach(async (mat) => {
          mat?.material?.forEach(async (m) => {
            const newvalue: IMaterial = m;
            newvalue.quantity = mat.quantity;
            setDataCarga((prevData) => [...prevData, newvalue]);
          });
        });
      }
    } catch (error) {
      console.log("Error getTransferOrderById: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      {loading ? (
        <Spin size="large" />
      ) : (
        <Flex className={styles.wrapper} gap={"1.5rem"}>
          <Flex>
            <Col span={12} style={{ paddingRight: "0.625rem" }}>
              <Flex className={styles.sectionContainer} style={{ width: "100%", height: "100%" }}>
                <RouteMap title="Ruta" mapContainerRef={mapContainerRef} />
              </Flex>
            </Col>
            <Col span={12}>
              <Flex className={styles.sectionContainer}>
                <SummaryData
                  title="Resumen"
                  routeGeometry={routeGeometry}
                  distance={distance}
                  timetravel={timetravel}
                  needLiftingOrigin={transferOrder?.start_freight_equipment}
                  needLiftingDestination={transferOrder?.end_freight_equipment}
                  travelTypeDesc={transferOrder?.service_type_desc ?? ""}
                  vehiclesSuggested={transferOrder?.transfer_order_vehicles}
                  start_location={transferOrder?.start_location?.description ?? ""}
                  end_location={transferOrder?.end_location?.description ?? ""}
                  start_date_flexible={
                    optionsFlexible.find((x) => x.value == transferOrder?.start_date_flexible)
                      ?.label ?? ""
                  }
                  end_date_flexible={
                    optionsFlexible.find((x) => x.value == transferOrder?.end_date_flexible)
                      ?.label ?? ""
                  }
                  start_date={dayjs(transferOrder?.start_date).format("YYYY-MM-DD")}
                  start_date_hour={dayjs(transferOrder?.start_date).format("HH:mm") ?? ""}
                  end_date={dayjs(transferOrder?.end_date).format("YYYY-MM-DD")}
                  end_date_hour={dayjs(transferOrder?.end_date).format("HH:mm") ?? ""}
                />
              </Flex>
            </Col>
          </Flex>
          <Flex vertical>
            <Responsibles title="Responsables" psls={transferOrder?.transfer_order_psl ?? []} />
          </Flex>
          <Flex vertical>
            <AditionalInfo
              title="Información adicional"
              documents={transferOrder?.transfer_order_documents ?? []}
              contacts={transferOrder?.transfer_order_contacts ?? []}
              otherRequirements={transferOrder?.transfer_order_other_requeriments ?? []}
              specialInstructions={transferOrder?.observation ?? ""}
              finalClient={transferOrder?.client_desc ?? ""}
            />
          </Flex>
          <Flex className={styles.container} vertical>
            <p className={styles.sectionTitle}>Carga</p>
            <Materials materials={dataCarga} />
            <p>&nbsp;</p>
            <p className={styles.title}>Vehículos sugeridos</p>
            <Row>
              <Col span={24} style={{ paddingTop: "0.5rem" }}>
                {transferOrder?.transfer_order_vehicles?.map((veh) => (
                  <div className={styles.selected} key={veh.id}>
                    {veh.vehicle_type_desc} <small>{veh.quantity}</small>
                  </div>
                ))}
              </Col>
            </Row>
          </Flex>
          <Flex className={styles.footer}>
            <Col span={12}>
              <PrincipalButton
                type="default"
                className={styles.backButton}
                onClick={() => {
                  push("/logistics/transfer-orders");
                }}
              >
                Regresar
              </PrincipalButton>
            </Col>
            <Col span={12} />
          </Flex>
        </Flex>
      )}
    </>
  );
};
