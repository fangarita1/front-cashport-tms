import { Dispatch, SetStateAction, useState } from "react";
import { Button, Flex, Typography, message } from "antd";
import { Controller, useForm } from "react-hook-form";
import { CaretLeft, Pencil, Trash } from "phosphor-react";

import { SelectRoles } from "@/components/atoms/SelectRoles/SelectRoles";
import { SelectZone } from "@/components/atoms/SelectZone/SelectZone";
import { SelectStructure } from "@/components/molecules/selects/SelectStructure/SelectStructure";
import { InputForm } from "@/components/atoms/InputForm/InputForm";
import { useAppStore } from "@/lib/store/store";
import { inviteUser } from "@/services/users/users";

import "./userprojectform.scss";

const { Title } = Typography;

export type UserType = {
  info: {
    name: string;
    cargo: string;
    email: string;
    phone: string;
    rol: string;
  };
};

interface Props {
  isViewDetailsUser?: boolean;
  onGoBackTable: () => void;
  setIsCreateUser: Dispatch<SetStateAction<boolean>>;
}
export const UserProjectForm = ({
  isViewDetailsUser = false,
  onGoBackTable,
  setIsCreateUser
}: Props) => {
  const [isEditAvailable, setIsEditAvailable] = useState(isViewDetailsUser);
  const { ID } = useAppStore((state) => state.selectProject);
  const [messageApi, contextHolder] = message.useMessage();

  const [zones, setZones] = useState([] as number[]);
  const [selectedSublines, setSelectedSublines] = useState<
    { idChannel: number; idLine: number; subline: { id: number; description: string } }[]
  >([]);
  const [customFieldsError, setCustomFieldsError] = useState({
    zone: false,
    channel: false
  });

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<UserType>({
    defaultValues: isViewDetailsUser ? initialDataDummy : initialData,
    disabled: isEditAvailable
  });
  const onSubmitHandler = async (data: UserType) => {
    setCustomFieldsError({
      zone: !!(zones.length === 0),
      channel: !!(selectedSublines.length === 0)
    });
    if (customFieldsError.zone || customFieldsError.channel) return;
    const selectedChannel = selectedSublines.map((bre) => bre.idChannel);
    const selectedLines = selectedSublines.map((bre) => bre.idLine);
    const _selectedSublines = selectedSublines.map((bre) => bre.subline.id);
    const rol = data.info.rol.split("-")[0];

    const modelData = {
      email: data.info.email,
      user_name: data.info.name,
      channel: selectedChannel,
      line: selectedLines,
      subline: _selectedSublines,
      zone: zones,
      password: "Pruebas12345.",
      phone: data.info.phone,
      position: data.info.cargo,
      project_id: ID,
      rol_id: rol
    };
    try {
      const response = await inviteUser(modelData);
      if (response.status === 200) {
        messageApi.open({
          type: "success",
          content: "El usuario fue creado exitosamente."
        });
        setIsCreateUser(false);
      } else if (response.status === 409) {
        messageApi.open({
          type: "success",
          content: "Este emaiil esta en uso, prueba otro."
        });
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Oops, no se pudo crear el usuario, intentalo mas tarde!"
      });
    }
  };
  console.log(customFieldsError);
  console.log(errors);

  return (
    <>
      {contextHolder}
      <form className="newUserProjectForm" onSubmit={handleSubmit(onSubmitHandler)}>
        <Flex vertical style={{ height: "100%" }}>
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
            {!isViewDetailsUser && (
              <Flex component={"footer"} className="footerNewUser" justify="flex-end">
                <Flex gap={"1rem"}>
                  {/* <Button className="buttonOutlined" icon={<ArrowLineDown size="1.3rem" />} size="large">
              Descargar Plantilla
            </Button>
            <Button className="buttonOutlined" icon={<ArrowLineUp size="1.3rem" />} size="large">
              Cargar Excel
            </Button> */}
                  <Button size="large" type="primary" className="buttonAction" htmlType="submit">
                    Registrar Usuario
                  </Button>
                </Flex>
              </Flex>
            )}
          </Flex>
          <Flex vertical component={"main"} className="mainUserForm">
            <Title level={4}>Información del usuario</Title>
            {/* -----------------------------------Informacion del Usuario--------------------------------------- */}
            <Flex component={"section"} className="generalProject">
              <InputForm
                titleInput="Nombre del Contacto"
                control={control}
                nameInput="info.name"
                error={errors.info?.name}
              />
              <InputForm
                titleInput="Cargo"
                control={control}
                nameInput="info.cargo"
                error={errors.info?.cargo}
              />
              <InputForm
                typeInput="email"
                titleInput="Correo electrónico"
                control={control}
                nameInput="info.email"
                error={errors.info?.email}
              />
              <InputForm
                typeInput="phone"
                titleInput="Telefono"
                control={control}
                nameInput="info.phone"
                error={errors.info?.phone}
              />
              <Flex vertical className="containerInput">
                <Title level={5}>Rol</Title>
                <Controller
                  name="info.rol"
                  control={control}
                  rules={{ required: true, minLength: 1 }}
                  render={({ field }) => <SelectRoles errors={errors.info?.rol} field={field} />}
                />
              </Flex>
            </Flex>
            {/* -----------------------------------Experiencia----------------------------------- */}
            <Title level={4}>Reglas de Proyecto</Title>
            <Flex component={"section"} gap={"1rem"} className="breRules">
              <Flex vertical style={{ width: "20%" }}>
                <SelectZone zones={zones} setZones={setZones} />
                <Typography.Text className="textError">
                  {customFieldsError.zone && `La Zona es obligatorio *`}
                </Typography.Text>
              </Flex>
              <Flex vertical style={{ width: "80%" }}>
                <SelectStructure
                  selectedSublines={selectedSublines}
                  setSelectedSublines={setSelectedSublines}
                />
                <Typography.Text className="textError">
                  {customFieldsError.channel && `Las Reglas de negocio  es obligatorio *`}
                </Typography.Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </form>
    </>
  );
};

const initialData: UserType = {
  info: {
    name: "",
    rol: "",
    cargo: "",
    email: "",
    phone: ""
  }
  // contact: {
  //   responsibility: [],
  //   zone: [],
  //   channel: [],
  //   line: []
  // }
};
const initialDataDummy: UserType = {
  info: {
    name: "Falcao Garcia",
    rol: "Capitan",
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
