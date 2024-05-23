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

interface InvoiceDetailModalProps {
  show: boolean;
  onClose: () => void;
}

const InvoiceDetailModal: FC<InvoiceDetailModalProps> = ({ show, onClose }) => {
  const { data: invoiceData } = useInvoiceDetail({ invoiceId: 2, clientId: 98765232 });
  const [currentStep, setCurrentStep] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const statusClass = (status: string): string => {
    switch (status) {
      case "Identificado" || "Coinciliadas":
        return styles.identifiedReconciled;
      case "En auditoría":
        return styles.inAudit;
      case "No identificado":
        return styles.unidentified;
      case "Aplicado":
        return styles.applied;
      case "Ap. parcialmente":
        return styles.partially;
      case "sin conciliar":
        return styles.noReconcile;
      case "Novedades":
        return styles.novelty;
      case "Saldos":
        return styles.balances;
      case "Glosado":
        return styles.glossed;
      case "Devolución":
        return styles.return;
      case "Anulación":
        return styles.annulment;
      default:
        return "";
    }
  };

  return (
    <div className={`${styles.wrapper} ${show ? styles.show : styles.hide}`}>
      <div>
        <div className={styles.modalTopSide}>
          <div className={styles.back} onClick={onClose}>
            <CaretDoubleRight />
          </div>
        </div>
        <div className={styles.header}>
          <div className={styles.numberInvoice}>Factura {2}</div>
          <div className={styles.viewInvoice}>
            <Receipt size={20} />
            Ver factura
          </div>
          <div className={styles.action}>
            <DotsThree size={24} />
            Generar acción
          </div>
        </div>
        <div className={styles.idOrder}>ID orden de compra 34897</div>
        <div className={styles.body}>
          <div className={styles.headerBody}>
            <div className={styles.title}>Trazabilidad</div>
            <div
              className={`${styles.status} ${statusClass(invoiceData ? invoiceData[0].status_name : "")}`}
            >
              {invoiceData ? invoiceData[0].status_name : ""}
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.progress}></div>
            <div className={styles.description}>
              <div className={styles.stepperContainer}>
                <div className={styles.stepperContent}>
                  {(invoiceData ?? []).map((item, index) => {
                    return (
                      <div key={item.id} className={styles.mainStep}>
                        <div
                          className={`${styles.stepLine} ${item.status_name && styles.active}`}
                        />
                        <div
                          className={`${styles.stepCircle} ${item.status_name && styles.active}`}
                          onClick={() => setCurrentStep(index)}
                        />
                        <div className={styles.stepLabel}>
                          <div className={styles.cardInvoiceFiling}>
                            <div className={styles.title}>{item.event_type_name}</div>
                            <div className={styles.date}>{""}</div>
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
                            ) : (
                              ""
                            )}
                            {item.event_type_name === "Nota crédito aplicada por legalizar" ? (
                              <div>
                                <div className={styles.icons}>
                                  <ArrowLineDown size={14} />
                                </div>
                                <div className={styles.name}>{`Acción: ${item.user_name}`}</div>
                                <div className={styles.name}>{`Valor: ${""}`}</div>
                                <div className={styles.name}>{`ID del ajuste: ${""}`}</div>
                              </div>
                            ) : (
                              ""
                            )}
                            {item.event_type_name === "Nota débito aplicada Por legalizar" ? (
                              <div>
                                <div className={styles.icons}>
                                  <ArrowLineDown size={14} />
                                </div>
                                <div className={styles.name}>{`Acción: ${item.user_name}`}</div>
                                <div className={styles.name}>{`Valor: ${""}`}</div>
                                <div className={styles.name}>{`ID del ajuste: ${""}`}</div>
                              </div>
                            ) : (
                              ""
                            )}
                            {item.event_type_name === "Nueva novedad" ? (
                              <div>
                                <div className={styles.icons}>
                                  <ArrowLineDown size={14} />
                                </div>
                                <div className={styles.name}>{`Acción: ${item.user_name}`}</div>
                                <div className={styles.name}>{`Tipo novedad:: ${""}`}</div>
                                <div className={styles.name}>{`ID de la novedad: ${""}`}</div>
                              </div>
                            ) : (
                              ""
                            )}
                            {item.event_type_name === "Descuento aplicado" ? (
                              <div>
                                <div className={styles.icons}>
                                  <ArrowLineDown size={14} />
                                </div>
                                <div className={styles.name}>{`Acción: ${item.user_name}`}</div>
                                <div className={styles.name}>{`Valor: ${""}`}</div>
                                <div className={styles.name}>{`ID del ajuste: ${""}`}</div>
                              </div>
                            ) : (
                              ""
                            )}
                            {item.event_type_name === "Acuerdo de pago" ? (
                              <div>
                                <div className={styles.icons}>
                                  <Envelope size={14} />
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
                                  <Envelope size={14} />
                                </div>
                                <div className={styles.name}>{`Acción: ${item.user_name}`}</div>
                                <div className={styles.name}>{`Valor: ${""}`}</div>
                              </div>
                            ) : (
                              ""
                            )}
                            {item.event_type_name === "Factura radicada" ? (
                              <div>
                                <div className={styles.icons}>
                                  <ArrowLineDown size={14} />
                                </div>
                                <div className={styles.name}>{`Acción: ${item.user_name}`}</div>
                              </div>
                            ) : (
                              ""
                            )}
                            {item.event_type_name === "Cambio de estado" ? (
                              <div>
                                <div className={styles.icons}>
                                  <ArrowLineDown size={14} />
                                </div>
                                <div className={styles.name}>{`Acción: ${item.user_name}`}</div>
                                <div className={styles.name}>{`Estado inicial: ${""}`}</div>
                                <div className={styles.name}>{`Estado final: ${""}`}</div>
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
        <div className={styles.resume}>Resumen</div>
        <div className={styles.bodyContent}>
          <div className={styles.initialValue}>
            <div className={styles.value}>Valor inicial</div>
            <div className={styles.result}>$30.000.000</div>
          </div>
          <div className={styles.initialValue}>
            <div className={styles.value}>Valor inicial</div>
            <div className={styles.result}>$30.000.000</div>
          </div>
          <div className={styles.initialValue}>
            <div className={styles.value}>Valor inicial</div>
            <div className={styles.result}>$30.000.000</div>
          </div>
          <div className={styles.initialValue}>
            <div className={styles.value}>Valor inicial</div>
            <div className={styles.result}>$30.000.000</div>
          </div>
          <div className={styles.total}>
            <div className={styles.value}>Total</div>
            <div className={styles.result}>$32.000.000</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetailModal;
