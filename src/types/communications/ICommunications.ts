interface TriggerSettingsForm {
  days?: string[];
  values?: ISelectStringType[];
  subValues?: ISelectStringType[];
  event_type?: ISelectStringType;
  noticeDaysEvent?: string;
}

interface TriggerForm {
  type: "accion" | "frecuencia" | "evento";
  settings: TriggerSettingsForm;
}

interface ITemplateForm {
  via: ISelectStringType;
  send_to: ISelectStringType[];
  copy_to: ISelectStringType[];
  tags: ISelectStringType[];
  time: string;
  message: string;
  title?: string;
  subject: string;
  files: ISelectStringType[];
}

export interface ICommunicationForm {
  name: string;
  description: string;
  trigger: TriggerForm;
  template: ITemplateForm;
}

export interface ISelectStringType {
  value: string;
  label: string;
}

export interface IPeriodicityModalForm {
  init_date: Date;
  frequency_number: number;
  frequency: ISelectStringType;
  days: ISelectStringType[];
  end_date: Date;
}

export interface ICreateCommunication {
  invoice_id: number;
  project_id: number;
  data: {
    name: string;
    descripcion: string;
    trigger: {
      type: string;
      settings: {
        init_date?: string;
        end_date?: string | null;
        repeat?: number;
        frequency?: string;
        days?: string[];
        values?: string[];
        event_type?: string;
      };
    };
    rules: {
      channel: number[];
      line: number[];
      subline: number[];
      zone: number[];
      groups_id: number[];
    };
    template: {
      via: string;
      send_to: string[];
      copy_to: string[];
      tags: string[];
      time: string;
      message: string;
      title: string;
      subject: string;
      files: string[];
    };
  };
}
