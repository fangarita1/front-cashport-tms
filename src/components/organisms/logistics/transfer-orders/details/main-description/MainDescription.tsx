import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { FC, useEffect, useRef } from "react";
import styles from './mainDescription.module.scss';
import { ConfigProvider, Dropdown, Timeline, Typography } from "antd";
import { CaretDown, Shuffle, WarningCircle } from "phosphor-react";
import { MenuProps } from "antd/lib";
import { ITransferRequestDetail } from "@/types/transferRequest/ITransferRequest";
import { TransferOrdersState } from "@/utils/constants/transferOrdersState";
import dayjs from "dayjs";
import { formatMoney } from "@/utils/utils";

const Text = Typography;

const mapStyles = {
  width: '100%',
  height: '100%',
  borderRadius: '16px',
};

const items: MenuProps['items'] = [
  {
    key: '1',
    label: 'Cargando',
  },
  {
    key: '2',
    label: 'En curso',
  },
  {
    key: '3',
    label: 'Descargando',
  },
  {
    key: '4',
    label: 'Detenido',
  },
  {
    key: '5',
    label: 'Stand by',
  },
];

interface IMainDescriptionProps {
  transferRequest: ITransferRequestDetail | null;
}

export const MainDescription: FC<IMainDescriptionProps> = ({ transferRequest }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const mapsAccessToken = 'pk.eyJ1IjoiamNib2JhZGkiLCJhIjoiY2x4aWgxejVsMW1ibjJtcHRha2xsNjcxbCJ9.CU7FHmPR635zv6_tl6kafA';

  const getState = (stateId: string) => {
    const getState = TransferOrdersState.find((f) => f.id === stateId);
    return (
      <div className={styles.trackStateContainer}>
        <Text className={styles.trackState} style={{ backgroundColor: getState?.bgColor }}>{getState?.name}</Text>
        <CaretDown size={16} />
      </div>
    )
  }

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = mapsAccessToken;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: { lon: -74.07231699675322, lat: 4.66336863727521 },
      zoom: 12,
      attributionControl: false,
    });

    map.on("style.load", () => {
      const compassControl = new mapboxgl.NavigationControl({
        showCompass: true,
      });
      map.addControl(compassControl, "top-right");
    });

    return () => {
      map.remove();
    };
  }, [transferRequest]);

  const timeLineItems = transferRequest ? transferRequest?.timeLine.map((item, index) => {
    if (index === 0 || index + 1 === transferRequest?.timeLine.length) {
      return {
        dot: <div className={styles.bigDot}><div className={styles.littleDot} /></div>,
        children: (
          <div className={styles.dotChildrenContainer}>
            <div className={styles.leftChildren}>
              <Text className={styles.dotTitle}>{item.description}</Text>
              <Text className={styles.dotText}>{item.location}</Text>
            </div>
            <Text className={styles.dotText}>{dayjs(item.end_date).format('DD MMMM YYYY - HH:mm')}</Text>
          </div>
        ),
      }
    }
    return {
      dot: <div className={styles.dot} />,
      children: (
        <div className={styles.dotChildrenContainer}>
          <div className={styles.leftChildren}>
            <Text className={styles.dotTitle}>{item.description}</Text>
            <Text className={styles.dotText}>{item.location}</Text>
          </div>
          <Text className={styles.dotText}>{dayjs(item.end_date).format('DD MMMM YYYY - HH:mm')}</Text>
        </div>
      ),
    }
  }) : []

  return (
    <div className={styles.mainDescription}>
      <div className={styles.trackContainer}>
        <div className={styles.trackComponent}>
          <div className={styles.trackTitleContainer}>
            <Text className={styles.trackTitle}>ID  - {transferRequest?.id}</Text>
            <ConfigProvider
              theme={{
                components: {
                  Dropdown: {
                    colorBgElevated: '#FFFFFF',
                    controlItemBgActive: '#CBE71E',
                    controlItemBgActiveHover: '#CBE71E'
                  }
                },
              }}
            >
              <Dropdown
                overlayClassName={styles.overlayDropDown}
                menu={{
                  items,
                  selectable: true,
                  defaultSelectedKeys: [transferRequest?.status_id || ''],
                }}
              >
                {getState(transferRequest?.status_id || '')}
              </Dropdown>
            </ConfigProvider>
          </div>
          <div className={styles.timeLineContainer}>
            <ConfigProvider
              theme={{
                components: {
                  Timeline: {
                    tailColor: '#CBE71E',
                    dotBg: 'none'
                  },
                },
              }}
            >
              <Timeline
                items={timeLineItems || []}
              />
            </ConfigProvider>
          </div>
        </div>
        <div className={styles.cardsContainer}>
          <div className={styles.card}>
            <div className={styles.titleCardContainer}>
              <Text className={styles.titleCard}>Tarifa base</Text>
              <Shuffle size={16} />
            </div>
            <div className={styles.titleCardContainer}>
              <Text className={styles.subtitleCard}>{formatMoney(transferRequest?.total_fare)}</Text>
              <WarningCircle size={13} />
            </div>
          </div>
          <div className={styles.card}>
            <Text className={styles.titleCard}>Sobrecosto</Text>
            <Text className={styles.subtitleCard}>{transferRequest && transferRequest.surcharge ? formatMoney(transferRequest?.surcharge) : '-'}</Text>
          </div>
          {transferRequest && transferRequest.distance && (
            <div className={styles.card}>
              <Text className={styles.titleCard}>Distancia</Text>
              <Text className={styles.subtitleCard}>{transferRequest.distance} Km</Text>
            </div>
          )}
          {transferRequest && transferRequest.time_total && (
            <div className={styles.card}>
              <Text className={styles.titleCard}>Tiempo</Text>
              <Text className={styles.subtitleCard}>{transferRequest.time_total} h</Text>
            </div>
          )}
        </div>
      </div>
      <div className={styles.mapContainer}>
        <div ref={mapContainerRef} style={mapStyles} />
      </div>
    </div>
  )
}