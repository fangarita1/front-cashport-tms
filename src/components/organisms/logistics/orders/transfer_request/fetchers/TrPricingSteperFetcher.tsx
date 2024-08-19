"use client";
import { getTransferRequestSteps } from "@/services/logistics/transfer-request";
import { Spin } from "antd";
import { useEffect } from "react";
import useSWR from "swr/immutable";
import PricingTransferRequest from "../PricingTransferRequest";
import { MODE_PRICING } from "../constant/constants";

export default function TrPricingSteperFetcher({ id }: { id: number }) {
  const { data, isLoading } = useSWR({ id }, ({ id }) => getTransferRequestSteps(id), {
    onError: (error) => {
      console.error("error", error);
    }
  });
  useEffect(() => {
    console.log("data", data);
  }, [data]);
  if (isLoading || !data) return <Spin />;
  return <PricingTransferRequest data={data} mode={MODE_PRICING.TRANSFER_REQUEST} />;
}
