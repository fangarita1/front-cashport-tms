interface TriggerSettingsForm {
  init_date?: string;
  end_date?: string | null;
  frequency?: string;
  days?: string[] | number;
  values?: ISelectStringType[];
  subValues?: ISelectStringType[];
  eventType?: ISelectStringType;
  noticeDaysEvent?: string;
}

interface TriggerForm {
  type: "accion" | "frecuencia" | "evento";
  settings: TriggerSettingsForm;
}

interface ITemplateForm {
  via: ISelectStringType;
  send_to: string[];
  copy_to: string[];
  tags: ISelectStringType[];
  time: string;
  message: string;
  title?: string;
  subject: string;
  files: ISelectStringType[];
}

export interface ICommunicationForm {
  name: string;
  descripcion: string;
  trigger: TriggerForm;
  template: ITemplateForm;
}

interface ISelectStringType {
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
