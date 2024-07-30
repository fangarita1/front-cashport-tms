"use client";
import { Flex } from 'antd';
import TravelData from '../travelData/travelData';
import AditionalInfo from '../aditionalInfo/aditionalInfo';
import Materials from '../materials/materials';
import { ProviderDetail } from '@/types/providers/providers';
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