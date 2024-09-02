import UiTabs from "@/components/ui/ui-tabs";
import { Flex, Skeleton } from "antd";
import { useEffect, useState } from "react";
import styles from "./FinalizeTrip.module.scss";
import { FieldError, useFieldArray, useForm, useWatch } from "react-hook-form";
import { MessageInstance } from "antd/es/message/interface";
import { yupResolver } from "@hookform/resolvers/yup";

import FooterButtons from "../../ModalBillingAction/FooterButtons/FooterButtons";
import { emptyForm, FinalizeTripForm, mockData } from "./controllers/finalizetrip.types";
import TextArea from "antd/es/input/TextArea";
import { VehicleFields } from "./components/VehicleFields";

interface FinalizeTrip {
  idTR: string;
  onClose: () => void;
  messageApi: MessageInstance;
}
const FinalizeTrip = ({ idTR, onClose, messageApi }: FinalizeTrip) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const [carriersInfo, setCarriersInfo] = useState<FinalizeTripForm>(emptyForm);
  const [defaultValues, setDefaultValues] = useState<FinalizeTripForm>(emptyForm);
  console.log("selectedTab", selectedTab);
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
  } = useForm<FinalizeTripForm>({
    defaultValues
    //resolver: yupResolver(uploadInvoiceFormSchema) as any
  });
  const { fields: carriersFields } = useFieldArray({
    control,
    name: "carriers"
  });
  const tabsNames = carriersFields.map((c) => `${c.carrier}`);
  const formValues = useWatch({ control });

  const { fields: vehiclesFields } = useFieldArray({
    control,
    name: `carriers.${selectedTab}.vehicles`
  });
  console.log("FORMVALUES", formValues);
  console.log("vehiclesFields cuurent", vehiclesFields);

  // //Create default with api data
  // function createDefaultValues(pasData: PreAuthorizationRequestData[]): FinalizeTrip {
  //   const defaultValues: PA[] = pasData.map((pa) => ({
  //     info: {
  //       id: pa.id,
  //       idAuthorization: pa.idAuthorization,
  //       date: dayjs(pa.dateAuthorization),
  //       value: pa.authorizationFare,
  //       link: pa.link
  //     },
  //     invoice: {
  //       id: "",
  //       date: null,
  //       value: pa.authorizationFare,
  //       pdfFile: undefined,
  //       xmlFile: undefined
  //     }
  //   }));
  //   return {
  //     pas: defaultValues
  //   };
  // }

  // Fetch pre-authorized info
  // async function getFormInfo() {
  //   try {
  //     setIsLoading(true);
  //     const response = await getTripMts(idTR);
  //     if (response) {
  //       setPreauthorizeds(response);
  //     }
  //   } catch (error) {
  //     messageApi?.open({
  //       type: "error",
  //       content: "Hubo un problema, vuelve a intentarlo"
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }
  // Handle form submission
  // async function sendForm(form: FinalizeTrip) {
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

  const onSubmit = (data: FinalizeTripForm) => {
    console.log("submit", data);
    //sendForm(data);
  };

  //Handle document changes
  const handleOnChangeDocument = (fileToSave: any, vehicleIndex: number, documentIndex: number) => {
    const { file: rawFile } = fileToSave;
    if (rawFile) {
      const fileSizeInMB = rawFile.size / (1024 * 1024);
      if (fileSizeInMB > 30) {
        console.log(
          "El archivo es demasiado grande. Por favor, sube un archivo de menos de 30 MB."
        );
        return;
      }
      setValue(
        `carriers.${selectedTab}.vehicles.${vehicleIndex}.documents.${documentIndex}.file`,
        rawFile
      );
      trigger(`carriers.${selectedTab}.vehicles.${vehicleIndex}.documents.${documentIndex}`);
    }
  };

  const handleOnDeleteDocument = (vehicleIndex: number, documentIndex: number) => {
    setValue(
      `carriers.${selectedTab}.vehicles.${vehicleIndex}.documents.${documentIndex}.file`,
      undefined
    );
    trigger(`carriers.${selectedTab}.vehicles.${vehicleIndex}.documents.${documentIndex}`);
  };

  useEffect(() => {
    if (!isInitialized) {
      //getFormInfo();
      setCarriersInfo(mockData);
      setIsInitialized(true);
    }
  }, [isInitialized]);
  useEffect(() => {
    if (carriersInfo) {
      // const newDefaultValues = createDefaultValues(preauthorizeds);
      setDefaultValues(carriersInfo);
      reset(carriersInfo);
    }
  }, [carriersInfo, reset]);

  const currentCarrier = watch(`carriers.${selectedTab}`);

  function validateVehiclesWithDocuments(form: any): boolean {
    for (const carrier of form.carriers) {
      for (const vehicle of carrier.vehicles) {
        const hasValidDocument = vehicle.documents.some(
          (document: any) => document.file || document.link
        );
        if (!hasValidDocument) {
          return false;
        }
      }
    }
    return true;
  }

  const allVehiclesHaveDocs = validateVehiclesWithDocuments(formValues);
  console.log("allVehiclesHaveDocs", allVehiclesHaveDocs);
  const isConfirmDisabled = !allVehiclesHaveDocs;

  if (isLoading) {
    return <Skeleton active loading={isLoading} />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex vertical gap={24} style={{ paddingBottom: 24 }}>
        <Flex gap={4} vertical>
          <Flex justify="space-between">
            <p className={styles.subtitle}>
              Confirme los documentos de legalización para finalizar el viaje
            </p>
          </Flex>
        </Flex>
        <UiTabs
          tabs={tabsNames}
          onTabClick={(index) => setSelectedTab(index)}
          initialTabIndex={selectedTab}
          className={styles.scrollableTabsUI}
        />
        <Flex vertical>
          <div key={currentCarrier.idCarrier}>
            <VehicleFields
              control={control}
              register={register}
              selectedTab={selectedTab}
              handleOnChangeDocument={handleOnChangeDocument}
              handleOnDeleteDocument={handleOnDeleteDocument}
              currentCarrier={currentCarrier}
            />
          </div>
        </Flex>
        <Flex vertical gap={8}>
          <p className={styles.comments}>Comentarios adicionales</p>
          <div>
            <TextArea
              placeholder="Escribe los comentarios adicionales"
              value={currentCarrier.adittionalComment}
              style={{ minHeight: "40px" }}
              disabled={false}
              autoSize={{ minRows: 1, maxRows: 4 }}
              onChange={(event) => {
                setValue(`carriers.${selectedTab}.adittionalComment`, event.target.value);
              }}
            />
          </div>
        </Flex>
      </Flex>
      <FooterButtons
        isConfirmDisabled={isConfirmDisabled}
        titleConfirm="Finalizar viaje"
        onClose={onClose}
        handleOk={handleSubmit(onSubmit)}
      />
    </form>
  );
};
export default FinalizeTrip;
