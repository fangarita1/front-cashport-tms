'use client'
import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';
import styles from './Map.module.scss'
import { useState } from "react";
import { CaretDown, CaretUp } from "phosphor-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { SideBar } from '@/components/molecules/SideBar/SideBar';

const mapStyles = {
  width: '100%',
  height: '100%',
  borderRadius: '16px',
};

interface ISocketData {
  userId: string;
  latitude: number;
  longitude: number;
  timestamp: Date;
}

interface IMark {
  socketInfo: ISocketData,
  mark: mapboxgl.Marker | null
}

const MapComponent = () => {
  const [isActive, setIsActive] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [socketInfo, setSocketInfo] = useState<IMark[]>([]);

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  const mapsAccessToken = 'pk.eyJ1IjoiamNib2JhZGkiLCJhIjoiY2x4aWgxejVsMW1ibjJtcHRha2xsNjcxbCJ9.CU7FHmPR635zv6_tl6kafA';
  const socket = io('https://ppdaeqfxju.us-east-2.awsapprunner.com');

  const updateUserLocation = (data: ISocketData) => {
    if (!mapRef.current) {
      return;
    }

    setSocketInfo((prevSocketInfo) => {
      const getUser = prevSocketInfo.find(f => f.socketInfo.userId === data.userId);

      if (getUser) {
        return prevSocketInfo.map((item) => {
          if (getUser.socketInfo.userId === item.socketInfo.userId) {
            item.mark!.remove();
            return {
              mark: item.mark!.setLngLat([data.longitude, data.latitude]).addTo(mapRef.current!),
              socketInfo: {
                ...item.socketInfo,
                latitude: data.latitude,
                longitude: data.longitude,
                timestamp: data.timestamp,
              },
            };
          }
          return item;
        });
      } else {
        let mark: mapboxgl.Marker | null = null;
        if (mapRef.current) {
          mark = new mapboxgl.Marker({
            draggable: true,
          })
            .setLngLat([data.longitude, data.latitude])
            .addTo(mapRef.current);
        }
        return [...prevSocketInfo, { mark, socketInfo: data }];
      }
    });
  };

  useEffect(() => {
    socket.on('changeLocation', (data) => {
      console.log('Ubicación recibida:', data);
      updateUserLocation(data)
    });

    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = mapsAccessToken;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: { lon: -74.07231699675322, lat: 4.66336863727521 },
      zoom: 12,
      attributionControl: false,
    });

    mapRef.current = map;

    map.on("style.load", () => {
      const compassControl = new mapboxgl.NavigationControl({
        showCompass: true,
      });
      map.addControl(compassControl, "top-right");
    });

    return () => {
      socket.disconnect();
      map.remove();
    };
  }, []);

  return (
    <div className={styles.mainMap}>
      <SideBar />
      <div className={styles.content}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>Dashboard</div>
          <div className={styles.swithComponent}>
            <div onClick={() => setIsActive(false)} className={`${styles.switchItem} ${!isActive && styles.active}`}>Gastos operativos</div>
            <div onClick={() => setIsActive(true)} className={`${styles.switchItem} ${isActive && styles.active}`}>Live Tracking</div>
          </div>
          <div />
        </div>
        <div className={styles.mapContainer}>
          <div
            ref={mapContainerRef}
            style={mapStyles}
          >
            <div className={styles.mainCard}>
              <div className={styles.titleContainer} onClick={() => setShowCards(!showCards)}>
                <div className={styles.titleCard}>Estado de los viajes</div>
                {showCards ? <CaretUp size={20} color="#FFFFFF" /> : <CaretDown size={20} color="#FFFFFF" />}
              </div>
              {showCards && (
                <div className={styles.cardContainer}>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
                    <div className={`${styles.card} ${index !== 2 && styles.bottomDivider}`} key={item}>
                      <div className={styles.leftSection}>
                        <div className={styles.img} />
                        <div>
                          <div className={styles.cardTitleContainer}>
                            <div className={styles.cardTitle}>Camion C-100</div>
                            <div className={styles.cardSubtitle}>CHM-124</div>
                          </div>
                          <div className={styles.cardBody}>
                            <div className={styles.cardMarkContainer}>
                              <div className={styles.cardMark} />
                              <div>
                                <div className={styles.cardDescription}>Base Barrancabermeja</div>
                                <div className={styles.cardDate}>17 Mar. 2024 -  11:30 a.m</div>
                              </div>
                            </div>
                            <div className={styles.cardMarkContainer}>
                              <div className={styles.cardMark} />
                              <div>
                                <div className={styles.cardDescriptionStep}>Centro Empresarial Dorado</div>
                                <div className={styles.cardDateStep}>17 Mar 2024 - 5:30 p.m</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>

                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MapComponent