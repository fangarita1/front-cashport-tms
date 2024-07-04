import { Dispatch, FC, SetStateAction, useState } from "react";
import { WarningDiamond, X } from "@phosphor-icons/react";
import PrincipalButton from "@/components/atoms/buttons/principalButton/PrincipalButton";
import { Radio, RadioChangeEvent } from "antd";

import styles from "./create-order-discounts-modal.module.scss";

import "./test.scss";
import InputRadioRightSide from "@/components/ui/input-radio-right-side";
export interface CreateOrderDiscountsModalProps {
  setOpenDiscountsModal: Dispatch<SetStateAction<boolean>>;
}

const CreateOrderDiscountsModal: FC<CreateOrderDiscountsModalProps> = ({
  setOpenDiscountsModal
}) => {
  const [radioValue, setRadioValue] = useState(0);

  const handleApplyDiscounts = () => {
    console.log("Apply discounts");
    setOpenDiscountsModal(false);
  };

  const handleChangeRadio = (e: RadioChangeEvent) => {
    setRadioValue(parseInt(e.target.value));
  };

  const styleRadio = {
    border: "2px solid #e0e0e0",
    borderRadius: "8px",
    padding: "1rem"
  };

  return (
    <div className={styles.discountsModal}>
      <div className={styles.header}>
        <h3>Descuentos</h3>
        <button onClick={() => setOpenDiscountsModal(false)} className={styles.buttonClose}>
          <X size={26} />
        </button>
      </div>

      <div className={styles.subTitle}>
        <WarningDiamond size={20} />
        <p>Recuerda que algunos descuentos no son acumulables</p>
      </div>
      <Radio.Group className={styles.radioGroup} onChange={handleChangeRadio} value={radioValue}>
        {mockDiscounts.map((discount) => (
          <InputRadioRightSide
            key={discount.id}
            value={discount.id}
            customStyles={styleRadio}
            disabled={!discount.isReached}
          >
            <div className={styles.radioGroup__label}>
              <p>{discount.discount}</p>
              {discount.isReached && <p className={styles.reachedDiscount}>Descuento Alcanzado</p>}
            </div>
          </InputRadioRightSide>
        ))}
      </Radio.Group>

      <PrincipalButton disabled={!radioValue} onClick={handleApplyDiscounts}>
        Aplicar
      </PrincipalButton>
    </div>
  );
};

export default CreateOrderDiscountsModal;

const mockDiscounts = [
  {
    id: 1,
    discount: "5% DCTO En las marcas Cetaphil",
    isReached: false
  },
  {
    id: 2,
    discount: "10% DCTO En las marcas Cetaphil",
    isReached: true
  },
  {
    id: 3,
    discount: "15% DCTO En las marcas Cetaphil",
    isReached: false
  },
  {
    id: 4,
    discount: "30% DCTO En las marcas Cetaphil",
    isReached: true
  },
  {
    id: 5,
    discount: "25% DCTO En las marcas Cetaphil",
    isReached: false
  },
  {
    id: 6,
    discount: "20% DCTO En las marcas Cetaphil",
    isReached: false
  },
  {
    id: 7,
    discount: "40% DCTO En las marcas Cetaphil",
    isReached: false
  },
  {
    id: 8,
    discount: "50% DCTO En las marcas Cetaphil",
    isReached: true
  }
];
