import { transferOrderMerge } from "@/services/logistics/transfer-request";
import { GenericResponse } from "@/types/global/IGlobal";
import { ITransferOrdersRequest } from "@/types/logistics/schema";
import { MessageInstance } from "antd/es/message/interface";
import { useEffect, useState } from "react";
import useSWR from "swr";

type Props = {
  messageApi: MessageInstance;
  orders: number[];
};

export function useTransferRequest({ messageApi, orders }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {

  })

  return {
    loading: isLoading
  };
}
