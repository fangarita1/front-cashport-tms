export interface ILine {
  id: number;
  channel_id: number;
  description_line: string;
  is_deleted: number;
}
export interface ISubLine {
  id: number;
  line_id: number;
  subline_description: string;
  is_deleted: number;
}
