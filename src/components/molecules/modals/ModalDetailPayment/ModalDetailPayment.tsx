import { FC, useState } from "react";

import { Button, Flex } from "antd";

import styles from "./ModalDetailPayment.module.scss";
import { ArrowLineDown, Article, CaretDoubleRight, DotsThree } from "phosphor-react";

interface ModalDetailPaymentProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockPaymentData = {
  id: "987846",
  status: "Aplicado",
  transferType: "Transferencia",
  consignation: "Consignación Cooperativa Nacional de Droguistas",
  bankAccount: "723846523",
  bank: "Bancolombia",
  traceability: [
    {
      id: 1,
      event_name: "Ingreso",
      event_date: "2023-10-15",
      username: "Maria Camila Osorio"
    },
    {
      id: 2,
      event_name: "Identificación",
      event_date: "2023-10-18",
      username: "Maria Camila Osorio"
    },
    {
      id: 3,
      event_name: "Aplicación",
      event_date: "2023-10-25",
      username: "Maria Camila Osorio",
      ammount: 127834,
      cp_id: "050",
      invoices: [
        "12346",
        "12346",
        "12347",
        "12348",
        "12348",
        "12349",
        "12345",
        "12349",
        "12347",
        "12348",
        "12348",
        "12349",
        "12345",
        "12346",
        "12347",
        "12348",
        "12348",
        "12349",
        "12345",
        "12346",
        "12347",
        "12348",
        "12348",
        "12349",
        "12345",
        "12346",
        "12347",
        "12348",
        "12348",
        "12349"
      ]
    }
  ],
  initial_amount: 32000000,
  appliedamount: 2000000,
  current_amount: 30000000
};

const ModalDetailPayment: FC<ModalDetailPaymentProps> = ({ isOpen, onClose }) => {
  const formatMoney = (amount: number | string) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0
    }).format(Number(amount));
  };

  const formatDatePlane = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("es-CO", options);
  };

  return (
    <aside className={`${styles.wrapper} ${isOpen ? styles.show : styles.hide}`}>
      <div>
        <div className={styles.modalTopSide}>
          <button type="button" className={styles.back} onClick={onClose}>
            <CaretDoubleRight />
          </button>
        </div>
        <div className={styles.header}>
          <h4 className={styles.numberInvoice}>ID pago {mockPaymentData.id}</h4>
          <Flex gap="8px">
            <Flex className={styles.viewInvoice}>
              <Article />
              Ver tirilla
            </Flex>
            <Button
              className={styles.button__actions}
              size="large"
              icon={<DotsThree size="1.5rem" />}
            >
              Generar acción
            </Button>
          </Flex>
        </div>

        <div className={styles.idOrder}>
          <p>{mockPaymentData.transferType}</p>
          <p>{mockPaymentData.consignation}</p>
          <Flex gap={"8px"}>
            <p className={styles.id}>{mockPaymentData.bankAccount}</p>
            <p className={styles.bank}>Bancolombia</p>
          </Flex>
        </div>

        <div className={styles.body}>
          <div className={styles.headerBody}>
            <div className={styles.title}>Trazabilidad</div>
            <div className={`${styles.status} ${styles[mockPaymentData.status.toLowerCase()]}`}>
              {mockPaymentData.status}
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.progress}></div>
            <div className={styles.description}>
              <div className={styles.stepperContainer}>
                <div className={styles.stepperContent}>
                  {mockPaymentData.traceability.map((item, index, arr) => (
                    <div key={item.id} className={styles.mainStep}>
                      <div
                        className={`${styles.stepLine} ${index === arr.length - 1 ? styles.inactive : styles.active}`}
                      />
                      <div className={`${styles.stepCircle} ${styles.active}`} />
                      <div className={styles.stepLabel}>
                        <div className={styles.cardInvoiceFiling}>
                          <h5 className={styles.title}>{item.event_name}</h5>
                          <div className={styles.date}>{formatDatePlane(item.event_date)}</div>
                          {item.username && (
                            <div className={styles.name}>{`Responsable: ${item.username}`}</div>
                          )}
                          {item.event_name === "Aplicación" && (
                            <div>
                              {item.cp_id && (
                                <Flex gap="4px" className={styles.name}>
                                  Aplicación {item.ammount} a la sucursal{" "}
                                  <div className={styles.idAdjustment}>{item.cp_id}</div>
                                </Flex>
                              )}
                              <Flex wrap gap="2px" className={styles.name}>
                                Aplicado a las facturas:
                                {item.invoices?.map((invoice, index) => (
                                  <div key={invoice} className={styles.text_blue}>
                                    {invoice}
                                    {index < item.invoices.length - 1 ? "," : ""}
                                  </div>
                                ))}
                              </Flex>
                              <div className={styles.icons}>
                                <ArrowLineDown size={14} />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
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
            <p className={styles.result}>{formatMoney(mockPaymentData.initial_amount)}</p>
          </div>
          <div className={styles.initialValue}>
            <p className={styles.value}>Monto aplicado</p>
            <p className={styles.result}>{formatMoney(mockPaymentData.appliedamount)}</p>
          </div>
          <hr />
          <div className={styles.total}>
            <p className={styles.value}>Disponible</p>
            <p className={styles.result}>{formatMoney(mockPaymentData.current_amount)}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ModalDetailPayment;
