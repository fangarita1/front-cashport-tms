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
import { date, number } from "yup";

interface InvoiceDetailModalProps {
  show: boolean;
  onClose: () => void;
}

const InvoiceDetailModal: FC<InvoiceDetailModalProps> = ({ show, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const step = [
    {
      id: 1,
      title: "Emision de factura",
      date: "15 octubre, 2023",
      name: "Responsable Maria Camila Osorio",
      number: 0,
      value: "",
      adjustment: "",
      status: true
    },
    {
      id: 2,
      title: "Radicacion",
      date: "15 octubre, 2023",
      name: "Responsable Maria Camila Osorio",
      number: 0,
      value: "",
      adjustment: "",
      status: true
    },
    {
      id: 3,
      title: "Aviso de vencimiento",
      date: "15 octubre, 2023",
      name: "",
      number: 0,
      value: "",
      adjustment: "",
      status: true
    },
    {
      id: 4,
      title: "Novedad",
      date: "15 octubre, 2023",
      name: "",
      number: 0,
      value: "",
      adjustment: "",
      status: true
    },
    {
      id: 5,
      title: "Acuerdo de pago",
      date: "15 octubre, 2023",
      name: "",
      number: 0,
      value: "",
      adjustment: "",
      status: true
    },
    {
      id: 6,
      title: "Vencimiento acuerdo de pago",
      date: "15 octubre, 2023",
      name: "",
      number: 0,
      value: "",
      adjustment: "",
      status: true
    },
    {
      id: 7,
      title: "Nota crédito aplicada ",
      date: "15 octubre, 2023",
      name: "Acción: Maria Camila Osorio",
      number: 0,
      value: "Valor: $2.000.000",
      adjustment: "ID del ajuste: 730244",
      status: true
    }
  ];

  return (
    <div className={`${styles.wrapper} ${show ? styles.show : styles.hide}`}>
      <div>
        <div className={styles.modalTopSide}>
          <div className={styles.back} onClick={onClose}>
            <CaretDoubleRight />
          </div>
        </div>
        <div className={styles.header}>
          <div className={styles.numberInvoice}>Factura 123456</div>
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
            <div className={styles.status}>Emitida</div>
          </div>
          <div className={styles.content}>
            <div className={styles.progress}>
              <div className={styles.iconContainer}>
                <div className={styles.iconProgress}>
                  <ArrowLineDown size={14} />
                </div>
              </div>
              <div className={styles.iconContainer}>
                <div className={styles.iconProgress}>
                  <Envelope size={14} />
                </div>
              </div>
            </div>
            <div className={styles.description}>
              <div className={styles.stepperContainer}>
                <div className={styles.stepperContent}>
                  {step.map((item, index) => {
                    return (
                      <div key={item.id} className={styles.mainStep}>
                        <div className={`${styles.stepLine} ${item.status && styles.active}`} />
                        <div
                          className={`${styles.stepCircle} ${item.status && styles.active}`}
                          onClick={() => setCurrentStep(index)}
                        />
                        <div className={styles.stepLabel}>
                          <div className={styles.cardInvoiceFiling}>
                            <div className={styles.title}>{item.title}</div>
                            <div className={styles.date}>{item.date}</div>
                            <div className={styles.name}>{item.name}</div>
                            {index === 6 ? (
                              <div>
                                <div className={styles.name}>{item.value}</div>
                                <div className={styles.name}>{item.adjustment}</div>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                          {index === 2 ? (
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
  );
};

export default InvoiceDetailModal;
