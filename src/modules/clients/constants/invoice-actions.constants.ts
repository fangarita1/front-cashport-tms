export enum InvoiceAction {
  GenerateAction = "generate-action",
  AccountingAdjustments = "accounting-adjustments",
  AccountingAdjustmentsGenerateCreditNote = "accounting-adjustments-generate-credit-note",
  AccountingAdjustmentsGenerateDiscount = "accounting-adjustments-generate-discount",
  AccountingAdjustmentsGenerateDebitNote = "accounting-adjustments-generate-debit-note",
  PaymentAgreement = "payment-agreement",
  PaymentAgreementGeneratePaymentAgreement = "payment-agreement-generate-payment-agreement",
  PaymentAgreementGeneratePayment = "payment-agreement-generate-payment"
}

export enum GenerateDebitNoteStep {
  SelectNotes = "select-notes",
  DefineAmount = "define-amount",
  Evidence = "evidence"
}
