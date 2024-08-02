export interface IPayment {
  id: number;
  entered: string;
  identified: string;
  reference: number;
  amount: number;
  available: number;
  payment_status_id: number;
}
