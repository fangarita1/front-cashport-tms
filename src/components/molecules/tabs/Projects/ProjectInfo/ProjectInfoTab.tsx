import { Button, Flex, Typography } from "antd";
import { Info, Pencil } from "phosphor-react";

import "./projectinfotab.scss";

const { Title, Text } = Typography;

interface Props {
  onIsEditProject: () => void;
}

export const ProjectInfoTab = ({ onIsEditProject }: Props) => {
  return (
    <main className="mainProyectsDetails">
      <Flex vertical component={"section"}>
        <Flex component={"header"} className="headerProyectsForm" justify="space-between">
          <Flex align="center">
            <Info size={"1.8rem"} />
            <Title level={2} style={{ marginLeft: "1rem", marginBottom: "0" }}>
              Información del proyecto
            </Title>
          </Flex>
          <Button icon={<Pencil size="1.45rem" />} size="large" onClick={onIsEditProject} />
        </Flex>
        <Flex gap={"4rem"} component={"main"}>
          {/* -----------------------------------General--------------------------------------- */}
          <Flex component={"section"} vertical className="generalProject">
            <Title level={3}>General</Title>
            <Title level={4}>Nombre del Proyecto</Title>
            <Text>Cruz Verde</Text>
            <Title level={4}>NIT</Title>
            <Text>10122012334-5</Text>
            <Title level={4}>Divisas</Title>
            <Text>COP, USD , MXN</Text>
            <Title level={4}>Pais</Title>
            <Text>Locombia</Text>
            <Title level={4}>Direccion</Title>
            <Text>Avenida Calle 24 23-74, Ak 47</Text>
          </Flex>
          {/* -----------------------------------Contacto----------------------------------- */}
          <Flex component={"section"} vertical className="generalProject">
            <Title level={3}>Contacto</Title>
            <Title level={4}>Nombre</Title>
            <Text>Juan Perez</Text>
            <Title level={4}>Posicion</Title>
            <Text>Gerente</Text>
            <Title level={4}>Correo</Title>
            <Text>juanperez@cruzverde.com</Text>
            <Title level={4}>Telefono</Title>
            <Text>+57 601 4865000</Text>
          </Flex>
          {/* -----------------------------------Experiencia----------------------------------- */}
          <Flex component={"section"} vertical className="generalProject">
            <Title level={3}>Experiencia</Title>
            <Title level={4}>Color Indicativo</Title>
            <Text>#E5B632</Text>
            <Title level={4}>Descripcion</Title>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </main>
  );
};
