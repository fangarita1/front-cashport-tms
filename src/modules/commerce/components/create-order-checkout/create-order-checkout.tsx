import { FC, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Flex, Radio, RadioChangeEvent } from "antd";
import { CaretLeft } from "phosphor-react";
import { OrderViewContext } from "../../containers/create-order/create-order";
import PrincipalButton from "@/components/atoms/buttons/principalButton/PrincipalButton";
import { InputForm } from "@/components/atoms/inputs/InputForm/InputForm";
import { Controller, set, useForm } from "react-hook-form";
import { ISelectType } from "@/types/clients/IClients";
import styles from "./create-order-checkout.module.scss";
import GeneralSelect from "@/components/ui/general-select";
import AlternativeBlackButton from "@/components/atoms/buttons/alternativeBlackButton/alternativeBlackButton";
import { getAdresses } from "@/services/commerce/commerce";
import { useAppStore } from "@/lib/store/store";
import { ICommerceAdresses } from "@/types/commerce/ICommerce";

interface IShippingInfoForm {
  addresses?: ISelectType;
  city?: string;
  address?: string;
  email?: string;
  phone?: string;
  comment?: string;
}

const CreateOrderCheckout: FC = ({}) => {
  const { setCheckingOut, client } = useContext(OrderViewContext);
  const [radioValue, setRadioValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState<ICommerceAdresses[]>([]);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid }
  } = useForm<IShippingInfoForm>({
    mode: "onChange",
    defaultValues: {
      city: "Bogota quemado",
      address: "Calle quemad",
      email: "quemad@gmail.com",
      phone: ""
    }
  });
  const watchSelectAddress = watch("addresses");

  useEffect(() => {
    const selectedAddress =
      watchSelectAddress &&
      addresses.find((address) => address.address === watchSelectAddress.label);
    setValue("city", selectedAddress?.city);
    setValue("address", selectedAddress?.address);
    setValue("email", selectedAddress?.email);
  }, [watchSelectAddress]);

  useEffect(() => {
    const fetchAdresses = async () => {
      const response = await getAdresses(client.id);
      console.log("Direcciones: ", response.data);
      setAddresses(response.data);
    };
    fetchAdresses();
  }, []);

  const handleGoBack = () => {
    setCheckingOut(false);
  };

  const handleChangeRadio = (e: RadioChangeEvent) => {
    setRadioValue(parseInt(e.target.value));
  };

  const onSubmitSaveDraft = (data: IShippingInfoForm) => {
    console.info("Guardar borrador: ", data);
  };

  const onSubmitFinishOrder = (data: IShippingInfoForm) => {
    console.info("Finalizar ordenn: ", data);

    // setLoading(true);
    // setTimeout(() => {
    //   const orderId = 45666;
    //   router.push(`/comercio/pedidoConfirmado/${orderId}`);
    //   setLoading(false);
    // }, 1000);
  };

  return (
    <div className={styles.checkoutContainer}>
      <Button
        type="text"
        size="large"
        className={styles.buttonGoBack}
        icon={<CaretLeft size={"1.3rem"} />}
        onClick={handleGoBack}
      >
        Volver
      </Button>
      <h3 className={styles.title}>Confirma datos de envío</h3>

      <div className={styles.checkoutContainer__content}>
        <div className={styles.shippingInfo}>
          <Controller
            name="addresses"
            control={control}
            rules={{ required: true, minLength: 1 }}
            render={({ field }) => (
              <GeneralSelect
                errors={errors.addresses}
                field={field}
                title="Direcciones"
                placeholder="Seleccione una dirección"
                options={addresses.map((address) => address.address)}
                customStyleContainer={{ gridColumn: "1 / span 2" }}
              />
            )}
          />
          <InputForm
            readOnly={true}
            titleInput="Ciudad"
            control={control}
            nameInput="city"
            error={errors.city}
          />
          <InputForm
            readOnly={true}
            titleInput="Dirección de despacho"
            control={control}
            nameInput="address"
            error={errors.address}
          />
          <InputForm
            readOnly={true}
            titleInput="Email"
            control={control}
            nameInput="email"
            error={errors.email}
          />
          <InputForm
            titleInput="Teléfono de contacto"
            control={control}
            nameInput="phone"
            error={errors.phone}
          />
          <Controller
            name="comment"
            control={control}
            render={({ field }) => (
              <div className={styles.textArea}>
                <p className={styles.textArea__label}>Observaciones</p>
                <textarea
                  {...field}
                  placeholder="Ingresar un comentario"
                  style={errors.comment ? { borderColor: "red" } : {}}
                />
              </div>
            )}
          />
        </div>

        <div className={styles.discounts}>
          <h4 className={styles.discounts__title}>Seleccionar descuento a aplicar</h4>
          <Radio.Group
            className={styles.radioGroup}
            onChange={handleChangeRadio}
            value={radioValue}
          >
            {mockDiscounts.map((discount) => (
              <Radio
                className={styles.radioGroup__item}
                key={discount.id}
                value={discount.id}
                disabled={!discount.isReached}
              >
                <div className={styles.radioGroup__item__label}>
                  <p>{discount.discount}</p>
                </div>
              </Radio>
            ))}
          </Radio.Group>
        </div>

        <Flex gap={"1rem"}>
          <AlternativeBlackButton
            onClick={handleSubmit(onSubmitSaveDraft)}
            fullWidth
            loading={loading}
          >
            Guardar borrador
          </AlternativeBlackButton>
          <PrincipalButton
            onClick={handleSubmit(onSubmitFinishOrder)}
            fullWidth
            disabled={!isValid}
            loading={loading}
          >
            Finalizar pedido
          </PrincipalButton>
        </Flex>
      </div>
    </div>
  );
};

export default CreateOrderCheckout;

const mockDiscounts = [
  {
    id: 1,
    discount: "5% DCTO En las marcas Cetaphil",
    isReached: true
  },
  {
    id: 2,
    discount: "10% DCTO En las marcas Cetaphil",
    isReached: false
  },
  {
    id: 3,
    discount: "15% DCTO En las marcas Cetaphil",
    isReached: false
  },
  {
    id: 4,
    discount: "30% DCTO En las marcas Cetaphil",
    isReached: true
  }
];

const mockAddresses = [
  {
    id: 1,
    value: 1,
    label: "Calle 1 # 1-1"
  },
  {
    id: 2,
    value: 2,
    label: "Calle 2 # 2-2"
  },
  {
    id: 3,
    value: 3,
    label: "Calle 3 # 3-3"
  }
];
