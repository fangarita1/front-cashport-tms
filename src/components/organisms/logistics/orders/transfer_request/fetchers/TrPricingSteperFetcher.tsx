"use client";
import { getTransferRequestSteps } from "@/services/logistics/transfer-request";
import { Spin } from "antd";
import useSWR from "swr/immutable";
import PricingTransferRequest from "../PricingTransferRequest";
import { MODE_PRICING } from "../constant/constants";
import { ITransferRequestJourneyReview } from "@/types/logistics/schema";

export default function TrPricingSteperFetcher({ id }: { id: number }) {
  const { data, isLoading, mutate } = useSWR({ id }, ({ id }) => getTransferRequestSteps(id), {
    onError: (error) => {
      console.error("error", error);
    }
  });
  if (isLoading || !data) return <Spin />;
  const mutateStepthree = (journey: ITransferRequestJourneyReview[]) => {
    mutate({ ...data, stepThree: { journey } }, { revalidate: false });
  };
  return (
    <PricingTransferRequest
      data={data}
      mode={MODE_PRICING.TRANSFER_REQUEST}
      mutateStepthree={mutateStepthree}
    />
  );
}
