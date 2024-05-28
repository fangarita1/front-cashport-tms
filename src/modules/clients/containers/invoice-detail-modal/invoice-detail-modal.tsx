import { Dispatch, FC, SetStateAction, useState } from "react";
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

interface InvoiceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoiceId: number;
  clientId: number;
  handleisGenerateActionOpen: Dispatch<SetStateAction<boolean>>;
}

const InvoiceDetailModal: FC<InvoiceDetailModalProps> = ({
  isOpen,
  onClose,
  invoiceId,
  clientId,
  handleisGenerateActionOpen
}) => {
  const { data: invoiceData } = useInvoiceDetail({ invoiceId, clientId });
  console.log("invoiceData: ", invoiceData);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
          <Button
            className={styles.button__actions}
            size="large"
            icon={<DotsThree size={"1.5rem"} />}
            onClick={() => handleisGenerateActionOpen(true)}
          >
            Generar acción
          </Button>
        </div>
        <div className={styles.idOrder}>
          ID orden de compra
          <div className={styles.id}>XXXXX</div>
        </div>

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
                  {/*  */}
                  {(invoiceData ?? []).map((item) => {
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
                            <h5 className={styles.title}>{item.event_type_name}</h5>
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
                            ) : null}
                            {item.event_type_name === "Nota crédito aplicada por legalizar" ? (
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
                                <div className={styles.name}>{`Valor: ${""}`}</div>
                                <div className={styles.adjustment}>
                                  ID del ajuste:
                                  <div className={styles.idAdjustment}>{"233123"}</div>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {item.event_type_name === "Nota débito aplicada Por legalizar" ? (
                              <div>
                                <div className={styles.icons}>
                                  <ArrowLineDown size={14} onClick={() => {}} />
                                </div>
                                <div className={styles.name}>{`Acción: ${item.user_name}`}</div>
                                <div className={styles.name}>{`Valor: ${""}`}</div>
                                <div className={styles.adjustment}>
                                  ID del ajuste:
                                  <div className={styles.idAdjustment}>{"233123"}</div>
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
                                      setIsModalOpen(true), console.log("boton prueba");
                                    }}
                                  />
                                </div>
                                <div className={styles.name}>{`Acción: ${item.user_name}`}</div>
                                <div className={styles.name}>{`Tipo novedad:: ${""}`}</div>
                                <div className={styles.adjustment}>
                                  ID de la novedad:
                                  <div className={styles.idAdjustment}>{"233123"}</div>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {item.event_type_name === "Descuento aplicado" ? (
                              <div>
                                <div className={styles.icons}>
                                  <ArrowLineDown size={14} onClick={() => {}} />
                                </div>
                                <div className={styles.name}>{`Acción: ${item.user_name}`}</div>
                                <div className={styles.name}>{`Valor: ${""}`}</div>
                                <div className={styles.adjustment}>
                                  ID del ajuste:
                                  <div className={styles.idAdjustment}>{"233123"}</div>
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
                            {item.event_type_name === "Factura radicada" ? (
                              <div>
                                <div className={styles.icons}>
                                  <ArrowLineDown size={14} onClick={() => {}} />
                                </div>
                                <div className={styles.name}>{`Acción: ${item.user_name}`}</div>
                              </div>
                            ) : (
                              ""
                            )}
                            {item.event_type_name === "Cambio de estado" ? (
                              <div>
                                <div className={styles.icons}>
                                  <ArrowLineDown size={14} onClick={() => {}} />
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
        <h4 className={styles.resume}>Resumen</h4>
        <div className={styles.bodyContent}>
          <div className={styles.initialValue}>
            <p className={styles.value}>Valor inicial</p>
            <p className={styles.result}>$XX.XXX.XXX</p>
          </div>
          <div className={styles.initialValue}>
            <p className={styles.value}>Nota debito</p>
            <p className={styles.result}>$XX.XXX.XXX</p>
          </div>

          <hr />
          <div className={styles.total}>
            <p className={styles.value}>Total</p>
            <p className={styles.result}>$32.000.000</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default InvoiceDetailModal;
