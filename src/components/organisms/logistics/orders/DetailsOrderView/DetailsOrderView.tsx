import { Flex,  message, Row, Col } from "antd";
import React, { useRef, useEffect, useState } from "react";

// dayjs locale
import dayjs from 'dayjs';
import 'dayjs/locale/es-us';
dayjs.locale('es');

// mapbox
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

//schemas
import {  IMaterial, ITransferOrder } from "@/types/logistics/schema";

//navigation
import { useRouter } from "next/navigation";

//api
import { getTransferOrderById } from "@/services/logistics/transfer-orders";
import { RouteMap } from "./components/RouteMap/RouteMap";
import { SummaryData } from "./components/SummaryData/SummaryData";
import { Responsibles } from "./components/Responsibles/Responsibles";
import AditionalInfo from "../../acept_carrier/detail/components/AditionalInfo/AditionalInfo";
import Materials from "../../acept_carrier/detail/components/Materials/Materials";

//styles
import styles from "./DetailsOrderView.module.scss";
import PrincipalButton from "@/components/atoms/buttons/principalButton/PrincipalButton";

interface Props {
  idOrder: string;
}

export const DetailsOrderView = ({ idOrder = "" }: Props) => {
  const { push } = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [transferOrder, setTransferOrder] = useState<ITransferOrder>();

  /* Agendamiento */
  const origin = useRef<any>([]);
  const destination = useRef<any>([]);

  const optionsFlexible=[
    { value: 0, label: 'Exacto' },
    { value: 1, label: '+/- 1 día' },
    { value: 2, label: '+/- 2 días' },
    { value: 3, label: '+/- 3 días' },
  ];

  const [dataCarga, setDataCarga] = useState<IMaterial[]>([]);

  /* MAPBOX */
  const mapsAccessToken = 'pk.eyJ1IjoiamNib2JhZGkiLCJhIjoiY2x4aWgxejVsMW1ibjJtcHRha2xsNjcxbCJ9.CU7FHmPR635zv6_tl6kafA';//import.meta.env.VITE_MAP_BOX_ACCESS_TOKEN,

  const mapContainerRef = useRef(null);
  const [mapStyle, setMapStyle] = useState("mapbox://styles/mapbox/streets-v12");   
  const [routeGeometry, setRouteGeometry] = useState<any>(null);
  const [routeInfo, setRouteInfo] = useState([]);
  const [distance, setDistance] = useState<any>(null);
  const [timetravel, setTimetravel] = useState<any>(null);

  useEffect(() => {
    loadTransferOrder();
  });

  const loadTransferOrder = async () => {
    if(transferOrder != undefined) return;
    const result = await getTransferOrderById(idOrder);
    if(result.data.data.length > 0){
      const to:ITransferOrder = result.data.data[0];
      //console.log(to);
      setTransferOrder(to);
      origin.current = [to.start_location?.longitude, to.start_location?.latitude];
      destination.current = [to.end_location?.longitude, to.end_location?.latitude];
      const routes = to.geometry;
      setRouteInfo(routes);
      // Check if any routes are returned
      if (routes.length > 0) {
        const { distance, duration, geometry } = routes[0];
        setRouteGeometry(geometry); // Set the route geometry
        setDistance(parseFloat((distance/1000).toFixed(2)) + " Km");
        var date = new Date();
        date.setSeconds(duration);
        var hrs = date.toISOString().substr(11, 5);
        setTimetravel(hrs + " Hrs")
      }

      to.transfer_order_material?.forEach(async (mat)=>{

        mat?.material?.forEach(async m=> {
          const newvalue : IMaterial = m;
          newvalue.quantity = mat.quantity;
          console.log(newvalue);
          setDataCarga(prevData => [...prevData, newvalue]);
        })
      });
    } 
  };


  /* MAPBOX */
  
  useEffect(() => {
    if(!mapContainerRef.current) return;
    
    mapboxgl.accessToken = mapsAccessToken;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: mapStyle,
      center: {lon:-74.07231699675322, lat:4.66336863727521}, // longitude and latitude
      zoom: 12,
      attributionControl: false,
    });
    
    map.on("style.load", () => {
      // Add the compass control
      const compassControl = new mapboxgl.NavigationControl({
        showCompass: true,
      });
      map.addControl(compassControl, "top-right");

      // Create a marker at the starting position
      if(origin){
        const startMarker = new mapboxgl.Marker()
          .setLngLat(origin.current)
          .addTo(map);
      }

      // Create a marker at the finish position
      if(destination){
        const finalMarker = new mapboxgl.Marker()      
          .setLngLat(destination.current)
          .addTo(map);
      }

      if (routeGeometry) {
        
        const datajson: GeoJSON.Feature = {
            type: 'Feature',
            geometry: routeGeometry,
            properties: {},
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
            "line-cap": "round",
          },
          paint: {
            "line-color": "#3FB1CE",
            "line-width": 6,
          },
        });
      }
      
      if( transferOrder?.id_service_type == "2")
      {
        map.setCenter(origin.current);
        map.setZoom(14)

      }else{
        // Get the route bounds
        const bounds = routeGeometry.coordinates.reduce(
          (bounds:any, coord:any) => bounds.extend(coord),
          new mapboxgl.LngLatBounds()
        );

        // Zoom out to fit the route within the map view
        map.fitBounds(bounds, {
          padding: 50,
        });
      }
      
    });

    // return () => {
    //   map.remove();
    // };
  }, [mapStyle, routeGeometry, origin, destination]);


  return (
    <>
      {contextHolder}
      <Flex className={styles.wrapper} gap={"1.5rem"} >
          <Flex>
              <Col span={12} style={{paddingRight: "0.625rem"}}>
                <RouteMap title="Ruta" mapContainerRef={mapContainerRef}/>
              </Col>
              <Col span={12}>
                <SummaryData
                  title="Resumen"
                  routeGeometry={routeGeometry}
                  distance={distance}
                  timetravel={timetravel}
                  transferOrder={transferOrder}
                  optionsFlexible={optionsFlexible}
                />
              </Col>
          </Flex>
          <Flex vertical>
            <Responsibles title="Responsables" psls={transferOrder?.transfer_order_psl ?? []}/>
          </Flex>
          <Flex vertical>  
            <AditionalInfo 
              title="Información adicional"
              documents={transferOrder?.transfer_order_documents?? []}
              contacts={transferOrder?.transfer_order_contacts?? []}
              otherRequirements={transferOrder?.transfer_order_other_requeriments??[]}
              specialInstructions={transferOrder?.observation ?? ""}
              finalClient={transferOrder?.client_desc ?? ""}
            />
          </Flex>
          <Flex className={styles.container} vertical>
            <p className={styles.sectionTitle}>Carga</p>
            <Materials materials={dataCarga}/>
            <p>&nbsp;</p> 
            <p className={styles.title}>Vehículos sugeridos</p>                  
            <Row>
              <Col span={24} style={{paddingTop:'0.5rem'}}>
                {transferOrder?.transfer_order_vehicles?.map((veh) => (
                    <div className={styles.selected} key={veh.id}>{veh.vehicle_type_desc} <small>{veh.quantity}</small></div>
                ))}
              </Col>
            </Row> 
          </Flex>
          <Flex className={styles.footer}>
            <Col span={12}>
              <PrincipalButton
                type="default"
                className={styles.backButton}
                onClick={()=>{
                  push("/logistics/transfer-orders");
                }}>
                  Regresar
              </PrincipalButton>
            </Col>
            <Col span={12} />
          </Flex>
      </Flex>
    </>
  );
};
