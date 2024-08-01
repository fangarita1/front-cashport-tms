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

export interface ProviderDetailTravelData {
  totalDistance: string;
  estimatedTime: string;
  volume: string;
  weight: string;
  travelType: string;
  startPoint: string;
  endPoint: string;
  initialTime: string;
  initialDate: Date;
  endTime: string;
  endDate: Date;
}

export interface ProviderDetailDocuments {
  id: number;
  title: string;
  isMandatory?: boolean;
  urlDocument?: string;
}

export interface ProviderDetailAditionalInfo {
  documents: ProviderDetailDocuments[];
  contactData: {
    initialContacts: {
      name: string;
      number: string;
    }[];
    finalContacts: {
      name: string;
      number: string;
    }[];
  };
  finalClient: string;
  aditionalRequirements: {
    type: string;
    quantity: number;
  }[];
  especialIntruction: {
    observation: string;
    documentInfo: ProviderDetailDocuments;
  };
}

export interface ProviderDetailMaterials {
  id: number;
  quantity: number;
  SKU: string;
  name: string;
  volume: number;
  height: number;
  broad: number;
  width: number;
  weight: number;
  dangerIcon: boolean;
  radioactiveIcon: boolean;
}

export interface ProviderDetail {
  vehicle: string;
  total: number;
  travelDetail: string;
  travelData: ProviderDetailTravelData;
  aditionalInfo: ProviderDetailAditionalInfo;
  materials: ProviderDetailMaterials[];
}
