import { AddressContainer } from "@/components/atoms/AddressContainer/AddressContainer";
import { InputForm } from "@/components/atoms/inputs/InputForm/InputForm";
import { Flex, Modal, Typography } from "antd";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import "./modaladdress.scss";
import { InputAddress } from "@/components/atoms/inputs/InputAddress/InputAddress";
import { ModalBusinessRules } from "../ModalBusinessRules/ModalBusinessRules";
import { fetchAllLocations } from "@/services/locations/locations";
import { ILocation } from "@/types/locations/ILocations";

const { Title } = Typography;
interface Props {
  isOpen: boolean;
  setIsOpenAddress: Dispatch<SetStateAction<boolean>>;
}
export type AddressType = {
  city: string;
  address: {
    principal: string;
    principalNumber: string;
    secondary: string;
    secondaryNumber: string;
    complement: string;
  };
};
export const ModalAddress = ({ isOpen, setIsOpenAddress }: Props) => {
  const [isOpenBR, setIsOpenBR] = useState(false);
  const [_, setSelectedLocationId] = useState<number>();
  const [locations, setLocations] = useState<ILocation[]>([]);
  const {
    control,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      city: "",
      address: {
        principal: "",
        principalNumber: "",
        secondary: "",
        secondaryNumber: "",
        complement: ""
      }
    }
  });

  const city = watch("city");

  const filteredLocations = useMemo(() => {
    return locations?.filter((location) => location.city.toLowerCase().includes(city.toLowerCase()));
  }, [locations, city]);

  const initData = async () => {
    const locationsData = await fetchAllLocations();
    setLocations(locationsData);
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <>
      <Modal
        width={"40%"}
        open={isOpen}
        okButtonProps={{ className: "buttonOk" }}
        cancelButtonProps={{ style: { display: "none" } }}
        okText="Guardar ubicación"
        title={<Title level={4}>Ingresar ubicación</Title>}
        className="modaladdress"
        onCancel={() => setIsOpenAddress(false)}
        onOk={() => setIsOpenBR(true)}
      >
        <Flex wrap="wrap" justify="flex-start" style={{ paddingTop: "1rem" }}>
          <InputForm
            titleInput="Ciudad"
            control={control}
            nameInput="city"
            error={undefined}
            customStyle={{ width: "45.5%" }}
          />
        </Flex>
        {!!filteredLocations?.length && (
          <>
            <Title level={5} className="titleSection">
              Ubicaciones disponibles ya creadas
            </Title>
            <Flex wrap="wrap" justify="flex-start" style={{ padding: ".3rem" }} gap={".5rem"}>
              {filteredLocations.map((l) => (
                <AddressContainer
                  key={l.id}
                  location={l}
                  onSelect={(s) => setSelectedLocationId(s ? l.id : undefined)}
                />
              ))}
            </Flex>
          </>
        )}
        <Title level={5} className="titleSection">
          Crear ubicación del Ship To
        </Title>
        <InputAddress control={control} errors={errors} />
      </Modal>
      <ModalBusinessRules isOpen={isOpenBR} setIsBR={setIsOpenBR} />
    </>
  );
};
