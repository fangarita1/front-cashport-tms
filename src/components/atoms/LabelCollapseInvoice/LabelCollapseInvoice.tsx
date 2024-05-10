import { Flex, Typography } from "antd";
import { Files, Money } from "phosphor-react";

import "./labelcollapseinvoice.scss";

const { Title } = Typography;

interface PropsLabelCollapseInvoice {
  status: string;
  total: number;
  quantity: number;
}

const differentColors: { [key: string]: string } = {
  sinconciliar: "#969696",
  novedad: "#F4076A",
  conciliados: "#0085FF",
  saldo: "#3D3D3D",
  glosado: "#00C2FF",
  devolucion: "#FF6B00",
  anulada: "#C80000",
  aplicacion: "#A9BA43"
};

export const LabelCollapseInvoice = ({ status, total, quantity }: PropsLabelCollapseInvoice) => {
  // set a variable called color and assign the value of the object differentColors with the key status

  const color = differentColors[status.replace(" ", "")];
  return (
    <Flex className="labelCollapse">
      <Title className="labelCollapse__status" style={{ background: color }} level={4}>
        {capitalizeFirstLetter(status)}
      </Title>
      <Flex className="labelCollapse__total">
        <Money size={16} className="labelCollapse__total__icon" />
        <Title className="labelCollapse__total__title" level={5}>
          ${total}
        </Title>
      </Flex>
      <Flex className="labelCollapse__total">
        <Files size={16} className="labelCollapse__total__icon" />
        <Title className="labelCollapse__total__title" level={5}>
          {quantity}
        </Title>
      </Flex>
    </Flex>
  );
};

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
