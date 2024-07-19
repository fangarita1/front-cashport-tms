import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import LabelCollapse from "@/components/ui/label-collapse";
import UiSearchInput from "@/components/ui/search-input/search-input";
import { Button, Collapse, Flex, message } from "antd";
import { ConcilationTable } from "../ConcilationTable/ConcilationTable";
import { InfoConcilation, InvoicesConcilation } from "@/types/concilation/concilation";
import "./stateConcilationTable.scss";
import { ModalEstimatedConcilation } from "@/components/molecules/modals/ModalEstimatedConcilation/ModalEstimatedConcilation";
import InvoiceDetailModal from "@/modules/clients/containers/invoice-detail-modal";
import { invoiceCreateIncident } from "@/services/concilation/concilation";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store/store";

interface Props {
  invoices: InfoConcilation | undefined;
  clientId: number;
  setInvoices: Dispatch<SetStateAction<InfoConcilation | undefined>>;
}

export const StateConcilationTable = ({ invoices, clientId, setInvoices }: Props) => {
  const { ID } = useAppStore((state) => state.selectProject);
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [_, setIsDetailInvoiceModalOpen] = useState(false);

  const [showInvoiceDetailModal, setShowInvoiceDetailModal] = useState({
    isOpen: false,
    invoiceId: 0
  });

  useEffect(() => {
    if (invoices) {
      const keys = Object.keys(invoices);
      setActiveKeys(keys.slice(1));
    }
  }, [invoices]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredInvoices = (invoiceCategory: InvoicesConcilation) => {
    return {
      ...invoiceCategory,
      invoices: invoiceCategory?.invoices.filter((invoice) =>
        invoice?.id.toString().includes(searchTerm)
      )
    };
  };

  const addSelectMotive = (invoiceId: number, motiveId: number) => {
    if (invoices) {
      const updatedInvoices = { ...invoices };
      for (const categoryKey in updatedInvoices) {
        if (Object.prototype.hasOwnProperty.call(updatedInvoices, categoryKey)) {
          const category = updatedInvoices[categoryKey as keyof InfoConcilation];
          category.invoices = category.invoices.map((invoice) =>
            invoice.id === invoiceId ? { ...invoice, motive_id: motiveId } : invoice
          );
        }
      }
      setInvoices(updatedInvoices);
    }
  };

  const onSubmitConcilation = async () => {
    if (!invoices) return;

    // Validate that all invoices in specified categories have a motive_id
    const categoriesToValidate = ["invoices_not_found", "invoices_with_differences"];
    for (const category of categoriesToValidate) {
      const invoiceCategory = invoices[category as keyof InfoConcilation];
      if (invoiceCategory) {
        for (const invoice of invoiceCategory.invoices) {
          if (invoice.motive_id == null) {
            messageApi.error(
              "Por favor seleccione un motivo para todas las facturas no encontradas y con direncias"
            );
            return;
          }
        }
      }
    }

    const invoiceList = Object.entries(invoices).flatMap(([key, category]) =>
      category.invoices.map((invoice: { id: string; motive_id: string; difference: string }) => ({
        invoice_id: invoice.id,
        motive_id: invoice.motive_id,
        difference: invoice.difference,
        status: key
      }))
    );

    const files: File[] = [];
    const comments = "Entrega conciliacion masiva";

    try {
      const response = await invoiceCreateIncident(files, invoiceList, comments, clientId);
      if (response.status == 200) {
        router.push(`/clientes/detail/${clientId}/project/${ID}`);
      }
    } catch (error) {}
  };
  return (
    <div className="concilation_table">
      {contextHolder}
      {invoices && (
        <ModalEstimatedConcilation
          invoice={{
            amount: invoices.reconciled_invoices.amount,
            quantity: invoices.reconciled_invoices.quantity
          }}
          notFoundInvoices={{
            amount: invoices.invoices_not_found.amount,
            quantity: invoices.invoices_not_found.quantity
          }}
          differenceInvoices={{
            amount: invoices.invoices_with_differences.amount,
            quantity: invoices.invoices_with_differences.quantity
          }}
        />
      )}
      <Flex justify="space-between" className="concilation_table__header">
        <Flex className="searchBar__container">
          <UiSearchInput
            className="search"
            placeholder="Buscar por factura"
            onChange={handleSearchChange}
          />
          <Button className="button__actions" size="large" onClick={onSubmitConcilation}>
            Guardar
          </Button>
        </Flex>
      </Flex>
      <Collapse
        ghost
        activeKey={activeKeys}
        onChange={(keys) => setActiveKeys(typeof keys === "string" ? [keys] : keys)}
        items={
          invoices
            ? Object.entries(invoices).map(([key, invoiceState]) => ({
                key: key,
                label: (
                  <LabelCollapse
                    status={getStatusTitle(key)}
                    total={invoiceState.amount}
                    quantity={invoiceState.quantity}
                    color={getStatusColor(key)}
                  />
                ),
                children: (
                  <ConcilationTable
                    dataSingleInvoice={filteredInvoices(invoiceState)?.invoices}
                    setShowInvoiceDetailModal={setShowInvoiceDetailModal}
                    addSelectMotive={addSelectMotive}
                  />
                )
              }))
            : []
        }
      />
      {showInvoiceDetailModal?.isOpen && (
        <InvoiceDetailModal
          hiddenActions
          isOpen={showInvoiceDetailModal?.isOpen || false}
          onClose={() => setShowInvoiceDetailModal({ isOpen: false, invoiceId: 0 })}
          invoiceId={showInvoiceDetailModal?.invoiceId || 0}
          clientId={clientId}
          handleisGenerateActionOpen={setIsDetailInvoiceModalOpen}
        />
      )}
    </div>
  );
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "reconciled_invoices":
      return "#0085FF";
    case "invoices_not_found":
      return "#969696";
    case "invoices_with_differences":
      return "#E53261";
    default:
      return "gray";
  }
};

const getStatusTitle = (status: string) => {
  switch (status) {
    case "reconciled_invoices":
      return "conciliado";
    case "invoices_not_found":
      return "Facturas no encontrada";
    case "invoices_with_differences":
      return "Diferencias en montos";
    default:
      return "gray";
  }
};
