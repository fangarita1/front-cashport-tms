import { FC, useState } from "react";
import { ArrowLineDown, CaretDoubleRight, DotsThree, Receipt } from "phosphor-react";
import styles from "./modalDetailAdjustment.module.scss";
import { formatDatePlane, formatMoney } from "@/utils/utils";
import { FileDownloadModal } from "../FileDownloadModal/FileDownloadModal";
import { FinancialDiscount } from "@/types/financialDiscounts/IFinancialDiscounts";
import { useFinancialDiscountDetail } from "@/hooks/useDetailAdjustment";
import { ModalActionAdjusment } from "../modalActionAdjusment/ModalActionAdjusment";
import { Button } from "antd";

interface ModalDetailAdjustmentProps {
  isOpen: boolean;
  onClose: () => void;
  clientId: number;
  selectAdjusment?: FinancialDiscount;
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
  const [isModalSelectOpen, setIsModalSelectOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      case "legalizado":
        return "Legalizado desde ajuste CashPort";
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
          <h4 className={styles.numberInvoice}>
            {adjusmentData?.details[0].financial_type} {"  "}
            {selectAdjusment?.id}
          </h4>
          <Button
            className={styles.button__actions}
            size="large"
            icon={<DotsThree size={"1.5rem"} />}
            onClick={() => {
              setIsModalSelectOpen(true);
            }}
          >
            Generar acción
          </Button>
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
                  {(adjusmentData?.details ?? []).map((item, index, arr) => {
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
                              {formatDatePlane(item?.event_date?.toString())}
                            </div>
                            {item.username && (
                              <div className={styles.name}>{`Responsable: ${item?.username}`}</div>
                            )}
                            {item?.event_name === "Creacion de ajuste" && item?.comments ? (
                              <div>
                                <div className={styles.date}>comentarios</div>
                                <div className={styles.date}>{item?.comments}</div>{" "}
                              </div>
                            ) : null}
                            {item?.event_name === "legalizado" ? (
                              <div>
                                <div className={styles.adjustment}>
                                  <div className={styles.idAdjustment}>
                                    ID de la novedad: {item.id}
                                  </div>
                                </div>
                              </div>
                            ) : null}
                            {item?.event_name === "Facturas aplicadas" ? (
                              <div>
                                <div
                                  className={styles.icons}
                                  onClick={() => {
                                    handleDocumentClick((item?.files as string[])[0] || "");
                                  }}
                                >
                                  <ArrowLineDown
                                    size={14}
                                    onClick={() => {
                                      setIsModalOpen;
                                    }}
                                  />
                                </div>
                                <div
                                  className={styles.name}
                                >{`Valor: ${formatMoney(item?.ammount ?? "0")}`}</div>
                                <div className={styles.adjustment}>
                                  {item?.invoices?.map((invoice) => {
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
          {adjusmentData?.initial_amount !== undefined && adjusmentData?.initial_amount > 0 && (
            <div className={styles.initialValue}>
              <p className={styles.value}>Monto inicial</p>
              <p className={styles.result}>
                {formatMoney(adjusmentData?.initial_amount.toString() ?? "")}
              </p>
            </div>
          )}
          {adjusmentData?.appliedamount !== undefined && adjusmentData?.appliedamount > 0 && (
            <div className={styles.initialValue}>
              <p className={styles.value}>Monto aplicado</p>
              <p className={styles.result}>{formatMoney(adjusmentData?.appliedamount ?? "")}</p>
            </div>
          )}
          <hr />
          <div className={styles.total}>
            <p className={styles.value}>Valor disponibles</p>
            <p className={styles.result}>
              {formatMoney(adjusmentData?.current_amount.toString() ?? "")}
            </p>
          </div>
        </div>
      </div>
      <ModalActionAdjusment
        isOpen={isModalSelectOpen}
        onClose={() => {
          setIsModalSelectOpen(false);
        }}
        clientId={clientId.toString()}
        adjustment={{
          type: adjusmentData?.details[0].financial_type,
          id: selectAdjusment?.id.toString() ?? "",
          amount: adjusmentData?.initial_amount.toString() ?? ""
        }}
      />
    </aside>
  );
};

export default ModalDetailAdjustment;
