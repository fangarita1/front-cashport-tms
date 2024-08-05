"use client";
import { Flex } from 'antd';
import TravelData from '../TravelData/TravelData';
import AditionalInfo from '../AditionalInfo/AditionalInfo';
import Materials from '../Materials/Materials';
import { ProviderDetail } from '@/types/acept_carrier/acept_carrier';
import styles from "./solicitationDetail.module.scss";
import { IMaterial, ITransferOrder, ITransferRequestDetail } from '@/types/logistics/schema';
import { Dispatch, SetStateAction } from 'react';

interface SolicitationDetailProps {
  providerDetail: ITransferRequestDetail | undefined;
  dataCarga: IMaterial[];
  setIsNextStepActive: Dispatch<SetStateAction<boolean>>;
};

export default function SolicitationDetail({providerDetail, dataCarga, setIsNextStepActive}: SolicitationDetailProps) {
  return (
    <Flex className={styles.wrapper}>
      <TravelData travelData={providerDetail}/>
      <AditionalInfo aditionalInfo={providerDetail} setIsNextStepActive={setIsNextStepActive}/>
      <Materials materials={dataCarga}/>
    </Flex>
  )
}