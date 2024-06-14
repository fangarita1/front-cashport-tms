export type CountryCode = "en" | "eur" | "jpn" | "ch" | "kr" | "es";

export type Pagination = {
  actualPage: number;
  rowsperpage: number;
  totalPages: number;
  totalRows: number;
};
