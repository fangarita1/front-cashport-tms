import { Button, Collapse, Typography } from "antd";
import { CaretDown, Truck } from "phosphor-react";
import styles from './novelty.module.scss';
import { FC, useEffect, useState } from "react";
import { NoveltyTable } from "@/components/molecules/tables/NoveltyTable/Novelty";
import { ITransferJourney, ITripJourney } from "@/types/transferJourney/ITransferJourney";
import { getTransferJourney } from "@/services/logistics/transfer-journey";
import { formatMoney } from "@/utils/utils";

const Text = Typography

interface INoveltyProps {
  transferRequestId: number | null;
}

export const Novelty: FC<INoveltyProps> = ({ transferRequestId }) => {
  const [transferJournies, setTransferJournies] = useState<ITransferJourney[]>();
  const [key, setKey] = useState<number | null>(null)

  const TripHeader = ({ trip, isHeader = false }: { trip: ITripJourney, isHeader?: boolean }) => (
    <div className={`${styles.resumContainer} ${isHeader && styles.marginBottom}`}>
      <div className={styles.resum}>
        <div className={styles.resumItem}>
          <Text className={styles.text}>Vehículo</Text>
          <Text className={`${styles.text} ${styles.bold}`}>{trip.plate_number || '-'}</Text>
        </div>
        <div className={styles.resumItem}>
          <Text className={styles.text}>Proveedor</Text>
          <Text className={`${styles.text} ${styles.bold}`}>{trip.provider}</Text>
        </div>
        <div className={styles.resumItem}>
          <Text className={styles.text}>Conductor</Text>
          <Text className={`${styles.text} ${styles.bold}`}>{trip.description}</Text>
        </div>
      </div>
      <div className={`${styles.resum} ${styles.right}`}>
        <div className={`${styles.resumItem} ${styles.right}`}>
          <Text className={styles.text}>Tarifa base</Text>
          <Text className={styles.text}>{formatMoney(trip.fare) || 0}</Text>
        </div>
        <div className={`${styles.resumItem} ${styles.right}`}>
          <Text className={styles.text}>Sobrecosto</Text>
          <Text className={styles.text}>{formatMoney(trip.surcharge) || 0}</Text>
        </div>
        <div className={`${styles.resumItem} ${styles.right}`}>
          <Text className={`${styles.text} ${styles.bold}`}>Total</Text>
          <Text className={`${styles.text} ${styles.bold}`}>{formatMoney(trip.total) || 0}</Text>
        </div>
      </div>
    </div>
  )

  const TitleComponent = ({ journey }: { journey: ITransferJourney }) => (
    <div className={styles.header}>
      <div className={styles.stateContainer}>
        <Truck size={27} color="#FFFFFF" weight="fill" />
        <Text className={styles.state}>{journey.description}</Text>
      </div>
      <div className={styles.fromto}>
        <div className={styles.fromtoContainer}>
          <Text className={styles.title}>Origen</Text>
          <Text className={styles.subtitle}>{journey.start_location}</Text>
        </div>
        <div className={`${styles.fromtoContainer} ${styles.right}`}>
          <div>
            <Text className={styles.title}>Destino</Text>
            <Text className={styles.subtitle}>{journey.end_location}</Text>
          </div>
          <CaretDown className={`${styles.caret} ${journey.id === key && styles.rotate}`} size={24} />
        </div>
      </div>
      {journey.id !== key && journey.trips.map((trip) => <TripHeader key={trip.id} isHeader trip={trip} />)}
    </div>
  )

  const findDetails = async () => {
    const data = await getTransferJourney(Number(transferRequestId));
    if (Object.keys(data).length) {
      setTransferJournies(data as ITransferJourney[]);
    }
  }

  useEffect(() => {
    if (transferRequestId) findDetails();
  }, [transferRequestId])

  return (
    <div className={styles.collapsableContainer}>
      {transferJournies?.map((journey) => (
        <div key={journey.id} className={styles.collapsable}>
          <Collapse onChange={(item) => setKey(Number(item[0]))} expandIconPosition="end" ghost items={[{
            key: journey.id,
            label: <TitleComponent journey={journey} />,
            children: (
              <div className={styles.contentContainer}>
                {journey.trips.map((trip) => (
                  <div key={trip.id}>
                    <TripHeader trip={trip} />
                    <NoveltyTable novelties={trip.novelties} />
                    <div className={styles.btnContainer}>
                      <Button className={styles.btn} type="text" size="large">
                        <Text className={styles.text}>Crear una novedad</Text>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ),
            showArrow: false,
          }]} />
        </div>
      ))}
    </div>
  )
}