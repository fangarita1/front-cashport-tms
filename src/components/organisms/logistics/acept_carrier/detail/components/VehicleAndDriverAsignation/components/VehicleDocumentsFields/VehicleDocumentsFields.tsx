import { useFieldArray } from "react-hook-form";
import { UploadDocumentButton } from "@/components/atoms/UploadDocumentButton/UploadDocumentButton";
import UploadDocumentChild from "@/components/atoms/UploadDocumentChild/UploadDocumentChild";
import UploadFileButton from "@/components/molecules/modals/ModalBillingAction/UploadFileButton/UploadFileButton";
import styles from "./VehicleDocumentsFields.module.scss";

export function VehicleDocumentFields({
  control,
  register,
  handleOnDeleteDocument,
  handleOnChangeDocument,
  currentVehicle
}: Readonly<{
  control: any;
  register: any;
  handleOnDeleteDocument: (documentIndex: number) => void;
  handleOnChangeDocument: (fileToSave: any, documentIndex: number) => void;
  currentVehicle: any;
}>) {
  const { fields: documentFields } = useFieldArray<any>({
    control,
    name: `vehicleForm.documents`
  });
  console.log("documentFields", documentFields);

  return (
    <div className={styles.uploadContainer}>
      {documentFields.map((document: any, documentIndex) => {
        if (document.url) {
          return (
            <UploadDocumentButton
              key={`vehicle-doc-${documentIndex}`}
              title={document.description}
              isMandatory={true}
              setFiles={() => {}}
              column
              disabled
            >
              <UploadDocumentChild
                linkFile={document.url}
                nameFile={document.url.split("-").pop() ?? ""}
                showTrash={false}
                onDelete={() => {}}
              />
            </UploadDocumentButton>
          );
        }
        return (
          <UploadFileButton
            column={true}
            key={`vehicle-doc-${documentIndex}`}
            title={document.description}
            handleOnDelete={() => handleOnDeleteDocument(documentIndex)}
            handleOnChange={(file) => handleOnChangeDocument(file, documentIndex)}
            fileName={currentVehicle?.documents?.[documentIndex]?.file?.name ?? undefined}
            fileSize={currentVehicle?.documents?.[documentIndex]?.file?.size ?? undefined}
            isMandatory={true}
          />
        );
      })}
    </div>
  );
}
