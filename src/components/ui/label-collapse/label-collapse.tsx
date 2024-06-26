import { Flex } from "antd";
import { Files, Money } from "phosphor-react";
import { insertPeriodEveryThreeDigits } from "@/utils/utils";
import styles from "./label-collapse.module.scss";

interface PropsLabelCollapseInvoice {
  status: string;
  total?: number;
  quantity?: number;
  color?: string;
}

const randomColors = [
  "#969696",
  "#F4076A",
  "#0085FF",
  "#3D3D3D",
  "#00C2FF",
  "#FF6B00",
  "#C80000",
  "#A9BA43"
];

const LabelCollapse = ({ status, total, quantity, color }: PropsLabelCollapseInvoice) => {
  const randomColor = randomColors[Math.floor(Math.random() * randomColors.length)];

  return (
    <Flex className={styles.labelCollapse}>
      <h5
        className={styles.labelCollapse__status}
        style={{ background: color ? color : randomColor }}
      >
        {capitalizeFirstLetter(status)}
      </h5>
      {total && (
        <Flex className={styles.labelCollapse__total}>
          <Money size={16} className={styles.labelCollapse__total__icon} />
          <h5 className={styles.labelCollapse__total__title}>
            ${insertPeriodEveryThreeDigits(total)}
          </h5>
        </Flex>
      )}
      {quantity && (
        <Flex className={styles.labelCollapse__quantity}>
          <Files size={16} className={styles.labelCollapse__quantity__icon} />
          <h5 className={styles.labelCollapse__quantity__title}>{quantity}</h5>
        </Flex>
      )}
    </Flex>
  );
};

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default LabelCollapse;
