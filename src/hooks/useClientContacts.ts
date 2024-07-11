import { IGetContacts } from "@/types/contacts/IContacts";
import { fetcher } from "@/utils/api/api";
import useSWR from "swr";

export const useClientContacts = (clientId: number) => {
  const { data, isLoading, mutate } = useSWR<IGetContacts>(
    `client/${clientId}/contact`,
    fetcher,
    {}
  );

  return {
    data,
    isLoading
  };
};
