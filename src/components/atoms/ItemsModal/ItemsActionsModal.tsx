import { FC } from "react";
import "./itemsActionsModal.scss";
import { Checkbox } from "antd";
import { formatMoney } from "@/utils/utils";
import { DividerVerticalModal } from "../DividerVertical/DividerVerticalModal";

interface ItemsActionsModalProps {
  onHeaderClick: () => void;
  type: number;
  item: { id: number; amount: number };
}

const ItemsActionsModal: FC<ItemsActionsModalProps> = ({ onHeaderClick, item, type }) => {
  return (
    <div className="item">
      <div className="head">
        <Checkbox onChange={() => onHeaderClick()} />
        <DividerVerticalModal type={type} />
        <div className={"texts"}>
          <div className={"mainText"}>
            <strong className={"name"}>
              {titleMap[type]} 
              <span>{item.id}</span>
            </strong>
          </div>
          <div className={"label"}>Volumen</div>
        </div>
        <div className={"mainValues"}>
          <div className={"value"}>{formatMoney(item.amount.toString())}</div>
          <div className={"subValue"}>$15.000.000</div>
        </div>
      </div>
    </div>
  );
};

const titleMap: Record<number, string> = {
  1: "Nota débito",
  2: "Nota crédito",
  3: "Descuento"
};

export default ItemsActionsModal;
