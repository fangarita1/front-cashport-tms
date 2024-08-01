import { FC, useState } from "react";
import { ArrowLineDown, CaretDoubleRight, Receipt } from "phosphor-react";
import styles from "./modalDetailAdjustment.module.scss";
import { formatDatePlane, formatMoney } from "@/utils/utils";
import { FileDownloadModal } from "../FileDownloadModal/FileDownloadModal";
import { IFinancialDiscount } from "@/types/financialDiscounts/IFinancialDiscounts";
import { useFinancialDiscountDetail } from "@/hooks/useDetailAdjustment";

interface ModalDetailAdjustmentProps {
  isOpen: boolean;
  onClose: () => void;
  clientId: number;
  selectAdjusment?: IFinancialDiscount;
  projectId: number;
}

const ModalDetailAdjustment: FC<ModalDetailAdjustmentProps> = ({
  isOpen,
  onClose,
  clientId,
  projectId,
  selectAdjusment
}) => {
  // remplaza este hook por el que acabamos de crear
  const { data: adjusmentData } = useFinancialDiscountDetail({
    financialDiscountId: selectAdjusment?.id ?? 0,
    projectId,
    clientId
  });
  const [urlStep, setUrlStep] = useState<string | undefined>(undefined);

  const [isModalOpen, setIsModalOpen] = useState(false);

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
      case "Radicar factura":
        return "Radicación";
      case "Registrar novedad":
        return "Novedad";
      default:
        return item;
    }
  };

  const handleDocumentClick = (documentUrl: string) => {
    const fileExtension = documentUrl?.split(".").pop()?.toLowerCase() ?? "";
    if (fileExtension === "pdf") {
      window.open(documentUrl, "_blank");
    } else if (["png", "jpg", "jpeg"].includes(fileExtension)) {
      setUrlStep(documentUrl);
      if (isModalOpen === false) setIsModalOpen(true);
    } else {
      alert("Formato de archivo no soportado");
    }
  };

  return (
    <aside className={`${styles.wrapper} ${isOpen ? styles.show : styles.hide}`}>
      <FileDownloadModal
        isModalOpen={isModalOpen}
        onCloseModal={setIsModalOpen}
        url={urlStep || ""}
      />
      <div>
        <div className={styles.modalTopSide}>
          <button type="button" className={styles.back} onClick={onClose}>
            <CaretDoubleRight />
          </button>
        </div>
        <div className={styles.header}>
          <h4 className={styles.numberInvoice}> {selectAdjusment?.id}</h4>
          <div className={styles.viewInvoice}>
            <Receipt size={20} />
            Ver factura
          </div>
        </div>

        <div className={styles.body}>
          <div className={styles.headerBody}>
            <div className={styles.title}>Trazabilidad</div>
            {/* <div
              className={`${styles.status} ${statusClass(adjusmentData ? adjusmentData?.results[0].status_name : "")}`}
            >
              {adjusmentData ? adjusmentData[0].status_name : ""}
            </div> */}
          </div>
          <div className={styles.content}>
            <div className={styles.progress}></div>
            <div className={styles.description}>
              <div className={styles.stepperContainer}>
                <div className={styles.stepperContent}>
                  {(adjusmentData ?? []).map((item, index, arr) => {
                    return (
                      <div key={item.id} className={styles.mainStep}>
                        <div
                          className={`${styles.stepLine} ${index === arr.length - 1 ? styles.inactive : styles.active}`}
                        />
                        <div className={`${styles.stepCircle} ${styles.active}`} />
                        <div className={styles.stepLabel}>
                          <div className={styles.cardInvoiceFiling}>
                            <h5 className={styles.title}>{getEventTitle(item.event_name)}</h5>
                            <div className={styles.date}>
                              {formatDatePlane(item.event_date.toString())}
                            </div>
                            {item.event_name === "Creacion de ajuste" && item.comments ? (
                              <div>
                                <div className={styles.date}>comentarios</div>
                                <div className={styles.date}>{item.comments}</div>{" "}
                              </div>
                            ) : null}
                            {item.event_name === "Facturas aplicadas" ? (
                              <div>
                                <div
                                  className={styles.icons}
                                  onClick={() => {
                                    handleDocumentClick((item.files as string[])[0] || "");
                                  }}
                                >
                                  <ArrowLineDown
                                    size={14}
                                    onClick={() => {
                                      setIsModalOpen;
                                    }}
                                  />
                                </div>
                                {/* <div className={styles.name}>{`Acción: ${item.user_name}`}</div> */}
                                <div
                                  className={styles.name}
                                >{`Valor: ${formatMoney(item.ammount ?? "0")}`}</div>
                                <div className={styles.adjustment}>
                                  {item.invoices?.map((invoice) => {
                                    return (
                                      <div key={invoice} className={styles.idAdjustment}>
                                        {invoice},
                                      </div>
                                    );
                                  })}
                                </div>
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
              {formatMoney(selectAdjusment?.initial_value.toString() ?? "")}
            </p>
          </div>
          {/* {adjusmentData?.totals?.total_creditNotes !== undefined &&
            adjusmentData?.totals?.total_creditNotes > 0 && (
              <div className={styles.initialValue}>
                <p className={styles.value}>Nota credito</p>
                <p className={styles.result}>
                  {formatMoney(adjusmentData?.totals.total_creditNotes.toString() ?? "")}
                </p>
              </div>
            )}
          {adjusmentData?.totals?.total_debitNotes !== undefined &&
            adjusmentData?.totals?.total_debitNotes > 0 && (
              <div className={styles.initialValue}>
                <p className={styles.value}>Nota debito</p>
                <p className={styles.result}>
                  {formatMoney(adjusmentData?.totals.total_debitNotes.toString() ?? "")}
                </p>
              </div>
            )}
          {adjusmentData?.totals?.total_discount !== undefined &&
            adjusmentData?.totals?.total_discount > 0 && (
              <div className={styles.initialValue}>
                <p className={styles.value}>Descuento</p>
                <p className={styles.result}>
                  {formatMoney(adjusmentData?.totals.total_discount.toString() ?? "")}
                </p>
              </div>
            )}

          <hr />
          <div className={styles.total}>
            <p className={styles.value}>Total</p>
            <p className={styles.result}>
              {formatMoney(adjusmentData?.totals.total_general.toString() ?? "")}
            </p>
          </div> */}
        </div>
      </div>
    </aside>
  );
};

export default ModalDetailAdjustment;
