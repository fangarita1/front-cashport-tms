import { AddressContainer } from "@/components/atoms/AddressContainer/AddressContainer";
import { Button, Typography, message } from "antd";
import { BaseSyntheticEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { Controller, UseFormSetValue, useForm } from "react-hook-form";
import { InputAddress } from "@/components/atoms/inputs/InputAddress/InputAddress";
import { CaretLeft } from "phosphor-react";
import { SelectLocations } from "../../selects/clients/SelectLocations/SelectLocations";
import { ISelectType } from "@/types/clients/IClients";

import "./modaladdress.scss";
import { useLocations } from "@/hooks/useLocations";
import { locationAddress } from "@/types/locations/ILocations";
import { ShipToFormType } from "@/types/shipTo/IShipTo";

const { Title } = Typography;
interface Props {
  setIsModalAddressOpen: Dispatch<SetStateAction<boolean>>;
  setParentFormValue: UseFormSetValue<ShipToFormType>;
}
export type AddressType = {
  location: {
    city: ISelectType;
    address: {
      street_type: string;
      number: string;
      complement: string;
      building_number: number;
    };
    complement: string;
  };
};
export const ModalAddress = ({ setIsModalAddressOpen, setParentFormValue }: Props) => {
  const [isEditAvailable] = useState(false);
  const [alreadyExistingAddresses, setAlreadyExistingAddresses] = useState<locationAddress[] | []>(
    []
  );
  const [selectedAddress, setSelectedAddress] = useState<{
    address: string;
    id: number;
  } | null>(null);
  const [messageApi, contextHolder] = message.useMessage();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch
  } = useForm<AddressType>({
    defaultValues: {},
    disabled: isEditAvailable
  });

  const watchCity = watch("location.city");

  const { getLocation, createLocation } = useLocations();

  useEffect(() => {
    if (watchCity) {
      const fetchLocation = async () => {
        const response = await getLocation(watchCity.value);
        setAlreadyExistingAddresses(response.data.address);
      };
      fetchLocation(); //
    }
  }, [getLocation, watchCity]);

  const onSubmitLocation = async (
    data: AddressType,
    event: BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    event?.preventDefault();
    event?.stopPropagation();
    if (selectedAddress) {
      setParentFormValue("shipTo.address_id", selectedAddress.id);
      setParentFormValue("shipTo.address", selectedAddress.address);
      setIsModalAddressOpen(false);
      return;
    }

    const newAddressData = {
      address: `${data.location.address.street_type} ${data.location.address.number} #${data.location.address.complement} - ${data.location.address.building_number}`,
      id: data.location.city.value,
      complement: data.location.complement
    };

    try {
      const response = await createLocation(newAddressData, messageApi);
      setParentFormValue("shipTo.address_id", response.id);
      setParentFormValue("shipTo.address", newAddressData.address);
      setIsModalAddressOpen(false);
    } catch (error) {
      console.error("Failed to add address: ", error);
      message.error("An error occurred while adding the address.");
    }
  };

  return (
    <>
      {contextHolder}
      <form className="modalAddress">
        <Button
          className="modalTitle"
          icon={<CaretLeft size={"1.45rem"} />}
          onClick={() => setIsModalAddressOpen(false)}
        >
          Ingresar ubicación
        </Button>

        <div className="modalAddress__city">
          <Controller
            name="location.city"
            control={control}
            rules={{ required: true, minLength: 1 }}
            render={({ field }) => <SelectLocations errors={errors.location?.city} field={field} />}
          />
        </div>
        <Title level={5} className="titleSection">
          Ubicaciones disponibles ya creadas
        </Title>
        <div className="existingLocations">
          {alreadyExistingAddresses.length > 0 ? (
            alreadyExistingAddresses.map((address) => (
              <AddressContainer
                key={address.id}
                address={address.address}
                city={watchCity.label}
                addressId={address.id}
                complement={address.complement}
                isSelected={address.id === selectedAddress?.id}
                onSelectAddress={(id) => {
                  setSelectedAddress((prevAddress) => {
                    if (prevAddress && prevAddress.id === id) {
                      return null;
                    } else {
                      const newAddress = alreadyExistingAddresses.find((a) => a.id === id);
                      if (newAddress) {
                        return { id: newAddress.id, address: newAddress.address };
                      }
                      return prevAddress;
                    }
                  });
                }}
              />
            ))
          ) : (
            <p className="existingLocations__emptyText">
              Aún no hay ubicaciones creadas para esta ciudad
            </p>
          )}
        </div>
        <Title level={5} className="titleSection">
          Crear ubicación del Ship To
        </Title>
        <InputAddress control={control} errors={errors} disabled={selectedAddress !== null} />

        <div className="footer">
          <Button
            disabled={selectedAddress === null && !isValid}
            onClick={handleSubmit(onSubmitLocation)}
            className="acceptButton -address"
          >
            Guardar ubicación
          </Button>
        </div>
      </form>
    </>
  );
};
