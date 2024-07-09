import { useEffect, useState } from "react";
import { Button, Col, ColorPicker, Flex, Input, Select, Typography } from "antd";
import { Controller, useForm } from "react-hook-form";
import { ArrowsClockwise, CaretLeft, CaretRight, Pencil } from "phosphor-react";

// components
import { SelectCountries } from "@/components/molecules/selects/SelectCountries/SelectCountries";
import { SelectCurrencies } from "@/components/molecules/selects/SelectCurrencies/SelectCurrencies";
import { ModalChangeStatus } from "@/components/molecules/modals/ModalChangeStatus/ModalChangeStatus";
import { IFormProject } from "@/types/projects/IFormProject";
import { UploadImg } from "@/components/atoms/UploadImg/UploadImg";

import { InputForm } from "@/components/atoms/inputs/InputForm/InputForm";

import "./driverformtab.scss";
import { IBillingPeriodForm } from "@/types/billingPeriod/IBillingPeriod";
import {
  _onSubmit,
  dataToProjectFormData,
  validationButtonText,
  DriverFormTabProps
} from "./driverformtab.mapper";
import { IDriver, IFormDriver } from "@/types/logistics/schema";
import { InputDateForm } from "@/components/atoms/inputs/InputDate/InputDateForm";
import { SelectDocument } from "@/components/molecules/logistics/SelectDocument/SelectDocument";
import { SelectRh } from "@/components/molecules/logistics/SelectRh/SelectRh";
import { SelectGlasses } from "@/components/molecules/logistics/SelectGlasses/SelectGlasses";

const { Title, Text } = Typography;
const { Option } = Select;

export const DriverFormTab = ({
  onEditProject = () => {},
  onSubmitForm = () => {},
  statusForm = "review",
  data = [] as IDriver[],
  onActiveProject = () => {},
  onDesactivateProject = () => {}
}: DriverFormTabProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isBillingPeriodOpen, setIsBillingPeriodOpen] = useState(false);
  const [imageFile, setImageFile] = useState('');
  const [loading, setloading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState<IBillingPeriodForm | undefined>();
  const defaultValues = statusForm === "create" ? {} : dataToProjectFormData(data[0]);
    const {
    watch,
    setValue,
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty }
  } = useForm<IFormDriver>({
    defaultValues,
    disabled: statusForm === "review"
  });

  const onSubmit = (data: any) =>
    _onSubmit(data, setloading, setImageError, imageFile, onSubmitForm, reset);
  console.log(data[0].birth_date)
  return (
    <>
      <form className="mainProyectsForm" onSubmit={handleSubmit(onSubmit)}>
        <Flex component={"header"} className="headerProyectsForm">
          <Button
            type="text"
            size="large"
            href="/logistics/providers/all"
            className="buttonGoBack"
            icon={<CaretLeft size={"1.45rem"} />}
          >
            Ver Conductores
          </Button>
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
                className="buttons -edit"
                htmlType="button"
                onClick={(e) => {
                  e.preventDefault();
                  onEditProject();
                }}
              >
                {validationButtonText(statusForm)}
                <Pencil size={"1.2rem"} />
              </Button>
            ) : (
              ""
            )}
          </Flex>
        </Flex>
        <Flex component={"main"} flex="1" vertical>
          {/* ------------Image Project-------------- */}
          <UploadImg
            disabled={statusForm === "review"}
            imgDefault={"https://www.google.com/url?sa=i&url=https%3A%2F%2Ficon-icons.com%2Fes%2Ficono%2Fsistema-usuarios-usuario%2F104569&psig=AOvVaw3556LaiR41fV6eVL7vnkqN&ust=1720623960292000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLDAnvWdmocDFQAAAAAdAAAAABAE"}
            setImgFile={setImageFile}
          />
          {imageError && <Text className="textError">{"Logo del proyecto es obligatorio *"}</Text>}
          {/* -----------------------------------General--------------------------------------- */}
          <Col>
              <Title className="title" level={4}>
                Informacion General
              </Title>
              <Flex component={"section"} className="generalProject" justify="flex-start">
                <InputForm
                  titleInput="Nombres"
                  nameInput="general.name"
                  control={control}
                  error={undefined}
                />
                <InputForm
                  titleInput="Apellidos"
                  nameInput="general.last_name"
                  control={control}
                  error={undefined}
                />
                <Flex vertical className="containerInput">
                  <Title className="title" level={5}>
                    Tipo de Sangre
                  </Title>
                  <Controller
                    name="general.rh"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <SelectRh errors={errors} field={field} />
                    )}
                  />
                </Flex>
                <Flex vertical className="containerInput">
                  <InputDateForm
                    titleInput="Fecha de nacimiento"
                    nameInput="general.birth_date"
                    placeholder="Seleccionar fecha de nacimiento"
                    control={control}
                    error={undefined}
                  />
                </Flex>
                <Flex vertical className="containerInput">
                  <Title className="title" level={5}>
                    Tipo de documento
                  </Title>
                  <Controller
                    name="general.document_type"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <SelectDocument errors={errors} field={field} />
                    )}
                  />
                </Flex>
                <InputForm
                  titleInput="Numero de documento"
                  nameInput="general.document"
                  control={control}
                  error={undefined}
                />
                <InputForm
                  titleInput="Telefono"
                  nameInput="general.phone"
                  control={control}
                  error={undefined}
                />
                <InputForm
                  titleInput="Correo"
                  nameInput="general.email"
                  control={control}
                  error={undefined}
                />
                <Flex vertical className="containerInput">
                  <Title className="title" level={5}>
                    Usas lentes
                  </Title>
                  <Controller
                    name="general.glasses"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <SelectGlasses errors={errors} field={field} />
                    )}
                  />
                </Flex>
                </Flex>
          </Col>
          <Title className="title" level={4}>
            Informacion General
          </Title>
          <Flex component={"section"} className="generalProject" justify="flex-start">
            <InputForm
              titleInput="Nombre del Proyecto"
              nameInput="general.name"
              control={control}
              error={errors.general?.name}
            />
            <InputForm
              titleInput="NIT"
              nameInput="general.document"
              control={control}
              error={errors.general?.document}
            />
            <Flex vertical className="containerInput">
              <Title className="title" level={5}>
                Divisas
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
                País
              </Title>
              <Controller
                name="general.country"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <SelectCountries errors={errors} field={field} />}
              />
              <Text className="textError">
                {errors?.general?.country && "Pais es obligatorio *"}
              </Text>
            </Flex>
            <InputForm
              titleInput="Direccion"
              nameInput="general.address"
              control={control}
              error={errors.general?.address}
            />

            <Flex vertical className="containerInput">
              <Title className="title" level={5}>
                Fecha de vigencia de factura
              </Title>
              <Controller
                name="general.accept_date"
                control={control}
                rules={{ required: true }}
                render={({ field }) => {
                  return (
                    <Select
                      placeholder="Fecha de aceptación"
                      className={errors?.general?.birth_date ? "selectInputError" : "selectInput"}
                      loading={false}
                      variant="borderless"
                      optionLabelProp="label"
                      {...field}
                    >
                      <Option value={`Fecha de aceptación`} key={1}>
                        Fecha de aceptación
                      </Option>
                      <Option value={`Fecha de emisión`} key={2}>
                        Fecha de emisión
                      </Option>
                    </Select>
                  );
                }}
              />
              <Text className="textError">
                {errors?.general?.accept_date && "Campo obligatorio *"}
              </Text>
            </Flex>
            <Flex vertical className="containerInput">
              <Title className="title" level={5}>
                DSO - Calculo solo del año actual
              </Title>
              <Controller
                name="general.DSO_currenly_year"
                control={control}
                rules={{ required: true }}
                render={({ field }) => {
                  return (
                    <Select
                      placeholder="Si | No"
                      className={
                        errors?.general?.DSO_currenly_year ? "selectInputError" : "selectInput"
                      }
                      loading={false}
                      variant="borderless"
                      optionLabelProp="label"
                      {...field}
                    >
                      <Option value={`Sí`} key={1}>
                        {`Sí`}
                      </Option>
                      <Option value={`No`} key={2}>
                        {`No`}
                      </Option>
                    </Select>
                  );
                }}
              />
              <Text className="textError">
                {errors?.general?.DSO_currenly_year && "Campo obligatorio *"}
              </Text>
            </Flex>
          </Flex>

          {/* -----------------------------------Contact----------------------------------- */}
          <Title className="title" level={4}>
            Informacion de Contacto
          </Title>
          <Flex component={"section"} className="generalProject" justify="flex-start">
            <InputForm
              titleInput="Nombre"
              nameInput="contact.name"
              control={control}
              error={errors.contact?.name}
            />
            <InputForm
              typeInput="cargo"
              titleInput="Cargo"
              nameInput="contact.position_contact"
              control={control}
              error={errors.contact?.position_contact}
            />
            <InputForm
              typeInput="email"
              titleInput="Correo"
              nameInput="contact.email"
              control={control}
              error={errors.contact?.email}
            />
            <InputForm
              typeInput="tel"
              titleInput="Telefono"
              nameInput="contact.phone"
              control={control}
              error={errors.contact?.phone}
              validationRules={{
                pattern: {
                  value: /^\+?\d+$/,
                  message: "Solo se permiten números y un signo '+' al comienzo"
                }
              }}
            />
          </Flex>
          {/* -----------------------------------Project Config----------------------------------- */}
          <Title className="title" level={4}>
            Personalizar Proyecto
          </Title>
          <Flex component={"section"} className="generalProject" justify="flex-start">
            <Flex vertical className="containerInput">
              <Title className="title" level={5}>
                Color Personalizado
              </Title>
              <Controller
                name="personalization.color"
                rules={{ required: true, maxLength: 123 }}
                control={control}
                render={({ field }) => <ColorPicker format="rgb" showText {...field} />}
              />
              <Text className="textError">
                {errors?.personalization?.color && "Color Personalizado es obligatorio *"}
              </Text>
            </Flex>
            <InputForm
              typeInput="personalization.description"
              titleInput="Descripción"
              nameInput="personalization.description"
              className="description"
              control={control}
              error={errors.personalization?.description}
            />
          </Flex>
          <Flex className="buttonNewProject">
            {["edit", "create"].includes(statusForm) && (
              <Button
                disabled={!isDirty}
                className={`button ${isDirty ? "active" : ""}`}
                style={{ display: "flex" }}
                htmlType={"submit"}
              >
                {validationButtonText(statusForm)}
              </Button>
            )}
          </Flex>
        </Flex>
      </form>
      <ModalChangeStatus
        isActiveStatus={true}
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        onActive={onActiveProject}
        onDesactivate={onDesactivateProject}
      />
    </>
  );
};
