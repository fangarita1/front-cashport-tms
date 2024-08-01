"use client";
import React, { useRef } from "react";
import { Flex, Row, Col } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/es-us";
dayjs.locale("es");
import { ProviderDetailTravelData } from "@/types/acept_carrier/acept_carrier";
import styles from "./travelData.module.scss";
import { formatDatePlane } from "@/utils/utils";

interface TravelDataProps {
  travelData: ProviderDetailTravelData;
}

export default function TravelData({ travelData }: TravelDataProps) {
  const mapContainerRef = useRef(null);

  return (
    <Flex vertical className={styles.wrapper}>
      <Flex className={styles.top}>
        <Flex style={{marginBottom: "28px"}}>
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
                  <p>
                    <label>Volumen</label>
                  </p>
                  <p>
                    <label>Peso</label>
                  </p>
                </Col>
                <Col span={12} className={styles.values}>
                  <p>
                    <label>{travelData.totalDistance} km</label>
                  </p>
                  <p>
                    <label>{travelData.estimatedTime} h</label>
                  </p>
                  <p>
                    <label>{travelData.volume}</label>
                  </p>
                  <p>
                    <label>{travelData.weight}</label>
                  </p>
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
                      <b>{travelData.travelType}</b>
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
                      <b>Punto Origen</b>
                    </label>
                  </p>
                </Col>
                <Col span={12} style={{ paddingTop: "0.5rem", textAlign: "right" }}>
                  <p style={{ paddingTop: "0.5rem" }}>
                    <label>
                      <b>{travelData.startPoint}</b>
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
                      <b>{travelData.endPoint}</b>
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
                      <b>{travelData.initialTime} h</b>
                    </label>
                  </p>
                  <p style={{ paddingTop: "0.5rem" }}>
                    <label>
                      <b>{formatDatePlane(new Date(travelData.initialDate).toLocaleString())}</b>
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
                      <b>Fecha y hora final</b>
                    </label>
                  </p>
                </Col>
                <Col span={12} style={{ paddingTop: "0.5rem", textAlign: "right" }}>
                  <p style={{ paddingTop: "1rem" }}>
                    <label>
                      <b>{travelData.endTime} h</b>
                    </label>
                  </p>
                  <p style={{ paddingTop: "0.5rem" }}>
                    <label>
                      <b>{formatDatePlane(new Date(travelData.endDate).toLocaleString())}</b>
                    </label>
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
