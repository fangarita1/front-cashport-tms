import { ITransferRequestJourneyReview, TripCarriersPricing } from "@/types/logistics/schema";
import { Flex, Modal } from "antd";
import JourneyCollapse from "../journeyCollapse/JourneyCollapse";
import { useState } from "react";
import TripCarrierPricing from "../trip/TripCarrierPricing";
import style from "./PricingStepThree.module.scss";
import ModalSelectCarrierPricing from "../modals/ModalSelectCarrierPricing";
import { Control, useFieldArray, useForm } from "react-hook-form";
import {
  CarrierPricingFinish,
  TransferRequestFinish
} from "@/types/logistics/transferRequest/transferRequest";
import { useParams } from "next/navigation";
import { STATUS } from "@/utils/constants/globalConstants";

type Props = {
  data: {
    journey?: ITransferRequestJourneyReview[];
  };
  modalCarrier: boolean;
  // eslint-disable-next-line no-unused-vars
  handleModalCarrier: (value: boolean) => void;
  // eslint-disable-next-line no-unused-vars
  mutateStepthree: (journey: ITransferRequestJourneyReview[]) => void;
  control: Control<TransferRequestFinish, any>;
};
export default function PricingStepThree({
  data,
  modalCarrier,
  handleModalCarrier,
  mutateStepthree,
  control
}: Props) {
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "providers"
  });
  const handleSelectCarrier = (cp: CarrierPricingFinish) => {
    if (
      !data?.journey?.some((j) =>
        j.trips.some((t) =>
          t.carriers_pricing.some(
            (c) => c.id === cp.id_carrier_request && c.status === STATUS.CR.ASIGNADAS
          )
        )
      )
    )
      return;
    const index = fields.findIndex((a) => a.id_trip === cp.id_trip);
    if (index === -1) {
      append(cp);
    } else {
      update(index, cp);
    }
  };
  const [openTabs, setOpenTabs] = useState<number[]>([]);
  const tag = ({ trips }: { trips: TripCarriersPricing[] }) => (
    <Flex gap={24} vertical className={style.tripCarrierPricing}>
      {trips.map((trip, index) => (
        <TripCarrierPricing
          key={`trip-${index}-${trip.id_trip}`}
          trip={trip}
          handleSelectCarrier={handleSelectCarrier}
          fields={fields}
        />
      ))}
    </Flex>
  );
  return (
    <Flex gap={24} vertical>
      {data.journey?.map((journey, index) => (
        <JourneyCollapse
          key={index}
          index={index}
          id_type_service={journey.service_type}
          start_location_desc={journey.start_location_desc}
          end_location_desc={journey.end_location_desc}
          openTabs={openTabs}
          setOpenTabs={setOpenTabs}
          tag={tag({ trips: journey.trips })}
        />
      ))}
      <ModalSelectCarrierPricing
        open={modalCarrier}
        handleModalCarrier={handleModalCarrier}
        mutateStepthree={mutateStepthree}
      />
    </Flex>
  );
}
