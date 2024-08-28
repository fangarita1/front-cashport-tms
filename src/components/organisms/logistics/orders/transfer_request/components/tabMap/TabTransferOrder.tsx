import mapboxgl from "mapbox-gl";
import { ITransferOrderRequest } from "@/types/logistics/schema";
import { Col, Flex, Row } from "antd";
import { useMapbox } from "@/utils/logistics/useMapBox";
import { RouteMap } from "../../../DetailsOrderView/components/RouteMap/RouteMap";
import { SummaryData } from "../../../DetailsOrderView/components/SummaryData/SummaryData";
import dayjs from "dayjs";
type PricingStepOneProps = {
  orderRequest: ITransferOrderRequest | undefined;
};

const optionsFlexible = [
  { value: 0, label: "Exacto" },
  { value: 1, label: "+/- 1 día" },
  { value: 2, label: "+/- 2 días" },
  { value: 3, label: "+/- 3 días" }
];

export default function TabTransferOrder({ orderRequest }: PricingStepOneProps) {
  const { routeGeometry, distance, timetravel, mapContainerRef } = useMapbox({
    geometry: orderRequest?.geometry || [],
    start_longitude: orderRequest?.start_location?.longitude ?? 0,
    start_latitude: orderRequest?.start_location?.latitude ?? 0,
    end_longitude: orderRequest?.end_location?.longitude ?? 0,
    end_latitude: orderRequest?.end_location?.latitude ?? 0,
    centerMap: false
  });

  return (
    <Flex vertical className="travelDataWrapper">
      <Flex>
        <Col span={12} style={{ paddingRight: "0.625rem" }}>
          <Flex className={"sectionContainer"} style={{ width: "100%", height: "100%" }}>
            <RouteMap title="Ruta" mapContainerRef={mapContainerRef} />
          </Flex>
        </Col>
        <Col span={12}>
          <Flex className={"sectionContainer"}>
            <SummaryData
              title="Resumen"
              routeGeometry={routeGeometry}
              distance={distance}
              timetravel={timetravel}
              needLiftingOrigin={orderRequest?.start_freight_equipment}
              needLiftingDestination={orderRequest?.end_freight_equipment}
              freight_destination_time={orderRequest?.freight_destination_time}
              freight_origin_time={orderRequest?.freight_origin_time}
              travelTypeDesc={orderRequest?.service_type_desc ?? ""}
              vehiclesSuggested={orderRequest?.transfer_order_vehicles}
              start_location={orderRequest?.start_location?.description ?? ""}
              end_location={orderRequest?.end_location?.description ?? ""}
              start_date_flexible={
                optionsFlexible.find((x) => x.value == orderRequest?.start_date_flexible)?.label ??
                ""
              }
              end_date_flexible={
                optionsFlexible.find((x) => x.value == orderRequest?.end_date_flexible)?.label ?? ""
              }
              start_date={dayjs(orderRequest?.start_date).format("YYYY-MM-DD")}
              start_date_hour={dayjs(orderRequest?.start_date).format("HH:mm") ?? ""}
              end_date={dayjs(orderRequest?.end_date).format("YYYY-MM-DD")}
              end_date_hour={dayjs(orderRequest?.end_date).format("HH:mm") ?? ""}
              volume={orderRequest?.transfer_order_material?.reduce((acc, curr) => acc + curr.material[0].m3_volume, 0)}
              weight={orderRequest?.transfer_order_material?.reduce((acc, curr) => acc + curr.material[0].kg_weight, 0)}
            />
          </Flex>
        </Col>
      </Flex>
    </Flex>
  );
}
