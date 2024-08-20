import config from "@/config";
import { MessageType } from "@/context/MessageContext";
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
  selectedPeriodicity: IPeriodicityModalForm | undefined;
  zones: number[];
  selectedBusinessRules: ISelectedBussinessRules;
  assignedGroups: number[];
  projectId: number;
  // eslint-disable-next-line no-unused-vars
  showMessage: (type: MessageType, content: string) => void;
}

export const createCommunication = async ({
  data,
  selectedPeriodicity,
  zones,
  selectedBusinessRules,
  assignedGroups,
  projectId,
  showMessage
}: ICreateCommunicationProps) => {
  const now = new Date();
  const timeString = now.toLocaleString("es-CO");
  const modelData: ICreateCommunication = {
    // Where does invoice should come from?
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
        time: timeString,
        message: data.template.message,
        // Where does title should come from?
        title: data.template?.title || "",
        subject: data.template.subject,
        files: data.template.files.map((file) => file.value)
      }
    }
  };

  try {
    const response: string = await API.post(`${config.API_HOST}/comunication/create`, modelData);
    showMessage("success", response);

    return response;
  } catch (error) {
    showMessage("error", "Ocurrió un error al crear la comunicación");
    return Promise.reject(error);
  }
};
