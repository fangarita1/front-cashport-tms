"use client";
import useSWR from "swr";
import { fetcher } from "@/utils/api/api";
import { UserByTokenResponse } from "@/types/users/IUserByToken";

export const useUserByToken = () => {
  const { data, isLoading } = useSWR<UserByTokenResponse>(`/user/token`, fetcher);

  return {
    data: {
      projectId: data?.data.PROJECT_ID || 0
    },
    loading: isLoading
  };
};
