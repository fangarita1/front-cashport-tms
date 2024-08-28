import { Divider, Flex, Skeleton } from "antd";
import { useState } from "react";
import styles from "./PreauthorizeTrip.module.scss";
import { InputForm } from "@/components/atoms/inputs/InputForm/InputForm";
import { FieldError, useFieldArray, useForm, useWatch } from "react-hook-form";
import { InputDateForm } from "@/components/atoms/inputs/InputDate/InputDateForm";

import { MessageInstance } from "antd/es/message/interface";
import { yupResolver } from "@hookform/resolvers/yup";

import { ICarrier } from "../ModalGenerateActionTO";
import UploadFileButton from "../../ModalBillingAction/UploadFileButton/UploadFileButton";
import FooterButtons from "../../ModalBillingAction/FooterButtons/FooterButtons";
import { Plus, Trash } from "phosphor-react";
import { Preauthorization, PreauthorizeTripForm } from "./controllers/preauthorizetrip.types";
import { preautorizationsFormSchema } from "./controllers/formSchema";

interface PAtrip {
  idTR: string;
  carrier: ICarrier;
  onClose: () => void;
  messageApi: MessageInstance;
}
const defaultPA: Preauthorization = {
  idPA: "",
  date: null,
  value: null,
  evidence: undefined
};
const defaultValueForm = {
  preauthorizations: [defaultPA]
};
const PreauthorizeTrip = ({ idTR, carrier, onClose, messageApi }: PAtrip) => {
  const { totalValue, id: carrierId, name: carrierName } = carrier;
  const [isLoading, setIsLoading] = useState(false);
  const [defaultValues, setDefaultValues] = useState<any>(defaultValueForm);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
    trigger
  } = useForm<PreauthorizeTripForm>({
    defaultValues,
    resolver: yupResolver(preautorizationsFormSchema) as any
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "preauthorizations"
  });

  const formValues = useWatch({ control });

  console.log("formValues", formValues);

  // Handle form submission
  // async function sendForm(form: UploadInvoiceForm) {
  //   try {
  //     setIsLoading(true);
  //     const response = await sendInvoices(form, idTR);
  //     if (response) {
  //       messageApi?.open({
  //         type: "success",
  //         content: "Creado correctamente",
  //         duration: 3
  //       });
  //     } else {
  //       messageApi?.open({
  //         type: "error",
  //         content: "Hubo un error",
  //         duration: 3
  //       });
  //     }
  //   } catch (error: any) {
  //     messageApi?.open({
  //       type: "error",
  //       content: error?.message ?? "Hubo un error",
  //       duration: 3
  //     });
  //   } finally {
  //     setIsLoading(false);
  //     onClose();
  //   }
  // }
  // Handle document changes
  const handleOnChangeDocument = (fileToSave: any, index: number) => {
    const { file: rawFile } = fileToSave;
    if (rawFile) {
      const fileSizeInMB = rawFile.size / (1024 * 1024);
      if (fileSizeInMB > 30) {
        console.log(
          "El archivo es demasiado grande. Por favor, sube un archivo de menos de 30 MB."
        );
        return;
      }
      setValue(`preauthorizations.${index}.evidence.file`, rawFile);
      trigger(`preauthorizations.${index}.evidence`);
    }
  };

  const handleOnDeleteDocument = (index: number) => {
    setValue(`preauthorizations.${index}.evidence`, undefined);
    trigger(`preauthorizations.${index}.evidence`);
  };
  const onSubmit = (data: any) => {
    console.log(data);
  };

  const getAlreadyPreautorized = (): number => {
    const preauthorizedValue =
      formValues.preauthorizations?.reduce((total: number, pa: any) => {
        if (pa.evidence) {
          return total + Number(pa.value);
        }
        return total;
      }, 0) ?? 0;
    return preauthorizedValue;
  };
  const pendingPAValue = totalValue - getAlreadyPreautorized();
  const isConfirmDisabled = pendingPAValue !== 0;

  if (isLoading) {
    return <Skeleton active loading={isLoading} />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex vertical gap={24} style={{ paddingBottom: 24 }}>
        <Flex gap={4} vertical>
          <Flex justify="space-between">
            <p className={styles.subtitle}>
              Total servicio <b>{carrierName}</b>
            </p>
            <p className={styles.subtitle}>
              <b>{`$${totalValue}`}</b>
            </p>
          </Flex>
          <Flex justify="space-between">
            <p className={styles.subtitle}>Pendiente preautorización</p>
            <p className={styles.subtitle}>{`$${pendingPAValue}`}</p>
          </Flex>
        </Flex>
        {fields.map((field, index) => {
          const currentPA = formValues?.preauthorizations?.[index];
          console.log("FIELD index", index, "valores", field);
          return (
            <Flex vertical key={`preauthorizacion-${index}-${field.id}`}>
              <Flex vertical gap={16} style={{ paddingBottom: 24 }}>
                <Flex align="center" justify="space-between">
                  <p className={styles.subtitle}>
                    <b>PA #{index + 1}</b>
                  </p>
                  {index !== 0 && (
                    <Flex>
                      <button className={styles.addBtn} onClick={() => remove(index)}>
                        <Trash size={20} />
                      </button>
                    </Flex>
                  )}
                </Flex>
                <Flex gap={16}>
                  <InputForm
                    key={`pa-${index}-id`}
                    className={styles.inputForm}
                    placeholder="Id Preautorización"
                    nameInput={`preauthorizations.${index}.idPA`}
                    control={control}
                    error={errors?.preauthorizations?.[index]?.idPA}
                    titleInput="Id Preautorización"
                  />
                  <InputDateForm
                    key={`pa-${index}-date`}
                    titleInput="Fecha"
                    nameInput={`preauthorizations.${index}.date`}
                    control={control}
                    error={(errors?.preauthorizations?.[index]?.date as FieldError) ?? undefined}
                  />
                  <InputForm
                    key={`pa-${index}-value`}
                    placeholder="Valor"
                    nameInput={`preauthorizations.${index}.value`}
                    control={control}
                    error={errors?.preauthorizations?.[index]?.value}
                    titleInput="Valor"
                    typeInput="number"
                  />
                </Flex>
                <UploadFileButton
                  isMandatory={true}
                  key={`pa-${index}-doc-${field.id}`}
                  title={"Evidencia"}
                  handleOnDelete={() => handleOnDeleteDocument(index)}
                  handleOnChange={(file) => handleOnChangeDocument(file, index)}
                  fileName={currentPA?.evidence?.file?.name}
                  fileSize={currentPA?.evidence?.file?.size}
                />
              </Flex>
              {index + 1 === fields.length ? (
                <Flex>
                  <button className={styles.addBtn} onClick={() => append(defaultPA)}>
                    <Plus size={12} />
                    <p>Agregar otra</p>
                  </button>
                </Flex>
              ) : (
                <Divider style={{ width: "100%" }} className={styles.divider} />
              )}
            </Flex>
          );
        })}
      </Flex>
      <FooterButtons
        isConfirmDisabled={isConfirmDisabled}
        titleConfirm="Cargar Preautorización"
        onClose={onClose}
        handleOk={handleSubmit(onSubmit)}
      />
    </form>
  );
};
export default PreauthorizeTrip;
