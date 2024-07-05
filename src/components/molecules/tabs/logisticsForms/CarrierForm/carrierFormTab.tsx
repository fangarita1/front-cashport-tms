import { useEffect, useState } from "react";
import { Button, ColorPicker, Flex, Select, Typography } from "antd";
import { Controller, useForm } from "react-hook-form";
import { ArrowsClockwise, CaretLeft, Pencil } from "phosphor-react";

import { ModalChangeStatus } from "@/components/molecules/modals/ModalChangeStatus/ModalChangeStatus";
import { IUpdateFormProject } from "@/types/projects/IUpdateFormProject";
import { UploadImg } from "@/components/atoms/UploadImg/UploadImg";

//interfaces
import { IProject } from "@/types/projects/IProject";
import { InputForm } from "@/components/atoms/inputs/InputForm/InputForm";

import "./carrierformtab.scss";
import { ModalBillingPeriod } from "@/components/molecules/modals/ModalBillingPeriod/ModalBillingPeriod";

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

export const CarrierInfoForm = ({
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
  const defaultValues = statusForm === "create" ? {} : dataToProjectFormData(data);
  const {
    watch,
    setValue,
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty }
  } = useForm<IUpdateFormProject>({
    defaultValues,
    disabled: statusForm === "review"
  });

  const generalDSOCurrentlyYear = watch("general.DSO_currenly_year");

  useEffect(() => {
    if (generalDSOCurrentlyYear === "Sí") {
      setValue("general.DSO_days", undefined);
    }
  }, [generalDSOCurrentlyYear, setValue]);

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
          <InputForm
              titleInput="NIT"
              nameInput="general.nit"
              control={control}
              error={errors.general?.nit}
            />
            <InputForm
              titleInput="Nombre"
              nameInput="general.name"
              control={control}
              error={errors.general?.name}
            />
            <InputForm
              titleInput="Tipo de Proveedor"
              nameInput="general.type"
              control={control}
              error={errors.general?.name}
            />
            <InputForm
              titleInput="Razon Social"
              nameInput="general.razon"
              control={control}
              error={errors.general?.address}
            />
            <InputForm
              titleInput="Correo de Facturación"
              nameInput="general.email"
              control={control}
              error={errors.general?.billing_period}
            />
            <InputForm
              titleInput="Correo de Comunicacion"
              nameInput="general.email2"
              control={control}
              error={errors.general?.billing_period}
            />

          </Flex>  
          <Flex component={"section"} className="generalProject" justify="flex-start">
          <Title className="title" level={4}>
            Documentos
          </Title>
          </Flex>
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
      <ModalBillingPeriod
        isOpen={isBillingPeriodOpen}
        setIsBillingPeriodOpen={setIsBillingPeriodOpen}
      />
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
const dataToProjectFormData = (data: IProject) => {
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
};
