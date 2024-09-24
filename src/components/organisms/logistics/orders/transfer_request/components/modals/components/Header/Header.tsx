import { Typography } from "antd";

const { Title, Text } = Typography;

export const Header = () => (
  <>
    <Title level={4}>Proveedores</Title>
    <Text style={{ fontSize: "0.8rem" }}>
      Seleccione los proveedores a los que les enviará la solicitud de los viajes creados
    </Text>
  </>
);
