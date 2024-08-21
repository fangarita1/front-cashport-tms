import { Collapse, CollapseProps, Typography } from "antd";
import styles from './Request.module.scss';
import { TransferOrdersState } from "@/utils/constants/transferOrdersState";
import { TransferOrdersTable } from "@/components/molecules/tables/TransferOrderTable/TransferOrderTable";
import { FC, useEffect, useState } from "react";
import { getAcceptedTransferRequest } from "@/services/logistics/transfer-request";
import { ITransferRequestResponse } from "@/types/transferRequest/ITransferRequest";

const Text = Typography;

interface IRequestProps {
  search: string;
}

export const Request: FC<IRequestProps> = ({ search }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [transferRequest, setTransferRequest] = useState<ITransferRequestResponse[]>([]);

  const getTitile = (stateId: string, transferType: string, number: number) => {
    const getState = TransferOrdersState.find((f) => f.id === stateId);
    return (
      <div className={styles.mainTitle}>
        <div className={styles.titleContainer}>
          <div className={styles.textContainer} style={{ backgroundColor: getState?.bgColor }}>{getState?.name}</div>
          <div className={`${styles.textContainer} ${styles.subTextContainer}`}>
            <span>{transferType}</span>
            <span className={styles.number}>{number}</span>
          </div>
        </div>
      </div>
    )
  }
  
  const getTransferRequestAccepted = async () => {
    try {
      const getRequest = await getAcceptedTransferRequest();
      if (Array.isArray(getRequest)) {
        setTransferRequest(getRequest);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getTransferRequestAccepted();
  }, [])

  if (isLoading) return (
    <div className={styles.emptyContainer}>
      <Text className={styles.textEmpty}>No Content</Text>
    </div>
  );

  const filteredData = transferRequest.map(status => {
    const filteredItems = status.items.filter(item => 
      item.start_location.toLowerCase().includes(search.toLowerCase()) || 
      item.end_location.toLowerCase().includes(search.toLowerCase())
    );
    
    return { ...status, items: filteredItems };
  }).filter(status => status.items.length > 0);

  
  const renderItems: CollapseProps['items'] = filteredData.map((item, index) => {
    return {
      key: index,
      label: getTitile(item.statusId, item.transferType, item.items.length),
      children: <TransferOrdersTable items={item.items} />,
    }
  });

  return <Collapse ghost items={renderItems} defaultActiveKey={['0']} />
}