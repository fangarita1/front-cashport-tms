export type CountryCode = "en" | "eur" | "jpn" | "ch" | "kr" | "es" | "co";

export type Pagination = {
  actualPage: number;
  rowsperpage: number;
  totalPages: number;
  totalRows: number;
};
