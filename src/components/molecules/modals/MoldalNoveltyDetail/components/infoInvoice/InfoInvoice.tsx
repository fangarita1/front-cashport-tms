import React from "react";
import { NewspaperClipping, Coins } from "phosphor-react";
import { Typography } from 'antd';
import "./infoinvoice.scss";
import { IconLabel } from "@/components/atoms/IconLabel/IconLabel";

const { Text } = Typography;

interface InfoInvoiceProps {
  FacturaID: string;
  invoice_amount_difference?: number;
  invoice_cashport_value?: number;
  invoice_client_value?: number;
}

export const InfoInvoice: React.FC<InfoInvoiceProps> = ({
  FacturaID,
  invoice_amount_difference,
  invoice_cashport_value,
  invoice_client_value
}) => {
  const formatCurrency = (value?: number) => {
    return value?.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
  };

  return (
    <div className="info-invoices">
      <IconLabel icon={<NewspaperClipping size={20} />} text="Factura" />
      <Text className="invoice-id">{FacturaID}</Text>
      
      <IconLabel icon={<Coins size={20} />} text="Valores" />
      <div className="values-container">
        <div className="value-row">
          <Text>Cashport</Text>
          <Text strong>{formatCurrency(invoice_cashport_value)}</Text>
        </div>
        <div className="value-row">
          <Text>Cliente</Text>
          <Text strong>{formatCurrency(invoice_client_value)}</Text>
        </div>
        <div className="value-row difference">
          <Text>Novedad</Text>
          <Text type="danger" strong>{formatCurrency(invoice_amount_difference)}</Text>
        </div>
      </div>
    </div>
  );
};