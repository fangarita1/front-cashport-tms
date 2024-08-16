import { Flex, Tabs, TabsProps, Typography, message, Collapse, Row, Col, Select, Switch, DatePicker, DatePickerProps, GetProps, TimePicker, Table, TableProps,AutoComplete, Input, ConfigProvider, InputNumber, Button, SelectProps, Popconfirm, Modal, Divider, Space } from "antd";
import React, { useRef, useEffect, useState, useContext } from "react";
import { runes } from 'runes2';

// dayjs locale
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/es-us';
dayjs.locale('es');

// mapbox
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import MapboxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";

// components
import { SideBar } from "@/components/molecules/SideBar/SideBar";
import { NavRightSection } from "@/components/atoms/NavRightSection/NavRightSection";

//schemas
import { CustomOptionType, IAditionalByMaterial, IClient, ICompanyCode, ICreateRegister, IFormTransferOrder, IListData, ILocation, IMaterial, IOrderPsl, IOrderPslCostCenter, ISelectOptionOrders, ITransferOrder, ITransferOrderContacts, ITransferOrderDocuments, ITransferOrderOtherRequirements, ITransferOrderPersons, IVehicleType, PSLOptionType, TransferOrderDocumentType } from "@/types/logistics/schema";

//locations
import { getAllLocations } from "@/services/logistics/locations";

//materials
import { getAllMaterials, getSearchMaterials } from "@/services/logistics/materials";

//materials
import { getSuggestedVehicles } from "@/services/logistics/vehicles";

//vars
import { CREATED, SUCCESS } from "@/utils/constants/globalConstants";
import { useRouter } from "next/navigation";
import {
  PlusCircle,
  Calendar,
  Package,
  UserList,
  NewspaperClipping,
  Trash,
  CaretLeft,
  CaretRight
} from "@phosphor-icons/react";

import "../../../../../styles/_variables_logistics.css";

import "./createorder.scss";
import { FileObject, UploadDocumentButton } from "@/components/atoms/UploadDocumentButton/UploadDocumentButton";
import TextArea from "antd/es/input/TextArea";
import { addTransferOrder } from "@/services/logistics/transfer-orders";
import { getOtherRequirements } from "@/services/logistics/other-requirements";
import { getPsl } from "@/services/logistics/psl";
import { auth } from "../../../../../../firebase";
import useSWRInmutable from "swr/immutable";
import { getDocumentsByEntityType } from "@/services/logistics/certificates";
import ModalDocuments from "@/components/molecules/modals/ModalDocuments/ModalDocuments";
import { DocumentCompleteType } from "@/types/logistics/certificate/certificate";
import { FileText, UserPlus } from "phosphor-react";
import UploadDocumentChild from "@/components/atoms/UploadDocumentChild/UploadDocumentChild";
import { RangePickerProps } from "antd/es/date-picker";
import ModalAddContact from "@/components/molecules/modals/ModalAddContact/ModalAddContact";
import { getCompanyCodes } from "@/services/logistics/company-codes";
import { getClients } from "@/services/logistics/clients";
import { getTravelDuration } from "@/utils/logistics/maps";
import CustomHourPicker from "@/components/molecules/logistics/HourPicker/HourPicker";
import CustomTimeSelector from "@/components/molecules/logistics/HourPicker/HourPicker";

const { Title, Text } = Typography;

export const CreateOrderView = () => {
  const { push } = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  /* Tipo de viaje */
  const [typeactive, setTypeActive] = useState("1");

  /* Agendamiento */
  const origin = useRef<any>([]);
  const destination = useRef<any>([]);
  const [origenIzaje, setOrigenIzaje] = useState(false);
  const [horasOrigenIzaje, setHorasOrigenIzaje] = useState<number>(1);
  const [horasDestinoIzaje, setHorasDestinoIzaje] = useState<number>(1);
  const [destinoIzaje, setDestinoIzaje] = useState(false);
  const [fechaInicial, setFechaInicial] = useState<Dayjs | undefined>(undefined);
  const [horaInicial, setHoraInicial] = useState<Dayjs>();
  const [fechaFinal, setFechaFinal] = useState<Dayjs | undefined>(undefined);
  const [horaFinal, setHoraFinal] = useState<Dayjs>();
  const [fechaInicialFlexible, setFechaInicialFlexible] = useState(-1);
  const [fechaFinalFlexible, setFechaFinalFlexible] = useState(-1);
  const [company, setCompany] = useState(-1);
  const [client, setClient] = useState(-1);
  const [observation, setObservation] = useState<any>(null);

  const [originValid,setOriginValid] = useState(true);
  const [destinationValid,setdestinationValid] = useState(true);
  const [fechaInicialValid,setFechaInicialValid] = useState(true);
  const [horaInicialValid,setHoraInicialValid] = useState(true);
  const [fechaFinalValid,setFechaFinalValid] = useState(true);
  const [horaFinalValid,setHoraFinalValid] = useState(true);
  const [fechaInicialFlexibleValid,setFechaInicialFlexibleValid] = useState(true);
  const [fechaFinalFlexibleValid,setFechaFinalFlexibleValid] = useState(true);
  
  const [clientValid,setClientValid] = useState(true);
  const [companyValid,setCompanyValid] = useState(true);

  const disabledDate: RangePickerProps['disabledDate'] = (current:any) => {
    // Can not select days before today
    return current && current < dayjs().startOf('day');
  };

    useEffect(() => {
      if (!destinoIzaje) {
          setHorasDestinoIzaje(1);
      } 
      if(!origenIzaje){
        setHorasOrigenIzaje(1);
      }
  }, [origenIzaje, destinoIzaje]);

  const { data: documentsType, isLoading: isLoadingDocuments } = useSWRInmutable(
    "0",
    getDocumentsByEntityType);
  const [isOpenModalDocuments, setIsOpenModalDocuments] = useState(false);
  const [isOpenModalContacts, setIsOpenModalContacts] = useState(false);

  const [selectedFiles, setSelectedFiles] = useState<DocumentCompleteType[]>([]);
  const [files, setFiles] = useState<FileObject[] | any[]>([]);

  /* MAPBOX */
  const mapsAccessToken = 'pk.eyJ1IjoiamNib2JhZGkiLCJhIjoiY2x4aWgxejVsMW1ibjJtcHRha2xsNjcxbCJ9.CU7FHmPR635zv6_tl6kafA';//import.meta.env.VITE_MAP_BOX_ACCESS_TOKEN,

  const mapContainerRef = useRef(null);
  const [mapStyle, setMapStyle] = useState("mapbox://styles/mapbox/streets-v12");   
  const [routeGeometry, setRouteGeometry] = useState<any>(null);
  const [routeInfo, setRouteInfo] = useState([]);
  const [distance, setDistance] = useState<any>(null);
  const [timetravel, setTimeTravel] = useState<any>(null);

  const [expand, setExpand] = useState(false);
  const initialItemCount = 4;
  // const directions = routeInfo.length > 0 ? routeInfo[0]['legs'][0]['steps'] : [];
  // const displayedDirections = expand
  //   ? directions
  //   : directions.slice(0, initialItemCount);

  const [locations, setLocations] = useState<ILocation[]>([]);
  const [locationOptions, setLocationOptions] = useState<any>([]);
  const [locationOrigin, setLocationOrigin] = useState<ILocation>();
  const [locationDestination, setLocationDestination] = useState<ILocation>();

  const handleToggleExpand = () => {
    setExpand(!expand);
  };

  const geocodingClient = MapboxGeocoding({
    accessToken: mapsAccessToken
  });

  //console.log("routeInfo==>", routeInfo);

  useEffect(() => {
    loadLocations();
  }, []);

  const loadLocations = async () => {
    if(locations.length >0 ) return;
    const result = await getAllLocations();
    if(result?.data?.data?.length > 0){
      //console.log(result.data.data);
      
      const listlocations: any[] | ((prevState: ILocation[]) => ILocation[]) = [];
      const listlocationoptions: { label: any; value: any; }[] = [];

      result.data.data.forEach((item) => {
        listlocations.push(item);
        listlocationoptions.push({label: item.description, value: item.id})
      });

      setLocations(listlocations);
      setLocationOptions(listlocationoptions);
    }
  };

  useEffect(() => {
    if (Array.isArray(documentsType)) {
        const fileSelected = documentsType
          ?.filter(
            (f) => selectedFiles?.find((f2) => f2.id === f.id)
          )
          ?.map((f) => ({
            ...f,
            file: files.find((f2) => f2.aditionalData === f.id)?.file,
            expirationDate: undefined
          }));
        if (fileSelected?.length) {
          setSelectedFiles([...fileSelected]);
        } else {
          setSelectedFiles([]);
        }
      }
  }, [files, documentsType]);


  // Cambia origen 
  const onChangeOrigin = (value:any) =>{
    //console.log('origen:'+value);
    locations.forEach(async (item, index) => {
      if(item.id == value){
        //console.log(item);
        setLocationOrigin(item);
        origin.current = [item.longitude, item.latitude];
        setOriginValid(true);
        if(typeactive == '2'){
          setLocationDestination(item);
          destination.current = [item.longitude, item.latitude];
          setdestinationValid(true);
        }
        calcRouteDirection();
      }
    });
  }

  // Cambia destino 
  const onChangeDestino = async (value:any) =>{
    console.log('destino:'+value);
    locations.forEach(async (item, index) => {
      if(item.id == value){
        //console.log(item);
        setLocationDestination(item);
        destination.current = [item.longitude, item.latitude];
        setdestinationValid(true);
        calcRouteDirection();
      }
    });
  }

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

      if(locationOrigin?.id == locationDestination?.id)
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

  // calculate direction
  const calcRouteDirection = async () => {

    if (origin.current.length == 0 || destination.current.length == 0) return;

    try {
      //console.log(origin);        
      //console.log(destination);

      const response = await axios.get(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${origin.current[0]},${origin.current[1]};${
          destination.current[0]
        },${destination.current[1]}?steps=true&geometries=geojson&access_token=${
          mapsAccessToken
        }`
      );

      const routes = response.data.routes;      
      console.log("routes=>", routes);
      if(routes != undefined && routes.length> 0){
        routes[0].legs = [];
      }
      setRouteInfo(routes);
      // Check if any routes are returned
      if (routes.length > 0) {

        const { distance, duration, geometry } = routes[0];

        // Valid directions, use the distance and duration for further processing
        const directions = {
          distance,
          duration,
        };        
        setRouteGeometry(geometry); // Set the route geometry
        setDistance(parseFloat((distance/1000).toFixed(2)) + " Km");
        calculateDuration(duration);
        return directions;
      } else {
        // No routes found
        throw new Error("No se encontraron rutas");
      }
    } catch (error) {
      // Handle error
      console.error("Error calculating directions:", error as any);
      if (error instanceof Error) {
        messageApi.error("Error calculando direcciones: " + error.message);
      }
      else {
        messageApi.error("Error calculando direcciones: " + error);
      }
    }
  };

  useEffect(() => {
    const init = fechaInicial?.hour(horaInicial?.get('hour') || 0).minute(horaInicial?.get('minute') || 0).toDate() || new Date();
    const finish = fechaFinal?.hour(horaFinal?.get('hour') || 0).minute(horaFinal?.get('minute') || 0).toDate() || new Date();
    const duration = (finish.getTime()  - init.getTime() ) / 1000 ;
    typeactive == '2' &&
    calculateDuration(duration);
  }, [typeactive, fechaInicial, fechaFinal, horaInicial, horaFinal]);

  const calculateDuration = (duration: number) => {
    const hrs = getTravelDuration(duration);
    setTimeTravel(hrs + " Hrs")
  }
  /* Tipo de viaje */
  const handleTypeClick = (event:any) => {
    //console.log(event);
    setTypeActive(event.target.id);
    origin.current = [];
    destination.current = [];
    setRouteGeometry(null)
    setRouteInfo([]);
    setDistance(null);
    setTimeTravel(null);
    if(event.target.id == "2"){
      setOrigenIzaje(true);
    }else{
      setOrigenIzaje(false);
    }
  }

  /* Carga */
  
  const columnsCarga : TableProps<IMaterial>['columns'] = [
    {
      title: 'Cantidad',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (_, record) =>
        dataCarga.length >= 1 ? (
          <Flex align="center">
            <CaretLeft onClick={() => handleQuantityMaterial(record.key,'-')}/>&nbsp;&nbsp;{record.quantity}&nbsp;&nbsp;<CaretRight onClick={() => handleQuantityMaterial(record.key,'+')}/>
          </Flex>
        ) : null,
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
    },
    {
      title: 'Nombre',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Volumen',
      dataIndex: 'm3_volume',
      key: 'm3_volume',
      render: (_, record) =>{
        return record.m3_volume + ' m3';
      }
    },
    {
      title: 'Alto',
      dataIndex: 'mt_height',
      key: 'mt_height',
      render: (_, record) =>{
        return record.mt_height + ' m';
      }
    },
    {
      title: 'Ancho',
      dataIndex: 'mt_width',
      key: 'mt_width',
      render: (_, record) =>{
        return record.mt_width + ' m';
      }
    },
    {
      title: 'Largo',
      dataIndex: 'mt_length',
      key: 'mt_length',
      render: (_, record) =>{
        return record.mt_length + ' m';
      }
    },
    {
      title: 'Peso',
      dataIndex: 'kg_weight',
      key: 'kg_weight',
      render: (_, record) =>{
        return record.kg_weight + ' kg';
      }
    },
    {
      title: '',
      dataIndex: 'alerts',
      key: 'alerts',
      render: (_, record) =>
        dataCarga.length >= 1 ? (
          <Popconfirm title="Esta seguro de eliminar?" onConfirm={() => handleDeleteMaterial(record.key)} >
            <div style={{ display:"flex", justifyContent:"center",alignItems:"center", height:32, width: 32}}>
              <Trash size={24}/>
            </div>
          </Popconfirm>
        ) : null,
    },
  ];

  const columnsCargaPersonas = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Teléfono',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'PSL',
      dataIndex: 'psl',
      key: 'psl',
    },
    {
      title: 'CC',
      dataIndex: 'typeid',
      key: 'typeid',
    }
  ];

  const [optionsMaterial, setOptionsMaterial] = useState<CustomOptionType[]>([]);
  const [dataCarga, setDataCarga] = useState<IMaterial[]>([]);

  let cargaIdx = 0;

  const loadMaterials = async () => {
    if(optionsMaterial !== undefined && optionsMaterial.length >0 ) return;

    const res = await getAllMaterials();
    const result:any = [];
    //console.log (res);
    if(res?.data?.data?.length > 0){
      res.data.data.forEach((item) => {
        const strlabel = <div style={{ display: 'flex', alignItems: "center"}}>
                            <Col span={20}>
                              <Text>
                                  {item.type_description} - {item.description}
                                  <br></br>
                                  Volumen {item.m3_volume} m3 - Peso {item.kg_weight} Kg
                              </Text>
                            </Col>
                            <Col span={4} style={{ display: 'flex', justifyContent: "flex-end"}}>
                              <button className="btnagregar active" onClick={() => addMaterial(item)}>Agregar</button>
                            </Col>
                          </div>;

        result.push({label: strlabel,value:item.description })
      });      
    }

    setOptionsMaterial(result);    
  };
  
  useEffect(() => {
    loadMaterials();
  }, []);

  const filteredMaterialOptions = optionsMaterial.filter(
    (option:any) => !dataCarga.some(material => material.description === option.value)
  );

  const addMaterial = async (value:any) =>{
    cargaIdx = cargaIdx + 1;
    console.log(cargaIdx);
    
    value.quantity = 1;
    value.key = cargaIdx;

    const newvalue : IMaterial = value;
    //busca si ya se selecciono previamente
    let newData:IMaterial[] = [];
    setDataCarga((prevdata)=>{
      newData =[...prevdata];
      return prevdata;
    })
    let found = false;
    newData.forEach(item => {
      if(item.id === newvalue.id){
        item.quantity = item.quantity + 1;
        found = true;
      }
    });    

    if(found){
      setDataCarga(newData);
    }else{
      setDataCarga(dataCarga => [...dataCarga, newvalue]);
    }

  };

  const handleDeleteMaterial = (key: React.Key) => {
    console.log(key)
    cargaIdx = cargaIdx - 1;
    const newData = dataCarga.filter((item) => item.key !== key);
    setDataCarga(newData);
  };

  const handleQuantityMaterial = (key: React.Key, sign: string) => {
    console.log(key)
    const newData = [...dataCarga];
    newData.forEach(item => {
      if(item.key === key){
        if(sign=='+'){
          item.quantity = item.quantity + 1;
        }
        if(sign=='-'){
          if(item.quantity === 1) return item.quantity
          item.quantity = item.quantity - 1;
        }
      }
    });    
    
    setDataCarga(newData);
  };

  /* Vehiculos sugeridos */
  const columnsCargaVehiculo: TableProps<IVehicleType>['columns'] = [
    {
      title: 'Vehículo',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Cantidad',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (_, record) =>
        dataVehicles.length >= 1 ? (
          <Flex align="center">
            <CaretLeft onClick={() => handleQuantityVehicle(record.key,'-')}/>&nbsp;&nbsp;{record.quantity}&nbsp;&nbsp;<CaretRight onClick={() => handleQuantityVehicle(record.key,'+')}/>
          </Flex>
        ) : null,
    },
    {
      title: '',
      dataIndex: 'alerts',
      key: 'alerts',
      render: (_, record) =>
        dataVehicles.length >= 1 ? (
          <Popconfirm title="Esta seguro de eliminar?" onConfirm={() => handleDeleteVehicle(record.key)}>
            <div style={{ display:"flex", justifyContent:"center",alignItems:"center", height:32, width: 32}}>
              <Trash size={24}/>
            </div>
          </Popconfirm>
        ) : null,
    },
  ];

  const [optionsVehicles, setOptionsVehicles] = useState<CustomOptionType[]>([]);
  const [dataVehicles, setDataVehicles] = useState<IVehicleType[]>([]);

  let vehiclesIdx = 0;

  const loadSuggestedVehicles = async () => {
    const res = await getSuggestedVehicles(typeactive);
    const result:any = [];
    //console.log (res);
    if(res?.data?.data?.length > 0){
      res.data.data.forEach((item) => {
        const strlabel = <div style={{ display: 'flex', alignItems: "center"}}>
                            <Col span={20}>
                                <Text><b>{item.description}</b>
                                <br/>
                                Largo {item.length}m - Ancho {item.width}m - Alto {item.height}m - Máximo {item.kg_capacity}Tn
                                <br/>
                                Cantidad disponibles: {item.available}
                                </Text>
                            </Col>
                            <Col span={4} style={{ display: 'flex', justifyContent: "flex-end"}}>
                              <button className="btnagregar active" onClick={() => addVehicle(item)}>Agregar</button>
                            </Col>
                        </div>;

        result.push({value:item.description, label: strlabel})
      });      
    }

    setOptionsVehicles(result); 
  };
  
  useEffect(() => {
    loadSuggestedVehicles();
  }, []);

  useEffect(() => {
    setDataVehicles([])
    loadSuggestedVehicles();
  }, [typeactive]);

  const filteredVehiclesOptions = optionsVehicles.filter(
    (option:any) => !dataVehicles.some(vehicle => vehicle.description === option.value)
  );

  const addVehicle = async (value:any) =>{
    vehiclesIdx = vehiclesIdx + 1;
    
    value.quantity = 1;
    value.key = vehiclesIdx;

    const newvalue : IVehicleType = value;
    console.log(newvalue);
    await setDataVehicles(dataVehicles => [...dataVehicles, newvalue]);
  };


  const handleDeleteVehicle = (key: React.Key) => {
    console.log(key)
    vehiclesIdx = vehiclesIdx - 1;
    const newData = dataVehicles.filter((item) => item.key !== key);
    setDataVehicles(newData);
  };

  const handleQuantityVehicle = (key: React.Key, sign: string) => {
    console.log(key)
    const newData = [...dataVehicles];
    newData.forEach(item => {
      if(item.key === key){
        if(sign=='+'){
          item.quantity = item.quantity + 1;
        }
        if(sign=='-'){
          if(item.quantity === 1) return item.quantity
          item.quantity = item.quantity - 1;
        }
      }
    });    
    
    setDataVehicles(newData);
  };

  /* Responsables */
  const dataPslDefault = [
    {
      key: 1,
      idpsl: 1,
      descpsl: '',
      percent: 100,
      costcenters: [
        {
          key: 1,
          idpslcostcenter: 1,
          descpslcostcenter: '',
          percent: 100
        }
      ]
    },
  ]

  const [optionsPSL, setOptionsPSL] = useState<PSLOptionType[]>([]);
  const [dataPsl, setDataPsl] = useState<IOrderPsl[]>(dataPslDefault);

  const loadPSL = async () => {
    if(optionsPSL !== undefined && optionsPSL.length >0 ) return;

    const res = await getPsl();
    const result:any = [];
    if(res?.data?.data?.length > 0){
      res.data.data.forEach((item) => {
        result.push({value: item.id, label: item.description, costcenters: item.cost_center})
      });      
    }
    setOptionsPSL(result); 
  };

  useEffect(() => {
    loadPSL();
  }, []);

  const setOptionsCostCenter = (idPsl:number) => {
    const pslFinded =  optionsPSL && optionsPSL.find(option => option.value === idPsl)
    if( !pslFinded) return []
    return pslFinded.costcenters.map((c:any)=>({value: c.id, label: c.description}))
  }

  const addPsl = async () =>{
    const createNewPsl = (key:number) => {
      return {
          key,
          idpsl: 1,
          descpsl: '',
          percent:0,
          costcenters: [{
            key: 1,
            idpslcostcenter: 1,
            descpslcostcenter: '',
            percent: 0
          }]  
        }}
    setDataPsl(dataPsl => [...dataPsl, createNewPsl(dataPsl?.length ? dataPsl?.length+1 : 1)]);
  };

  const addPslCostCenter = (key: React.Key) => {  
    const createNewCC = (key:number) => {
      return {
            key,
            idpslcostcenter: 1,
            descpslcostcenter: '',
            percent: 0
          
        }}
    setDataPsl(prevDataPsl => 
      prevDataPsl.map(item => 
        item.key === key ? 
        { ...item, costcenters: [...item.costcenters, createNewCC(item.costcenters.length + 1)] } 
        : item
      )
    );
  };
  
  const adjustCostCenterPercentages = (costcenters: IOrderPslCostCenter[], oldPsdPercent:number, newPslPercent:number) =>{
    const newCCs = costcenters.map((cc)=>{
      const oldCCPercent =cc.percent/oldPsdPercent
      const newCCValue = newPslPercent*oldCCPercent
      return {...cc, percent: newCCValue}
    })
    return newCCs
  }

  const handlePslPercentChange = (value: number, pslIndex: number) => {
    setDataPsl((prevDataPsl) => {
      // Calcula el total actual de los porcentajes de los PSLs excluyendo el seleccionado
      const totalPercentExcludingCurrent = prevDataPsl.reduce((total, psl, index) => {
        return index !== pslIndex ? total + psl.percent : total;
      }, 0);
  
      // Verifica si la suma total con el nuevo valor es mayor a 100
      const isOverTotal = totalPercentExcludingCurrent + value > 100;
  
      const remainingPercent = 100 - value;
      const otherPslCount = prevDataPsl.length - 1;
  
      // Actualiza los PSLs con la lógica correspondiente
      const updatedPsl = prevDataPsl.map((psl, i) => {
        if (i === pslIndex) {
          return { ...psl, percent: value };
        } else {
          const adjustedPercent = isOverTotal ? remainingPercent / otherPslCount : psl.percent;
          return {
            ...psl,
            percent: adjustedPercent,
            costcenters: isOverTotal
              ? adjustCostCenterPercentages(psl.costcenters, psl.percent, adjustedPercent)
              : psl.costcenters,
          };
        }
      });
  
      return updatedPsl;
    });
  };
    
  const handleCcPercentChange = (value: number, pslIndex: number, ccIndex: number) => {
    setDataPsl((prevDataPsl) => 
      prevDataPsl.map((psl, i) => {
        if (i !== pslIndex) return psl;
  
        const currentPslPercent = psl.percent;
  
        if (value > currentPslPercent) {
          return psl;
        }
  
        const totalCCPercent = psl.costcenters.reduce((total, cc, index) => 
          index !== ccIndex ? total + cc.percent : total, 0);
  
        const otherCcCount = psl.costcenters.length - 1;
        let updatedCostCenters;
  
        if (value === 0) {
          updatedCostCenters = psl.costcenters.map((cc, j) =>
            j === ccIndex ? { ...cc, percent: value } : { ...cc, percent: currentPslPercent / otherCcCount }
          );
        } else if (totalCCPercent + value > currentPslPercent) {
          const remainingPercent = currentPslPercent - value;
          updatedCostCenters = psl.costcenters.map((cc, j) =>
            j === ccIndex ? { ...cc, percent: value } : { ...cc, percent: remainingPercent / otherCcCount }
          );
        } else {
          updatedCostCenters = psl.costcenters.map((cc, j) =>
            j === ccIndex ? { ...cc, percent: value } : cc
          );
        }
  
        return { ...psl, costcenters: updatedCostCenters };
      })
    );
  };
  
    const parser = (value: string | undefined) => Number(value?.replace('%', '')) as unknown as number;

    const handleBlurPSL = (e: React.FocusEvent<HTMLInputElement>, pslIndex:number) => {
      const formattedValue = e.target.value;
      const numericValue = parser(formattedValue);
      if (numericValue !== undefined && !isNaN(numericValue)) {
        handlePslPercentChange(numericValue, pslIndex);
      }
    };
  
    const handleBlurCC = (e: React.FocusEvent<HTMLInputElement>, pslIndex:number, ccIndex: number) => {
      const formattedValue = e.target.value;
      const numericValue = parser(formattedValue);
      if (numericValue !== undefined && !isNaN(numericValue)) {
        handleCcPercentChange(numericValue, pslIndex, ccIndex);
      }
    };

  const handleChangeExpirationDate = (index: number, value: any) => {
    setSelectedFiles((prevState: any[]) => {
      const updatedFiles = [...prevState];
      updatedFiles[index].expirationDate = value;
      return updatedFiles;
    });
  };

  const handleChange = (value: string[]) => {
    const sf = documentsType?.filter((file) => value.includes(file.id.toString()));
    if (sf) {
      setSelectedFiles((prevState) => {
        return sf.map((file) => ({
          ...file,
          file: prevState.find((f) => f.id === file.id)?.file,
          expirationDate: prevState.find((f) => f.id === file.id)?.expirationDate
        }));
      });
    }
  };

  /*requerimientos adicionales*/

  const columnsRequerimientosAdicionales: TableProps<ITransferOrderOtherRequirements>['columns']= [
    {
      title: 'Nombre',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Cantidad',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (_, record) =>
        dataRequirements.length >= 1 ? (
          <Flex align="center">
            <CaretLeft onClick={() => handleQuantityRequirement(record.key,'-')}/>&nbsp;&nbsp;{record.quantity}&nbsp;&nbsp;<CaretRight onClick={() => handleQuantityRequirement(record.key,'+')}/>
          </Flex>
        ) : null,
    },
    {
      title: '',
      dataIndex: 'alerts',
      key: 'alerts',
      render: (_, record) =>
        dataRequirements.length >= 1 ? (
          <Popconfirm title="Esta seguro de eliminar?" onConfirm={() => handleDeleteRequirement(record.key)}>
            <div style={{ display:"flex", justifyContent:"center",alignItems:"center", height:32, width: 32}}>
              <Trash size={24}/>
            </div>
          </Popconfirm>
        ) : null,
    },
  ];

  const [optionsRequirements, setOptionsRequirements] = useState<CustomOptionType[]>([]);
  const [dataRequirements, setDataRequirements] = useState<ITransferOrderOtherRequirements[]>([]);

  let requirementsIdx = 0;

  const loadRequirements = async () => {
    if(optionsRequirements !== undefined && optionsRequirements.length >0 ) return;

    const res = await getOtherRequirements();
    const result:any = [];
    //console.log (res);
    if(res?.data?.data?.length > 0){
      res.data.data.forEach((item) => {
        const strlabel = <div style={{ display: 'flex', alignItems: "center"}}>
                          <Col span={20}>
                              <Text>
                                  <b>{item.description}</b>
                              </Text>
                          </Col>
                          <Col span={4} style={{ display: 'flex', justifyContent: "flex-end"}}>
                            <button className="btnagregar active" onClick={() => addRequeriment(item)}>Agregar</button>
                          </Col>
                        </div>;
        result.push({value:item.description, label: strlabel})
      });      
    }

    setOptionsRequirements(result); 
  };

  useEffect(() => {
    loadRequirements();
  }, []);

  const filteredOptionalRequirementssOptions = optionsRequirements ? optionsRequirements.filter(
    option => !dataRequirements.some(req => req.description === option.value)
  ): []

  const addRequeriment = async (value:any) =>{
    requirementsIdx = requirementsIdx + 1;
    
    value.quantity = 1;
    value.key = requirementsIdx;

    const newvalue : ITransferOrderOtherRequirements = value;
    //console.log(newvalue);
    await setDataRequirements(dataRequirements => [...dataRequirements, newvalue]);
  };

  const handleDeleteRequirement = (key: React.Key) => {
    console.log(key)
    requirementsIdx = requirementsIdx - 1;
    const newData = dataRequirements.filter((item) => item.key !== key);
    setDataRequirements(newData);
  };

  const handleQuantityRequirement = (key: React.Key, sign: string) => {
    console.log(key)
    const newData = [...dataRequirements];
    newData.forEach(item => {
      if(item.key === key){
        if(sign=='+'){
          item.quantity = item.quantity + 1;
        }
        if(sign=='-'){
          if(item.quantity === 1) return item.quantity
          else item.quantity = item.quantity - 1;
        }
      }
    });    
    
    setDataRequirements(newData);
  };

  /* Datos de contacto */
  const [dataContacts, setDataContacts] = useState<ITransferOrderContacts[]>([]);
  //default data
  const loadContacts = () =>{
    if(dataContacts !== undefined && dataContacts.length >0 ) return;

    const defaultorigin : ITransferOrderContacts ={
      key: 1,
      contact_type: 1,
      id: 0,
      id_transfer_order: 0,
      id_contact: 0,
      name: "",
      contact_number: '',
      active: "",
      created_at: new Date(),
      created_by: ""
    }
    
    setDataContacts(dataContacts => [...dataContacts, defaultorigin]);

    const defaultdestiny : ITransferOrderContacts ={
      key: 2,
      contact_type: 2,
      id: 0,
      id_transfer_order: 0,
      id_contact: 0,
      name: "",
      contact_number: '',
      active: "",
      created_at: new Date(),
      created_by: ""
    }
    
    setDataContacts(dataContacts => [...dataContacts, defaultdestiny]);
  } 

  useEffect(() => {
    loadContacts();
  }, []);

  const updateContacts = (key: React.Key, field: "name" | "contact_number", ndata: string) => {
    //console.log(key)
    const newData = [...dataContacts];
    newData.forEach(item => {
      if(item.key === key){
        item[field] = ndata
      }
    });    
    
    setDataContacts(newData);
  };



   /* Company Code */
    const [optionsCompanyCodes, setOptionsCompanyCodes] = useState<ICompanyCode[]>([]);
  
    const loadCompanyCodes= async () => {
      if(optionsCompanyCodes !== undefined && optionsCompanyCodes.length >0 ) return;
  
      const res = await getCompanyCodes();
      let result: any = [];
      if(res?.data?.data?.length > 0){
        result = res.data.data.map((item) => ({value: item.id.toString(), label: item.description}));      
      }
      setOptionsCompanyCodes(result); 
    };
  
    useEffect(() => {
      loadCompanyCodes();
    }, []);


    /* Clients */
    const [optionsClients, setOptionsClients] = useState<IClient[]>([]);

    const loadClients= async () => {
      if(optionsClients !== undefined && optionsClients.length >0 ) return;
  
      const res = await getClients();
      let result: any = [];
      if(res?.data?.data?.length > 0){
        result = res.data.data.map((item) => ({value: item.id, label: item.description}));      
      }
      setOptionsClients(result); 
    };
  
    useEffect(() => {
      loadClients();
    }, []);



  /* Datos de personas */
  const [dataPersons, setDataPersons] = useState<ITransferOrderPersons[]>([]);


  /* Form Event Handlers */
  const onCreateOrder = async () => {
    
    //validate fields
    let isformvalid = true;
    //carga - izaje - personas
    if(typeactive == '1' || typeactive == '2'  || typeactive == '3'){

      if(origin.current.length == 0){
        setOriginValid(false);
        isformvalid = false;
        messageApi.error("Punto Origen es obligatorio");
      }
      if(typeactive == '1'){
        if(destination.current.length == 0){
          setdestinationValid(false);
          isformvalid = false;
          messageApi.error("Punto Destino es obligatorio");
        }
      }
      if(fechaInicial == undefined || fechaInicial == null){
        setFechaInicialValid(false);
        isformvalid = false;
        messageApi.error("Fecha Inicial es obligatorio");
      }
      if(horaInicial == undefined || horaInicial == null){
        setHoraInicialValid(false);
        isformvalid = false;
        messageApi.error("Hora Inicial es obligatorio")
      }
      if(fechaFinal == undefined || fechaFinal == null){
        setFechaFinalValid(false);
        isformvalid = false;
        messageApi.error("Fecha Final es obligatorio");
      }
      if(horaFinal == undefined || horaFinal == null){
        setHoraFinalValid(false);
        isformvalid = false;
        messageApi.error("Hora Final es obligatorio")
      }
      if(fechaInicialFlexible == -1){
        setFechaInicialFlexibleValid(false);
        isformvalid = false;
        messageApi.error("Fecha Inicial Flexible es obligatorio")
      }else{
        setFechaInicialFlexibleValid(true);
      }
      if(fechaFinalFlexible == -1){
        setFechaFinalFlexibleValid(false);
        isformvalid = false;
        messageApi.error("Fecha Final Flexible es obligatorio")
      }else{
        setFechaFinalFlexibleValid(true);
      }

      if(company == -1){
        setCompanyValid(false);
        isformvalid = false;
        messageApi.error("Company code es obligatorio")
      }else{
        setCompanyValid(true);
      }

      if(client == -1){
        setClientValid(false);
        isformvalid = false;
        messageApi.error("Cliente final es obligatorio")
      }else{
        setClientValid(true);
      }

      //validacion grids
      //personal
      if(typeactive == '3'){
        if(dataPersons.length==0){
          isformvalid = false;
          messageApi.error("Debe agregar por lo menos una persona")
        }  
      }else{
        if(dataCarga.length==0){
          isformvalid = false;
          messageApi.error("Debe agregar por lo menos un material")
        }  
      }
      if(dataVehicles.length==0){
        isformvalid = false;
        messageApi.error("Debe agregar por lo menos un vehículo sugerido")
      }
      if(dataPsl.length==0){
        isformvalid = false;
        messageApi.error("Debe agregar por lo menos un PSL")
      }
      const checkPercentages = (psls: IOrderPsl[]) => {
        const totalPslPercent = psls.reduce((total, psl) => total + psl.percent, 0);
        if (totalPslPercent !== 100) {
          isformvalid = false;
          messageApi.error("La totalidad de los PSLs debe ser 100%")
        }
        for (const psl of psls) {
          const totalCcPercent = psl.costcenters.reduce((total, cc) => total + cc.percent, 0);
          if (totalCcPercent !== psl.percent) {
            isformvalid = false;
            messageApi.error("La suma de los centros de costos debe ser igual al del PSL asociado")
          }
        }
      
      };
      checkPercentages(dataPsl)
      //datos de contacto
      dataContacts.forEach((contact)=>{
        //console.log(contact)
        if((contact.contact_number == "" || contact.name == "") && contact.contact_type == 1){
          isformvalid = false;
          messageApi.error("Debe registrar información del contacto de origen")
        }
        if((contact.contact_number == "" || contact.name == "") && contact.contact_type == 2){
          isformvalid = false;
          messageApi.error("Debe registrar información del contacto de destino")
        }
      })
    }

    if(isformvalid == false){
      return;
    }

    const cuser = auth.currentUser;

    const inihour = horaInicial?horaInicial.get('hour'):0;
    const inimin = horaInicial?horaInicial.get('minute'):0;
    const finhour = horaFinal?horaFinal.get('hour'):0;
    const finmin = horaFinal?horaFinal.get('minute'):0;
    const fechaInicialToBody = fechaInicial?.hour(inihour).minute(inimin);
    const fechaFinalToBody = fechaFinal?.hour(finhour).minute(finmin);

    //console.log(fechaInicial);
    //console.log(fechaFinal);

    const datato: ITransferOrder = {
      id_start_location: (locationOrigin ? locationOrigin.id : 0),
      id_end_location: (locationDestination ? locationDestination?.id : 0),
      id: 0,
      id_user: 1,
      user: cuser?.email,
      start_date: fechaInicialToBody?.toDate().toISOString(),
      end_date: fechaFinalToBody?.toDate().toISOString(),
      start_freight_equipment: String(origenIzaje?1:0),
      end_freight_equipment: String(destinoIzaje?1:0),
      freight_origin_time: origenIzaje? horasOrigenIzaje : undefined,
      freight_destination_time: destinoIzaje? horasDestinoIzaje : undefined,
      rotation: "0",
      start_date_flexible: fechaInicialFlexible,
      end_date_flexible: fechaFinalFlexible,
      id_route: "",
      id_company: company,
      active: "true",
      created_at: new Date().toISOString(),
      created_by: cuser?.email,
      geometry: routeInfo,
      id_service_type: typeactive,
      id_client: client,
      status: "",
      observation: observation,
      service_type_desc: "",
      client_desc: ""
    }

    //contactos
    datato.transfer_order_contacts = dataContacts;
    
    //materiales
    datato.transfer_order_material = [];
    dataCarga.forEach(material => {
      datato.transfer_order_material?.push({
        id: 0,
        id_transfer_order: 0,
        id_material: material.id,
        quantity: material.quantity,
        created_at: new Date(),
        created_by: cuser?.email,
        modified_at: new Date(),
        modified_by: ""
      });  
    });
    
    //otrosrequerimientos
    datato.transfer_order_other_requeriments = dataRequirements;
    
    //productos
    datato.transfer_order_products = [];
    //centros de costo
    datato.transfer_order_cost_center = [];

    dataPsl.forEach(psl => {
      datato.transfer_order_products?.push({
        id: 0,
        id_transfer_order: 0,
        id_product: psl.idpsl,
        units: psl.percent,
        created_at: new Date(),
        created_by: cuser?.email,
        modified_at: new Date(),
        modified_by: "",
        active: "",
        product_desc: ""
      });

      psl.costcenters.forEach(cost=>{
        datato.transfer_order_cost_center?.push({
          id: 0,
          id_transfer_order: 0,
          id_psl: psl.idpsl,
          id_costcenter: cost.idpslcostcenter,
          percentage: cost.percent,
          active: "",
          created_at: new Date(),
          created_by: cuser?.email,
          cost_center_desc: ""
        });
      });
    });

    //vehiculos
    datato.transfer_order_vehicles = [];
    dataVehicles.forEach(vehicle => {
      datato.transfer_order_vehicles?.push({
        id: 0,
        id_transfer_order: 0,
        id_vehicle_type: vehicle.id,
        quantity: vehicle.quantity,
        created_at: new Date(),
        created_by: cuser?.email,
        modified_at: new Date(),
        modified_by: "",
        vehicle_type_desc: ""
      });  
    });

    //personas
    datato.transfer_order_persons =[];

    //documentos
    datato.transfer_order_documents =[];


    
    // archivos
    const data: IFormTransferOrder = {
      body: datato,
      files: selectedFiles
    };

    console.log("DATA PARA POST: ", data);
    
    try {
      const response = await addTransferOrder(
        datato,
        data?.files || [] as DocumentCompleteType[]
      );      
      if (response.status === SUCCESS) {
        //console.log(response);
        messageApi.open({
          type: "success",
          content: "El viaje fue creado exitosamente."
        });
        push("/logistics/orders/details/"+ response.data.data.id);
      }
    } catch (error) {
      if (error instanceof Error) {
        messageApi.error(error.message);
      } else {
        messageApi.error("Oops, hubo un error por favor intenta mas tarde.");
      }
    }
  };
  /* acoordion */
  const actionsOptions = [
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
          <Row >
            <Col span={12} style={{ padding:'1.5rem'}}>
              <Row>
                <Text className="locationLabels">
                  Punto Origen
                </Text>
                <Select
                  showSearch
                  placeholder="Buscar dirección inicial"                  
                  className={originValid ? "puntoOrigen dateInputForm" : "puntoOrigen dateInputFormError"}
                  style={{ width:'100%' }}
                  onChange={onChangeOrigin}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option!.children!.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }                  
                >
                  { locationOptions.map(((option: { value: React.Key | null | undefined; label: string  | null | undefined; }) => <Select.Option value={option.value} key={option.value}>{option.label}</Select.Option>)) }
                </Select>
                {(!originValid) &&
                    <>
                      <br/><label className="textError">* Campo obligatorio</label><br/>
                    </>
                  }
                { typeactive != "3" &&
                  <Flex style={{marginTop:"0.5rem", width:"100%"}} align="center">
                    <Col span={12} >
                      <Flex gap={"0.5rem"} > 
                        <Switch disabled={typeactive === "2"}  checked={origenIzaje} onChange={event =>{
                          setOrigenIzaje(event)
                        }} />
                        <Text>Requiere Izaje</Text>
                      </Flex>
                    </Col>
                    {origenIzaje && 
                    <Col span={12} >
                      <Flex gap={"0.5rem"} align="center" justify="end"> 
                          <Text>Cuantas horas de izaje</Text>
                          <CustomTimeSelector initialValue={horasOrigenIzaje} onTimeChange={(value)=>setHorasOrigenIzaje(value)}/>
                      </Flex>
                    </Col>}
                  </Flex>
                }
              </Row>
              { typeactive != "2" &&
              <Row style={{marginTop:'1rem'}}>
                <label className="locationLabels">
                  Punto Destino
                </label>
                <Select
                  showSearch
                  placeholder="Buscar dirección final"                  
                  className={destinationValid ? "puntoOrigen dateInputForm" : "puntoOrigen dateInputFormError"}
                  style={{ width:'100%' }}
                  onChange={onChangeDestino}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option!.children!.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  { locationOptions.map(((option: { value: React.Key | null | undefined; label: string | null | undefined; }) => <Select.Option value={option.value} key={option.value}>{option.label}</Select.Option>)) }
                </Select>
                {(!destinationValid) &&
                    <>
                      <br/><label className="textError">* Campo obligatorio</label><br/>
                    </>
                  }
                { typeactive != "3" &&
                  <Flex style={{marginTop:"0.5rem", width:"100%"}} align="center">
                  <Col span={12} >
                    <Flex gap={"0.5rem"} > 
                      <Switch  checked={destinoIzaje} onChange={event =>{
                        setDestinoIzaje(event)
                      }} />
                      <Text>Requiere Izaje</Text>
                    </Flex>
                  </Col>
                  {destinoIzaje && 
                  <Col span={12} >
                    <Flex gap={"0.5rem"} align="center" justify="end"> 
                        <Text>Cuantas horas de izaje</Text>
                        <CustomTimeSelector initialValue={horasDestinoIzaje} onTimeChange={(value)=>setHorasDestinoIzaje(value)}/>
                    </Flex>
                  </Col>}
                </Flex>
                }
              </Row>
              }
              <Row style={{marginTop:'1rem'}}>
                <Col span={24}>
                  <label className="locationLabels">
                    Fecha y hora inicial
                  </label>
                  <Row gutter={[16,16]} style={{marginTop: "0.5rem"}}>
                    <Col span={8}>
                      <DatePicker 
                        placeholder="Seleccione fecha"
                        disabledDate={disabledDate}
                        onChange={(value, dateString) => {                      
                          //console.log('Selected Time: ', value);
                          //console.log('Formatted Selected Time: ', dateString);
                          //setFechaInicial(value);
                          setFechaInicial(value);
                          setFechaInicialValid(true);
                        }}
                        className={fechaInicialValid ? "dateInputForm" : "dateInputFormError"}
                      /> 
                      {(!fechaInicialValid) &&
                        <>
                          <br/><label className="textError">* Campo obligatorio</label>
                        </>
                      }
                    </Col>                
                    <Col span={8}>
                      <TimePicker 
                        placeholder="Seleccione hora"
                        format={'HH:mm'}
                        minuteStep={15} 
                        hourStep={1}
                        type={'time'} 
                        onChange={(value) => {
                          setHoraInicial(value);
                          setHoraInicialValid(true);
                        }}
                        className={horaInicialValid ? "dateInputForm" : "dateInputFormError"}
                      />
                      {(!horaInicialValid) &&
                        <>
                          <br/><label className="textError">* Campo obligatorio</label>
                        </>
                      }                  
                    </Col>
                    <Col span={8}>
                    <Select
                        placeholder="Seleccione"                  
                        className={fechaInicialFlexibleValid ? "puntoOrigen dateInputForm" : "puntoOrigen dateInputFormError"}
                        options={[
                          { value: '0', label: 'Exacto' },
                          { value: '1', label: '+/- 1 día' },
                          { value: '2', label: '+/- 2 días' },
                          { value: '3', label: '+/- 3 días' },
                        ]}
                        onChange={(value)=>{
                          setFechaInicialFlexible(value);
                          setFechaInicialFlexibleValid(true);
                        }}
                      />
                      {(!fechaInicialFlexibleValid) &&
                        <>
                          <br/><label className="textError">* Campo obligatorio</label><br/>
                        </>
                      }                  
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row style={{marginTop:'1rem'}}>
                <Col span={24}>
                  <Text className="locationLabels">
                    Fecha y hora final
                  </Text>
                  <Row gutter={[16,16]} style={{marginTop: "0.5rem"}}>
                    <Col span={8}>
                      <DatePicker
                        placeholder="Seleccione fecha"
                        disabledDate={disabledDate}
                        onChange={(value, dateString) => {
                          //console.log('Selected Time: ', value);
                          //console.log('Formatted Selected Time: ', dateString);
                          //setFechaFinal(value);
                          setFechaFinal(value);
                          setFechaFinalValid(true);
                        }}
                        className={fechaFinalValid ? "dateInputForm" : "dateInputFormError"}
                      />
                      {(!fechaFinalValid) &&
                        <>
                          <br/><label className="textError">* Campo obligatorio</label>
                        </>
                      }
                    </Col>
                    <Col span={8}>
                      <TimePicker 
                      placeholder="Seleccione hora"   
                      format={'HH:mm'}
                      minuteStep={15} 
                      hourStep={1}
                      type={'time'} 
                      onChange={(value) => {
                        setHoraFinal(value);
                        setHoraFinalValid(true);
                      }} 
                      className={horaFinalValid ? "dateInputForm" : "dateInputFormError"}
                      />
                      {(!horaFinalValid) &&
                        <>
                          <br/><label className="textError">* Campo obligatorio</label>
                        </>
                      } 
                    </Col>
                    <Col span={8}>
                      <Select
                          placeholder="Seleccione"                  
                          className={fechaFinalFlexibleValid ? "puntoOrigen dateInputForm" : "puntoOrigen dateInputFormError"}
                          options={[
                            { value: '0', label: 'Exacto' },
                            { value: '1', label: '+/- 1 día' },
                            { value: '2', label: '+/- 2 días' },
                            { value: '3', label: '+/- 3 días' },
                          ]}
                          onChange={(value)=>{
                            setFechaFinalFlexible(value);
                            setFechaFinalFlexibleValid(true);
                          }}
                        />
                        {(!fechaFinalFlexibleValid) &&
                          <>
                            <br/><label className="textError">* Campo obligatorio</label><br/>
                          </>
                        }   
                    </Col>

                  </Row>
                </Col>
              </Row>
              {routeGeometry &&
              <Row className="divdistance" style={{ marginTop: "1rem" }}>
                <Col span={12} style={{display: "flex", flexDirection:"column", gap:"0.75rem"}}>
                    <Text>Distancia Total</Text>
                    <Text>Tiempo Estimado</Text>
                </Col>
                <Col span={12} style={{display: "flex", flexDirection:"column", gap:"0.75rem", alignItems:"flex-end"}}>
                    <Text>{distance}</Text>
                    <Text>{timetravel}</Text>         
                </Col>
              </Row>
              }
            </Col>
            <Col span={12} style={{ padding:'1.5rem'}}>
              <div
                ref={mapContainerRef}
                style={{
                  width: "100%",
                  height: "100%",
                  border: "1px #F7F7F7 solid",
                }}
              />
            </Col> 
          </Row>
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
        <Row>
          <Col span={24}  style={{ padding:'1.5rem'}}>
            {(typeactive == "1" || typeactive == "2") &&
              <Row style={{marginBottom: "2rem"}}>
                <Col span={24}>
                  <Col span={12}>
                  <Text className="locationLabels" style={{ display: 'flex' }}>
                    Material
                  </Text>
                  <Select
                      showSearch
                      allowClear
                      placeholder="Buscar material"                 
                      options={filteredMaterialOptions}
                      value={null}
                      style={{ width:'100%', height: "2.5rem" }}
                      optionFilterProp="value"
                      filterOption={(input: string, option) => {
                        if (option) {
                          return option.value.toLowerCase().includes(input.toLowerCase());
                        }
                        return false;
                      }}
                    />
                  </Col>
                  <Col span={12}/>
                  <Col span={24}>
                    <Table columns={columnsCarga} dataSource={dataCarga} pagination={false} footer={() => {
                    return (
                      <Flex align="center" justify="flex-end" >
                        <Row style={{width: "100%"}} >
                          <Col span={16}/>
                          <Col span={8} style={{background: "#F7F7F7", padding: 16}}>
                            <Flex align="center" justify="space-around">
                              <Flex>
                                <Space>
                                  <Text >
                                    Volumen total
                                  </Text>
                                  <Text className="text-footer-table">
                                    {dataCarga.reduce((sum, material) => sum + (material.m3_volume * material.quantity), 0)} m3
                                  </Text>
                                </Space>
                              </Flex>
                              <Divider type="vertical" style={{border: '1px solid #DDDDDD', fontSize:24}}/>
                              <Flex>
                                <Space>
                                  <Text >
                                    Peso total
                                  </Text>
                                  <Text className="text-footer-table">
                                    {dataCarga.reduce((sum, material) => sum + (material.kg_weight * material.quantity), 0)} kg
                                  </Text>
                                </Space>
                              </Flex>
                            </Flex>
                          </Col>
                        </Row>
                      </Flex>
                    )
                    }}/>
                  </Col>
                </Col>
              </Row>
            }
            {typeactive == "3" &&        
              <Row style={{marginBottom: "2rem"}}>
                <Col span={24}>
                  <Col span={12}>
                    <Text className="locationLabels" style={{ display: 'flex' }}>
                      Personas
                    </Text>
                    <AutoComplete
                      className="puntoOrigen dateInputForm"
                      popupMatchSelectWidth={500}
                      style={{ width:'100%', height: "2.5rem" }}
                      size="large"
                      placeholder="Buscar persona"
                    />  
                  </Col>
                  <Col span={12}/>
                  <Col span={24}>
                    <Table columns={columnsCargaPersonas} />
                  </Col>
                </Col>
              </Row>
            }            
              <Row >
                <Col span={24}>
                  <Col span={12}>
                    <Text className="locationLabels" style={{ display: 'flex' }}>
                      Vehículo Sugerido
                    </Text>
                    <Select
                        showSearch
                        allowClear
                        placeholder="Agregar vehículo"                  
                        options={filteredVehiclesOptions}
                        value={null}
                        style={{ width:"100%", height: "2.5rem" }}
                        optionFilterProp="value"
                        filterOption={(input: string, option) => {
                          if (option) {
                            return option.value.toLowerCase().includes(input.toLowerCase());
                          }
                          return false; 
                        }}
                      />
                  </Col>
                  <Col span={12}/>
                  <Col span={24}>
                    <Table columns={columnsCargaVehiculo} dataSource={dataVehicles} />
                  </Col>
                </Col>
              </Row>
          </Col>          
        </Row>
        
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
        <Row>
          <Col span={24} style={{ padding:'1.5rem'}}>
            <Row style={{marginBottom: "1.5rem"}}>
              <Col span={12}>
                <Text className="locationLabels" style={{ display: 'flex' }}>
                  Company Code
                </Text>
                <Select
                  className={companyValid ? "puntoOrigen dateInputForm" : "puntoOrigen dateInputFormError"}
                  options={optionsCompanyCodes}
                  onChange={(value)=>{
                    setCompany(value);
                    setCompanyValid(true);
                  }}
                />
              {(!companyValid) &&
                <>
                  <br/><label className="textError">* Campo obligatorio</label><br/>
                </>
              }
              </Col>
              <Col span={12}/>
            </Row>
            {dataPsl.map((psl, pslIndex) => (
              <div className="divdistance" style={{marginBottom: pslIndex+1 === dataPsl.length ? 0 : "1rem"}} key={`PSL-${pslIndex}-${psl.key}`}>
                <Row>
                  <Col span={10}>
                    <Text className="locationLabels" style={{ display: 'flex' }}>
                      Product Service Line (PSL)
                    </Text>
                    <Select
                        showSearch
                        placeholder={"Selecciona PSL"}
                        options={optionsPSL}
                        className="puntoOrigen dateInputForm" 
                        onChange={(e)=> {
                          setDataPsl(prevDataPsl => 
                            prevDataPsl.map((item, i) => 
                              i === pslIndex ? { ...item, idpsl: e, key: pslIndex+1 } : item
                            )
                          );
                        }}
                        optionFilterProp="label"
                        filterOption={(input: string, option) => {
                          if (option) {
                            return option.label?.toLowerCase().includes(input.toLowerCase());
                          }
                          return false;
                        }}
                    />
                  </Col>
                  <Col span={6} style={{paddingLeft:'30px'}}>
                    <Text className="locationLabels" style={{ display: 'flex' }}>
                      Porcentaje PSL
                    </Text>
                    <InputNumber<number>
                      className="puntoOrigen dateInputForm" 
                      defaultValue={psl.percent}
                      min={0}
                      max={100}
                      addonAfter="%"
                      formatter={(value) => `${Math.floor(value || 0)}`} 
                      value={psl.percent}
                      onBlur={(e) => handleBlurPSL(e, pslIndex)}
                      step={1}
                    />
                  </Col>
                  <Col span={8}/>
                </Row>
                {psl.costcenters.map((cc, ccIndex:number) => (
                  <Row key={cc.key}>
                    <Col span={10} style={{paddingLeft:'30px'}}>
                      <Text className="locationLabels" style={{ display: 'flex', marginTop: '0.5rem' }}>
                        Centro de costos
                      </Text>
                      <Select
                          showSearch
                          placeholder={"Selecciona Centro de costos"}
                          options={setOptionsCostCenter(psl.idpsl)}
                          className="puntoOrigen dateInputForm" 
                          onChange={(e)=> {
                            setDataPsl(prevDataPsl => 
                              prevDataPsl.map((psl, pslIndexMap) => {
                                if (pslIndexMap === pslIndex) {
                                  return {
                                    ...psl,
                                    costcenters: psl.costcenters.map((cc, ccIndexMap) => 
                                      ccIndexMap === ccIndex ? { ...cc, idpslcostcenter: e, key: ccIndex+1 } : cc
                                    )
                                  };
                                }
                                return psl;
                              })
                            );
                          }}
                          optionFilterProp="label"
                          filterOption={(input, option) =>
                            option?.label?.toLowerCase().includes(input.toLowerCase()) 
                          }
                      />
                    </Col>  
                    <Col span={6} style={{paddingLeft:'30px'}}>
                      <Text className="locationLabels" style={{ display: 'flex', marginTop: '0.5rem' }}>
                        Porcentaje CC
                      </Text>
                      <InputNumber<number>
                        className="puntoOrigen dateInputForm" 
                        defaultValue={cc.percent}
                        value={cc.percent}
                        min={0}
                        max={psl.percent}
                        addonAfter="%"
                        step={1}                        
                        formatter={(value) => `${Math.floor(value || 0)}`}  
                        onBlur={(e) => handleBlurCC(e, pslIndex, ccIndex)}
                      />
                    </Col>  
                    <Col span={8} style={{display:"flex", justifyContent: "center", alignItems:"flex-end"}}>
                      {ccIndex+1 === psl.costcenters.length && 
                      <Flex align="center" justify="center">
                        <PlusCircle size={24}/>
                        <button onClick={() => addPslCostCenter(psl.key)} className="btnagregarpsl">
                          Agregar centro de costos
                        </button>
                      </Flex>}
                    </Col>                
                  </Row>
                ))}
              </div>
            ))}
            <Row style={{marginTop: "2rem"}}>
              <Col span={24} style={{display:"flex", justifyContent: "flex-end"}}>
                <Flex align="center" justify="center">
                  <PlusCircle size={24}/>
                  <button onClick={() => addPsl()} className="btnagregarpsl">Agregar PSL</button>
                </Flex>
              </Col>
            </Row>
          </Col>
        </Row >
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
        <Row>
          <Col span={24} style={{ padding:'1.5rem'}}>
          <Text className="locationLabels" style={{ display: 'flex' }}> 
            Documentos
          </Text>
          <Row className="mainUploadDocuments">
            {selectedFiles.map((file) => (
              <Col span={12} style={{ padding: "15px" }} key={`file-${file.id}`}>
                <UploadDocumentButton
                  key={file.id}
                  title={file.description}
                  isMandatory={!file.optional}
                  aditionalData={file.id}
                  setFiles={() => {}}
                  files={file.file}
                  disabled
                >
                  {file?.link ? (
                    <UploadDocumentChild
                      linkFile={file.link}
                      nameFile={file.link.split("-").pop() || ""}
                      onDelete={() => {}}
                      showTrash={false}
                    />
                  ) : undefined}
                </UploadDocumentButton>
              </Col>
            ))}
          </Row>
          <Row >
            <Col span={24} className="text-right">
              <Button type="text" onClick={() => setIsOpenModalDocuments(true)} icon={<FileText size={24}/>} > <Text style={{fontWeight:'bold'}}>Agregar otro documento</Text></Button>
            </Col>
          </Row>
          <Row style={{marginBottom: "1rem"}}         >
            <Col span={12}>
              <Text className="locationLabels" style={{ display: 'flex'}}>
                Cliente final
              </Text>
              <Select
                placeholder = 'Seleccione cliente final'
                style={{ width: '100%' }}
                className={clientValid ? "puntoOrigen dateInputForm" : "puntoOrigen dateInputFormError"}
                options={optionsClients}
                onChange={(value)=>{
                  setClient(value);
                  setClientValid(true);
                }}
              />
              {(!clientValid) &&
                <>
                  <br/><label className="textError">* Campo obligatorio</label><br/>
                </>
              }              
            </Col>   
            <Col span={12}/>
          </Row>
          <Row style={{marginBottom: "1rem"}}>
            <Col span={12}>
              <Text className="locationLabels" style={{ display: 'flex' }}>
                Requerimientos adicionales
              </Text>
              <Select
                  showSearch
                  allowClear
                  placeholder='Seleccione requerimiento adicional'
                  options={filteredOptionalRequirementssOptions}
                  value={null}
                  className={"puntoOrigen dateInputForm"}   
                  optionFilterProp="value"
                  filterOption={(input: string, option) => {
                    if (option) {
                      return option.value.toLowerCase().includes(input.toLowerCase());
                    }
                    return false; 
                  }}
              />
              <Col span={12}/>
            </Col>   
          </Row>
          <Row style={{marginBottom: "1rem"}}>
            <Col span={24}>
              <Table columns={columnsRequerimientosAdicionales} dataSource={dataRequirements} />
            </Col>
          </Row>
          <Row style={{marginBottom: "1rem"}}>
            <Col span={24}>
              <Text className="locationLabels" style={{ display: 'flex'}}>
                Instrucciones especiales
              </Text>
              <TextArea placeholder="Escribir las instrucciones" rows={4} className="custom-textarea" autoSize={{ minRows: 2, maxRows: 6 }} onChange={(event)=>{
                setObservation(event.target.value);
              }}/>
            </Col>   
          </Row>
          <Row style={{marginBottom: "1rem"}}>
            <Col span={24}>
              <Text className="locationLabels" style={{ display: 'flex'}}>
                Datos de Contacto
              </Text>
              <Row style={{rowGap: "1rem"}}>
                <Col span={24}>
                  <Text className="locationLabels" style={{ display: 'flex'}}>
                    Contacto punto origen
                  </Text>
                  {dataContacts.filter(f => f.contact_type == 1).map((contact, index)=>(
                  <Row key={`contacto-origen-${index}-${contact.key}`} gutter={32}>
                    <Col span={12} >
                      <Input placeholder="Nombre del contacto" className="puntoOrigen dateInputForm" key={contact.key} value={contact.name} onChange={(e)=>{ updateContacts(contact.key,'name', e.target.value)}}/>
                    </Col>
                    <Col span={12} >
                      <Input placeholder="Teléfono: 000 000 0000" className="puntoOrigen dateInputForm" key={contact.key} value={contact.contact_number} onChange={(e)=>{ updateContacts(contact.key,'contact_number', e.target.value)}}
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      count={{
                        show: true,
                        max: 10,
                        strategy: (txt) => runes(txt).length,
                        exceedFormatter: (txt, { max }) => runes(txt).slice(0, max).join(''),              
                      }}/>
                    </Col>                  
                  </Row>
                  ))}
                </Col>
                <Col span={24}>
                  <Text className="locationLabels" style={{ display: 'flex'}}>
                    Contacto punto destino
                  </Text>
                  {dataContacts.filter((f) => f.contact_type == 2).map((contact, index)=>(
                  <Row key={`contacto-destino-${index}-${contact.key}`} gutter={32}>
                    <Col span={12}>
                      <Input placeholder="Nombre del contacto" className="puntoOrigen dateInputForm"  key={contact.key}  value={contact.name} onChange={(e)=>{ updateContacts(contact.key,'name', e.target.value)}}/>
                    </Col>
                    <Col span={12}>
                      <Input placeholder="Teléfono: 000 000 0000" className="puntoOrigen dateInputForm"  key={contact.key} value={contact.contact_number} onChange={(e)=>{ updateContacts(contact.key,'contact_number', e.target.value)}}
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      count={{
                        show: true,
                        max: 10,
                        strategy: (txt) => runes(txt).length,
                        exceedFormatter: (txt, { max }) => runes(txt).slice(0, max).join(''),              
                      }}/>
                    </Col>                  
                  </Row>
                  ))}
                </Col>
              </Row>
              <Row style={{marginTop:'1rem'}}>
                <Col span={24} style={{display:"flex", justifyContent: "flex-end", alignItems:"flex-end"}}>
                <Flex align="center" justify="center">
                  <UserPlus size={24}/>
                  <button onClick={() =>setIsOpenModalContacts(true)} className="btnagregarpsl">
                    Agregar otro contacto
                  </button>
                </Flex>
                </Col>
              </Row>
            </Col>   
          </Row>                         
          </Col>
        </Row>
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
            <Row style={{width:'100%'}}>
              <Col span={24} style={{marginBottom:'1.5rem'}}>
                <Flex gap="middle">
                  <button type="button" id={"1"} className={["tripTypes", (typeactive === "1" ? "active" : undefined)].join(" ")} onClick={handleTypeClick}>
                    <div className="tripTypeIcons" >
                      <img className="icon" loading="lazy" alt="" src="/images/logistics/truck.svg" id={"1"} onClick={handleTypeClick}/>
                      <div className="text" id={"1"} onClick={handleTypeClick}>Carga</div>
                    </div>
                  </button>
                  <button type="button" id={"2"} className={["tripTypes", (typeactive === "2" ? "active" : undefined)].join(" ")} onClick={handleTypeClick}>
                    <div className="tripTypeIcons">
                      <img className="icon" loading="lazy" alt="" src="/images/logistics/izaje.svg" id={"2"} onClick={handleTypeClick}/>
                      <div className="text" id={"2"} onClick={handleTypeClick}>Izaje</div>
                    </div>
                  </button>
                  <button type="button" id={"3"} className={["tripTypes", (typeactive === "3" ? "active" : undefined)].join(" ")} onClick={handleTypeClick}>
                    <div className="tripTypeIcons">
                      <img className="icon" loading="lazy" alt="" src="/images/logistics/users.svg" id={"3"} onClick={handleTypeClick}/>
                      <div className="text" id={"3"} onClick={handleTypeClick}>Personal</div>
                    </div>
                  </button>
                </Flex>
              </Col>
              <Col span={24}>
                <Collapse
                className="collapseByAction"
                expandIconPosition="end"
                accordion={false}
                ghost              
                items={actionsOptions}
                defaultActiveKey={['2']}
                />            
              </Col>
              <Col span={24} style={{marginTop:'1.5rem', marginBottom:'1.5rem', display:"flex", justifyContent:"flex-end"}}>
                <Flex gap="middle" align="flex-end">
                  <Button onClick={() => onCreateOrder()} style={{fontWeight:"bold"}}>
                    Guardar como draft
                  </Button>
                  <Button disabled={isButtonDisabled} className="active" style={{fontWeight:"bold"}}  onClick={()=>{onCreateOrder()}} >
                    Confirmar
                  </Button>
                </Flex>
              </Col>
            </Row>
          </Flex>
        </Flex>
      </main>
      <ModalDocuments
        isOpen={isOpenModalDocuments}
        mockFiles={selectedFiles}
        setFiles={setFiles}
        documentsType={documentsType}
        isLoadingDocuments={isLoadingDocuments}
        onClose={() => setIsOpenModalDocuments(false)}
        handleChange={handleChange}
        handleChangeExpirationDate={handleChangeExpirationDate}
        showExpiry={false}
        allOptional={true}
      />
      <ModalAddContact
        isOpen={isOpenModalContacts}
        onClose={() => setIsOpenModalContacts(false)}
        setDataContacts={setDataContacts}
      />
    </>
  );
};
