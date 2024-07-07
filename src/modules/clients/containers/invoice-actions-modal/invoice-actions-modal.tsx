import { FC } from "react";
import { Modal } from "antd";
import { useInvoiceActionsModal } from "../../hooks/invoice-actions/invoice-actions-modal.hook";
import { InvoiceAction } from "../../constants/invoice-actions.constants";
import GenerateAction from "../../components/invoice-actions/generate-action";
import GenerateDebitNote from "../../components/invoice-actions/generate-debit-note";

interface InvoiceActionsModalProps {}

const InvoiceActionsModal: FC<InvoiceActionsModalProps> = () => {
  const { selectedOption } = useInvoiceActionsModal();

  return (
    <Modal open={true} centered footer={null} width={"fit-content"}>
      {selectedOption === InvoiceAction.GenerateAction && <GenerateAction />}
      {selectedOption === InvoiceAction.AccountingAdjustmentsGenerateDebitNote && (
        <GenerateDebitNote />
      )}
    </Modal>
  );
};

export default InvoiceActionsModal;
