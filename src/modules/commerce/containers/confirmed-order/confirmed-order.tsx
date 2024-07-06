import { FC } from "react";
import { Flex } from "antd";
import { useParams, useRouter } from "next/navigation";
import ConfirmedOrderItem from "../../components/confirmed-order-item";
import { CheckCircle } from "phosphor-react";
import PrincipalButton from "@/components/atoms/buttons/principalButton/PrincipalButton";
import ConfirmedOrderShippingInfo from "../../components/confirmed-order-shipping-info";
import { extractSingleParam } from "@/utils/utils";

import styles from "./confirmed-order.module.scss";

export const ConfirmedOrderView: FC = () => {
  const params = useParams();
  const router = useRouter();
  const orderIdParam = extractSingleParam(params.orderId);

  const handleGoBack = () => {
    router.push("/comercio/");
  };

  return (
    <div className={styles.confirmedOrderView}>
      <div className={styles.confirmedOrderView__content}>
        <div className={styles.confirmedOrderView__content__header}>
          <p>Pedido #{orderIdParam}</p>
          <div className={styles.title}>
            <h2>Tu pedido ha sido solicitado</h2>
            <CheckCircle className={styles.check} size={90} weight="fill" />
          </div>
        </div>

        <div className={styles.summaryContainer}>
          <div className={styles.summaryContainer__top}>
            <Flex
              className={styles.summaryContainer__top__header}
              align="center"
              justify="space-between"
            >
              <h2 className={styles.mainTitle}>Resumen</h2>
              <p className={styles.quantity}>SKUs: 4</p>
            </Flex>

            <div className={styles.categories}>
              {mockOrder.map((category) => (
                <div className={styles.category} key={category.id}>
                  <Flex justify="space-between" align="center">
                    <p>{category.category}</p>
                    <p>Skus: {category.products.length}</p>
                  </Flex>
                  <div className={styles.products}>
                    {category.products.map((product) => (
                      <ConfirmedOrderItem key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.shippingData}>
              <h2>Datos de envío</h2>
              <ConfirmedOrderShippingInfo
                title="Direcciones"
                data="007795"
                customStyles={{ gridColumn: "1 / span 2" }}
              />
              <ConfirmedOrderShippingInfo title="Ciudad" data="Bogota" />
              <ConfirmedOrderShippingInfo title="Dirección de despacho" data="Calle 12 #3 - 45" />
              <ConfirmedOrderShippingInfo title="Email" data="cliente@gmail.com" />
              <ConfirmedOrderShippingInfo title="Teléfono contacto" data="3001234567" />
              <ConfirmedOrderShippingInfo
                title="Observaciones"
                data="Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias."
                customStyles={{ gridColumn: "1 / span 2" }}
              />
            </div>

            <div className={styles.discountsContainer}>
              <h2 className={styles.discountsContainer__title}>Descuentos aplicados</h2>
              <div className={styles.discountsContainer__discounts}>
                {mockDiscounts.map((discount) => (
                  <p key={discount.id}>{discount.value}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <Flex vertical gap={"0.25rem"}>
            <Flex justify="space-between">
              <p>Subtotal</p>
              <p>$XXXXX</p>
            </Flex>
            <Flex justify="space-between">
              <p>IVA 19%</p>
              <p>$XXXXX</p>
            </Flex>
            <Flex justify="space-between">
              <p>Descuentos</p>
              <p>-$XXXXX</p>
            </Flex>
            <Flex justify="space-between">
              <strong>Total</strong>
              <strong>$XXXXX</strong>
            </Flex>
            <Flex className={styles.footer__earlyPaymentTotal} justify="space-between">
              <p>Total con pronto pago</p>
              <p>$XXXXX</p>
            </Flex>
          </Flex>
          <PrincipalButton onClick={handleGoBack}>Salir</PrincipalButton>
        </div>
      </div>
    </div>
  );
};

export default ConfirmedOrderView;

const mockOrder = [
  {
    id: 1,
    category: "Cremas faciales",
    products: [
      {
        id: 1,
        name: "Galderma Cetaphil Crema Hidratante X 453 Gr 1",
        price: 10000,
        discount: 0,
        percentageDiscount: 0,
        quantity: 2,
        image: "/images/cetaphilMock.png",
        category_id: 1
      },
      {
        id: 2,
        name: "Galderma Cetaphil Crema Hidratante X 453 Gr 2",
        price: 20000,
        discount: 0,
        percentageDiscount: 5,
        quantity: 1,
        image: "/images/cetaphilMock.png",
        category_id: 1
      }
    ]
  },
  {
    id: 2,
    category: "Bloqueadores",
    products: [
      {
        id: 3,
        name: "Galderma Cetaphil Crema Hidratante X 453 Gr 1",
        price: 15000,
        discount: 0,
        percentageDiscount: 0,
        quantity: 1,
        image: "/images/cetaphilMock.png",
        category_id: 2
      },
      {
        id: 4,
        name: "Galderma Cetaphil Crema Hidratante X 453 Gr 2",
        price: 25000,
        discount: 0,
        percentageDiscount: 5,
        quantity: 1,
        image: "/images/cetaphilMock.png",
        category_id: 2
      }
    ]
  }
];

const mockDiscounts = [
  {
    id: 1,
    value: "5% DCTO En las marcas Cetaphil"
  },
  {
    id: 2,
    value: "10% DCTO En las marcas Cetaphil"
  }
];
