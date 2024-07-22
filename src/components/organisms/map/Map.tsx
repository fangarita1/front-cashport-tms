'use client'
import { Map, GoogleApiWrapper, Marker } from "google-maps-react"
import styles from './Map.module.scss'
import { useState } from "react";
import { CaretDown, CaretUp } from "phosphor-react";

const mapStyles = {
  width: '100%',
  height: '100%',
  borderRadius: '16px',
};

const MapComponent = () => {
  const [isActive, setIsActive] = useState(false);
  const [showCards, setShowCards] = useState(false);

  return (
    <div className={styles.mainMap}>
      <div className={styles.titleContainer}>
        <div className={styles.title}>Dashboard</div>
        <div className={styles.swithComponent}>
          <div onClick={() => setIsActive(false)} className={`${styles.switchItem} ${!isActive && styles.active}`}>Gastos operativos</div>
          <div onClick={() => setIsActive(true)} className={`${styles.switchItem} ${isActive && styles.active}`}>Live Tracking</div>
        </div>
        <div />
      </div>
      <div className={styles.mapContainer}>
        <Map
          google={window.google}
          zoom={17}
          style={mapStyles}
          initialCenter={
            {
              lat: 4.7072442,
              lng: -74.0634275
            }
          }
        >
          <Marker
            position={
              {
                lat: 4.7072442,
                lng: -74.0634275
              }
            }
          />
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
        </Map>
      </div>
    </div>
  )
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCorATa_b5UGojde0HL2oBcTu6LMKwQfmU"
})(MapComponent);