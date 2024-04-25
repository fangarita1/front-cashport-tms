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
    <Flex className="wrapper">
      <Flex className="header">
        <Flex className="title">{title}</Flex>
        <Flex className="icon">{icon}</Flex>
      </Flex>
      <Flex className="content">
        <Flex className="total">${total.toLocaleString()}</Flex>
        <Flex className="amount">
          <p>M</p>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CardsClients;
