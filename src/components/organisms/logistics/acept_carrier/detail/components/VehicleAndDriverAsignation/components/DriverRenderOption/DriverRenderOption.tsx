import RadioButtonIcon from "@/components/atoms/RadioButton/RadioButton";
import { ICarrierRequestDrivers } from "@/types/logistics/schema";
import { Col, Flex, Typography } from "antd";
import { Check, Circle } from "phosphor-react";

interface IDriverOption {
  selectedDrivers: {
    driverId: number | null;
  }[];
  data: ICarrierRequestDrivers;
  index: number;
  selectIndex: number;
}
const { Text } = Typography;

function DriverRenderOption({
  selectedDrivers,
  data,
  index,
  selectIndex
}: Readonly<IDriverOption>) {
  return (
    <Flex vertical key={`driver-${data.id}-${index}`}>
      {index !== 0 && <hr style={{ borderTop: "1px solid #f7f7f7", margin: "0 0 0.5rem 0" }}></hr>}
      <Flex align="center" style={{ height: "1.5rem" }}>
        <Col
          span={2}
          style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}
        >
          {selectedDrivers[selectIndex].driverId == data.id ? (
            <RadioButtonIcon />
          ) : (
            <Circle size={20} />
          )}
        </Col>
        <Col span={20} style={{ padding: "0.25rem 0px" }}>
          <Flex gap={4}>
            <Col span={12}>
              <Text ellipsis>
                {data.name} {data.last_name}
              </Text>
            </Col>
            <Col span={2} style={{ display: "flex", justifyContent: "center" }}>
              <p color="black">•</p>
            </Col>
            <Col span={10}>
              <Text>{data.phone}</Text>
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
export default DriverRenderOption;
