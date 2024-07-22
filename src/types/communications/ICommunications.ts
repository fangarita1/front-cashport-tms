interface TriggerSettingsForm {
  init_date?: string;
  end_date?: string | null;
  frequency?: string;
  days?: string[];
  values?: ISelectStringType[];
  subValues?: ISelectStringType[];
  eventType?: ISelectStringType;
  noticeDaysEvent?: string;
}

interface TriggerForm {
  type: "accion" | "frecuencia";
  settings: TriggerSettingsForm;
}

interface TemplateForm {
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
  template: TemplateForm;
}

interface ISelectStringType {
  value: string;
  label: string;
}
