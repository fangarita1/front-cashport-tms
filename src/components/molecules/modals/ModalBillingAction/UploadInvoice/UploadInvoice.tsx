import UiTabs from "@/components/ui/ui-tabs";
import { Flex, Skeleton } from "antd";
import { useEffect, useState } from "react";
import styles from "./UploadInvoice.module.scss";
import { InputForm } from "@/components/atoms/inputs/InputForm/InputForm";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import UploadFileButton from "../UploadFileButton/UploadFileButton";
import FooterButtons from "../FooterButtons/FooterButtons";
import { InputDateForm } from "@/components/atoms/inputs/InputDate/InputDateForm";
import dayjs from "dayjs";
import { getPreauthorizedInfo, sendInvoices } from "@/services/billings/billings";
import { PreAuthorizationRequestData } from "@/types/logistics/schema";
import { PA, UploadInvoiceForm } from "./controllers/uploadinvoice.types";
import { defaultUploadInvoiceForm } from "./controllers/createDefault";
import { UploadDocumentButton } from "@/components/atoms/UploadDocumentButton/UploadDocumentButton";
import UploadDocumentChild from "@/components/atoms/UploadDocumentChild/UploadDocumentChild";
import { MessageInstance } from "antd/es/message/interface";

interface UploadInvoice {
  idTR: number;
  onClose: () => void;
  messageApi: MessageInstance;
}
const UploadInvoice = ({ idTR, onClose, messageApi }: UploadInvoice) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const [preauthorizeds, setPreauthorizeds] = useState<PreAuthorizationRequestData[]>([]);
  const [defaultValues, setDefaultValues] = useState<UploadInvoiceForm>(defaultUploadInvoiceForm);

  function createDefaultValues(pasData: PreAuthorizationRequestData[]): UploadInvoiceForm {
    const defaultValues: PA[] = pasData.map((pa, index) => ({
      info: {
        id: pa.id,
        idAuthorization: pa.idAuthorization,
        date: dayjs(pa.dateAuthorization),
        value: pa.authorizationFare,
        link: pa.link
      },
      invoice: {
        id: index + 1,
        date: dayjs(),
        value: pa.authorizationFare,
        pdfFile: undefined,
        xmlFile: undefined
      }
    }));
    return {
      pas: defaultValues
    };
  }
  async function sendForm(form: UploadInvoiceForm) {
    try {
      setIsLoading(true);
      const response = await sendInvoices(form, idTR);
      console.log(response);
      if (response) {
        messageApi?.open({
          type: "success",
          content: "Creado correactamente",
          duration: 3
        });
      } else {
        messageApi?.open({
          type: "error",
          content: "Hubo un error",
          duration: 3
        });
      }
    } catch (error: any) {
      console.log("ERROR", error);
      messageApi?.open({
        type: "error",
        content: error?.message ?? "Hubo un error",
        duration: 3
      });
    } finally {
      setIsLoading(false);
      onClose();
    }
  }
  const getPreauthorized = async () => {
    try {
      setIsLoading(true);
      const response = await getPreauthorizedInfo(idTR);
      console.log(response);
      if (response) {
        setPreauthorizeds(response);
      }
    } catch (error) {
      messageApi?.open({
        type: "error",
        content: "Hubo un problema, vuelve a intentarlo"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isInitialized) {
      getPreauthorized();
      setIsInitialized(true);
    }
  }, [isInitialized]);

  const onSubmit = (data: UploadInvoiceForm) => {
    console.log("onSubmit", data);
    sendForm(data);
  };
  const { control, handleSubmit, setValue, reset, watch, trigger } = useForm<UploadInvoiceForm>({
    defaultValues
  });
  const { fields } = useFieldArray({
    control,
    name: "pas"
  });

  const pasCodes = fields.map((field) => `PA-${field.info.id}`);
  const formValues = useWatch({ control });

  console.log("FORM VALUES", formValues);

  function getTotalInfoValue(data: PA[]): number {
    return data.reduce((total, pa) => total + pa.info.value, 0);
  }
  const totalPreAuthorized = getTotalInfoValue(fields);

  useEffect(() => {
    if (preauthorizeds && preauthorizeds.length > 0) {
      const newDefaultValues = createDefaultValues(preauthorizeds);
      setDefaultValues(newDefaultValues);
      reset(newDefaultValues);
    }
  }, [preauthorizeds, reset]);

  function getPendingInvoiceValue(): number {
    const currentInvoiceTotal = formValues?.pas
      ? formValues?.pas.reduce((total: number, pa: any) => {
          if (pa.invoice.pdfFile?.file) {
            return total + Number(pa.invoice.value);
          }
          return total;
        }, 0)
      : 0;
    return totalPreAuthorized - currentInvoiceTotal;
  }

  const pendingInvoiceValue = formValues?.pas ? getPendingInvoiceValue() : 0;

  const currentInvoice = watch(`pas.${selectedTab}.invoice`);
  const currentInfo = watch(`pas.${selectedTab}.info`);

  function handleOnChangeDocument(type: "pdfFile" | "xmlFile", fileToSave: any) {
    const { file: rawFile } = fileToSave;
    if (rawFile) {
      const fileSizeInMB = rawFile.size / (1024 * 1024);
      if (fileSizeInMB > 30) {
        console.log(
          "El archivo es demasiado grande. Por favor, sube un archivo de menos de 30 MB."
        );
        return;
      }
      setValue(`pas.${selectedTab}.invoice.${type}.file`, rawFile);
      trigger(`pas.${selectedTab}.invoice.${type}`);
    }
  }
  const handleOnDeleteDocument = (type: "pdfFile" | "xmlFile") => {
    setValue(`pas.${selectedTab}.invoice.${type}.file`, undefined);
    trigger(`pas.${selectedTab}.invoice.${type}`);
  };

  if (isLoading || preauthorizeds.length === 0) {
    return <Skeleton active loading={isLoading} />;
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex vertical gap={24} style={{ paddingBottom: 24 }}>
        <Flex gap={4} vertical>
          <Flex justify="space-between">
            <p className={styles.subtitle}>
              <b>Total preautorizado</b>
            </p>
            <p className={styles.subtitle}>
              <b>{`$${totalPreAuthorized}`}</b>
            </p>
          </Flex>
          <Flex justify="space-between">
            <p className={styles.subtitle}>Pendiente facturación</p>
            <p className={styles.subtitle}>{`$${pendingInvoiceValue}`}</p>
          </Flex>
        </Flex>
        <UiTabs
          tabs={pasCodes}
          onTabClick={(index) => setSelectedTab(index)}
          initialTabIndex={selectedTab}
          className={styles.scrollableTabsUI}
        />
        <Flex vertical gap={16}>
          <Flex gap={16}>
            <InputForm
              key={`info.id-${selectedTab}`}
              nameInput={`pas.${selectedTab}.info.id`}
              placeholder="Id"
              control={control}
              error={undefined}
              titleInput="Id Preautorización"
              readOnly
            />
            <InputDateForm
              key={`info.date-${selectedTab}`}
              titleInput="Fecha"
              nameInput={`pas.${selectedTab}.info.date`}
              control={control}
              error={undefined}
              disabled
            />
            <InputForm
              key={`info.value-${selectedTab}`}
              placeholder="Valor"
              nameInput={`pas.${selectedTab}.info.value`}
              control={control}
              error={undefined}
              titleInput="Valor"
              readOnly
            />
          </Flex>
          <UploadDocumentButton
            key={`info.file-${selectedTab}`}
            title={"Preautorización"}
            isMandatory={true}
            setFiles={() => {}}
            disabled
          >
            <UploadDocumentChild
              linkFile={currentInfo.link}
              nameFile={pasCodes[selectedTab]}
              showTrash={false}
              onDelete={() => {}}
            />
          </UploadDocumentButton>
        </Flex>
        <Flex vertical gap={16}>
          <p className={styles.subtitle}>
            <b>Factura</b>
          </p>
          <Flex gap={16}>
            <InputForm
              key={`invoice.id-${selectedTab}`}
              className={styles.inputForm}
              placeholder="Id Factura"
              nameInput={`pas.${selectedTab}.invoice.id`}
              control={control}
              error={undefined}
              titleInput="Id Factura"
            />
            <InputDateForm
              key={`invoice.date-${selectedTab}`}
              titleInput="Fecha"
              nameInput={`pas.${selectedTab}.invoice.date`}
              control={control}
              error={undefined}
            />
            <InputForm
              key={`invoice.value-${selectedTab}`}
              placeholder="Valor"
              nameInput={`pas.${selectedTab}.invoice.value`}
              control={control}
              error={undefined}
              readOnly
              titleInput="Valor"
            />
          </Flex>
          <UploadFileButton
            isMandatory={true}
            key={`${selectedTab}.${currentInvoice.id}.pdf`}
            title={"PDF Factura"}
            handleOnDelete={() => handleOnDeleteDocument("pdfFile")}
            handleOnChange={(file) => handleOnChangeDocument("pdfFile", file)}
            fileName={currentInvoice?.pdfFile?.file?.name ?? undefined}
            fileSize={currentInvoice?.pdfFile?.file?.size ?? undefined}
          />
          <UploadFileButton
            isMandatory={false}
            key={`${selectedTab}.${currentInvoice.id}.xml`}
            title={"XML Factura"}
            handleOnDelete={() => handleOnDeleteDocument("xmlFile")}
            handleOnChange={(file) => handleOnChangeDocument("xmlFile", file)}
            fileName={currentInvoice?.xmlFile?.file?.name ?? undefined}
            fileSize={currentInvoice?.xmlFile?.file?.size ?? undefined}
          />
        </Flex>
      </Flex>
      <FooterButtons
        isConfirmDisabled={pendingInvoiceValue !== 0}
        titleConfirm="Cargar facturas"
        onClose={onClose}
        handleOk={handleSubmit(onSubmit)}
      />
    </form>
  );
};
export default UploadInvoice;
