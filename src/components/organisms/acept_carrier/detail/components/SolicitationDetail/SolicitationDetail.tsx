"use client";
import { Flex } from 'antd';
import TravelData from '../TravelData/TravelData';
import AditionalInfo from '../AditionalInfo/AditionalInfo';
import Materials from '../Materials/Materials';
import { ProviderDetail } from '@/types/acept_carrier/acept_carrier';
import styles from "./solicitationDetail.module.scss";

interface SolicitationDetailProps {
  providerDetail: ProviderDetail;
};

export default function SolicitationDetail({providerDetail}: SolicitationDetailProps) {
  return (
    <Flex className={styles.wrapper}>
      <TravelData travelData={providerDetail?.travelData}/>
      <AditionalInfo aditionalInfo={providerDetail.aditionalInfo}/>
      <Materials materials={providerDetail?.materials}/>
    </Flex>
  )
}