import { AddressContainer } from "@/components/atoms/AddressContainer/AddressContainer";
import { Button, Typography } from "antd";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { InputAddress } from "@/components/atoms/inputs/InputAddress/InputAddress";
import { CaretLeft } from "phosphor-react";
import { SelectLocations } from "../../selects/clients/SelectLocations/SelectLocations";
import { ISelectType } from "@/types/clients/IClients";

import "./modaladdress.scss";
import { useLocations } from "@/hooks/useLocations";
import { locationAddress } from "@/types/locations/ILocations";

const { Title } = Typography;
interface Props {
  setCurrentView: Dispatch<SetStateAction<"address" | "main" | "businessRules">>;
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
export const ModalAddress = ({ setCurrentView }: Props) => {
  const [isEditAvailable] = useState(false);
  const [alreadyExistingAddresses, setAlreadyExistingAddresses] = useState<locationAddress[] | []>(
    []
  );

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

  const { getLocation } = useLocations();

  useEffect(() => {
    if (watchCity) {
      const fetchLocation = async () => {
        const response = await getLocation(watchCity.value);
        setAlreadyExistingAddresses(response.data.address);
      };
      fetchLocation(); //
    }
  }, [getLocation, watchCity]);

  const onSubmitLocation = (data: AddressType) => {
    console.log("data ADDRESS: ", data);
    setCurrentView("main");
  };

  return (
    <form className="modalAddress" onSubmit={handleSubmit(onSubmitLocation)}>
      <Button
        className="modalTitle"
        icon={<CaretLeft size={"1.45rem"} />}
        onClick={() => setCurrentView("main")}
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
      <InputAddress control={control} errors={errors} />

      <div className="footer">
        <Button disabled={!isValid} htmlType="submit" className="acceptButton -address">
          Guardar ubicación
        </Button>
      </div>
    </form>
  );
};
