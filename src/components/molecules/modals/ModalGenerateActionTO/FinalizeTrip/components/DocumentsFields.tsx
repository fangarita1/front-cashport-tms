import { useFieldArray } from "react-hook-form";
import UploadFileButton from "../../../ModalBillingAction/UploadFileButton/UploadFileButton";
import AddRemoveButton from "@/components/organisms/logistics/acept_carrier/detail/components/VehicleAndDriverAsignation/components/AddRemoveButton/AddRemoveButton";
import { Flex } from "antd";
import { FinalizeTripForm, ICarrier } from "../controllers/finalizetrip.types";
import { UploadDocumentButton } from "@/components/atoms/UploadDocumentButton/UploadDocumentButton";
import UploadDocumentChild from "@/components/atoms/UploadDocumentChild/UploadDocumentChild";

export function DocumentFields({
  control,
  register,
  carrierIndex,
  vehicleIndex,
  handleOnDeleteDocument,
  handleOnChangeDocument,
  currentCarrier,
  disabled = false
}: Readonly<{
  control: any;
  register: any;
  carrierIndex: number;
  vehicleIndex: number;
  handleOnDeleteDocument: (vehicleIndex: number, documentIndex: number) => void;
  handleOnChangeDocument: (fileToSave: any, vehicleIndex: number, documentIndex: number) => void;
  currentCarrier: ICarrier;
  disabled?: boolean;
}>) {
  const { fields: documentFields, append: appendDocument } = useFieldArray<FinalizeTripForm>({
    control,
    name: `carriers.${carrierIndex}.vehicles.${vehicleIndex}.documents`
  });

  return (
    <div>
      <Flex vertical gap={8}>
        {documentFields.map((document: any, documentIndex) => {
          if (document.link) {
            return (
              <UploadDocumentButton
                key={`carrier-${carrierIndex}-vehicle-${vehicleIndex}-doc-${documentIndex}`}
                title={"Documento MT"}
                showTitleAndMandatory={documentIndex === 0}
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
              key={`carrier-${carrierIndex}-vehicle-${vehicleIndex}-doc-${documentIndex}`}
              title={"Documento MT"}
              showTitleAndMandatory={documentIndex === 0}
              handleOnDelete={() => handleOnDeleteDocument(vehicleIndex, documentIndex)}
              handleOnChange={(file) => handleOnChangeDocument(file, vehicleIndex, documentIndex)}
              fileName={
                currentCarrier.vehicles?.[vehicleIndex].documents?.[documentIndex].file?.name ??
                undefined
              }
              fileSize={
                currentCarrier.vehicles?.[vehicleIndex].documents?.[documentIndex].file?.size ??
                undefined
              }
              isMandatory={true}
              disabled={disabled}
            />
          );
        })}
      </Flex>
      <Flex justify="flex-end">
        <AddRemoveButton
          type="add"
          onClick={() => appendDocument({ docReference: "", file: undefined, aditionalData: {} })}
          disabled={disabled}
          text="Agregar otro documento"
        />
      </Flex>
    </div>
  );
}
