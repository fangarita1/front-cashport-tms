export interface IDocumentsTypes {
  status: number;
  message: string;
  data: IDocumentType[];
}

interface IDocumentType {
  id: number;
  document_name: string;
}
