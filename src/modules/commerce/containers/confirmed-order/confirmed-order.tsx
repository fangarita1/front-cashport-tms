import { FC, useEffect, useState } from "react";
import { Flex } from "antd";
import { useParams, useRouter } from "next/navigation";
import ConfirmedOrderItem from "../../components/confirmed-order-item";
import { CheckCircle } from "phosphor-react";
import PrincipalButton from "@/components/atoms/buttons/principalButton/PrincipalButton";
import ConfirmedOrderShippingInfo from "../../components/confirmed-order-shipping-info";
import { extractSingleParam, formatMoney } from "@/utils/utils";

import styles from "./confirmed-order.module.scss";
import { getSingleOrder } from "@/services/commerce/commerce";
import { useAppStore } from "@/lib/store/store";
import { ISingleOrder } from "@/types/commerce/ICommerce";

export const ConfirmedOrderView: FC = () => {
  const { ID: projectId } = useAppStore((state) => state.selectedProject);
  const params = useParams();
  const router = useRouter();
  const orderIdParam = extractSingleParam(params.orderId);
  const [order, setOrder] = useState<ISingleOrder>();

  useEffect(() => {
    if (!orderIdParam || !projectId) return;
    const fetchOrder = async () => {
      const response = await getSingleOrder(projectId, parseInt(orderIdParam));
      setOrder(response.data[0]);
    };
    fetchOrder();
  }, [params, projectId]);

  const handleGoBack = () => {
    router.push("/comercio/");
  };

  return (
    <div className={styles.confirmedOrderView}>
      <div className={styles.confirmedOrderView__content}>
        <div className={styles.confirmedOrderView__content__header}>
          <p>Pedido #{order?.id}</p>
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
              <p className={styles.quantity}>SKUs: X</p>
            </Flex>

            <div className={styles.categories}>
              {mockOrder.map((category) => (
                <div className={styles.category} key={category.id}>
                  <Flex justify="space-between" align="center">
                    <p className={styles.category__header}>{category.category}</p>
                    <p className={styles.category__header}>Skus: {category.products.length}</p>
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
                data={order?.shipping_info.address}
                customStyles={{ gridColumn: "1 / span 2" }}
              />
              <ConfirmedOrderShippingInfo title="Ciudad" data={order?.shipping_info?.city} />
              <ConfirmedOrderShippingInfo
                title="Dirección de despacho"
                data={order?.shipping_info?.dispatch_address}
              />
              <ConfirmedOrderShippingInfo title="Email" data={order?.shipping_info?.email} />
              <ConfirmedOrderShippingInfo
                title="Teléfono contacto"
                data={order?.shipping_info?.phone_number}
              />
              <ConfirmedOrderShippingInfo
                title="Observaciones"
                data={order?.shipping_info?.comments}
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
              <p>{formatMoney(order?.detail?.subtotal)}</p>
            </Flex>
            <Flex justify="space-between">
              <p>IVA 19%</p>
              <p>{formatMoney(order?.detail?.taxes)}</p>
            </Flex>
            <Flex justify="space-between">
              <p>Descuentos</p>
              <p>-{formatMoney(order?.detail?.discounts)}</p>
            </Flex>
            <Flex justify="space-between">
              <strong>Total</strong>
              <strong>{formatMoney(order?.detail?.total)}</strong>
            </Flex>
            <Flex className={styles.footer__earlyPaymentTotal} justify="space-between">
              <p>Total con pronto pago</p>
              <p>{formatMoney(order?.detail?.total_pronto_pago)}</p>
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
        price: 120000,
        discount: 60000,
        discount_percentage: 50,
        quantity: 2,
        image: "/images/cetaphilMock.png",
        category_id: 1
      },
      {
        id: 2,
        name: "Galderma Cetaphil Crema Hidratante X 453 Gr 2",
        price: 20000,
        discount: 0,
        discount_percentage: 5,
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
        discount_percentage: 0,
        quantity: 1,
        image: "/images/cetaphilMock.png",
        category_id: 2
      },
      {
        id: 4,
        name: "Galderma Cetaphil Crema Hidratante X 453 Gr 2",
        price: 25000,
        discount: 0,
        discount_percentage: 5,
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
