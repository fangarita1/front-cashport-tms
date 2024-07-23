import { useEffect, useState } from "react";
import { Button, Flex, Spin, message } from "antd";
import { useParams } from "next/navigation";
import { CaretDoubleRight, DotsThree } from "phosphor-react";
import { extractSingleParam } from "@/utils/utils";
import { useInvoices } from "@/hooks/useInvoices";
import { InvoicesTable } from "@/components/molecules/tables/InvoicesTable/InvoicesTable";
import { ModalGenerateAction } from "@/components/molecules/modals/ModalGenerateAction/ModalGenerateAction";
import UiSearchInput from "@/components/ui/search-input";
import { ModalEstimateTotalInvoices } from "@/components/molecules/modals/modal-estimate-total-invoices/modal-estimate-total-invoices";
import InvoiceDetailModalProps from "@/modules/clients/containers/invoice-detail-modal";
import { IInvoice, InvoicesData } from "@/types/invoices/IInvoices";
import LabelCollapse from "@/components/ui/label-collapse";
import Collapse from "@/components/ui/collapse";
import WalletTabChangeStatusModal from "@/modules/clients/components/wallet-tab-change-status-modal";
import PaymentAgreementModal from "@/modules/clients/components/wallet-tab-payment-agreement-modal";
import { ModalActionDiscountCredit } from "@/components/molecules/modals/ModalActionDiscountCredit/ModalActionDiscountCredit";
import RadicationInvoice from "@/components/molecules/modals/Radication/RadicationInvoice";
import RegisterNews from "@/components/molecules/modals/RegisterNews/RegisterNews";
import { useSWRConfig } from "swr";
import "./wallettab.scss";

export const WalletTab = () => {
  const [invoices, setInvoices] = useState<InvoicesData[] | undefined>([]);
  const [selectedRows, setSelectedRows] = useState<IInvoice[] | undefined>(undefined);
  const [isGenerateActionOpen, setisGenerateActionOpen] = useState(false);
  const [search, setSearch] = useState("");
  const params = useParams();
  const clientIdParam = extractSingleParam(params.clientId);
  const projectIdParam = extractSingleParam(params.projectId);
  const { mutate } = useSWRConfig();
  const [showInvoiceDetailModal, setShowInvoiceDetailModal] = useState<{
    isOpen: boolean;
    invoiceId: number;
  }>({
    isOpen: false,
    invoiceId: 0
  });
  const [showActionDetailModal, setShowActionDetailModal] = useState<{
    isOpen: boolean;
    actionType: number;
  }>({
    isOpen: false,
    actionType: 0
  });
  const [isSelectOpen, setIsSelectOpen] = useState({
    selected: 0
  });
  const [messageShow, contextHolder] = message.useMessage();
  const clientId = clientIdParam ? parseInt(clientIdParam) : 0;
  const projectId = projectIdParam ? parseInt(projectIdParam) : 0;

  const { data, isLoading } = useInvoices({
    clientId: clientId || 0,
    projectId: projectId || 0
  });

  useEffect(() => {
    const invoicesData = data?.filter((invoiceState) => invoiceState.count > 0);

    setInvoices(invoicesData);
  }, [data]);

  const handleisGenerateActionOpen = () => {
    setisGenerateActionOpen(!isGenerateActionOpen);
    mutate(`/invoice/client/${clientId}/project/${projectId}`);
  };

  const handleActionInDetail = (invoice: IInvoice) => {
    setisGenerateActionOpen(!isGenerateActionOpen);
    setSelectedRows([invoice]);
    mutate(`/invoice/client/${clientId}/project/${projectId}`);
  };

  const onCloseModal = () => {
    setisGenerateActionOpen(!isGenerateActionOpen);
    setIsSelectOpen({ selected: 0 });
  };
  const closeAllModal = () => {
    setIsSelectOpen({ selected: 0 });
    setSelectedRows([]);
    handleisGenerateActionOpen();
  };

  return (
    <>
      {contextHolder}
      {selectedRows && selectedRows?.length > 0 && (
        <ModalEstimateTotalInvoices selectedInvoices={selectedRows} />
      )}
      {isLoading ? (
        <Flex justify="center" align="center" style={{ height: "3rem" }}>
          <Spin />
        </Flex>
      ) : (
        <div className="walletTab">
          <Flex justify="space-between" className="walletTab__header">
            <Flex gap={"0.5rem"}>
              <UiSearchInput
                className="search"
                placeholder="Buscar"
                onChange={(event) => {
                  setTimeout(() => {
                    setSearch(event.target.value);
                  }, 1000);
                }}
              />
              <Button
                className="button__actions"
                size="large"
                icon={<DotsThree size={"1.5rem"} />}
                onClick={handleisGenerateActionOpen}
              >
                Generar acción
              </Button>
            </Flex>

            <Button
              type="primary"
              className="button__adjustments"
              onClick={() => console.log("click ajustes contables")}
            >
              Ajustes contables
              <CaretDoubleRight size={16} style={{ marginLeft: "0.5rem" }} />
            </Button>
          </Flex>
          <Collapse
            items={invoices?.map((invoiceState) => ({
              key: invoiceState.status_id,
              label: (
                <LabelCollapse
                  status={invoiceState.status}
                  total={invoiceState.total}
                  quantity={invoiceState.count}
                  color={invoiceState.color}
                />
              ),
              children: (
                <InvoicesTable
                  setShowInvoiceDetailModal={setShowInvoiceDetailModal}
                  dataSingleInvoice={invoiceState.invoices}
                  setSelectedRows={setSelectedRows}
                  selectedRows={selectedRows}
                />
              )
            }))}
          />
        </div>
      )}

      <ModalGenerateAction
        clientId={clientId}
        isOpen={isGenerateActionOpen}
        setSelectOpen={(e) => {
          setisGenerateActionOpen(!isGenerateActionOpen);
          setIsSelectOpen(e);
        }}
        onClose={handleisGenerateActionOpen}
        setShowActionDetailModal={(e) => {
          setisGenerateActionOpen(!isGenerateActionOpen);
          setShowActionDetailModal(e);
        }}
      />

      {showInvoiceDetailModal?.isOpen && (
        <InvoiceDetailModalProps
          isOpen={showInvoiceDetailModal?.isOpen || false}
          onClose={() => {
            setSelectedRows([]);
            setShowInvoiceDetailModal({ isOpen: false, invoiceId: 0 });
          }}
          invoiceId={showInvoiceDetailModal?.invoiceId || 0}
          clientId={clientId}
          projectId={projectId}
          selectInvoice={
            invoices
              ?.flatMap((invoiceState) => invoiceState.invoices)
              .find((invoice) => invoice.id === showInvoiceDetailModal?.invoiceId) || undefined
          }
          handleActionInDetail={handleActionInDetail}
        />
      )}
      <PaymentAgreementModal isOpen={isSelectOpen.selected === 6} onClose={onCloseModal} />
      <ModalActionDiscountCredit
        isOpen={showActionDetailModal?.isOpen}
        onClose={() => {
          setisGenerateActionOpen(!isGenerateActionOpen);
          setShowActionDetailModal({ isOpen: false, actionType: 0 });
        }}
        showActionDetailModal={showActionDetailModal}
        setShowActionDetailModal={setShowActionDetailModal}
        invoiceSelected={selectedRows}
        onCloseAllModals={closeAllModal}
      />
      <WalletTabChangeStatusModal
        isOpen={isSelectOpen.selected === 2}
        onClose={onCloseModal}
        invoiceSelected={selectedRows}
        clientId={clientId}
        projectId={projectId}
        onCloseAllModals={closeAllModal}
        messageShow={messageShow}
      />
      <RadicationInvoice
        isOpen={isSelectOpen.selected === 3}
        onClose={onCloseModal}
        invoiceSelected={selectedRows}
        clientId={clientId}
        projectId={projectId}
        messageShow={messageShow}
      />
      <RegisterNews
        isOpen={isSelectOpen.selected === 1}
        onClose={onCloseModal}
        invoiceSelected={selectedRows}
        clientId={clientId}
        projectId={projectId}
        messageShow={messageShow}
        onCloseAllModals={closeAllModal}
      />
    </>
  );
};
