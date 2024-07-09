import { useEffect, useState } from "react";
import { Button, ColorPicker, Flex, Select, Typography } from "antd";
import { Controller, useForm } from "react-hook-form";
import { ArrowsClockwise, CaretLeft, Pencil } from "phosphor-react";

// components
import { SelectCountries } from "@/components/molecules/selects/SelectCountries/SelectCountries";
import { SelectCurrencies } from "@/components/molecules/selects/SelectCurrencies/SelectCurrencies";
import { ModalChangeStatus } from "@/components/molecules/modals/ModalChangeStatus/ModalChangeStatus";
import { UploadImg } from "@/components/atoms/UploadImg/UploadImg";

//interfaces
import { IProject } from "@/types/projects/IProject";
import { InputForm } from "@/components/atoms/inputs/InputForm/InputForm";

import "./vehicleformtab.scss";
import { ModalBillingPeriod } from "@/components/molecules/modals/ModalBillingPeriod/ModalBillingPeriod";
import { IFormVehicle } from "@/types/logistics/schema";

const { Title, Text } = Typography;
const { Option } = Select;

interface Props {
  idProjectForm?: string;
  data?: IProject;
  disabled?: boolean;
  // eslint-disable-next-line no-unused-vars
  onEditProject?: () => void;
  // eslint-disable-next-line no-unused-vars
  onSubmitForm?: (data: any) => void;
  onActiveProject?: () => void;
  onDesactivateProject?: () => void;
  statusForm: "create" | "edit" | "review";
}

export const VehicleInfoForm = ({
  onEditProject = () => {},
  onSubmitForm = () => {},
  statusForm = "review",
  data = {} as IProject,
  onActiveProject = () => {},
  onDesactivateProject = () => {}
}: Props) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isBillingPeriodOpen, setIsBillingPeriodOpen] = useState(false);
  const [imageFile, setImageFile] = useState(data.LOGO);
  const [imageError, setImageError] = useState(false);
  const defaultValues = statusForm === "create" ? {} : true;
  const {
    watch,
    setValue,
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty }
  } = useForm<IFormVehicle>({
    defaultValues,
    disabled: statusForm === "review"
  });

  const validationButtonText =
    statusForm === "create"
      ? "Crear nuevo proyecto"
      : statusForm === "edit"
        ? "Guardar Cambios"
        : "Editar Proyecto";

  const onSubmit = (data: any) => {
    if (!imageFile) return setImageError(true);
    setImageError(false);
    onSubmitForm({ ...data, logo: imageFile });
    reset(data);
  };

  return (
    <>
      <form className="mainProyectsForm" onSubmit={handleSubmit(onSubmit)}>
        <Flex component={"header"} className="headerProyectsForm">
          <Flex gap={"1rem"}>
            {(statusForm === "review" || statusForm === "edit") && (
              <Button
                className="buttons"
                htmlType="button"
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpenModal(true);
                }}
              >
                Cambiar Estado
                <ArrowsClockwise size={"1.2rem"} />
              </Button>
            )}
            {statusForm === "review" ? (
              <Button
                className="buttons"
                htmlType="button"
                onClick={(e) => {
                  e.preventDefault();
                  onEditProject();
                }}
              >
                {validationButtonText}
                <Pencil size={"1.2rem"} />
              </Button>
            ) : (
              ""
            )}
          </Flex>
        </Flex>
        <Flex component={"main"} flex="3" vertical>
          <Title className="title" level={4}>
            Logo
          </Title>
          {/* ------------Image Project-------------- */}
          <UploadImg
            disabled={statusForm === "review"}
            imgDefault={data.LOGO}
            setImgFile={setImageFile}
          />
          <Title className="title" level={4}>
            Informacion General
          </Title>
          <Flex component={"section"} className="generalProject" justify="flex-start">
            <Flex vertical className="containerInput">
              <Title className="title" level={5}>
                Tipo de Vehiculo
              </Title>
              <Controller
                name="general.currencies"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <SelectCurrencies errors={errors} field={field} />}
              />
              <Text className="textError">
                {errors?.general?.currencies && "Divisa es obligatorio *"}
              </Text>
            </Flex>
            <InputForm
              titleInput="Placa"
              nameInput="general.placa"
              control={control}
              error={errors.general?.nit}
            />
            <Flex vertical className="containerInput">
              <Title className="title" level={5}>
                Marca
              </Title>
              <Controller
                name="general.currencies"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <SelectCurrencies errors={errors} field={field} />}
              />
              <Text className="textError">
                {errors?.general?.currencies && "Divisa es obligatorio *"}
              </Text>
            </Flex>
            <Flex vertical className="containerInput">
              <Title className="title" level={5}>
                Modelo
              </Title>
              <Controller
                name="general.currencies"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <SelectCurrencies errors={errors} field={field} />}
              />
              <Text className="textError">
                {errors?.general?.currencies && "Divisa es obligatorio *"}
              </Text>
            </Flex>
            <InputForm
              titleInput="Linea"
              nameInput="general.linea"
              control={control}
              error={errors.general?.address}
            />
            <Flex vertical className="containerInput">
              <Title className="title" level={5}>
                Año
              </Title>
              <Controller
                name="general.DSO_currenly_year"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <SelectCurrencies errors={errors} field={field} />}
              />
              <Text className="textError">
                {errors?.general?.currencies && "Divisa es obligatorio *"}
              </Text>
            </Flex>
            <InputForm
              titleInput="Color"
              nameInput="general.color"
              control={control}
              error={errors.general?.billing_period}
            />
            <Flex vertical className="containerInput">
              <Title className="title" level={5}>
                Ciudad
              </Title>
              <Controller
                name="general.country"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <SelectCurrencies errors={errors} field={field} />}
              />
              <Text className="textError">
                {errors?.general?.currencies && "Divisa es obligatorio *"}
              </Text>
            </Flex>
          </Flex>
          <Title className="title" level={4}>
            Informacion Adicional
          </Title>
          <InputForm
            placeholder="Escribir información adicional"
            titleInput=""
            nameInput="general.color"
            control={control}
            error={errors.general?.billing_period}
          />
          <Title className="title" level={4}>
            Documentos
          </Title>
          <Flex className="buttonNewProject">
            {statusForm === "edit" && (
              <Button
                disabled={!isDirty}
                className={`button ${isDirty ? "active" : ""}`}
                style={{ display: "flex" }}
                htmlType={"submit"}
              >
                {validationButtonText}
              </Button>
            )}
          </Flex>
        </Flex>
      </form>
      <ModalChangeStatus
        isActiveStatus={data?.IS_ACTIVE!}
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        onActive={onActiveProject}
        onDesactivate={onDesactivateProject}
      />
    </>
  );
};
/*const dataToProjectFormData = (data: IProject) => {
  const currenciesFormated = data?.CURRENCY?.map(
    (currency) => `${currency.id}-${currency.CURRENCY_NAME ?? currency.currency_name}`
  );

  return {
    general: {
      name: data.PROJECT_DESCRIPTION,
      nit: data.NIT,
      currencies: currenciesFormated,
      country: `${data.COUNTRY_ID}-${data.COUNTRY_NAME}`,
      address: data.ADDRESS,
      billing_period: data.BILLING_PERIOD,
      description: data.PROJECT_DESCRIPTION,
      DSO_currenly_year: data.DSO_CURRENLY_YEAR === 0 ? "No" : "Sí",
      DSO_days: data.DSO_DAYS,
      accept_date: data?.ACCEPT_DATE === 0 ? "Fecha de emisión" : "Fecha de aceptación"
    },
    contact: {
      name: data.CONTACT,
      position: "",
      email: data.EMAIL,
      phone: data.PHONE
    },
    personalization: {
      color: data.RGB_CONFIG
    }
  };
};*/
