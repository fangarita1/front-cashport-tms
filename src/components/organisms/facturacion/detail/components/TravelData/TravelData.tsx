"use client";
import React, { useEffect, useRef, useState } from "react";
import { Flex, Row, Col } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/es-us";
dayjs.locale("es");
import { ProviderDetailTravelData } from "@/types/acept_carrier/acept_carrier";
import styles from "./travelData.module.scss";
import mapboxgl from "mapbox-gl";
import { ICarrierRequestDetail } from "@/types/logistics/schema";
import { formatDatePlaneWithoutComma, formatNumber } from "@/utils/utils";

interface TravelDataProps {
  travelData: ICarrierRequestDetail | undefined;
}

export default function TravelData({ travelData }: TravelDataProps) {
  /* Agendamiento */
  const origin = useRef<any>([]);
  const destination = useRef<any>([]);
  console.log(origin);

  /* MAPBOX */
  const [routeGeometry, setRouteGeometry] = useState<any>(null);
  const [routeInfo, setRouteInfo] = useState([]);
  const [distance, setDistance] = useState<any>(null);
  const [timetravel, setTimeTravel] = useState<any>(null);
  const mapContainerRef = useRef(null);
  const [mapStyle, setMapStyle] = useState("mapbox://styles/mapbox/streets-v12");

  useEffect(() => {
    loadTravelData();
  }, [travelData]);

  /* MAPBOX */
  const mapsAccessToken =
    "pk.eyJ1IjoiamNib2JhZGkiLCJhIjoiY2x4aWgxejVsMW1ibjJtcHRha2xsNjcxbCJ9.CU7FHmPR635zv6_tl6kafA";

  const loadTravelData = async () => {
    if (travelData !== undefined) {
      const routes = travelData?.geometry;
      setRouteInfo(routes);
      // Check if any routes are returned
      if (routes != undefined) {
        origin.current = [travelData.start_longitude, travelData.start_latitude];
        destination.current = [travelData.end_longitude, travelData.end_latitude];
        const { distance, duration, geometry } = routes[0];
        setRouteGeometry(geometry); // Set the route geometry
        setDistance(parseFloat((distance / 1000).toFixed(0)) + " Km");
        var date = new Date();
        date.setSeconds(duration);
        var hrs = date.toISOString().substr(11, 5);
        setTimeTravel(hrs);
      }
    }
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = mapsAccessToken;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: mapStyle,
      center: { lon: -74.07231699675322, lat: 4.66336863727521 }, // longitude and latitude
      zoom: 12,
      attributionControl: false
    });

    map.on("style.load", () => {
      // Add the compass control
      const compassControl = new mapboxgl.NavigationControl({
        showCompass: true
      });
      map.addControl(compassControl, "top-right");

      // Create a marker at the starting position
      if (origin) {
        const startMarker = new mapboxgl.Marker().setLngLat(origin.current).addTo(map);
      }

      // Create a marker at the finish position
      if (destination) {
        const finalMarker = new mapboxgl.Marker().setLngLat(destination.current).addTo(map);
      }

      if (routeGeometry) {
        const datajson: GeoJSON.Feature = {
          type: "Feature",
          geometry: routeGeometry,
          properties: {}
        };

        map.addSource("route", {
          type: "geojson",
          data: datajson
        });

        map.addLayer({
          id: "route",
          type: "line",
          source: "route",
          layout: {
            "line-join": "round",
            "line-cap": "round"
          },
          paint: {
            "line-color": "#3FB1CE",
            "line-width": 6
          }
        });
      }
      if (travelData?.id_service_type == 3) {
        map.setCenter(origin.current);
        map.setZoom(14);
      } else {
        // Get the route bounds
        const bounds = routeGeometry.coordinates.reduce(
          (bounds: any, coord: any) => bounds.extend(coord),
          new mapboxgl.LngLatBounds()
        );

        // Zoom out to fit the route within the map view
        map.fitBounds(bounds, {
          padding: 50
        });
      }
    });

    // return () => {
    //   map.remove();
    // };
  }, [mapStyle, routeGeometry, origin, destination]);

  return (
    <Flex vertical className={styles.wrapper}>
      <Flex className={styles.top}>
        <Flex style={{ marginBottom: "28px" }}>
          <h3>Datos del viaje</h3>
        </Flex>
      </Flex>
      <Flex className={styles.info}>
        <Row style={{ width: "100%" }}>
          <Col span={12} style={{ width: "100%" }}>
            <Flex vertical style={{ width: "90%" }}>
              <Row className={styles.boxInfo}>
                <Col span={12} className={styles.titles}>
                  <p>
                    <label>Distancia Total</label>
                  </p>
                  <p>
                    <label>Tiempo Estimado</label>
                  </p>
                  {travelData?.service_type !== "3" ? (
                    <>
                      <p>
                        <label>Volumen</label>
                      </p>
                      <p>
                        <label>Peso</label>
                      </p>
                    </>
                  ) : (
                    <p>Personas</p>
                  )}
                </Col>
                <Col span={12} className={styles.values}>
                  <p>
                    <label>{formatNumber(distance)} km</label>
                  </p>
                  <p>
                    <label>{timetravel} hr</label>
                  </p>
                  {travelData?.service_type !== "3" ? (
                    <>
                      <p>
                        <label>{formatNumber(travelData?.volume ?? 0)} m3</label>
                      </p>
                      <p>
                        <label>{formatNumber(travelData?.weight ?? 0)} kg</label>
                      </p>
                    </>
                  ) : (
                    <p>{travelData?.carrier_request_persons?.length}</p>
                  )}
                </Col>
              </Row>
              <Row>
                <Col span={12} style={{ paddingTop: "0.5rem" }}>
                  <p style={{ paddingTop: "1rem" }}>
                    <label>
                      <b>Tipo de viaje</b>
                    </label>
                  </p>
                </Col>
                <Col span={12} style={{ paddingTop: "0.5rem", textAlign: "right" }}>
                  <p style={{ paddingTop: "1rem" }}>
                    <label>
                      <b>{travelData?.service_type}</b>
                    </label>
                  </p>
                </Col>
                <Col span={24} style={{ paddingTop: "1rem" }}>
                  <hr style={{ borderTop: "1px solid #f7f7f7" }}></hr>
                </Col>
              </Row>
              <Row>
                <Col span={12} style={{ paddingTop: "0.5rem" }}>
                  <p style={{ paddingTop: "1rem" }}>
                    <b>Punto Origen</b>
                  </p>
                </Col>
                <Col span={12} style={{ paddingTop: "0.5rem", textAlign: "right" }}>
                  <p style={{ paddingTop: "0.5rem" }}>
                    <label>
                      <b>{travelData?.start_location}</b>
                    </label>
                  </p>
                </Col>
                <Col span={24} style={{ paddingTop: "1rem" }}>
                  <hr style={{ borderTop: "1px solid #f7f7f7" }}></hr>
                </Col>
              </Row>
              <Row>
                <Col span={12} style={{ paddingTop: "0.5rem" }}>
                  <p style={{ paddingTop: "1rem" }}>
                    <label>
                      <b>Punto Destino</b>
                    </label>
                  </p>
                </Col>
                <Col span={12} style={{ paddingTop: "0.5rem", textAlign: "right" }}>
                  <p style={{ paddingTop: "0.5rem" }}>
                    <label>
                      <b>{travelData?.end_location}</b>
                    </label>
                  </p>
                </Col>
                <Col span={24} style={{ paddingTop: "1rem" }}>
                  <hr style={{ borderTop: "1px solid #f7f7f7" }}></hr>
                </Col>
              </Row>
              <Row>
                <Col span={12} style={{ paddingTop: "0.5rem" }}>
                  <p style={{ paddingTop: "1rem" }}>
                    <label>
                      <b>Fecha y hora inicial</b>
                    </label>
                  </p>
                </Col>
                <Col span={12} style={{ paddingTop: "0.5rem", textAlign: "right" }}>
                  <p style={{ paddingTop: "1rem" }}>
                    <label>
                      <b>{travelData?.start_date?.split(" ")[1]} h</b>
                    </label>
                  </p>
                  <p style={{ paddingTop: "0.5rem" }}>
                    {travelData?.start_date ? (
                      <b>{formatDatePlaneWithoutComma(travelData?.start_date?.split(" ")[0])}</b>
                    ) : (
                      <p>No date</p>
                    )}
                  </p>
                </Col>
                <Col span={24} style={{ paddingTop: "1rem" }}>
                  <hr style={{ borderTop: "1px solid #f7f7f7" }}></hr>
                </Col>
              </Row>
              <Row>
                <Col span={12} style={{ paddingTop: "0.5rem" }}>
                  <p style={{ paddingTop: "1rem" }}>
                    <label>
                      <b>Fecha y hora final</b>
                    </label>
                  </p>
                </Col>
                <Col span={12} style={{ paddingTop: "0.5rem", textAlign: "right" }}>
                  <p style={{ paddingTop: "1rem" }}>
                    <label>
                      <b>{travelData?.end_date?.split(" ")[1]} h</b>
                    </label>
                  </p>
                  <p style={{ paddingTop: "0.5rem" }}>
                    {travelData?.end_date ? (
                      <b>{formatDatePlaneWithoutComma(travelData?.end_date?.split(" ")[0])}</b>
                    ) : (
                      <p>No date</p>
                    )}
                  </p>
                </Col>
              </Row>
            </Flex>
          </Col>
          <Col span={12}>
            <Flex vertical className={styles.resume} style={{ width: "100%" }}>
              <div
                ref={mapContainerRef}
                style={{
                  width: "100%",
                  height: "50vh",
                  border: "1px #F7F7F7 solid"
                }}
              />
            </Flex>
          </Col>
        </Row>
      </Flex>
    </Flex>
  );
}
