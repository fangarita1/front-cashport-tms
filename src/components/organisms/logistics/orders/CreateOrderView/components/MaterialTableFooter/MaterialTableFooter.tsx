import { IMaterial } from "@/types/logistics/schema";
import { formatNumber } from "@/utils/utils";
import { Col, Divider, Flex, Row, Space, Typography } from "antd";
import styles from "./MaterialTablleFooter.module.scss";
const { Text } = Typography;
interface IMaterialTableFooter {
  dataCarga: IMaterial[];
}
const MaterialTableFooter = ({ dataCarga }: IMaterialTableFooter) => {
  const totalVolume = dataCarga.reduce(
    (sum, material) => sum + material.m3_volume * material.quantity,
    0
  );
  const formatedTotalVolume = formatNumber(totalVolume);

  const totalWeight = dataCarga.reduce(
    (sum, material) => sum + material.kg_weight * material.quantity,
    0
  );
  const formatedTotalWeight = formatNumber(totalWeight);

  return (
    <Flex align="center" justify="flex-end">
      <Row style={{ width: "100%" }}>
        <Col span={16} />
        <Col span={8} style={{ background: "#F7F7F7", padding: 16 }}>
          <Flex align="center" justify="space-around">
            <Flex>
              <Space>
                <Text>Volumen total</Text>
                <Text className={styles.textFooter}>{formatedTotalVolume} m3</Text>
              </Space>
            </Flex>
            <Divider type="vertical" style={{ border: "1px solid #DDDDDD", fontSize: 24 }} />
            <Flex>
              <Space>
                <Text>Peso total</Text>
                <Text className={styles.textFooter}>{formatedTotalWeight} kg</Text>
              </Space>
            </Flex>
          </Flex>
        </Col>
      </Row>
    </Flex>
  );
};

export default MaterialTableFooter;
