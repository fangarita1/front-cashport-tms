import axios from "axios";

import { getIdToken } from "@/utils/api/api";
import config from "@/config";

import { ICreateProject } from "../../types/projects/ICreateProject";
import { IFormProject } from "@/types/projects/IFormProject";

export const addProject = async (data: IFormProject): Promise<ICreateProject> => {
  const token = await getIdToken();
  const currenciesFinal = data.general.currencies.map((currency) => ({
    id: currency.value,
    currency_name: currency.label
  }));
  const colorRgb = data.personalization.color.metaColor;
  const finalColorRgb = `rgb(${Math.trunc(colorRgb.r)},${Math.trunc(colorRgb.g)},${Math.trunc(colorRgb.b)})`;
  const finalData = {
    logo: data.logo,
    project_description: data.general.name,
    rgb_config: finalColorRgb,
    nit: data.general.nit,
    email: data.contact.email,
    contact: data.contact.name,
    phone: data.contact.phone,
    address: data.general.address,
    country_id: data.general.country.value,
    currency: JSON.stringify(currenciesFinal),
    accept_date: data.general.accept_date === "Fecha de emisión" ? false : true,
    dso_days: data.general.DSO_days,
    dso_currenly_year: data.general.DSO_currenly_year === "Sí" ? true : undefined,
    name: data.general.name,
    position_contact: data.contact.position_contact
  };
  const formData = new FormData();
  formData.append("logo", finalData.logo);
  formData.append("project_description", finalData.project_description);
  formData.append("rgb_config", finalData.rgb_config);
  formData.append("nit", finalData.nit);
  formData.append("email", finalData.email);
  formData.append("contact", finalData.contact);
  formData.append("phone", finalData.phone);
  formData.append("address", finalData.address);
  formData.append("country_id", finalData.country_id.toString());
  formData.append("currency", finalData.currency);
  formData.append("accept_date", finalData.accept_date.toString());
  if (finalData.dso_days) {
    formData.append("dso_days", finalData.dso_days.toString());
  }
  if (finalData.dso_currenly_year) {
    formData.append("dso_currenly_year", finalData.dso_currenly_year.toString());
  }
  formData.append("name", finalData.name);
  formData.append("position_contact", finalData.position_contact);

  try {
    const response: ICreateProject = await axios.post(`${config.API_HOST}/project`, formData, {
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.log("ERROR: ", error);
    return error as any;
  }
};

export const updateProject = async (
  data: IFormProject,
  id: string,
  UUID: string
): Promise<ICreateProject> => {
  const token = await getIdToken();
  const currenciesFinal = data.general.currencies.map((currency) => ({
    id: currency.value,
    currency_name: currency.label
  }));
  const colorRgb = data.personalization.color.metaColor;
  const finalColorRgb = colorRgb
    ? `rgb(${Math.trunc(colorRgb.r)},${Math.trunc(colorRgb.g)},${Math.trunc(colorRgb.b)})`
    : data.personalization.color;

  const finalData = {
    id,
    is_active: true,
    project_description: data.general.name,
    rgb_config: finalColorRgb,
    logo: data.logo,
    nit: data.general.nit,
    email: data.contact.email,
    contact: data.contact.name,
    phone: data.contact.phone,
    address: data.general.address,
    country_id: data.general.country.value,
    currency: JSON.stringify(currenciesFinal),
    accept_date: data.general.accept_date === "Fecha de emisión" ? false : true,
    dso_days: data.general.DSO_days,
    dso_currenly_year: data.general.DSO_currenly_year === "Sí" ? true : undefined,
    name: data.general.name,
    position_contact: data.contact.position_contact
  };

  const formData = new FormData();
  formData.append("id", id);
  formData.append("uuid", UUID);
  typeof finalData.logo !== "string" && formData.append("logo", finalData.logo);
  formData.append("project_description", finalData.project_description);
  formData.append("rgb_config", finalData.rgb_config);
  formData.append("nit", finalData.nit);
  formData.append("email", finalData.email);
  formData.append("contact", finalData.contact);
  formData.append("phone", finalData.phone);
  formData.append("address", finalData.address);
  formData.append("country_id", finalData.country_id.toString());
  formData.append("currency", finalData.currency);
  formData.append("accept_date", finalData.accept_date.toString());
  if (finalData.dso_days) {
    formData.append("dso_days", finalData.dso_days.toString());
  }
  if (finalData.dso_currenly_year) {
    formData.append("dso_currenly_year", finalData.dso_currenly_year.toString());
  }
  formData.append("name", finalData.name);
  formData.append("position_contact", finalData.position_contact);

  try {
    const response: ICreateProject = await axios.put(`${config.API_HOST}/project`, formData, {
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.log("ERROR: ", error);
    return error as any;
  }
};
export const activateProject = async (id: string): Promise<ICreateProject> => {
  const token = await getIdToken();
  try {
    const response: ICreateProject = await axios.put(
      `${config.API_HOST}/project/active/${id}`,
      {},
      {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`
        }
      }
    );

    return response;
  } catch (error) {
    return error as any;
  }
};

export const desactiveProject = async (id: string): Promise<ICreateProject> => {
  const token = await getIdToken();
  try {
    const response: ICreateProject = await axios.delete(`${config.API_HOST}/project/${id}`, {
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    return error as any;
  }
};
