import { DocumentClientBR } from "@/components/atoms/DocumentClientBR/DocumentClientBR";
import { SelectHoldingBR } from "@/components/molecules/selects/SelectHoldingBR/SelectHoldingBR";
import { SelectStructureBR } from "@/components/molecules/selects/SelectStructureBR/SelectStructureBR";
import { SelectZoneBR } from "@/components/molecules/selects/SelectZoneBR/SelectZoneBR";
import { Flex, Typography } from "antd";

const { Title } = Typography;

export const BusinessRulesView = () => {
  return (
    <Flex vertical>
      <Flex>
        <Title level={5}>Configurar reglas de negocio</Title>
      </Flex>
      <Flex style={{ paddingTop: "1rem" }} gap="2rem">
        <Flex style={{ width: "27%" }} vertical>
          <SelectZoneBR />
          <DocumentClientBR />
        </Flex>
        <Flex style={{ width: "38%" }}>
          <SelectStructureBR />
        </Flex>
        <Flex style={{ width: "27%" }}>
          <SelectHoldingBR />
        </Flex>
      </Flex>
    </Flex>
  );
};
