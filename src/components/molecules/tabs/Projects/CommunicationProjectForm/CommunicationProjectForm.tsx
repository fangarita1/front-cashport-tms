import { Button, Flex, Radio, Typography } from "antd";
import { Controller, ControllerRenderProps, FieldError, useForm } from "react-hook-form";
import { CaretLeft } from "phosphor-react";

import styles from "./communicationProjectForm.module.scss";
import PrincipalButton from "@/components/atoms/buttons/principalButton/PrincipalButton";
import { InputForm } from "@/components/atoms/inputs/InputForm/InputForm";
import { useEffect, useState } from "react";
import { ISelectedBussinessRules } from "@/types/bre/IBRE";
import { SelectZone } from "@/components/molecules/selects/SelectZone/SelectZone";
import { SelectStructure } from "@/components/molecules/selects/SelectStructure/SelectStructure";
import { SelectClientsGroup } from "@/components/molecules/selects/SelectClientsGroup/SelectClientsGroup";
import GeneralSelect from "@/components/ui/general-select";
import GeneralSearchSelect from "@/components/ui/general-search-select";
import SelectOuterTags from "@/components/ui/select-outer-tags";
import InputClickable from "@/components/ui/input-clickable";
import { ModalPeriodicity } from "@/components/molecules/modals/ModalPeriodicity/ModalPeriodicity";
import { ICommunicationForm, IPeriodicityModalForm } from "@/types/communications/ICommunications";
import { InputExpirationNoticeDays } from "@/components/atoms/inputs/InputExpirationNoticeDays/InputExpirationNoticeDays";
import { OptionType } from "@/components/ui/select-outer-tags/select-outer-tags";
import { CustomTextArea } from "@/components/atoms/CustomTextArea/CustomTextArea";
import {
  createCommunication,
  getForwardEvents,
  getForwardToEmails,
  getTemplateTags
} from "@/services/communications/communications";
import { useAppStore } from "@/lib/store/store";
import { stringFromArrayOfSelect } from "@/utils/utils";
import { useMessageApi } from "@/context/MessageContext";

const { Title } = Typography;

interface Props {
  showCommunicationDetails: {
    communicationId: number;
    active: boolean;
  };
  onGoBackTable: () => void;
}
export const CommunicationProjectForm = ({ onGoBackTable }: Props) => {
  const [loadingRequest, setLoadingRequest] = useState(false);
  const [radioValue, setRadioValue] = useState<any>();
  const [zones, setZones] = useState([] as number[]);
  const [selectedPeriodicity, setSelectedPeriodicity] = useState<IPeriodicityModalForm>();
  const [selectedBusinessRules, setSelectedBusinessRules] = useState<ISelectedBussinessRules>(
    initDatSelectedBusinessRules
  );
  const [customFieldsError, setCustomFieldsError] = useState({
    zone: false,
    channel: false,
    frequency: false
  });
  const [assignedGroups, setAssignedGroups] = useState<number[]>([]);
  const [isFrequencyModalOpen, setIsFrequencyModalOpen] = useState(false);
  const [events, setEvents] = useState<string[]>([]);
  const [templateTags, setTemplateTags] = useState<string[]>([]);
  const [forwardToEmails, setForwardToEmails] = useState<string[]>([]);
  const { ID: projectId } = useAppStore((state) => state.selectedProject);

  const { showMessage } = useMessageApi();

  const handleChangeRadio = (
    value: any,
    field: ControllerRenderProps<ICommunicationForm, "trigger.type">
  ) => {
    setRadioValue(value);
    field.onChange(value);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues
  } = useForm<ICommunicationForm>({});
  const watchEventType = watch("trigger.settings.event_type");
  const watchTemplateTagsLabels = watch("template.tags")?.map((tag) => `\[${tag.label}\]`);

  useEffect(() => {
    const fecthEvents = async () => {
      const events = await getForwardEvents();
      setEvents(events);
    };
    fecthEvents();
    const fetchTemplateTags = async () => {
      const tags = await getTemplateTags();
      setTemplateTags(tags);
    };
    fetchTemplateTags();
    const fetchEmails = async () => {
      const emails = await getForwardToEmails();
      setForwardToEmails(emails);
    };
    fetchEmails();
  }, []);

  const handleAddTagToBody = (value: OptionType[], deletedValue: OptionType[]) => {
    const valueBody = getValues("template.message");

    if (deletedValue.length > 0) {
      const deletedTag = deletedValue[0].label;
      setValue("template.message", valueBody.replace(`[${deletedTag}]`, ""));
      return;
    }

    const lastAddedTag = value.length > 0 ? value[value.length - 1] : undefined;

    setValue("template.message", `${valueBody ? valueBody : ""}[${lastAddedTag?.label}]`);
  };

  const handleCreateCommunication = async (data: any) => {
    setLoadingRequest(true);
    if (
      zones.length === 0 ||
      selectedBusinessRules?.channels.length === 0 ||
      (selectedPeriodicity?.frequency === undefined && radioValue === "frecuencia")
    ) {
      setCustomFieldsError({
        zone: zones.length === 0,
        channel: selectedBusinessRules?.channels.length === 0,
        frequency: selectedPeriodicity?.frequency === undefined && radioValue === "frecuencia"
      });
      setLoadingRequest(false);
      return;
    }
    setCustomFieldsError({
      zone: false,
      channel: false,
      frequency: false
    });

    await createCommunication({
      data,
      selectedPeriodicity,
      zones,
      selectedBusinessRules,
      assignedGroups,
      projectId,
      showMessage
    });

    setLoadingRequest(false);
  };

  useEffect(() => {
    //useEffect to clean values from otherRadioButtons when clicked
    if (radioValue === "frecuencia") {
      setValue("trigger.settings.days", undefined);
      setValue("trigger.settings.values", undefined);
      setValue("trigger.settings.subValues", undefined);
      setValue("trigger.settings.event_type", undefined);
      setValue("trigger.settings.noticeDaysEvent", undefined);
    } else if (radioValue === "evento") {
      setValue("trigger.settings.days", undefined);
      setValue("trigger.settings.values", undefined);
      setValue("trigger.settings.subValues", undefined);
      setValue("trigger.settings.noticeDaysEvent", undefined);
      setSelectedPeriodicity(undefined);
    } else if (radioValue === "accion") {
      setValue("trigger.settings.days", undefined);
      setValue("trigger.settings.event_type", undefined);
      setValue("trigger.settings.noticeDaysEvent", undefined);
      setSelectedPeriodicity(undefined);
    }
  }, [radioValue]);

  return (
    <main className={styles.communicationProjectForm}>
      <Flex>
        <Button
          className={styles.goBackButton}
          type="text"
          size="large"
          onClick={onGoBackTable}
          icon={<CaretLeft size={"1.45rem"} />}
        >
          Información de la comunicación
        </Button>
      </Flex>
      <div className={styles.generalInfo}>
        <InputForm titleInput="Nombre" control={control} nameInput="name" error={errors.name} />
        <InputForm
          titleInput="Descripción"
          control={control}
          nameInput="description"
          error={errors.description}
        />
      </div>

      <div
        className={styles.forwardType}
        style={errors.trigger?.type && { border: "1px dashed red" }}
      >
        <Title className={styles.forwardType__title} level={5}>
          Tipo de envio
        </Title>

        <Controller
          name="trigger.type"
          control={control}
          rules={{
            validate: (value) => {
              if (!value) {
                return "Seleccione al menos 1 tipo de envio *";
              }
              return true;
            }
          }}
          render={({ field }) => (
            <div className={styles.radioGroup}>
              <div className={styles.radioGroup__frequency}>
                <Radio
                  checked={radioValue === "frecuencia"}
                  onChange={() => handleChangeRadio("frecuencia", field)}
                  className={styles.radioGroup__frequency__radio}
                  value={"frecuencia"}
                >
                  <InputClickable
                    title="Frecuencia"
                    error={customFieldsError.frequency}
                    disabled={radioValue !== "frecuencia"}
                    callBackFunction={() => setIsFrequencyModalOpen(true)}
                    customStyles={
                      customFieldsError.frequency ? { border: "1px dashed red" } : undefined
                    }
                    value={
                      selectedPeriodicity
                        ? `${selectedPeriodicity.frequency.value === "Mensual" ? selectedPeriodicity.frequency.value : `Cada ${stringFromArrayOfSelect(selectedPeriodicity.days)}, ${selectedPeriodicity.frequency.value}`}`
                        : ""
                    }
                  />
                  <p className={styles.textError}>
                    {customFieldsError.frequency && `La Frecuencia es obligatoria *`}
                  </p>
                </Radio>
              </div>

              <div className={styles.radioGroup__event}>
                <div className={styles.radioGroup__event__left}>
                  <Radio
                    checked={radioValue === "evento"}
                    onChange={() => handleChangeRadio("evento", field)}
                    name="test"
                    className={styles.radioGroup__event__radio}
                    value={"evento"}
                  />
                  <Controller
                    disabled={radioValue !== "evento"}
                    name="trigger.settings.event_type"
                    control={control}
                    rules={{ required: radioValue === "evento" }}
                    render={({ field }) => (
                      <GeneralSelect
                        errors={errors.trigger?.settings?.event_type}
                        field={field}
                        title="Tipo de evento"
                        placeholder="Seleccionar tipo de evento"
                        options={events}
                        titleAbsolute
                      />
                    )}
                  />
                </div>
                {watchEventType?.value?.startsWith("Vencimiento") && (
                  <InputExpirationNoticeDays
                    nameInput="trigger.settings.noticeDaysEvent"
                    setValue={setValue}
                    control={control}
                    error={errors.trigger?.settings?.noticeDaysEvent}
                    validationRules={{ required: true }}
                  />
                )}
              </div>

              <div className={styles.radioGroup__actions}>
                <div className={styles.radioGroup__actions__left}>
                  <Radio
                    className={styles.radioGroup__actions__radio}
                    checked={radioValue === "accion"}
                    onChange={() => handleChangeRadio("accion", field)}
                    value={"accion"}
                  />
                  <Controller
                    disabled={radioValue !== "accion"}
                    name="trigger.settings.values"
                    control={control}
                    rules={{ required: radioValue === "accion" }}
                    render={({ field }) => (
                      <SelectOuterTags
                        title="Tipo de acción"
                        placeholder="Seleccionar tipo de acción"
                        options={actionsOptions}
                        errors={errors.trigger?.settings?.values}
                        field={field}
                        titleAbsolute
                      />
                    )}
                  />
                </div>

                <Controller
                  disabled={radioValue !== "accion"}
                  name="trigger.settings.subValues"
                  control={control}
                  rules={{ required: radioValue === "accion" }}
                  render={({ field }) => (
                    <SelectOuterTags
                      title="Subtipo de acción"
                      placeholder="Seleccionar subtipo de acción"
                      options={subActionsOptions}
                      errors={errors.trigger?.settings?.subValues}
                      field={field}
                      titleAbsolute
                    />
                  )}
                />
              </div>
              {errors.trigger?.type && (
                <p className={styles.radioGroup__error}>
                  {(errors.trigger.type as FieldError).message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      <div className={styles.businessRules}>
        <Title className={styles.businessRules__title} level={5}>
          Reglas de negocio
        </Title>
        <Flex
          vertical
          style={
            customFieldsError.zone ? { border: "1px dashed red", borderRadius: "4px" } : undefined
          }
        >
          <SelectZone zones={zones} setZones={setZones} />
          <p className={styles.textError}>{customFieldsError.zone && `La Zona es obligatoria *`}</p>
        </Flex>
        <Flex
          vertical
          style={
            customFieldsError.channel
              ? { border: "1px dashed red", borderRadius: "4px" }
              : undefined
          }
        >
          <SelectStructure
            selectedBusinessRules={selectedBusinessRules}
            setSelectedBusinessRules={setSelectedBusinessRules}
            disabled={false}
          />
          <p className={styles.textError}>
            {customFieldsError.channel && `Las Reglas de negocio  son obligatorias *`}
          </p>
        </Flex>
        <SelectClientsGroup assignedGroups={assignedGroups} setAssignedGroups={setAssignedGroups} />
      </div>

      <div className={styles.communicationTemplate}>
        <Title className={styles.communicationTemplate__title} level={5}>
          Plantilla comunicado
        </Title>
        <Controller
          name="template.via"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <GeneralSelect
              errors={errors.template?.via}
              field={field}
              title="Via"
              placeholder="Seleccionar via"
              options={viasSelectOption}
              customStyleContainer={{ width: "25%", paddingRight: "0.25rem" }}
            />
          )}
        />
        <Controller
          name="template.send_to"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <GeneralSearchSelect
              errors={errors.template?.send_to}
              field={field}
              title="Para"
              placeholder="Enviar a"
              options={forwardToEmails}
              suffixIcon={null}
            />
          )}
        />
        <Controller
          name="template.copy_to"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <GeneralSearchSelect
              errors={errors.template?.copy_to}
              field={field}
              title="Copia"
              placeholder="Copia a"
              options={forwardToEmails}
              suffixIcon={null}
            />
          )}
        />

        <Flex gap={"1rem"} align="flex-start">
          <Controller
            name="template.tags"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <SelectOuterTags
                title="Tags"
                placeholder="Seleccionar tag"
                options={templateTags}
                errors={errors.template?.tags}
                field={field}
                customStyleContainer={{ width: "25%" }}
                hiddenTags
                addedOnchangeBehaviour={handleAddTagToBody}
              />
            )}
          />
          <InputForm
            customStyle={{ width: "75%" }}
            titleInput="Asunto"
            control={control}
            nameInput="template.subject"
            error={errors.template?.subject}
          />
        </Flex>
        <Controller
          name="template.message"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <div className={styles.textArea}>
              <p className={styles.textArea__label}>Cuerpo</p>
              <CustomTextArea
                {...field}
                onChange={field.onChange}
                placeholder="Ingresar cuerpo del correo"
                customStyles={errors.template?.message ? { borderColor: "red" } : {}}
                value={field.value}
                highlightWords={watchTemplateTagsLabels}
              />
            </div>
          )}
        />
        <Controller
          name="template.files"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <SelectOuterTags
              title="Adjunto"
              placeholder="Seleccionar adjunto"
              options={mockAttachments}
              errors={errors.template?.files}
              field={field}
              customStyleContainer={{ marginTop: "1rem" }}
              titleAbsolute
            />
          )}
        />
      </div>

      <Flex justify="end">
        <PrincipalButton loading={loadingRequest} onClick={handleSubmit(handleCreateCommunication)}>
          Crear comunicación
        </PrincipalButton>
      </Flex>
      <ModalPeriodicity
        isOpen={isFrequencyModalOpen}
        onClose={() => setIsFrequencyModalOpen(false)}
        selectedPeriodicity={selectedPeriodicity}
        setSelectedPeriodicity={setSelectedPeriodicity}
      />
    </main>
  );
};

const actionsOptions = [
  "Novedad",
  "Aplicación de pago",
  "Generación nota crédito",
  "Cambio estado de factura"
];

const subActionsOptions = [
  "Error en facturación",
  "Diferencia en precios",
  "Devolución",
  "No radicado"
];
const viasSelectOption = ["Email", "SMS", "WhatsApp"];

const mockAttachments = ["PDF Estado de cuenta", "Excel cartera", "PDF Factura"];

const initDatSelectedBusinessRules: ISelectedBussinessRules = {
  channels: [],
  lines: [],
  sublines: []
};
