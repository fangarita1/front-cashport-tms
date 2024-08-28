import config from "@/config";
import { IUserPermissions } from "@/types/userPermissions/IUserPermissions";
import { API } from "@/utils/api/api";

export const getUserPermissions = async (): Promise<IUserPermissions> => {
  try {
    const response: IUserPermissions = await API.get(`${config.CORE_API_HOST}/role/permissions`, {});

    return response;
  } catch (error) {
    return error as any;
  }
};
