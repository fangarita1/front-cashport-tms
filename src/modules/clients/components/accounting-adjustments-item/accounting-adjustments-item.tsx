import { FC } from "react";
import { CaretDown, DownloadSimple } from "phosphor-react";
import styles from "./accounting-adjustments-item.module.scss";

interface AccountingAdjustmentsModalItemProps {
  isOpen: boolean;
  onHeaderClick: () => void;
}

const AccountingAdjustmentsModalItem: FC<AccountingAdjustmentsModalItemProps> = ({
  isOpen,
  onHeaderClick
}) => {
  return (
    <div className={`${styles.item} ${isOpen ? styles.open : styles.close}`}>
      <div className={styles.head} onClick={onHeaderClick}>
        <div className={styles.texts}>
          <div className={styles.mainText}>
            <strong className={styles.name}>
              Nota débito
              <span>CP-12345</span>
            </strong>
            <div className={styles.legalice}>Por legalizar</div>
          </div>
          <div className={styles.label}>Volumen</div>
        </div>
        <div className={styles.mainValues}>
          <div className={styles.value}>$12.000.000</div>
          <div className={styles.subValue}>$15.000.000</div>
        </div>
        <CaretDown className={styles.arrow} />
      </div>
      <div className={styles.expandibleContent}>
        <div className={styles.label}>Fecha de emisión</div>
        <div className={styles.value}>15/02/2023 - 24/03/2024</div>
        <div className={styles.label}>Creador</div>
        <div className={styles.value}>Laidy Cabrera</div>
        <div className={styles.label}>Facturas aplicadas</div>
        <div className={`${styles.value} ${styles.links}`}>
          12345, 12346, 12347, 12348, 12348, 12349, 12345, 12346, 12347, 12348, 12348, 12349
        </div>
        <div className={styles.label}>Condiciones especificas</div>
        <div className={styles.value}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit sit amet, consectetur adipiscin
        </div>
        <div className={styles.button}>
          <div className={styles.downloadButton}>
            <DownloadSimple className={styles.icon} />
            Descargar evidencia
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountingAdjustmentsModalItem;
