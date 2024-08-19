import { ITransferRequestJourneyReview } from "@/types/logistics/schema";
import { Flex } from "antd";
import JourneyCollapse from "../journeyCollapse/JourneyCollapse";
import { useState } from "react";

type Props = {
  data: {
    journey: ITransferRequestJourneyReview[];
  };
};
export default function PricingStepThree({ data }: Props) {
    const [openTabs, setOpenTabs] = useState<number[]>([]);
  return (
    <Flex gap={24} vertical>
      {data.journey.map((journey, index) => (
        <JourneyCollapse
          key={index}
          index={index}
          id_type_service={journey.service_type}
          start_location_desc={journey.start_location_desc}
          end_location_desc={journey.end_location_desc}
          openTabs={openTabs}
          setOpenTabs={setOpenTabs}
          tags={<div>horaInicial</div>}
        />
      ))}
    </Flex>
  );
}
