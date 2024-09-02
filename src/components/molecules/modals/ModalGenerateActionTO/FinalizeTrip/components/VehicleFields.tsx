import { useFieldArray } from "react-hook-form";
import styles from "../FinalizeTrip.module.scss";
import { DocumentFields } from "./DocumentsFields";
import { FinalizeTripForm, ICarrier } from "../controllers/finalizetrip.types";
import { Flex } from "antd";

export function VehicleFields({
  control,
  register,
  selectedTab,
  handleOnDeleteDocument,
  handleOnChangeDocument,
  currentCarrier
}: Readonly<{
  control: any;
  register: any;
  selectedTab: number;
  handleOnDeleteDocument: (vehicleIndex: number, documentIndex: number) => void;
  handleOnChangeDocument: (fileToSave: any, vehicleIndex: number, documentIndex: number) => void;
  currentCarrier: ICarrier;
}>) {
  const { fields: vehicleFields } = useFieldArray<FinalizeTripForm>({
    control,
    name: `carriers.${selectedTab}.vehicles`
  });

  return (
    <Flex vertical>
      {vehicleFields.map((vehicle: any, vehicleIndex) => (
        <Flex vertical key={`carrier-${selectedTab}-vehicle-${vehicleIndex}`}>
          <p className={styles.vehicleName}>Vehículo {vehicle.plate}</p>
          <DocumentFields
            control={control}
            register={register}
            carrierIndex={selectedTab}
            vehicleIndex={vehicleIndex}
            handleOnChangeDocument={handleOnChangeDocument}
            handleOnDeleteDocument={handleOnDeleteDocument}
            currentCarrier={currentCarrier}
          />
        </Flex>
      ))}
    </Flex>
  );
}
