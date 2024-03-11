export interface IBRE {
  status: number;
  message: string;
  data: IChanel[];
}

export interface IChanel {
  CHANNEL_ID: number;
  CHANNEL_NAME: string;
  PROJECT_ID: number;
  IS_DELETED: number;
  CHANNEL_LINES: ChannelLine[];
}

export interface ChannelLine {
  id: number;
  sublines: Subline[];
  description: string;
}

export interface Subline {
  id: number;
  description: string;
}
