/* eslint-disable no-unused-vars */
import { Button, Flex, Table, TableProps, Typography } from "antd";
import VehiclesSelect from "../../vehiclesSelect/VehiclesSelect";
import { CaretLeft, CaretRight, Circle, Eye, Trash, Warning } from "phosphor-react";
import {
  ITransferOrderRequestContacts,
  ITransferRequestCreation,
  ITransferRequestStepOneMaterial,
  IVehiclesPricing
} from "@/types/logistics/schema";
import { useEffect, useState } from "react";
import { formatMoney } from "@/utils/utils";

const { Text } = Typography;

type TripProps = {
  transferRequest: ITransferRequestCreation | undefined;
  index: number;
  id_journey: number;
  id_type_service: number;
  onRemove: () => void;
  sugestedVehicles: IVehiclesPricing[] | undefined;
  isLoadingVehicles: boolean;
  // eslint-disable-next-line no-unused-vars
  handleAddMaterialByTrip: (id_material: number) => void;
  handleRemoveMaterialByTrip: (id_material: number) => void;
  handleSelectVehicle: (id_vehicle_type: number) => void;
  section: any;
};

export default function Trip(props: TripProps) {
  const {
    transferRequest,
    id_journey,
    id_type_service,
    onRemove,
    sugestedVehicles,
    isLoadingVehicles,
    handleAddMaterialByTrip,
    handleRemoveMaterialByTrip,
    handleSelectVehicle,
    section
  } = props;
  const [optionsVehicles, setOptionsVehicles] = useState<any[]>([]);
  const [dataCarga, setDataCarga] = useState<ITransferRequestStepOneMaterial[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
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

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };
  useEffect(() => {
    transferRequest?.stepOne.transferRequest?.forEach(async (mat) => {
      mat?.transfer_request_material?.forEach(async (m) => {
        const newvalue: ITransferRequestStepOneMaterial = m;
        setDataCarga((dataCarga) => [...dataCarga, newvalue]);
      });
    });
  }, [transferRequest]);

  const calculateTotalCapacities = () => {
    const vehiclesSelected = sugestedVehicles?.find((v) => v.id === section.id_vehicle_type);
    const totalVolume = vehiclesSelected?.m3_volume || 0;
    const totalWeight = vehiclesSelected?.kg_capacity || 0;
    const totalPersons = vehiclesSelected?.passenger_capacity || 0;

    let volumeUsed = 0;
    let weightUsed = 0;
    let volumeUsedPercentage = 0;
    let weightUsedPercentage = 0;
    let quantity = 0;

    if (vehiclesSelected) {
      section.materialByTrip.forEach(
        ({ id_material, units }: { id_material: number; units: number }) => {
          const mat = dataCarga.find((m) => m.id === id_material);
          vehiclesSelected.m3_volume &&
            (volumeUsedPercentage += ((mat?.material[0].m3_volume || 0) * units) / totalVolume);
          vehiclesSelected.kg_capacity &&
            (weightUsedPercentage += ((mat?.material[0].kg_weight || 0) * units) / totalWeight);
        }
      );
    }
    section.materialByTrip.forEach(
      ({ id_material, units }: { id_material: number; units: number }) => {
        const mat = dataCarga.find((m) => m.id === id_material);
        if (mat) {
          volumeUsed += mat.material[0].m3_volume * units;
          weightUsed += mat.material[0].kg_weight * units;
          quantity += units;
        }
      }
    );
    return {
      totalVolume,
      totalWeight,
      totalPersons,
      volumeUsed,
      weightUsed,
      volumeUsedPercentage,
      weightUsedPercentage,
      quantity
    };
  };

  const {
    totalVolume,
    totalWeight,
    totalPersons,
    volumeUsed,
    weightUsed,
    volumeUsedPercentage,
    weightUsedPercentage,
    quantity
  } = calculateTotalCapacities();
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
          <Button type="text" size="small" onClick={() => handleRemoveMaterialByTrip(record.id)}>
            <CaretLeft />
          </Button>
          {section.materialByTrip.find((m: any) => m.id_material === record.id)?.units || 0}
          <Button type="text" size="small" onClick={() => handleAddMaterialByTrip(record.id)}>
            <CaretRight onClick={() => handleAddMaterialByTrip(record.id)} />
          </Button>
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
        </Flex>
      ),
      align: "center"
    }
  ];

  useEffect(() => {
    const result: any = [];
    sugestedVehicles?.forEach((item) => {
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
            <Text>Cantidad disponibles: {item.disponibility || 0}</Text>
          </div>
        </Flex>
      );

      result.push({
        value: item.description,
        label: strlabel,
        key: item.id,
        searchParam: item.description
      });
    });
    setOptionsVehicles(result);
  }, [sugestedVehicles]);

  return (
    <div className="collapseInformationContainer">
      <div className="collapseResumeWrapper">
        <Flex className="collapseTopSection">
          <VehiclesSelect
            id_journey={id_journey}
            vehiclesSelected={
              sugestedVehicles?.find((v) => v.id === section.id_vehicle_type)?.description
            }
            optionsVehicles={optionsVehicles}
            isLoadingVehicles={isLoadingVehicles}
            selectVehicle={handleSelectVehicle}
          />
          <Trash size={18} onClick={onRemove} style={{ cursor: "pointer" }} />
        </Flex>
        {id_type_service !== 3 ? (
          <>
            <div className="collapseResumeContainer">
              <div className="collapseResum">
                <div className="collapseResumItem collapseBorder">
                  <Text className="collapseText">Volumen utilizado</Text>
                  <Text className="collapseText collapseBold">
                    {volumeUsedPercentage.toFixed(2)} %
                  </Text>
                </div>
                <div className="collapseResumItem collapseBorder">
                  <Text className="collapseText">Volumen máximo</Text>
                  <Text className="collapseText collapseBold">{totalVolume.toFixed(2)} m3</Text>
                </div>
                <div className="collapseResumItem collapseBorder">
                  <Text className="collapseText">Peso utilizado</Text>
                  <Text className="collapseText collapseBold">
                    {weightUsedPercentage.toFixed(2)} %
                  </Text>
                </div>
                <div className="collapseResumItem">
                  <Text className="collapseText">Peso máximo</Text>
                  <Text className="collapseText collapseBold">{totalWeight.toFixed(2)} kg</Text>
                </div>
              </div>
            </div>
            <div className="collapseResumeContainer">
              <div className="collapseResum">
                <div className="collapseResumItem collapseBorder">
                  <Text className="collapseText">Volumen productos</Text>
                  <Text className="collapseText collapseBold">{volumeUsed.toFixed(2)} m3</Text>
                </div>
                <div className="collapseResumItem collapseBorder">
                  <Text className="collapseText">Peso productos</Text>
                  <Text className="collapseText collapseBold">{weightUsed.toFixed(2)} kg</Text>
                </div>
                <div className="collapseResumItem collapseBorder">
                  <Text className="collapseText">Productos</Text>
                  <Text className="collapseText collapseBold">
                    {quantity}/{dataCarga.reduce((total, item) => total + item.units, 0)}
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
            rowClassName={(record) => (selectedRowKeys.includes(record.id) ? "selectedRow" : "")}
          />
        ) : (
          <Table
            columns={columnsVehiclesPerson}
            dataSource={[]}
            pagination={false}
            rowSelection={rowSelection}
            rowClassName={(record) => (selectedRowKeys.includes(record.id) ? "selectedRow" : "")}
          />
        )}
      </div>
    </div>
  );
}
