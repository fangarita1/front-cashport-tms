import React from "react";
import "./cardsClients.scss";
import { Flex, Skeleton } from "antd";
import { formatMillionNumber, formatMoney } from "@/utils/utils";

interface Props {
  total: number;
  icon: any;
  title: string;
  notAMoneyValue?: boolean;
  customStyles?: React.CSSProperties;
  loading?: boolean;
}

const CardsClients = ({ total, icon, title, notAMoneyValue, customStyles, loading }: Props) => {
  if (loading) {
    return (
      <Flex className="wrapperCardsClient" style={customStyles}>
        <div className="header">
          <Skeleton.Input style={{ width: 100 }} active size="small" />
          <Skeleton.Avatar active size="small" shape="circle" />
        </div>
        <Flex className="card-client-value">
          <Skeleton.Input style={{ width: 80 }} active size="small" />
        </Flex>
      </Flex>
    );
  }

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
