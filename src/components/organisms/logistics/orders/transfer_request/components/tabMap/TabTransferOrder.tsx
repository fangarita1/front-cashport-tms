import mapboxgl from "mapbox-gl";
import { ITransferOrderRequest } from "@/types/logistics/schema";
import { Col, Flex, Row } from "antd";
import { useEffect, useRef, useState } from "react";
import { formatDatePlaneWithoutComma } from "@/utils/utils";
type PricingStepOneProps = {
  orderRequest: ITransferOrderRequest | undefined;
};

const optionsFlexible = [
  { value: 0, label: "Exacto" },
  { value: 1, label: "+/- 1 día" },
  { value: 2, label: "+/- 2 días" },
  { value: 3, label: "+/- 3 días" }
];

export default function TabTransferOrder({ orderRequest }: PricingStepOneProps) {
  /* MAPBOX */
  const mapsAccessToken =
    "pk.eyJ1IjoiamNib2JhZGkiLCJhIjoiY2x4aWgxejVsMW1ibjJtcHRha2xsNjcxbCJ9.CU7FHmPR635zv6_tl6kafA"; //import.meta.env.VITE_MAP_BOX_ACCESS_TOKEN,

  const mapContainerRef = useRef(null);
  const [distance, setDistance] = useState<any>(null);
  const [timetravel, setTimeTravel] = useState<any>(null);
  const [routeGeometry, setRouteGeometry] = useState<any>(null);
  const mapStyle = "mapbox://styles/mapbox/streets-v12";

  /* MAPBOX */

  useEffect(() => {
    if (orderRequest !== undefined) {
      const routes = orderRequest?.geometry;
      if (routes != undefined) {
        const { distance, duration, geometry } = routes[0];
        setRouteGeometry(geometry); // Set the route geometry
        setDistance(parseFloat((distance / 1000).toFixed(0)) + " Km");
        var date = new Date();
        date.setSeconds(duration);
        var hrs = date.toISOString().substr(11, 5);
        setTimeTravel(hrs);
      }
    }

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
      // Get the route bounds
      const bounds = routeGeometry.coordinates.reduce(
        (bounds: any, coord: any) => bounds.extend(coord),
        new mapboxgl.LngLatBounds()
      );

      // Zoom out to fit the route within the map view
      map.fitBounds(bounds, {
        padding: 50
      });
    });

    // return () => {
    //   map.remove();
    // };
  }, [routeGeometry, orderRequest]);

  return (
    <Flex vertical className="travelDataWrapper">
      <Flex>
        <Row style={{ width: "100%" }}>
          <Col span={12} style={{ width: "100%" }}>
            <Flex vertical style={{ width: "90%" }}>
              <Row className="travelDataInfoBox">
                <Col span={12} className="travelDataTitles">
                  <p>
                    <label>Distancia Total</label>
                  </p>
                  <p>
                    <label>Tiempo Estimado</label>
                  </p>
                  {orderRequest?.id_service_type !== 3 ? (
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
                <Col span={12} className="travelDataValues">
                  <p>
                    <label>{distance}</label>
                  </p>
                  <p>
                    <label>{timetravel} hr</label>
                  </p>
                  {orderRequest?.id_service_type !== 3 ? (
                    <>
                      <p>
                        <label>{/*travelData?.volume*/}00</label>
                      </p>
                      <p>
                        <label>{/*travelData?.weight*/}00</label>
                      </p>
                    </>
                  ) : (
                    <p>{orderRequest?.transfer_order_persons?.length}</p>
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
                      <b>{orderRequest?.service_type_desc}</b>
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
                      <b>{orderRequest?.start_location?.description}</b>
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
                      <b>{orderRequest?.end_location?.description}</b>
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
                  <p style={{ paddingTop: "0.5rem" }}>
                    <label>
                      <b>
                        {
                          optionsFlexible.find((x) => x.value == orderRequest?.start_date_flexible)
                            ?.label
                        }
                      </b>
                    </label>
                  </p>
                </Col>
                <Col span={12} style={{ paddingTop: "0.5rem", textAlign: "right" }}>
                  <p style={{ paddingTop: "1rem" }}>
                    <label>
                      <b>{orderRequest?.start_date?.split("T")[1].substring(0, 5)} h</b>
                    </label>
                  </p>
                  <p style={{ paddingTop: "0.5rem" }}>
                    {orderRequest?.start_date ? (
                      <b>
                        {formatDatePlaneWithoutComma(
                          new Date(orderRequest?.start_date?.split("T")[0]).toString()
                        )}
                      </b>
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
                  <p style={{ paddingTop: "0.5rem" }}>
                    <label>
                      <b>
                        {
                          optionsFlexible.find((x) => x.value == orderRequest?.start_date_flexible)
                            ?.label
                        }
                      </b>
                    </label>
                  </p>
                </Col>
                <Col span={12} style={{ paddingTop: "0.5rem", textAlign: "right" }}>
                  <p style={{ paddingTop: "1rem" }}>
                    <label>
                      <b>{orderRequest?.end_date?.split("T")[1].substring(0, 5)} h</b>
                    </label>
                  </p>
                  <p style={{ paddingTop: "0.5rem" }}>
                    {orderRequest?.start_date ? (
                      <b>
                        {formatDatePlaneWithoutComma(
                          new Date(orderRequest?.start_date?.split("T")[0]).toString()
                        )}
                      </b>
                    ) : (
                      <p>No date</p>
                    )}
                  </p>
                </Col>
              </Row>
            </Flex>
          </Col>
          <Col span={12}>
            <Flex vertical className="travelDataMapResume" style={{ width: "100%" }}>
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
