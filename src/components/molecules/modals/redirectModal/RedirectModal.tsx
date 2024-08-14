import PrincipalButton from "@/components/atoms/buttons/principalButton/PrincipalButton";
import { Typography, Modal, Flex } from "antd";
const { Text } = Typography;

export default function redirectModal() {
  Modal.warning({
    title: "No tienes ningún proyecto seleccionado",
    content: <Text>Por favor, selecciona un proyecto para continuar.</Text>,
    footer: [
      <Flex gap={"1rem"} justify="end" wrap="wrap" key="1">
        <PrincipalButton onClick={() => Modal.destroyAll()}>Entendido</PrincipalButton>
      </Flex>
    ]
  });
}
