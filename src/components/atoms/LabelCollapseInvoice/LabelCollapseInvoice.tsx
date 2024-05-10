import { Flex, Typography } from "antd";
import { Files, Money } from "phosphor-react";

import "./labelcollapseinvoice.scss";

const { Title } = Typography;

export const LabelCollapseInvoice = () => {
  return (
    <Flex className="labelCollapse">
      <Title className="labelCollapse__status" level={4}>
        status
      </Title>
      <Flex className="labelCollapse__total">
        <Money size={16} className="labelCollapse__total__icon" />
        <Title className="labelCollapse__total__title" level={5}>
          $000000
        </Title>
      </Flex>
      <Flex className="labelCollapse__total">
        <Files size={16} className="labelCollapse__total__icon" />
        <Title className="labelCollapse__total__title" level={5}>
          200
        </Title>
      </Flex>
    </Flex>
  );
};
