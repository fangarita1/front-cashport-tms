import RadioButtonIcon from "@/components/atoms/RadioButton/RadioButton";
import { ICarrierRequestVehicles } from "@/types/logistics/schema";
import styles from "./VehicleRenderOption.module.scss";
import { Col, Flex, Typography } from "antd";
import { Check, Circle } from "phosphor-react";
const { Text } = Typography;

interface IVehicleOption {
  data: ICarrierRequestVehicles;
  selectedVehicle: number | null;
  index: number;
}
function VehicleRenderOption({ data, index, selectedVehicle }: Readonly<IVehicleOption>) {
  return (
    <Flex vertical key={`vehicle-${data.id}-${index}`}>
      {index !== 0 && <hr style={{ borderTop: "1px solid #f7f7f7", margin: "0 0 0.5rem 0" }}></hr>}
      <Flex align="center" style={{ height: "2.75rem" }}>
        <Col
          span={2}
          style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}
        >
          {selectedVehicle === data.id ? <RadioButtonIcon /> : <Circle size={20} />}
        </Col>
        <Col span={20}>
          <p className={styles.textStrong}>{data.vehicle_type}</p>
          <Flex gap={4}>
            <Col span={12}>
              <Text ellipsis>{data.brand}</Text>
            </Col>
            <Col span={2} style={{ display: "flex", justifyContent: "center" }}>
              <p color="black">•</p>
            </Col>
            <Col span={10}>
              <Text>{data.plate_number}</Text>
            </Col>
          </Flex>
        </Col>
        <Col span={2} style={{ display: "flex", justifyContent: "flex-end" }}>
          <Flex
            style={{
              backgroundColor: "#CBE71E",
              width: "24px",
              height: "24px",
              borderRadius: "4px"
            }}
            align="center"
            justify="center"
          >
            <Check size={20} color="white" />
          </Flex>
        </Col>
      </Flex>
    </Flex>
  );
}
export default VehicleRenderOption;
