"use client";
import { Col, Flex } from "antd";
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
import { RouteMap } from "@/components/organisms/logistics/orders/DetailsOrderView/components/RouteMap/RouteMap";
import { SummaryData } from "@/components/organisms/logistics/orders/DetailsOrderView/components/SummaryData/SummaryData";


interface SolicitationDetailProps {
  providerDetail: ICarrierRequestDetail | undefined;
  dataCarga: IMaterial[];
  persons?: ICarrierRequestContacts[];
  setIsNextStepActive: Dispatch<SetStateAction<boolean>>;
  service_type: string | undefined;
  geometry: any,
  distance: any,
  timetravel: any,
  mapContainerRef: any
}

export default function SolicitationDetail({
  providerDetail,
  dataCarga,
  setIsNextStepActive,
  service_type,
  persons,
  geometry,
  distance, 
  timetravel,
  mapContainerRef
}: Readonly<SolicitationDetailProps>) {
  return (
    <Flex className={styles.wrapper}>
      <Flex className={styles.sectionWrapper} vertical>
        <Flex >
          <p className={styles.sectionTitle} style={{ marginLeft: "1.5rem"}}>Datos del viaje</p>
        </Flex>
        <Flex>
        <Col span={12} style={{paddingRight: "0.625rem"}}>
          <SummaryData
            routeGeometry={geometry}
            distance={distance}
            timetravel={timetravel}
            weight={providerDetail?.weight}
            volume={providerDetail?.volume}
            needLiftingOrigin={false}
            needLiftingDestination={false}
            travelTypeDesc={providerDetail?.service_type ?? ""}
            start_location={providerDetail?.start_location ?? "" }
            end_location={providerDetail?.end_location?? "" }
            start_date_flexible={"Exacto"}
            end_date_flexible={"Exacto"}
            start_date={providerDetail?.start_date?.split(" ")[0] ?? ""}
            start_date_hour={providerDetail?.start_date?.split(" ")[1] ?? ""}
            end_date={providerDetail?.end_date?.split(" ")[0] ?? ""}
            end_date_hour={providerDetail?.end_date?.split(" ")[1] ?? ""}
          />
        </Col>
        <Col span={12} >
          <RouteMap mapContainerRef={mapContainerRef}/>
        </Col>
        </Flex>
      </Flex>
      <AditionalInfo 
        title="Información adicional"
        documents={providerDetail?.carrier_request_documents ?? []}
        contacts={providerDetail?.carrier_request_contacts ?? []}
        setIsNextStepActive={setIsNextStepActive}
        />
      {/*{service_type !== "3" ? <Materials materials={dataCarga} /> : <Persons persons={persons} />}*/}
      <Flex vertical className={styles.materialsWrapper} style={{width: '100%'}}>
        <h3>Materiales</h3>
        <p>&nbsp;</p>
        <Materials materials={dataCarga}/>
      </Flex>
    </Flex>
  );
}
