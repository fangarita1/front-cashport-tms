import { FC } from "react";

import styles from "./confirmed-order-shipping-info.module.scss";

export interface ConfirmedOrderShippingInfoProps {
  title: string;
  data: string;
  customStyles?: React.CSSProperties;
}

const ConfirmedOrderShippingInfo: FC<ConfirmedOrderShippingInfoProps> = ({
  title,
  data,
  customStyles
}) => {
  return (
    <div className={styles.item} style={customStyles}>
      <p className={styles.item__title}>{title}</p>
      <p className={styles.item__data}>{data}</p>
    </div>
  );
};

export default ConfirmedOrderShippingInfo;
