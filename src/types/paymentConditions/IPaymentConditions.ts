export interface IPaymentConditions {
  status: number;
  message: string;
  data: IPaymentCondition[];
}

export interface IPaymentCondition {
  id: number;
  condition_day: number;
}
