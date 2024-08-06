"use client";
import { Flex } from "antd";
import TravelData from "../TravelData/TravelData";
import AditionalInfo from "../AditionalInfo/AditionalInfo";
import Materials from "../Materials/Materials";
import { ProviderDetail } from "@/types/acept_carrier/acept_carrier";
import styles from "./solicitationDetail.module.scss";
import {
  ICarrierRequestContacts,
  ICarrierRequestDetail,
  IMaterial
} from "@/types/logistics/schema";
import { Dispatch, SetStateAction } from "react";
import Persons from "../Persons/Persons";

interface SolicitationDetailProps {
  providerDetail: ICarrierRequestDetail | undefined;
  dataCarga: IMaterial[];
  persons?: ICarrierRequestContacts[];
  setIsNextStepActive: Dispatch<SetStateAction<boolean>>;
  service_type: string | undefined;
}

export default function SolicitationDetail({
  providerDetail,
  dataCarga,
  setIsNextStepActive,
  service_type,
  persons
}: SolicitationDetailProps) {
  return (
    <Flex className={styles.wrapper}>
      <TravelData travelData={providerDetail} />
      <AditionalInfo aditionalInfo={providerDetail} setIsNextStepActive={setIsNextStepActive} />
      {/*{service_type !== "3" ? <Materials materials={dataCarga} /> : <Persons persons={persons} />}*/}
      <Materials materials={dataCarga}/>
    </Flex>
  );
}
