import { useFieldArray } from "react-hook-form";
import { Flex } from "antd";
import { UploadDocumentButton } from "@/components/atoms/UploadDocumentButton/UploadDocumentButton";
import UploadDocumentChild from "@/components/atoms/UploadDocumentChild/UploadDocumentChild";
import UploadFileButton from "@/components/molecules/modals/ModalBillingAction/UploadFileButton/UploadFileButton";

export function DocumentFields({
  control,
  register,
  driverIndex,
  handleOnDeleteDocument,
  handleOnChangeDocument,
  currentDriver
}: Readonly<{
  control: any;
  register: any;
  driverIndex: number;
  handleOnDeleteDocument: (driverIndex: number, documentIndex: number) => void;
  handleOnChangeDocument: (fileToSave: any, driverIndex: number, documentIndex: number) => void;
  currentDriver: any;
}>) {
  const { fields: documentFields, append: appendDocument } = useFieldArray<any>({
    control,
    name: `driversForm.${driverIndex}.documents`
  });
  console.log("documentFields", documentFields);
  console.log("currentDriver IN DOCS FIELDS", currentDriver);

  return (
    <Flex vertical gap={8}>
      {documentFields.map((document: any, documentIndex) => {
        if (document.link) {
          return (
            <UploadDocumentButton
              key={`driver-${driverIndex}-doc-${documentIndex}`}
              title={document.description}
              isMandatory={true}
              setFiles={() => {}}
              disabled
            >
              <UploadDocumentChild
                linkFile={document.link}
                nameFile={document.link.split("-").pop() ?? ""}
                showTrash={false}
                onDelete={() => {}}
              />
            </UploadDocumentButton>
          );
        }
        return (
          <UploadFileButton
            key={`driver-${driverIndex}-doc-MT-${documentIndex}`}
            title={document.description}
            handleOnDelete={() => handleOnDeleteDocument(driverIndex, documentIndex)}
            handleOnChange={(file) => handleOnChangeDocument(file, driverIndex, documentIndex)}
            fileName={
              //currentDriver.[driverIndex].documents?.[documentIndex].file?.name ??
              undefined
            }
            fileSize={
              // currentDriver.[driverIndex].documents?.[documentIndex].file?.size ??
              undefined
            }
            isMandatory={true}
          />
        );
      })}
    </Flex>
  );
}
