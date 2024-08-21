/* eslint-disable no-unused-vars */
import { SideBar } from "@/components/molecules/SideBar/SideBar";
import styles from './details.module.scss';
import Header from "@/components/organisms/header";
import { CaretDoubleRight, CaretLeft, DotsThree } from "phosphor-react";
import { Button, Typography } from "antd";
import { MainDescription } from "./main-description/MainDescription";
import { Step } from "./step/Step";
import { useEffect, useState } from "react";
import { Novelty } from "./novelty/Novelty";
import { getTransferRequestDetail } from "@/services/logistics/transfer-request";
import { useParams } from "next/navigation";
import { ITransferRequestDetail } from "@/types/transferRequest/ITransferRequest";

const Text = Typography;

export enum NavEnum {
  NOVELTY = 'NOVELTY',
  VEHICLES = 'VEHICLES',
  MATERIALS = 'MATERIALS',
  DOCUMENTS = 'DOCUMENTS',
  PSL = 'PSL',
  BILLING = 'BILLING',
}

export const TransferOrderDetails = () => {
  const [nav, setNav] = useState<NavEnum>(NavEnum.NOVELTY)
  const [transferRequest, setTransferRequest] = useState<ITransferRequestDetail | null>(null);

  const { id } = useParams();

  const renderView = () => {
    switch (nav) {
      case NavEnum.NOVELTY:
        return <Novelty />
      case NavEnum.VEHICLES:
        return <div>Vehicles view</div>
      case NavEnum.MATERIALS:
        return <div>Materials view</div>
      case NavEnum.DOCUMENTS:
        return <div>Documents view</div>
      case NavEnum.PSL:
        return <div>Psl view</div>
      case NavEnum.BILLING:
        return <div>Billing view</div>
      default:
        return <div />
    }
  }

  const findDetails = async () => {
    const data = await getTransferRequestDetail(Number(id)) as ITransferRequestDetail;
    if (Object.keys(data).length !== 0 && data.id) {
      setTransferRequest(data);
    }
  }

  useEffect(() => {
    findDetails();
  }, [])

  return (
    <div className={styles.mainTransferOrdersDetails}>
      <SideBar />
      <div className={styles.content}>
        <Header title="Resumen del viaje" />
        <div className={styles.card}>
          <div className={styles.titleContainer}>
            <div className={styles.backContainer}>
              <CaretLeft size={24} />
              <Text className={styles.title}>Datos del viaje</Text>
            </div>
            <div className={styles.btnContainer}>
              <Button
                className={styles.actionBtn}
                type="text"
                size="large">
                <DotsThree size={24} />
                <Text className={styles.text}>Generar acción</Text>
              </Button>
              <Button
                className={styles.tranckingBtn}
                type="text"
                size="large">
                <Text className={styles.text}>Tracking</Text>
                <CaretDoubleRight size={24} />
              </Button>
            </div>
          </div>
          <MainDescription transferRequest={transferRequest} />
          <Step step={transferRequest?.step || 1} />
        </div>
        <div className={styles.card}>
          <div className={styles.navContainer}>
            <Text onClick={() => setNav(NavEnum.NOVELTY)} className={`${styles.nav} ${nav === NavEnum.NOVELTY && styles.active}`}>Novedades</Text>
            <Text onClick={() => setNav(NavEnum.VEHICLES)} className={`${styles.nav} ${nav === NavEnum.VEHICLES && styles.active}`}>Vehículos</Text>
            <Text onClick={() => setNav(NavEnum.MATERIALS)} className={`${styles.nav} ${nav === NavEnum.MATERIALS && styles.active}`}>Materiales</Text>
            <Text onClick={() => setNav(NavEnum.DOCUMENTS)} className={`${styles.nav} ${nav === NavEnum.DOCUMENTS && styles.active}`}>Documentos</Text>
            <Text onClick={() => setNav(NavEnum.PSL)} className={`${styles.nav} ${nav === NavEnum.PSL && styles.active}`}>PSL</Text>
            <Text onClick={() => setNav(NavEnum.BILLING)} className={`${styles.nav} ${nav === NavEnum.BILLING && styles.active}`}>Facturación</Text>
          </div>
          <div>
            {renderView()}
          </div>
        </div>
      </div>
    </div>
  )
}