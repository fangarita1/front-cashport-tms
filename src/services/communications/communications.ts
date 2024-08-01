import config from "@/config";
import { ISelectedBussinessRules } from "@/types/bre/IBRE";
import {
  ICommunicationForm,
  ICreateCommunication,
  IPeriodicityModalForm
} from "@/types/communications/ICommunications";
import { API } from "@/utils/api/api";

export const getForwardEvents = async (): Promise<string[]> => {
  const response: string[] = await API.get(`${config.API_HOST}/comunication/get_events`);
  return response;
};

export const getTemplateTags = async (): Promise<string[]> => {
  const response: string[] = await API.get(`${config.API_HOST}/comunication/get_tags`);
  return response;
};

export const getForwardToEmails = async (): Promise<string[]> => {
  const response: string[] = await API.get(`${config.API_HOST}/comunication/get_emails`);
  return response;
};

interface ICreateCommunicationProps {
  data: ICommunicationForm;
  selectedPeriodicity: IPeriodicityModalForm;
  zones: number[];
  selectedBusinessRules: ISelectedBussinessRules;
  assignedGroups: number[];
  projectId: number;
}

export const createCommunication = async ({
  data,
  selectedPeriodicity,
  zones,
  selectedBusinessRules,
  assignedGroups,
  projectId
}: ICreateCommunicationProps) => {
  const now = new Date();
  const timeString = now.toLocaleString("es-CO");
  console.log(timeString);
  const modelData: ICreateCommunication = {
    // De donde sale el invoice id?
    invoice_id: 1,
    project_id: projectId,
    data: {
      name: data.name,
      descripcion: data.description,
      trigger: {
        type: data.trigger.type,
        settings: {
          init_date: selectedPeriodicity?.init_date.toISOString().split("T")[0],
          end_date: selectedPeriodicity?.end_date.toISOString().split("T")[0],
          repeat: selectedPeriodicity?.frequency_number,
          frequency: selectedPeriodicity?.frequency?.value,
          days:
            data.trigger.type === "evento"
              ? data.trigger?.settings?.days
              : selectedPeriodicity?.days?.map((day) => day.value),
          values: data.trigger.settings.values?.map((value) => value.value),
          event_type: data.trigger.settings.event_type?.value
        }
      },
      rules: {
        channel: selectedBusinessRules.channels,
        line: selectedBusinessRules.lines,
        subline: selectedBusinessRules.sublines,
        zone: zones,
        groups_id: assignedGroups
      },
      template: {
        via: data.template.via.value,
        send_to: data.template.send_to.map((mail) => mail.value),
        copy_to: data.template.copy_to.map((mail) => mail.value),
        tags: data.template.tags.map((tag) => tag.value),
        // TIME ? DE DONDE SALE?
        time: timeString,
        message: data.template.message,
        title: data.template?.title || "",
        subject: data.template.subject,
        files: data.template.files.map((file) => file.value)
      }
    }
  };
  console.log("data para POST:", modelData);

  try {
    const response = await API.post(`${config.API_HOST}/comunication/create`, modelData);

    console.log("responseCreate Communication", response);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};
