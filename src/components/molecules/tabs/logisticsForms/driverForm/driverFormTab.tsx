import { SetStateAction, useEffect, useState } from "react";
import { Button, Col, ColorPicker, Flex, Row, Select, Typography } from "antd";
import { Controller, useForm } from "react-hook-form";
import { ArrowsClockwise, CaretLeft, Pencil } from "phosphor-react";

// components
import { SelectCountries } from "@/components/molecules/selects/SelectCountries/SelectCountries";
import { SelectCurrencies } from "@/components/molecules/selects/SelectCurrencies/SelectCurrencies";
import { ModalChangeStatus } from "@/components/molecules/modals/ModalChangeStatus/ModalChangeStatus";
import { IUpdateFormProject } from "@/types/projects/IUpdateFormProject";
import { UploadImg } from "@/components/atoms/UploadImg/UploadImg";

//interfaces
import { IProject } from "@/types/projects/IProject";
import { InputForm } from "@/components/atoms/inputs/InputForm/InputForm";

import "./driverformtab.scss";
import { ModalBillingPeriod } from "@/components/molecules/modals/ModalBillingPeriod/ModalBillingPeriod";
import { IDriver } from "@/types/logistics/schema";
import { IBillingPeriodForm } from "@/types/billingPeriod/IBillingPeriod";
import { dataToProjectFormData } from "./driverFormTab.mapper";
import { SelectRh } from "@/components/molecules/selects/SelectRh/SelectRh";
import { InputDateForm } from "@/components/atoms/inputs/InputDate/InputDateForm";
import { SelectDocument } from "@/components/molecules/selects/SelectDocument/SelectDocument";

const { Title, Text } = Typography;
const { Option } = Select;

interface Props {
  idProjectForm?: string;
  data?: IDriver[];
  disabled?: boolean;
  // eslint-disable-next-line no-unused-vars
  onEditProject?: () => void;
  // eslint-disable-next-line no-unused-vars
  onSubmitForm?: (data: any) => void;
  onActiveProject?: () => void;
  onDesactivateProject?: () => void;
  statusForm: "create" | "edit" | "review";
}

export const DriverInfoForm = ({ statusForm = "review", data = [] as IDriver[] }: Props) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isBillingPeriodOpen, setIsBillingPeriodOpen] = useState(false);
  const [imageFile, setImageFile] = useState(data);
  const [imageError, setImageError] = useState(false);
  const defaultValues = statusForm === "create" ? {} : dataToProjectFormData(data[0]);
  const {
    setValue,
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty }
  } = useForm<IUpdateFormProject>({
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
    onSubmit({ ...data, logo: imageFile });
    reset(data);
  };

  return (
    <>
      <form className="mainProyectsForm" onSubmit={handleSubmit(onSubmit)}>
        <Flex component={"main"} flex="3" vertical>
          <Row style={{ width: "100%" }}>
            <Col>
              <Title className="title" level={4}>
                Logo
              </Title>
              {/* ------------Image Project-------------- */}
              <UploadImg
                disabled={statusForm === "review"}
                imgDefault={data.document}
                setImgFile={setImageFile}
              />
            </Col>
            <Col>
              <Title className="title" level={4}>
                Informacion General
              </Title>
              <Flex component={"section"} className="generalProject" justify="flex-start">
                <InputForm
                  titleInput="Nombres"
                  value={data[0].name}
                  nameInput="general.name"
                  control={control}
                  error={undefined}
                />
                <InputForm
                  titleInput="Apellidos"
                  value={data[0].last_name}
                  nameInput="general.lastname"
                  control={control}
                  error={undefined}
                />
                <Flex vertical className="containerInput">
                  <Title className="title" level={5}>
                    Tipo de Sangre
                  </Title>
                  <Controller
                    name="Tipo de Sangre"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <SelectRh selected={data[0].rh} errors={errors} field={field} />
                    )}
                  />
                </Flex>
                <Flex vertical className="containerInput">
                  <InputDateForm
                    titleInput="Fecha de nacimiento"
                    nameInput="birth_date"
                    placeholder="Seleccionar fecha de nacimiento"
                    control={control}
                    error={undefined}
                    value={new Date(data[0].birth_date).toISOString()}
                  />
                  <Text className="textError">error={undefined}</Text>
                </Flex>
                <Flex vertical className="containerInput">
                  <Title className="title" level={5}>
                    Tipo de documento
                  </Title>
                  <Controller
                    name="Tipo de documento"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <SelectDocument selected={data[0].document_type} errors={errors} field={field} />
                    )}
                  />
                </Flex>
                <InputForm
                  titleInput="Linea"
                  nameInput="general.linea"
                  control={control}
                  error={undefined}
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
                  <Text className="textError">error={undefined}</Text>
                </Flex>
                <InputForm
                  titleInput="Color"
                  nameInput="general.color"
                  control={control}
                  error={undefined}
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
                  <Text className="textError">{"Divisa es obligatorio *"}</Text>
                </Flex>
              </Flex>
            </Col>
          </Row>
          <Title className="title" level={4}>
            Informacion Adicional
          </Title>
          <InputForm
            placeholder="Escribir información adicional"
            titleInput=""
            nameInput="general.color"
            control={control}
            error={undefined}
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
      <ModalBillingPeriod
        isOpen={isBillingPeriodOpen}
        setIsBillingPeriodOpen={setIsBillingPeriodOpen}
        billingPeriod={undefined}
        setBillingPeriod={function (value: SetStateAction<IBillingPeriodForm | undefined>): void {
          throw new Error("Function not implemented.");
        }}
      />
      <ModalChangeStatus
        isActiveStatus={data?.active!}
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        onActive={function (): void {
          throw new Error("Function not implemented.");
        }}
        onDesactivate={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </>
  );
};
