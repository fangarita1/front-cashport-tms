import { useState } from "react";
import { Button, Flex, Input, Typography } from "antd";
import { Controller, useForm } from "react-hook-form";
import { ArrowLineDown, ArrowLineUp, CaretLeft, Pencil, Trash } from "phosphor-react";
import { SelectRoles } from "@/components/atoms/SelectRoles/SelectRoles";
import { SelectZone } from "@/components/atoms/SelectZone/SelectZone";

import "./userprojectform.scss";
import { SelectStructure } from "@/components/molecules/selects/SelectStructure/SelectStructure";

const { Title } = Typography;

type UserType = {
  info: {
    name: string;
    cargo: string;
    email: string;
    phone: string;
    rol: string[];
  };
  contact: {
    responsibility: string[];
    zone: string[];
    channel: string[];
    line: string[];
  };
};

interface Props {
  isViewDetailsUser?: boolean;
  onGoBackTable: () => void;
}
export const UserProjectForm = ({ isViewDetailsUser = false, onGoBackTable }: Props) => {
  const [isEditAvailable, setIsEditAvailable] = useState(isViewDetailsUser);
  const {
    control,
    formState: { errors }
  } = useForm<UserType>({
    defaultValues: isViewDetailsUser ? initialDataDummy : initialData,
    disabled: isEditAvailable
  });
  return (
    <main className="newUserProjectForm">
      <Flex vertical style={{ height: "60%" }}>
        <Flex component={"header"} className="headerNewUserProyectsForm">
          {/* -------------------left buttons------------------------ */}
          <Button
            type="text"
            size="large"
            onClick={onGoBackTable}
            className="buttonGoBack"
            icon={<CaretLeft size={"1.45rem"} />}
          >
            Ver Usuarios
          </Button>
          {/* -----------right buttons--------------- */}
          {isViewDetailsUser && (
            <Flex gap={"1rem"}>
              <Button size="large" className="buttonOutlined" icon={<Trash size={"1.45rem"} />}>
                Eliminar Usuario
              </Button>

              <Button
                size="large"
                onClick={() => setIsEditAvailable(false)}
                className="buttonOutlined"
                icon={<Pencil size={"1.45rem"} />}
              >
                Editar Usuario
              </Button>
            </Flex>
          )}
        </Flex>
        <Flex vertical component={"main"} style={{ border: "1px solid red", height: "100%" }}>
          <Title level={4}>Información del usuario</Title>
          {/* -----------------------------------Informacion del Usuario--------------------------------------- */}
          <Flex component={"section"} className="generalProject">
            <Flex vertical className="containerInput">
              <Title level={5}>Nombre del contacto</Title>
              <Controller
                name="info.name"
                control={control}
                render={({ field }) => (
                  <Input
                    className="input"
                    variant="borderless"
                    placeholder="Color Indicativo"
                    {...field}
                  />
                )}
              />
            </Flex>
            <Flex vertical className="containerInput">
              <Title level={5}>Cargo</Title>
              <Controller
                name="info.cargo"
                control={control}
                render={({ field }) => (
                  <Input className="input" variant="borderless" placeholder="Cargo" {...field} />
                )}
              />
            </Flex>
            <Flex vertical className="containerInput">
              <Title level={5}>Correo electrónico</Title>
              <Controller
                name="info.email"
                control={control}
                render={({ field }) => (
                  <Input className="input" variant="borderless" placeholder="Email" {...field} />
                )}
              />
            </Flex>
            <Flex vertical className="containerInput">
              <Title level={5}>Telefono</Title>
              <Controller
                name="info.phone"
                control={control}
                render={({ field }) => (
                  <Input className="input" variant="borderless" placeholder="Telefono" {...field} />
                )}
              />
            </Flex>
            <Flex vertical className="containerInput">
              <Title level={5}>Rol</Title>
              <Controller
                name="info.rol"
                control={control}
                render={({ field }) => <SelectRoles errors={errors.info?.rol} field={field} />}
              />
            </Flex>
          </Flex>
          {/* -----------------------------------Experiencia----------------------------------- */}
          <Title level={4}>Reglas de Proyecto</Title>
          <Flex component={"section"} gap={"1rem"} className="breRules">
            <SelectZone />
            <SelectStructure />
          </Flex>
        </Flex>
      </Flex>
      {!isViewDetailsUser && (
        <Flex component={"footer"} className="footerNewUser" justify="flex-end">
          <Flex gap={"1rem"}>
            <Button className="buttonOutlined" icon={<ArrowLineDown size="1.3rem" />} size="large">
              Descargar Plantilla
            </Button>
            <Button className="buttonOutlined" icon={<ArrowLineUp size="1.3rem" />} size="large">
              Cargar Excel
            </Button>
            <Button size="large" type="primary" className="buttonAction" onClick={() => {}}>
              Registrar Usuario
            </Button>
          </Flex>
        </Flex>
      )}
    </main>
  );
};

const initialData: UserType = {
  info: {
    name: "",
    rol: [],
    cargo: "",
    email: "",
    phone: ""
  },
  contact: {
    responsibility: [],
    zone: [],
    channel: [],
    line: []
  }
};
const initialDataDummy: UserType = {
  info: {
    name: "Falcao Garcia",
    rol: ["Capitan"],
    cargo: "Delantero",
    email: "falkao@gmail.com",
    phone: "(+57) 123 456 789"
  },
  contact: {
    responsibility: ["goles"],
    zone: ["europe"],
    channel: ["caracol"],
    line: ["si"]
  }
};
