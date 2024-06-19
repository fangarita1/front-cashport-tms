import { Flex, Tabs, TabsProps, Typography, message, Collapse, Row, Col, Select, Switch, DatePicker, DatePickerProps, GetProps, TimePicker, Table, TableProps,AutoComplete, Input } from "antd";
import React, { useRef, useEffect, useState, useContext } from "react";

// mapbox
import mapboxgl, { LngLatLike } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import MapboxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";

// components
import { SideBar } from "@/components/molecules/SideBar/SideBar";
import { NavRightSection } from "@/components/atoms/NavRightSection/NavRightSection";

import { ProjectFormTab } from "@/components/molecules/tabs/Projects/ProjectForm/ProjectFormTab";
import { addProject } from "@/services/projects/projects";

//interfaces
import { ICreatePayload } from "@/types/projects/IProjects";

//vars
import { CREATED } from "@/utils/constants/globalConstants";
import { useRouter } from "next/navigation";
import {
  CodesandboxLogo,
  Calendar,
  Package,
  UserList,
  NewspaperClipping
} from "@phosphor-icons/react";

import "../../../../../styles/_variables_logistics.css";

import "./createorder.scss";
import { Controller } from "react-hook-form";
import { Label } from "recharts";

const { Title, Text } = Typography;

export const CreateOrderView = () => {
  const { push } = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  /* MAPBOX */
  const mapsAccessToken = 'pk.eyJ1IjoiamNib2JhZGkiLCJhIjoiY2x4aWgxejVsMW1ibjJtcHRha2xsNjcxbCJ9.CU7FHmPR635zv6_tl6kafA';//import.meta.env.VITE_MAP_BOX_ACCESS_TOKEN,

  const mapContainerRef = useRef(null);
  const [mapStyle, setMapStyle] = useState("mapbox://styles/mapbox/streets-v11");
  const [isFocused, setIsFocused] = useState(false);
  const center = [-74.07231699675322, 4.66336863727521];
  const [origin, setOrigin] = useState("");
  const destination = [-74.07231699675322, 4.66336863727521];
  const [routeGeometry, setRouteGeometry] = useState<any>(null);
  const [originCord, setOriginCord] = useState<any>([]);
  var originCoordinates = [];
  const [routeInfo, setRouteInfo] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const [expand, setExpand] = useState(false);
  const initialItemCount = 4;
  const directions = routeInfo.length > 0 ? routeInfo[0]['legs'][0]['steps'] : [];
  const displayedDirections = expand
    ? directions
    : directions.slice(0, initialItemCount);

  const handleToggleExpand = () => {
    setExpand(!expand);
  };

  const geocodingClient = MapboxGeocoding({
    accessToken: mapsAccessToken
  });

  console.log("routeInfo==>", routeInfo);

  /* States */
  const [active, setActive] = useState("");
 
  const handleTypeClick = (event:any) => {
    setActive(event.target.id);
    console.log(event);
  }

  /* Event Handlers */
  const onCreateProject = async (data: ICreatePayload) => {
    console.log("DATA PARA POST: ", data);
    if (!data.logo) return;
    try {
      const response = await addProject(data);
      if (response.status === CREATED) {
        messageApi.open({
          type: "success",
          content: "El proyecto fue creado exitosamente."
        });
        push("/");
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Oops, hubo un error por favor intenta mas tarde."
      });
    }
  };

  /* MAPBOX */
  useEffect(() => {
    if(!mapContainerRef.current) return;
    mapboxgl.accessToken = mapsAccessToken;
    console.log(mapContainerRef);
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: mapStyle,
      center: center, // longitude and latitude
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
      const startMarker = new mapboxgl.Marker()
        .setLngLat(center)
        .addTo(map);

      if (routeGeometry) {
        map.addSource("route", {
          type: "geojson",
          data: JSON.stringify({
            type: "Feature",
            geometry: routeGeometry,
          }),
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
            "line-color": "#3b9ddd",
            "line-width": 6,
          },
        });
      }
      // Get the route bounds
      const bounds = routeGeometry.coordinates.reduce(
        (bounds:any, coord:any) => bounds.extend(coord),
        new mapboxgl.LngLatBounds()
      );

      // Zoom out to fit the route within the map view
      map.fitBounds(bounds, {
        padding: 50,
      });

      calcRouteDirection;
    });

    // return () => {
    //   map.remove();
    // };
  }, [mapStyle, routeGeometry]);

  // calculate direction
  const calcRouteDirection = async () => {
    if (origin.length > 2) {
      try {
        const origin = 'Bogotá';
        if (origin.length > 2) {
          try {
            const response = await geocodingClient
              .forwardGeocode({
                query: origin,
                types: ["place"],
                limit: 1,
              })
              .send();

            const destinationCoordinates = response.body.features[0].center;
            originCoordinates = destinationCoordinates;
            setOriginCord(destinationCoordinates);
          } catch (error) {
            console.error("Error calculating directions:", error);
            throw error;
          }
        }
        const response = await axios.get(
          `https://api.mapbox.com/directions/v5/mapbox/${localStorage.getItem(
            "mode"
          )}/${originCoordinates[0]},${originCoordinates[1]};${
            destination[0]
          },${destination[1]}?steps=true&geometries=geojson&access_token=${
            mapsAccessToken
          }`
        );

        const routes = response.data.routes;
        console.log("routes=>", routes);
        setRouteInfo(routes);
        // Check if any routes are returned
        if (routes.length > 0) {
          const { distance, duration, geometry } = routes[0];

          // Valid directions, use the distance and duration for further processing
          const directions = {
            distance,
            duration,
          };
          localStorage.setItem("fromLocation", origin);
          setRouteGeometry(geometry); // Set the route geometry
          return directions;
        } else {
          // No routes found
          throw new Error("Unable to calculate directions");
        }
      } catch (error) {
        // Handle error
        console.error("Error calculating directions:", error);
        throw error;
      }
    }
  };





  /* Carga */
  
  const columnsCarga = [
    {
      title: 'Cantidad',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'SKU',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Nombre',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Volumen',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Alto',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Ancho',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Largo',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Peso',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Alertas',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  const actionsOptions = [
    {
      key: 1,
      label: (
        <div className="collapseByAction__label">
          <CodesandboxLogo size={16} />
          <Title className="collapseByAction__label__text" level={4}>
            Tipo de viaje
          </Title>
        </div>
      ),
      children: (
        <div className="collapseByAction__children">
          <Flex gap="middle">
            <button id={"1"} className={["tripTypes", (active === "1" ? "active" : undefined)].join(" ")} onClick={handleTypeClick}>
              <div className="tripTypeIcons">
                <img className="icon" loading="lazy" alt="" src="/images/logistics/truck.svg"/>
                <div className="text">Carga</div>
              </div>
            </button>
            <button id={"2"} className={["tripTypes", (active === "2" ? "active" : undefined)].join(" ")} onClick={handleTypeClick}>
              <div className="tripTypeIcons">
                <img className="icon" loading="lazy" alt="" src="/images/logistics/izaje.svg"/>
                <div className="text">Izaje</div>
              </div>
            </button>
            <button id={"3"} className={["tripTypes", (active === "3" ? "active" : undefined)].join(" ")} onClick={handleTypeClick}>
              <div className="tripTypeIcons">
                <img className="icon" loading="lazy" alt="" src="/images/logistics/users.svg"/>
                <div className="text">Personal</div>
              </div>
            </button>
          </Flex>
        </div>
      )
    },
    {
      key: 2,
      label: (
        <div className="collapseByAction__label">
          <Calendar size={16} />
          <Title className="collapseByAction__label__text" level={4}>
            Agendamiento
          </Title>
        </div>
      ),
      children: (
        <>
          <Row>
            <Col span={12} style={{ padding:'25px'}}>
              <Row>
                <label className="locationLabels">
                  Punto Origen
                </label>
                <Select
                  placeholder="Buscar dirección inicial"                  
                  className="puntoOrigen"
                  style={{ width:'100%' }}
                  options={[
                    { value: '1', label: 'Bogotá' }
                  ]}
                />
                <Switch checkedChildren="1" unCheckedChildren="0" /><label>&nbsp;&nbsp; Requiere Izaje</label>
              </Row>
              <Row style={{marginTop:'1rem'}}>
                <label className="locationLabels">
                  Punto Destino
                </label>
                <Select
                  placeholder="Buscar dirección final"                  
                  className="puntoOrigen"
                  style={{ width:'100%' }}
                  options={[
                    { value: '2', label: 'Cajicá' },
                  ]}
                />
                <Switch checkedChildren="1" unCheckedChildren="0" /><label>&nbsp;&nbsp; Requiere Izaje</label>
              </Row>
              <Row style={{marginTop:'1.5rem'}}>
                <Col span={24}>
                  <label className="locationLabels">
                    Fecha y hora inicial
                  </label>
                </Col>
                <Col span={8}>
                  <DatePicker
                    placeholder="Seleccione fecha"                    
                    onChange={(value, dateString) => {
                      console.log('Selected Time: ', value);
                      console.log('Formatted Selected Time: ', dateString);
                    }}
                  />
                </Col>
                <Col span={8}>
                  <TimePicker placeholder="Seleccione hora"  
                  format={'HH:mm'}
                  minuteStep={15} 
                  hourStep={1}
                  type={'time'} 
                  onChange={(value) => console.log(value)} />
                </Col>
                <Col span={8}>
                <Select
                    placeholder="Seleccione"                  
                    className="puntoOrigen"
                    style={{ width:'100%' }}
                    options={[
                      { value: '2', label: 'Exacto' },
                    ]}
                  />
                </Col>
              </Row>
              <Row style={{marginTop:'1.5rem'}}>
                <Col span={24}>
                  <label className="locationLabels">
                    Fecha y hora final
                  </label>
                </Col>
                <Col span={8}>
                  <DatePicker
                    placeholder="Seleccione fecha"                    
                    onChange={(value, dateString) => {
                      console.log('Selected Time: ', value);
                      console.log('Formatted Selected Time: ', dateString);
                    }}
                  />
                </Col>
                <Col span={8}>
                  <TimePicker placeholder="Seleccione hora"  
                  format={'HH:mm'}
                  minuteStep={15} 
                  hourStep={1}
                  type={'time'} 
                  onChange={(value) => console.log(value)} />
                </Col>
                <Col span={8}>
                <Select
                    placeholder="Seleccione"                  
                    className="puntoOrigen"
                    style={{ width:'100%' }}
                    options={[
                      { value: '2', label: 'Exacto' },
                    ]}
                  />
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <div
                ref={mapContainerRef}
                style={{
                  width: "100%",
                  height: "45vh",
                  border: "1px solid",
                }}
              />
            </Col>
          </Row>
        </>
      )
    },
    {
      key: 3,
      label: (
        <div className="collapseByAction__label">
          <Package size={16} />
          <Title className="collapseByAction__label__text" level={4}>
            Carga
          </Title>
        </div>
      ),
      children: (
        <>
          <label className="locationLabels" style={{display:'flex',marginTop:'2rem'}}>
            Material
          </label><p>&nbsp;</p>
          <AutoComplete
            popupClassName="certain-category-search-dropdown"
            popupMatchSelectWidth={500}
            style={{ width: 250 }}
            size="large"
          >
            <Input.Search size="large" placeholder="Buscar material" />
          </AutoComplete>
          <Table
            columns={columnsCarga}
          />
        </>
      )
    },
    {
      key: 4,
      label: (
        <div className="collapseByAction__label">
          <UserList size={16} />
          <Title className="collapseByAction__label__text" level={4}>
            Responsables
          </Title>
        </div>
      ),
      children: (
        <>
          <Text>Error: loading component: no such file</Text>
        </>
      )
    },
    {
      key: 5,
      label: (
        <div className="collapseByAction__label">
          <NewspaperClipping size={16} />
          <Title className="collapseByAction__label__text" level={4}>
            Información adicional
          </Title>
        </div>
      ),
      children: (
        <>
          <Text>Error: loading component: no such file</Text>
        </>
      )
    },
  ];

  return (
    <>
      {contextHolder}
      <main className="mainCreateOrder">
        <SideBar />
        <Flex vertical className="containerCreateOrder">
          <Flex className="infoHeaderOrder">
            <Flex gap={"2rem"}>
              <Title level={2} className="titleName">
                Crear Nuevo Viaje
              </Title>
            </Flex>
            <Flex component={"navbar"} align="center" justify="space-between">
              <NavRightSection />
            </Flex>
          </Flex>
          {/* ------------Main Info Order-------------- */}
          <Flex className="orderContainer">
            <Collapse
              className="collapseByAction"
              expandIconPosition="end"
              accordion={false}
              ghost              
              items={actionsOptions}
            />            
          </Flex>
        </Flex>
      </main>
    </>
  );
};
