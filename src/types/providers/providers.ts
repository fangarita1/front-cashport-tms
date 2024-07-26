export interface ProvidersInfo {
  id: number;
  departure: string;
  arrival: string;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  travelType: string;
  vehicle: string;
  timeTraveled: string;
  value: number;
  eyeIcon?: boolean;
  dangerIcon?: boolean;
  radioactiveIcon?: boolean;
}

export interface ProvidersList {
  status_id: number;
  status: string;
  color: string;
  providersDetail: ProvidersInfo[];
}

export interface Providers {
  requested: ProvidersList[];
  onTrack: ProvidersList[];
  closed: ProvidersList[];
}
