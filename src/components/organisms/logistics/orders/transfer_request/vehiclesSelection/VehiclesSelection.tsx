import React, { FC, useEffect, useState } from "react";
import {
  CaretDown,
  CaretLeft,
  CaretRight,
  Circle,
  CraneTower,
  Eye,
  Trash,
  Truck,
  User,
  Warning
} from "@phosphor-icons/react";
import { Button, Collapse, Flex, Table, TableProps, Typography } from "antd";
import VehiclesSelect from "../vehiclesSelect/VehiclesSelect";
import {
  IMaterial,
  IMaterialStepOne,
  ITransferOrderRequestContacts,
  ITransferRequestCreation,
  ITransferRequestStepOneMaterial,
  IVehiclesPricing,
  IVehicleType
} from "@/types/logistics/schema";
import { formatMoney } from "@/utils/utils";
import { getSuggestedVehicles } from "@/services/logistics/vehicles";
import { getTransferRequestVehicles } from "@/services/logistics/transfer-request";

interface VehiclesSelectionProps {
  transferRequest: ITransferRequestCreation | undefined;
  index: number;
  id_journey: number;
  start_location_desc: string;
  end_location_desc: string;
  id_type_service: number;
}

interface TripsCreation {
  id_journey: number;
  id_transfer_request: number;
  id_vehicle_type: number;
  trips: {
    id: number;
    materialByTrip: MaterialByTrip[];
  }[];
}

interface MaterialByTrip {
  id_material: number;
  units: number;
}

const { Text } = Typography;

const VehiclesSelection: FC<VehiclesSelectionProps> = ({
  transferRequest,
  index,
  id_journey,
  start_location_desc,
  end_location_desc,
  id_type_service
}) => {
  const [vehicleKey, setVehicleKey] = useState<number>();
  const [vehiclesSections, setVehiclesSections] = useState<number[]>([0]);
  const [vehiclesSelected, setVehiclesSelected] = useState<IVehiclesPricing[]>([]);
  const [dataCarga, setDataCarga] = useState<ITransferRequestStepOneMaterial[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [optionsVehicles, setOptionsVehicles] = useState<any>([]);
  const [sugestedVehicles, setSugestedVehicles] = useState<IVehiclesPricing[]>([]);
  const [trips, setTrips] = useState<TripsCreation>({
    id_journey: id_journey,
    id_transfer_request: transferRequest?.stepOne.transferRequest[0].id || 0,
    id_vehicle_type: 0,
    trips: []
  });

  useEffect(() => {
    transferRequest?.stepOne.transferRequest?.forEach(async (mat) => {
      mat?.transfer_request_material?.forEach(async (m) => {
        const newvalue: ITransferRequestStepOneMaterial = m;
        setDataCarga((dataCarga) => [...dataCarga, newvalue]);
      });
    });
  }, [transferRequest]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };

  const addVehiclesSections = () => {
    setVehiclesSections((prevSections) => {
      const newSection = prevSections.length;
      const updatedTrips = [...trips.trips, { id: newSection, materialByTrip: [] }];
      setTrips({ ...trips, trips: updatedTrips });
      return [...prevSections, newSection];
    });
  };
  
  const removeVehiclesSection = (index: number) => {
    setVehiclesSections((prevSections) => {
      const filteredSections = prevSections.filter((_, i) => i !== index);
      const updatedTrips = trips.trips.filter((_, i) => i !== index);
      setTrips({ ...trips, trips: updatedTrips });
      return filteredSections;
    });
  };

  const filteredVehiclesOptions = optionsVehicles.filter(
    (option: any) => !vehiclesSelected?.some((vehicle) => vehicle.description === option.value)
  );

  const loadSuggestedVehicles = async (id_journey: number) => {
    const res = await getTransferRequestVehicles(id_journey);
    const result: any = [];

    if (res.data.data.vehiclesPricing.length > 0) {
      res.data.data.vehiclesPricing.forEach((item: any) => {
        const strlabel = (
          <Flex align="center" gap={12}>
            <Circle size={24} />
            <div style={{ display: "flex", flexDirection: "column", width: "100%", gap: "4px" }}>
              <Flex justify="space-between">
                <Text>
                  <b>{item.description}</b>
                </Text>
                <div>{formatMoney(item.price)}</div>
              </Flex>
              <Text>
                Ocupación Volumen {item.m3_volume} - Peso {item.kg_capacity}
              </Text>
              <Text>Cantidad disponibles: {item.disponibility}</Text>
            </div>
          </Flex>
        );

        result.push({ value: item.description, label: strlabel });
      });
    }

    return {
      vehiclesPricing: res.data.vehiclesPricing,
      optionsVehicles: result
    };
  };

  const loadSuggestedVehiclesForJourney = async (id_journey: number) => {
    const { vehiclesPricing, optionsVehicles } = await loadSuggestedVehicles(id_journey);
    setSugestedVehicles(vehiclesPricing);
    setOptionsVehicles(optionsVehicles);
  };

  const handleCollapseChange = (key: string | string[]) => {
    const selectedKey = Number(key);
    setVehicleKey(selectedKey);
    if (selectedKey === index) {
      loadSuggestedVehiclesForJourney(id_journey);
    }
  };

  const handleQuantityMaterial = (tripId: number, materialId: number, sign: string) => {
    setTrips((prevTrips) => {
      const updatedTrips = prevTrips.trips.map((trip) => {
        if (trip.id === tripId) {
          const updatedMaterial = trip.materialByTrip.map((material) => {
            if (material.id_material === materialId) {
              if (sign === "+") {
                return { ...material, units: material.units + 1 };
              } else if (sign === "-" && material.units > 1) {
                return { ...material, units: material.units - 1 };
              }
            }
            return material;
          });
          return { ...trip, materialByTrip: updatedMaterial };
        }
        return trip;
      });
      return { ...prevTrips, trips: updatedTrips };
    });
  };

  const calculateTotalCapacities = () => {
    let totalVolume = 0;
    let totalWeight = 0;
    let totalPersons = 0;

    vehiclesSelected.forEach((vehicle) => {
      totalVolume += vehicle.m3_volume * vehicle.disponibility;
      totalWeight += vehicle.kg_capacity * vehicle.disponibility;
      totalPersons += vehicle.passenger_capacity * vehicle.disponibility;
    });

    return { totalVolume, totalWeight, totalPersons };
  };

  const { totalVolume, totalWeight, totalPersons } = calculateTotalCapacities();

  {
    /*const usedVolume = dataCarga.reduce(
    (sum, material) => sum + material.m3_volume * material.quantity,
    0
  );
  const usedWeight = dataCarga.reduce(
    (sum, material) => sum + material.kg_weight * material.quantity,
    0
  );*/
  }

  {
    /*const volumeUsedPercentage = (usedVolume / totalVolume) * 100;
  const weightUsedPercentage = (usedWeight / totalWeight) * 100;*/
  }

  const handleTitle = () => {
    if (id_type_service === 1) {
      return "Carga";
    } else if (id_type_service === 2) {
      return "Izaje";
    } else return "Personal";
  };

  const handleSave = () => {
    const tripsToSubmit = trips.trips.map((trip) => ({
      id: trip.id,
      materialByTrip: trip.materialByTrip
    }));
  
    const dataToSubmit: TripsCreation = {
      id_journey,
      id_transfer_request: transferRequest?.stepOne.transferRequest[0].id || 0,
      id_vehicle_type: 0,
      trips: tripsToSubmit
    };
  
    console.log(dataToSubmit);
  };

  const columnsVehiclesMaterial: TableProps<any>["columns"] = [
    {
      title: "Total",
      dataIndex: "units",
      key: "units",
      render: (total) => <Text>{total}</Text>,
      sorter: (a, b) => a.units - b.units,
      showSorterTooltip: false,
      align: "center"
    },
    {
      title: "Cantidad en el trayecto",
      dataIndex: "",
      key: "",
      render: (_, record) => (
        <Flex align="center" justify="center">
          <CaretLeft />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <CaretRight />
        </Flex>
      ),
      sorter: (a, b) => a.id - b.id,
      showSorterTooltip: false,
      align: "center",
      width: "10%"
    },
    {
      title: "SKU",
      key: "sku",
      dataIndex: "id_material",
      render: (text) => <Text>00000</Text>,
      sorter: (a, b) => a.id_material - b.id_material,
      showSorterTooltip: false,
      align: "center"
    },
    {
      title: "Nombre",
      key: "name",
      dataIndex: "material",
      render: (materials) => <Text>{materials[0]?.description}</Text>,
      sorter: (a, b) => a.material[0].description.localeCompare(b.material[0].description),
      showSorterTooltip: false
    },
    {
      title: "Dimensiones",
      key: "dimensions",
      dataIndex: "material",
      render: (materials) => (
        <Flex gap={4}>
          <Text>W {materials[0]?.mt_width}</Text>
          <Text>H {materials[0]?.mt_height}</Text>
          <Text>D {materials[0]?.mt_length}</Text>
        </Flex>
      ),
      sorter: (a, b) => a.material[0].mt_width - b.material[0].mt_width,
      showSorterTooltip: false,
      align: "center"
    },
    {
      title: "Volumen",
      key: "m3_volume",
      dataIndex: "material",
      render: (materials) => <Text>{materials[0]?.m3_volume}</Text>,
      sorter: (a, b) => Number(a.material[0].m3_volume) - Number(b.material[0].m3_volume),
      showSorterTooltip: false,
      align: "center"
    },
    {
      title: "Peso",
      key: "kg_weight",
      dataIndex: "material",
      render: (materials) => <Text>{materials[0]?.kg_weight}</Text>,
      sorter: (a, b) => a.material[0].kg_weight - b.material[0].kg_weight,
      showSorterTooltip: false,
      align: "center"
    },
    {
      title: "Alertas",
      key: "buttonSee",
      width: 64,
      dataIndex: "id",
      render: (id) => (
        <Flex style={{ gap: "6px", justifyContent: "flex-end" }}>
          <Button style={{ backgroundColor: "#F7F7F7" }} icon={<Warning size={"1.3rem"} />} />
          <Button style={{ backgroundColor: "#F7F7F7" }} icon={<Eye size={"1.3rem"} />} />
        </Flex>
      ),
      align: "center"
    }
  ];

  const columnsVehiclesPerson: TableProps<ITransferOrderRequestContacts>["columns"] = [
    {
      title: "Nombre",
      key: "name",
      dataIndex: "name",
      render: (text) => <Text>{text}</Text>,
      sorter: (a, b) => a.name.localeCompare(b.name),
      showSorterTooltip: false
    },
    {
      title: "Telefono",
      dataIndex: "contact_number",
      key: "contact_number",
      render: () => <Text>a</Text>,
      sorter: (a, b) => a.contact_number - b.contact_number,
      showSorterTooltip: false
    },
    {
      title: "PSL",
      key: "psl",
      dataIndex: "psl",
      render: (text) => <Text>{text}</Text>,
      sorter: (a, b) => Number(a.id_psl) - Number(b.id_psl),
      showSorterTooltip: false
    },
    {
      title: "CC",
      key: "id_cost_center",
      dataIndex: "id_cost_center",
      render: (text) => <Text>{text}</Text>,
      sorter: (a, b) => Number(a.id_cost_center) - Number(b.id_cost_center),
      showSorterTooltip: false
    }
  ];

  const TitleComponent = ({ state, id }: { state: string; id: number }) => (
    <div className="collapseHeader">
      <div className="collapseJustify">
        <div className="collapseStateContainer">
          {state === "Carga" ? (
            <Truck size={27} color="#FFFFFF" weight="fill" />
          ) : state === "Izaje" ? (
            <CraneTower size={27} color="#FFFFFF" weight="fill" />
          ) : (
            <User size={27} color="#FFFFFF" weight="fill" />
          )}
          <Text className="collapseState">{state}</Text>
        </div>
        <div>
          <CaretDown
            className={`collapseCaret ${id === vehicleKey && "collapseRotate"}`}
            size={24}
          />
        </div>
      </div>
      <div className="collapseFromTo">
        <div className="collapseFromToContainer">
          <Text className="collapseTitle">Origen</Text>
          <Text className="collapseSubtitle">{start_location_desc}</Text>
        </div>
        <div className="collapseFromToContainer collapseRight">
          <div className="collapseFromToContainer">
            <Text className="collapseTitle">Destino</Text>
            <Text className="collapseSubtitle">{end_location_desc}</Text>
          </div>
        </div>
      </div>
    </div>
  );

  const actionsOptionsVehiclesSelection = [
    {
      key: 0,
      style: { border: "1px solid #dddddd", borderRadius: "4px" },
      label: <TitleComponent state={handleTitle()} id={index} />,
      showArrow: false,
      children: (
        <div className="collapseInformationWrapper">
          {vehiclesSections.map((section, index) => (
            <div className="collapseInformationContainer" key={index}>
              <div className="collapseResumeWrapper">
                <Flex className="collapseTopSection">
                  <VehiclesSelect
                    id_journey={id_journey}
                    setVehiclesSelected={setVehiclesSelected}
                    vehiclesSelected={vehiclesSelected}
                    index={index}
                  />
                  <Trash
                    size={18}
                    onClick={() => removeVehiclesSection(index)}
                    style={{ cursor: "pointer" }}
                  />
                </Flex>
                {id_type_service !== 3 ? (
                  <>
                    <div className="collapseResumeContainer">
                      <div className="collapseResum">
                        <div className="collapseResumItem collapseBorder">
                          <Text className="collapseText">Volumen utilizado</Text>
                          <Text className="collapseText collapseBold">
                            {/*vehiclesSelected.length === 0 ? 0 : volumeUsedPercentage.toFixed(2)*/}{" "}
                            %
                          </Text>
                        </div>
                        <div className="collapseResumItem collapseBorder">
                          <Text className="collapseText">Volumen máximo</Text>
                          <Text className="collapseText collapseBold">
                            {totalVolume.toFixed(2)} m3
                          </Text>
                        </div>
                        <div className="collapseResumItem collapseBorder">
                          <Text className="collapseText">Peso utilizado</Text>
                          <Text className="collapseText collapseBold">
                            {/*vehiclesSelected.length === 0 ? 0 : weightUsedPercentage.toFixed(2)*/}{" "}
                            %
                          </Text>
                        </div>
                        <div className="collapseResumItem">
                          <Text className="collapseText">Peso máximo</Text>
                          <Text className="collapseText collapseBold">
                            {totalWeight.toFixed(2)} kg
                          </Text>
                        </div>
                      </div>
                    </div>
                    <div className="collapseResumeContainer">
                      <div className="collapseResum">
                        <div className="collapseResumItem collapseBorder">
                          <Text className="collapseText">Volumen productos</Text>
                          <Text className="collapseText collapseBold">{/*usedVolume*/} m3</Text>
                        </div>
                        <div className="collapseResumItem collapseBorder">
                          <Text className="collapseText">Peso productos</Text>
                          <Text className="collapseText collapseBold">{/*usedWeight*/} kg</Text>
                        </div>
                        <div className="collapseResumItem collapseBorder">
                          <Text className="collapseText">Productos</Text>
                          <Text className="collapseText collapseBold">
                            {/*dataCarga.reduce((total, item) => total + item.quantity, 0)*/}/40
                          </Text>
                        </div>
                        <div className="collapseResumItem">
                          <Button disabled className="collapseBaggageButton">
                            Embalaje
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="collapsePersonsResumeContainer">
                    <div className="collapsePersonsResum">
                      <div className="collapsePersonsResumItem collapsePersonsBorder">
                        <Text className="collapsePersonsText">Personas</Text>
                        <Text className="collapsePersonsText collapsePersonsBold">{`5/${totalPersons}`}</Text>
                      </div>
                      <div className="collapsePersonsResumItem">
                        <Button disabled className="collapsePersonsAcomodationButton">
                          Acomodación
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div>
                {id_type_service !== 3 ? (
                  <Table
                    columns={columnsVehiclesMaterial}
                    dataSource={dataCarga}
                    pagination={false}
                    rowSelection={rowSelection}
                    rowClassName={(record) =>
                      selectedRowKeys.includes(record.id) ? "selectedRow" : ""
                    }
                  />
                ) : (
                  <Table
                    columns={columnsVehiclesPerson}
                    dataSource={[]}
                    pagination={false}
                    rowSelection={rowSelection}
                    rowClassName={(record) =>
                      selectedRowKeys.includes(record.id) ? "selectedRow" : ""
                    }
                  />
                )}
              </div>
            </div>
          ))}
          <div className="collapseButtons">
            <Button className="collapseAddVehicleButton" onClick={addVehiclesSections}>
              Agregar vehíchulo
            </Button>
            <Button className="collapseSaveButton">Guardar</Button>
          </div>
        </div>
      )
    }
  ];

  return (
    <Collapse
      onChange={handleCollapseChange}
      expandIconPosition="end"
      ghost
      items={actionsOptionsVehiclesSelection}
      key={index}
    />
  );
};

export default VehiclesSelection;
