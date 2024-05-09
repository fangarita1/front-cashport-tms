import { FC, useState } from "react";
import { CaretDoubleRight, CaretDown } from "phosphor-react";
import styles from "./accounting-adjustments-modal.module.scss";
import AccountingAdjustmentsModalItem from "../../components/accounting-adjustments-item";
import UiSearchInput from "@/components/ui/search-input";

interface AccountingAdjustmentsModalProps {
  show: boolean;
  onClose: () => void;
}

const AccountingAdjustmentsModal: FC<AccountingAdjustmentsModalProps> = ({ show, onClose }) => {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>();

  return (
    <div className={`${styles.wrapper} ${show ? styles.show : styles.hide}`}>
      <div className={styles.modalTopSide}>
        <div className={styles.back} onClick={onClose}>
          <CaretDoubleRight />
        </div>
        <div className={styles.title}>Ajustes contables</div>
      </div>
      <div className={styles.modalContent}>
        <div className={styles.tabs}>
          <div className={`${styles.tab} ${styles.active}`}>Disponibles</div>
          <div className={styles.tab}>Gestionados</div>
        </div>
        <div className={styles.searcher}>
          <UiSearchInput
            id="accounting-adjustments-search"
            placeholder="Buscar"
            onChange={() => {}}
          />
          <div className={styles.filterButton}>
            Filtrar
            <CaretDown className={styles.icon} />
          </div>
        </div>
        <div className={styles.listItems}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => (
            <AccountingAdjustmentsModalItem
              key={index}
              isOpen={selectedItemIndex === index}
              onHeaderClick={() => setSelectedItemIndex((i) => (i === index ? undefined : index))}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountingAdjustmentsModal;
