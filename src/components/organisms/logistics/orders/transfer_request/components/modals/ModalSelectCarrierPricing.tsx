import styles from "./ModalSelectCarrierPricing.module.scss";
import PrincipalButton from "@/components/atoms/buttons/principalButton/PrincipalButton";
import { sendCarrierRequest } from "@/services/logistics/carrier-request";
import { getTransferRequestPricing } from "@/services/logistics/transfer-request";
import { SendCarrierRequest } from "@/types/logistics/carrier/carrier";
import { ITransferRequestJourneyReview } from "@/types/logistics/schema";
import { JourneyTripPricing } from "@/types/logistics/trips/TripsSchema";
import { CraneTower } from "@phosphor-icons/react";
import { Checkbox, Flex, message, Modal, Spin, Tabs, TabsProps, Typography } from "antd";
import { useParams } from "next/navigation";
import { Truck, User } from "phosphor-react";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import useSWR from "swr";

const { Title, Text } = Typography;
type Props = {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  handleModalCarrier: (value: boolean) => void;
  // eslint-disable-next-line no-unused-vars
  mutateStepthree: (journey: ITransferRequestJourneyReview[]) => void;
  view: string;
  setView: React.Dispatch<React.SetStateAction<"solicitation" | "vehicles" | "carrier">>;
};
export default function ModalSelectCarrierPricing({
  open,
  handleModalCarrier,
  mutateStepthree,
  view,
  setView
}: Props) {
  const params = useParams();
  const id = parseInt(params.id as string);
  const [selectedTab, setSelectedTab] = useState("0");
  const [journey, setJourney] = useState<Omit<JourneyTripPricing, "trips">>();
  const { data, isLoading } = useSWR(
    { idTransferRequest: id, open },
    ({ idTransferRequest, open }) =>
      open ? getTransferRequestPricing({ idTransferRequest }) : undefined,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: true,
      revalidateOnMount: false
    }
  );
  const {
    control,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<SendCarrierRequest>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "carrierRequest"
  });

  useEffect(() => {
    remove();
    if (data?.length && open) setSelectedTab(data[0].trips[0].id_trip.toString());
  }, [open]);

  const handleSubmitForm = async (data: SendCarrierRequest) => {
    try {
      const response = await sendCarrierRequest(data);
      if (response) handleModalCarrier(false);
      mutateStepthree(response.journey);
      if (view === "vehicles") setView("carrier");
    } catch (error) {
      if (error instanceof Error) message.error(error.message);
      else message.error("Error al enviar solicitud");
    }
  };

  const Header = () => (
    <>
      <Title level={4}>Proveedores</Title>
      <Text style={{ fontSize: "0.8rem" }}>
        Selecciones los proveedores a los que les enviará la solicitud de los viajes creados
      </Text>
    </>
  );
  const Footer = () => (
    <Flex gap={24} justify="center" className={styles.Footer}>
      <PrincipalButton
        type="default"
        fullWidth
        onClick={() => handleModalCarrier(false)}
        disabled={isSubmitting}
      >
        Cancelar
      </PrincipalButton>
      <PrincipalButton
        fullWidth
        disabled={
          view === "carrier"
            ? !fields.length
            : !dataFlated.every(({ trip }) => fields.some((x) => x.id_trip === trip.id_trip))
        }
        loading={isSubmitting}
        onClick={handleSubmit(handleSubmitForm)}
      >
        {view === "carrier" ? "Enviar solicitudes" : "Siguiente"}
      </PrincipalButton>
    </Flex>
  );
  const dataFlated =
    data?.flatMap((journey) =>
      journey.trips.map((trip) => {
        const j = { ...journey, trips: undefined };
        delete j.trips;
        return { trip, journey: j as Omit<JourneyTripPricing, "trips"> };
      })
    ) || [];
  useEffect(() => {
    if (data?.length) setSelectedTab(data[0].trips[0].id_trip.toString());
  }, [data]);
  useEffect(() => {
    setJourney(dataFlated.find((x) => x.trip.id_trip.toString() === selectedTab)?.journey);
  }, [selectedTab]);

  const handleCheck = (id_trip: number, id_carrier: number) => {
    const index = fields.findIndex((x) => x.id_trip === id_trip && x.id_carrier === id_carrier);
    const trip = dataFlated.find((x) => x.trip.id_trip === id_trip);
    const price = trip?.trip.carriers_pricing.find((x) => x.id_carrier === id_carrier);
    if (index === -1 && trip) {
      append({
        id_trip,
        id_carrier,
        fare: price?.price || 0,
        id_pricing: price?.id_carrier_pricing || 0,
        id_transfer_request: id,
        id_vehicle_type: trip.trip.vehicle_type
      });
    } else {
      remove(index);
    }
  };
  const handleSelectAll = (id_trip: number) => {
    const trip = dataFlated.find((x) => x.trip.id_trip === id_trip);
    if (trip) {
      trip.trip.carriers_pricing.forEach((carrier) => {
        const index = fields.findIndex(
          (x) => x.id_trip === id_trip && x.id_carrier === carrier.id_carrier
        );
        if (index === -1) {
          append({
            id_trip,
            id_carrier: carrier.id_carrier,
            fare: carrier.price || 0,
            id_pricing: carrier.id_carrier_pricing,
            id_transfer_request: id,
            id_vehicle_type: trip.trip.vehicle_type
          });
        }
      });
    }
  };

  const items: TabsProps["items"] = dataFlated.map(({ trip }) => ({
    label: (
      <div className={selectedTab === trip.id_trip.toString() ? "" : "activeTab"}>
        {trip.vehicle_type_desc}
      </div>
    ),
    key: trip.id_trip.toString(),
    children: (
      <Flex vertical gap={24}>
        <Checkbox
          checked={
            fields.filter((x) => x.id_trip === trip.id_trip).length === trip.carriers_pricing.length
          }
          style={{ marginLeft: "0.5rem" }}
          onChange={() => handleSelectAll(trip.id_trip)}
        >
          <Text style={{ fontWeight: "500" }}>Seleccionar todos</Text>
        </Checkbox>
        {trip.carriers_pricing.map((carrier) => (
          <Flex
            className={styles.checks}
            justify="space-between"
            gap={24}
            key={`carrrier-${carrier.id_carrier}-${trip.id_trip}`}
          >
            <Flex align="center" gap={8} justify="center">
              <Checkbox
                id={`checkbox-${carrier.id_carrier}-${trip.id_trip}`}
                checked={fields.some(
                  (x) => x.id_trip === trip.id_trip && x.id_carrier === carrier.id_carrier
                )}
                onChange={() => handleCheck(trip.id_trip, carrier.id_carrier)}
              ></Checkbox>
              <Text style={{ fontWeight: "500" }}>
                <label
                  htmlFor={`checkbox-${carrier.id_carrier}-${trip.id_trip}`}
                  style={{ cursor: "pointer" }}
                >
                  {carrier.description}
                </label>
              </Text>
            </Flex>
            <Flex gap={8} vertical align="end" justify="center">
              <Text style={{ fontSize: "1.2rem" }}>${carrier.price?.toLocaleString("es-CO")}</Text>
              <Text style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                {carrier.disponibility} <Truck size={16} weight="fill" />
              </Text>
            </Flex>
          </Flex>
        ))}
      </Flex>
    )
  }));
  const serviceType = (id_type_service: number) =>
    id_type_service === 1
      ? { title: "Carga", icon: <Truck size={27} color="#FFFFFF" weight="fill" /> }
      : id_type_service === 2
        ? { title: "Izaje", icon: <CraneTower size={27} color="#FFFFFF" weight="fill" /> }
        : { title: "Personal", icon: <User size={27} color="#FFFFFF" weight="fill" /> };
  return (
    <Modal
      title={<Header />}
      open={open}
      onCancel={() => handleModalCarrier(false)}
      width={686}
      footer={<Footer />}
    >
      {isLoading ? (
        <Spin />
      ) : (
        <div className="scrollableTabGlobalCss">
          <Flex gap={24} className={styles.header} vertical align="center">
            <Flex gap={24} align="center" justify="space-between" style={{ width: "100%" }}>
              <Text>
                <strong>Fecha inicio</strong>{" "}
                {new Date(journey?.start_date || 0).toLocaleDateString("es", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric"
                })}
              </Text>
              <div className={styles.stBox}>
                {serviceType(journey?.id_type_service || 0).icon}
                <Text className={styles.stContent}>
                  {serviceType(journey?.id_type_service || 0).title}
                </Text>
              </div>
            </Flex>
            <Flex gap={24} vertical align="start" style={{ width: "100%" }}>
              <Text>
                <strong>Origen</strong> {journey?.start_location_desc}
              </Text>
              <Text>
                <strong>Destino</strong> {journey?.end_location_desc}
              </Text>
            </Flex>
          </Flex>
          <Tabs
            size="large"
            style={{ fontWeight: "600" }}
            defaultActiveKey={selectedTab}
            activeKey={selectedTab}
            items={items}
            onChange={(index) => setSelectedTab(index)}
          />
        </div>
      )}
    </Modal>
  );
}
