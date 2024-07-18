import React, { useEffect, useState } from "react";
import LabelCollapse from "@/components/ui/label-collapse";
import UiSearchInput from "@/components/ui/search-input/search-input";
import { Button, Collapse, Flex } from "antd";
import { ConcilationTable } from "../ConcilationTable/ConcilationTable";
import { InfoConcilation } from "@/types/concilation/concilation";
import "./stateConcilationTable.scss";
import { ModalEstimatedConcilation } from "@/components/molecules/modals/ModalEstimatedConcilation/ModalEstimatedConcilation";
import InvoiceDetailModal from "@/modules/clients/containers/invoice-detail-modal";
import { extractSingleParam } from "@/utils/utils";
import { useParams } from "next/navigation";

export const StateConcilationTable = () => {
  const [invoices, setInvoices] = useState<InfoConcilation | undefined>({
    reconciled_invoices: {
      invoices: [
        {
          id: 1,
          create_at: new Date("2024-04-12T03:00:00.000Z"),
          current_value: 50000,
          observation: null,
          difference_amount: 0.2,
          accept_date: new Date("2024-06-15T03:00:00.000Z")
        },
        {
          id: 2,
          create_at: new Date("2024-04-12T03:00:00.000Z"),
          current_value: 50000,
          observation: null,
          difference_amount: null,
          accept_date: new Date("2024-06-15T03:00:00.000Z")
        },
        {
          id: 3,
          create_at: new Date("2024-04-12T03:00:00.000Z"),
          current_value: 5000000,
          observation: null,
          difference_amount: 20000,
          accept_date: new Date("2024-06-15T03:00:00.000Z")
        }
      ],
      quantity: 3,
      amount: 51000000
    },
    invoices_not_found: {
      invoices: [
        {
          id: 1,
          create_at: new Date("2024-04-12T03:00:00.000Z"),
          current_value: 20000000,
          observation: null,
          difference_amount: null,
          accept_date: new Date("2024-06-15T03:00:00.000Z")
        }
      ],
      quantity: 1,
      amount: 20000000
    },
    invoices_with_differences: {
      invoices: [
        {
          id: 1,
          create_at: new Date("2024-04-12T03:00:00.000Z"),
          current_value: 100000000,
          observation: null,
          difference_amount: null,
          accept_date: new Date("2024-06-15T03:00:00.000Z")
        }
      ],
      quantity: 1,
      amount: 100000000
    }
  });
  const [activeKeys, setActiveKeys] = useState<string[]>([]);

  const [isDetailInvoiceModalOpen, setIsDetailInvoiceModalOpen] = useState(false);
  const params = useParams();
  const clientIdParam = extractSingleParam(params.clientId);
  const clientId = clientIdParam ? parseInt(clientIdParam) : 0;
  const [showInvoiceDetailModal, setShowInvoiceDetailModal] = useState({
    isOpen: false,
    invoiceId: 0
  });

  useEffect(() => {
    if (invoices) {
      const keys = Object.keys(invoices);
      setActiveKeys(keys.slice(1)); // Dejar el primer ítem cerrado
    }
  }, [invoices]);

  return (
    <div className="concilation_table">
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
            onChange={(event) => {
              console.log(event.target.value);
            }}
          />
          <Button
            className="button__actions"
            size="large"
            onClick={() => console.log("click generar accion")}
          >
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
                    dataSingleInvoice={invoiceState.invoices}
                    setShowInvoiceDetailModal={setShowInvoiceDetailModal}
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
