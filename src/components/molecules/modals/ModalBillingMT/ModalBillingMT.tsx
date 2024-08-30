import { Flex, Modal, Skeleton } from "antd";
import { CaretLeft } from "phosphor-react";
import { useEffect, useState } from "react";
import styles from "./ModalBillingMT.module.scss";
import { MessageInstance } from "antd/es/message/interface";
import { emptyForm, EvidenceByVehicleForm, mockData } from "./controllers/formbillingmt.types";
import { useForm, useWatch } from "react-hook-form";
import FooterButtons from "../ModalBillingAction/FooterButtons/FooterButtons";
import { DocumentFields } from "./components/DocumentsFields";

type PropsModalBillingMT = {
  idTR: string;
  idCarrier: number;
  idVehicle: number;
  isOpen: boolean;
  onClose: () => void;
  messageApi: MessageInstance;
};

export default function ModalBillingMT(props: Readonly<PropsModalBillingMT>) {
  const { isOpen, onClose, idTR, idCarrier, idVehicle, messageApi } = props;
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [vehicleInfo, setVehicleInfo] = useState<EvidenceByVehicleForm>(emptyForm);
  const [defaultValues, setDefaultValues] = useState<EvidenceByVehicleForm>(emptyForm);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
    trigger,
    register,
    getValues
  } = useForm<EvidenceByVehicleForm>({
    defaultValues
    //resolver: yupResolver(uploadInvoiceFormSchema) as any
  });
  const formValues = useWatch({ control });
  console.log("FformValues.documents", formValues.documents);
  //Handle document changes
  const handleOnChangeDocument = (fileToSave: any, documentIndex: number) => {
    const { file: rawFile } = fileToSave;
    if (rawFile) {
      const fileSizeInMB = rawFile.size / (1024 * 1024);
      if (fileSizeInMB > 30) {
        console.log(
          "El archivo es demasiado grande. Por favor, sube un archivo de menos de 30 MB."
        );
        return;
      }
      setValue(`documents.${documentIndex}.file`, rawFile);
      trigger(`documents.${documentIndex}`);
    }
  };

  const handleOnDeleteDocument = (documentIndex: number) => {
    setValue(`documents.${documentIndex}.file`, undefined);
    trigger(`documents.${documentIndex}`);
  };

  useEffect(() => {
    if (!isInitialized) {
      //getFormInfo();
      setVehicleInfo(mockData);
      setIsInitialized(true);
    }
  }, [isInitialized]);
  useEffect(() => {
    if (vehicleInfo) {
      // const newDefaultValues = createDefaultValues(preauthorizeds);
      setDefaultValues(vehicleInfo);
      reset(vehicleInfo);
    }
  }, [vehicleInfo, reset]);
  const renderView = () => {
    if (isLoading) {
      return <Skeleton active loading={isLoading} />;
    }
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex vertical gap={24}>
          <Flex gap={4} vertical>
            <Flex justify="space-between">
              <p className={styles.subtitle}>Ingresa la información para finalizar el viaje</p>
            </Flex>
          </Flex>

          <Flex vertical key={`vehicle-1`}>
            <p className={styles.vehicleName}>Vehículo {formValues.plate}</p>
            <DocumentFields
              control={control}
              register={register}
              handleOnChangeDocument={handleOnChangeDocument}
              handleOnDeleteDocument={handleOnDeleteDocument}
              currentDocuments={formValues.documents ?? []}
            />
          </Flex>
        </Flex>
      </form>
    );
  };

  const renderTitle = () => {
    return (
      <Flex gap={8} align="center">
        <CaretLeft size={20} onClick={onClose} />
        <p className={styles.actionTitle}>Documentos de legalización</p>
      </Flex>
    );
  };

  const onSubmit = (data: EvidenceByVehicleForm) => {
    console.log("submit", data);
    //sendForm(data);
  };
  const hasAtLeastOneDoc = formValues.documents?.some((document) => document.file || document.link);
  const isConfirmDisabled = !hasAtLeastOneDoc;

  return (
    <Modal
      width={698}
      title={renderTitle()}
      styles={{ body: { maxHeight: "32rem", overflowY: "auto", paddingTop: 24 } }}
      centered
      open={isOpen}
      onClose={() => onClose()}
      footer={
        <FooterButtons
          isConfirmDisabled={isConfirmDisabled}
          titleConfirm="Finalizar viaje"
          onClose={onClose}
          handleOk={handleSubmit(onSubmit)}
        />
      }
    >
      {renderView()}
    </Modal>
  );
}
