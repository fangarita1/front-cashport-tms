import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef } from "react";
import styles from './mainDescription.module.scss';
import { ConfigProvider, Dropdown, Timeline, Typography } from "antd";
import { CaretDown, Shuffle, WarningCircle } from "phosphor-react";
import { MenuProps } from "antd/lib";

const Text = Typography;

const mapStyles = {
  width: '100%',
  height: '100%',
  borderRadius: '16px',
};

const items: MenuProps['items'] = [
  {
    key: '1',
    label: 'Item 1',
  },
  {
    key: '2',
    label: 'Item 2',
  },
  {
    key: '3',
    label: 'Item 3',
  },
];

export const MainDescription = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const mapsAccessToken = 'pk.eyJ1IjoiamNib2JhZGkiLCJhIjoiY2x4aWgxejVsMW1ibjJtcHRha2xsNjcxbCJ9.CU7FHmPR635zv6_tl6kafA';

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
  }, []);

  return (
    <div className={styles.mainDescription}>
      <div className={styles.trackContainer}>
        <div className={styles.trackComponent}>
          <div className={styles.trackTitleContainer}>
            <Text className={styles.trackTitle}>ID  - 0000000</Text>
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
                  defaultSelectedKeys: ['3'],
                }}
              >
                <div className={styles.trackStateContainer}>
                  <Text className={styles.trackState}>En curso</Text>
                  <CaretDown size={16} />
                </div>
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
                items={[
                  {
                    dot: <div className={styles.bigDot}><div className={styles.littleDot} /></div>,
                    children: (
                      <div className={styles.dotChildrenContainer}>
                        <div className={styles.leftChildren}>
                          <Text className={styles.dotTitle}>Origen</Text>
                          <Text className={styles.dotText}>CENTRO EMPRESARIAL DORADO PLAZA</Text>
                        </div>
                        <Text className={styles.dotText}>17 Marzo 2014 - 05:30</Text>
                      </div>
                    ),
                  },
                  {
                    dot: <div className={styles.dot} />,
                    children: (
                      <div className={styles.dotChildrenContainer}>
                        <div className={styles.leftChildren}>
                          <Text className={styles.dotTitle}>Trayecto 1</Text>
                          <Text className={styles.dotText}>CENTRO EMPRESARIAL DORADO PLAZA</Text>
                        </div>
                        <Text className={styles.dotText}>17 Marzo 2014 - 05:30</Text>
                      </div>
                    ),
                  },
                  {
                    dot: <div className={styles.dot} />,
                    children: (
                      <div className={styles.dotChildrenContainer}>
                        <div className={styles.leftChildren}>
                          <Text className={styles.dotTitle}>Izaje 2</Text>
                          <Text className={styles.dotText}>CENTRO EMPRESARIAL DORADO PLAZA</Text>
                        </div>
                        <Text className={styles.dotText}>17 Marzo 2014 - 05:30</Text>
                      </div>
                    ),
                  },
                  {
                    dot: <div className={styles.bigDot}><div className={styles.littleDot} /></div>,
                    children: (
                      <div className={styles.dotChildrenContainer}>
                        <div className={styles.leftChildren}>
                          <Text className={styles.dotTitle}>Destino</Text>
                          <Text className={styles.dotText}>CENTRO EMPRESARIAL DORADO PLAZA</Text>
                        </div>
                        <Text className={styles.dotText}>17 Marzo 2014 - 05:30</Text>
                      </div>
                    ),
                  },
                ]}
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
              <Text className={styles.subtitleCard}>$11.000.000</Text>
              <WarningCircle size={13} />
            </div>
          </div>
          <div className={styles.card}>
            <Text className={styles.titleCard}>Sobrecosto</Text>
            <Text className={styles.subtitleCard}>-</Text>
          </div>
          <div className={styles.card}>
            <Text className={styles.titleCard}>Distancia</Text>
            <Text className={styles.subtitleCard}>0 Km</Text>
          </div>
          <div className={styles.card}>
            <Text className={styles.titleCard}>Tiempo</Text>
            <Text className={styles.subtitleCard}>0 h</Text>
          </div>
        </div>
      </div>
      <div className={styles.mapContainer}>
        <div ref={mapContainerRef} style={mapStyles} />
      </div>
    </div>
  )
}