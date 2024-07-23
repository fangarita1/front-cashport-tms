import { FC, useState } from "react";
import {
  ArrowLineDown,
  CaretDoubleRight,
  DotsThree,
  Envelope,
  Minus,
  Plus,
  Receipt
} from "phosphor-react";
import styles from "./invoice-detail-modal.module.scss";
import { useInvoiceDetail } from "@/hooks/useInvoiceDetail";
import InvoiceDownloadModal from "../../components/invoice-download-modal";
import { Button } from "antd";
import { IInvoice } from "@/types/invoices/IInvoices";
import { formatDatePlane, formatMoney } from "@/utils/utils";
import { useSWRConfig } from "swr";

interface InvoiceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoiceId: number;
  clientId: number;
  hiddenActions?: boolean;
  // eslint-disable-next-line no-unused-vars
  handleActionInDetail?: (invoice: IInvoice) => void;
  selectInvoice?: IInvoice;
  projectId?: number;
}

const InvoiceDetailModal: FC<InvoiceDetailModalProps> = ({
  isOpen,
  onClose,
  invoiceId,
  clientId,
  hiddenActions,
  projectId,
  selectInvoice,
  handleActionInDetail
}) => {
  const { mutate } = useSWRConfig();
  const { data: invoiceData } = useInvoiceDetail({ invoiceId, clientId, projectId });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const statusClass = (status: string): string => {
    switch (status) {
      case "Identificado" || "coinciliada":
        return styles.identifiedReconciled;
      case "En auditoría":
        return styles.inAudit;
      case "No identificado":
        return styles.unidentified;
      case "aplicacion":
        return styles.applied;
      case "Ap. parcialmente":
        return styles.partially;
      case "sin conciliar":
        return styles.noReconcile;
      case "novedades":
        return styles.novelty;
      case "saldo":
        return styles.balances;
      case "glosado":
        return styles.glossed;
      case "devolucion":
        return styles.return;
      case "vencida":
        return styles.annulment;
      default:
        return "";
    }
  };
  const getEventTitle = (item: string) => {
    switch (item) {
      case "Generar nota de credito":
        return "Nota de crédito aplicada";
      case "Generar nota de debito":
        return "Nota de débito aplicada";
      case "Generar descuento":
        return "Descuento aplicado";
      default:
        return item;
    }
  };

  console.log(invoiceData, "invoiceData", selectInvoice);

  return (
    <aside className={`${styles.wrapper} ${isOpen ? styles.show : styles.hide}`}>
      <InvoiceDownloadModal isModalOpen={isModalOpen} handleCloseModal={setIsModalOpen} />
      <div>
        <div className={styles.modalTopSide}>
          <button type="button" className={styles.back} onClick={onClose}>
            <CaretDoubleRight />
          </button>
        </div>
        <div className={styles.header}>
          <h4 className={styles.numberInvoice}>Factura {invoiceId}</h4>
          <div className={styles.viewInvoice}>
            <Receipt size={20} />
            Ver factura
          </div>
          {hiddenActions ? null : (
            <Button
              className={styles.button__actions}
              size="large"
              icon={<DotsThree size={"1.5rem"} />}
              onClick={() => {
                mutate(`/invoice/${invoiceId}/client/${clientId}/project/${projectId}`);
                handleActionInDetail?.(selectInvoice!);
              }}
            >
              Generar acción
            </Button>
          )}
        </div>
        <div className={styles.idOrder}>
          ID orden de compra
          <div className={styles.id}>XXXXX</div>
        </div>

        <div className={styles.body}>
          <div className={styles.headerBody}>
            <div className={styles.title}>Trazabilidad</div>
            <div
              className={`${styles.status} ${statusClass(invoiceData ? invoiceData?.results[0].status_name : "")}`}
            >
              {invoiceData ? invoiceData?.results[0].status_name : ""}
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.progress}></div>
            <div className={styles.description}>
              <div className={styles.stepperContainer}>
                <div className={styles.stepperContent}>
                  {(invoiceData?.results ?? []).map((item) => {
                    return (
                      <div key={item.id} className={styles.mainStep}>
                        <div
                          className={`${styles.stepLine} ${item.status_name && styles.active}`}
                        />
                        <div
                          className={`${styles.stepCircle} ${item.status_name && styles.active}`}
                        />
                        <div className={styles.stepLabel}>
                          <div className={styles.cardInvoiceFiling}>
                            <h5 className={styles.title}>{getEventTitle(item.event_type_name)}</h5>
                            <div className={styles.date}>
                              {formatDatePlane(item.create_at.toString())}
                            </div>
                            {item.event_type_name === "Aviso de vencimiento" ? (
                              <div className={styles.quantity}>
                                <div
                                  className={styles.button}
                                  onClick={() => {
                                    setQuantity(quantity - 1);
                                  }}
                                >
                                  <Minus size={12} />
                                </div>
                                <div className={styles.number}>{quantity}</div>
                                <div
                                  className={styles.button}
                                  onClick={() => {
                                    setQuantity(quantity + 1);
                                  }}
                                >
                                  <Plus size={12} />
                                </div>
                              </div>
                            ) : null}
                            {item.event_type_name === "Generar nota de credito" ||
                            item.event_type_name === "Generar nota de debito" ? (
                              <div>
                                <div className={styles.icons}>
                                  <ArrowLineDown
                                    size={14}
                                    onClick={() => {
                                      setIsModalOpen;
                                    }}
                                  />
                                </div>
                                <div className={styles.name}>{`Acción: ${item.user_name}`}</div>
                                <div
                                  className={styles.name}
                                >{`Valor: ${formatMoney(item.ammount ?? "0")}`}</div>
                                <div className={styles.adjustment}>
                                  ID del ajuste:
                                  <div className={styles.idAdjustment}>{item.id ?? "N/A"}</div>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}

                            {item.event_type_name === "Emision de factura" ? (
                              <div>
                                <div className={styles.icons}>
                                  <ArrowLineDown
                                    size={14}
                                    onClick={() => {
                                      setIsModalOpen(true);
                                    }}
                                  />
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {item.event_type_name === "Generar descuento" ? (
                              <div>
                                <div className={styles.icons}>
                                  <ArrowLineDown size={14} onClick={() => {}} />
                                </div>
                                <div className={styles.name}>{`Acción: ${item.user_name}`}</div>
                                <div
                                  className={styles.name}
                                >{`Valor: ${formatMoney(item.ammount ?? "0")}`}</div>
                                <div className={styles.adjustment}>
                                  ID del ajuste:
                                  <div className={styles.idAdjustment}>{item.id}</div>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {item.event_type_name === "Acuerdo de pago" ? (
                              <div>
                                <div className={styles.icons}>
                                  <Envelope size={14} onClick={() => {}} />
                                </div>
                                <div className={styles.name}>{`Acción: ${item.user_name}`}</div>
                                <div className={styles.name}>{`Valor: ${""}`}</div>
                                <div className={styles.name}>{`Fecha de pago acordada: ${""}`}</div>
                              </div>
                            ) : (
                              ""
                            )}
                            {item.event_type_name === "Vencimiento acuerdo de pago" ? (
                              <div>
                                <div className={styles.icons}>
                                  <Envelope size={14} onClick={() => {}} />
                                </div>
                                <div className={styles.name}>{`Acción: ${item.user_name}`}</div>
                                <div className={styles.name}>{`Valor: ${""}`}</div>
                              </div>
                            ) : (
                              ""
                            )}
                            {item.event_type_name === "Radicación" ? (
                              <div>
                                <div className={styles.icons}>
                                  <ArrowLineDown size={14} onClick={() => {}} />
                                </div>
                                <div
                                  className={styles.name}
                                >{`Responsable: ${item.user_name}`}</div>
                              </div>
                            ) : (
                              ""
                            )}
                            {item.event_type_name === "Cambiar estado" ? (
                              <div>
                                <div className={styles.icons}>
                                  <ArrowLineDown size={14} onClick={() => {}} />
                                </div>
                                <div className={styles.name}>{`Acción: ${item.user_name}`}</div>
                                <div
                                  className={styles.name}
                                >{`Estado inicial: ${item.previous_status_id ?? "N/A"}`}</div>
                                <div
                                  className={styles.name}
                                >{`Estado final: ${item.status_name}`}</div>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <h4 className={styles.resume}>Resumen</h4>
        <div className={styles.bodyContent}>
          <div className={styles.initialValue}>
            <p className={styles.value}>Valor inicial</p>
            <p className={styles.result}>
              {formatMoney(selectInvoice?.initial_value.toString() ?? "")}
            </p>
          </div>
          {invoiceData?.totals?.total_creditNotes !== undefined &&
            invoiceData?.totals?.total_creditNotes > 0 && (
              <div className={styles.initialValue}>
                <p className={styles.value}>Nota credito</p>
                <p className={styles.result}>
                  {formatMoney(invoiceData?.totals.total_creditNotes.toString() ?? "")}
                </p>
              </div>
            )}
          {invoiceData?.totals?.total_debitNotes !== undefined &&
            invoiceData?.totals?.total_debitNotes > 0 && (
              <div className={styles.initialValue}>
                <p className={styles.value}>Nota debito</p>
                <p className={styles.result}>
                  {formatMoney(invoiceData?.totals.total_debitNotes.toString() ?? "")}
                </p>
              </div>
            )}
          {invoiceData?.totals?.total_discount !== undefined &&
            invoiceData?.totals?.total_discount > 0 && (
              <div className={styles.initialValue}>
                <p className={styles.value}>Descuento</p>
                <p className={styles.result}>
                  {formatMoney(invoiceData?.totals.total_discount.toString() ?? "")}
                </p>
              </div>
            )}

          <hr />
          <div className={styles.total}>
            <p className={styles.value}>Total</p>
            <p className={styles.result}>
              {formatMoney(invoiceData?.totals.total_general.toString() ?? "")}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default InvoiceDetailModal;
