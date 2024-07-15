import React from "react";
import "./cardsClients.scss";
import { Flex } from "antd";

interface Props {
  total: number;
  icon: any;
  title: string;
}

const CardsClients = ({ total, icon, title }: Props) => {
  return (
    <Flex className="wrapperCardsClient">
      <Flex className="icon">{icon}</Flex>
      <Flex className="header">
        <Flex className="title">{title}</Flex>
      </Flex>
      <Flex className="card-client-value">
        <Flex className="total">${total.toLocaleString()}</Flex>
        <span>M</span>
      </Flex>
    </Flex>
  );
};

export default CardsClients;
