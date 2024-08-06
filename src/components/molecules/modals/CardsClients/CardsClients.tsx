import React from "react";
import "./cardsClients.scss";
import { Flex } from "antd";
import { formatMillionNumber, formatMoney } from "@/utils/utils";

interface Props {
  total: number;
  icon: any;
  title: string;
  notAMoneyValue?: boolean;
  customStyles?: React.CSSProperties;
}

const CardsClients = ({ total, icon, title, notAMoneyValue, customStyles }: Props) => {
  return (
    <Flex className="wrapperCardsClient" style={customStyles}>
      <div className="header">
        <h4 className="title">{title}</h4>
        <div className="icon">{icon}</div>
      </div>
      <Flex className="card-client-value">
        {notAMoneyValue ? (
          <p className="total">{total}</p>
        ) : (
          <>
            <p className="total">{formatMoney(formatMillionNumber(total))}</p>
            <p className="millionsMark">M</p>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default CardsClients;
