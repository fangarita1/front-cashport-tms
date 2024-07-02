import { FC, useContext } from "react";
import { Button, Flex } from "antd";

import styles from "./create-order-market.module.scss";

import { ISelectType } from "@/types/clients/IClients";
import UiSearchInput from "@/components/ui/search-input";
import FilterDiscounts from "@/components/atoms/Filters/FilterDiscounts/FilterDiscounts";
import UiTab from "@/components/ui/ui-tab";
import { OrderViewContext } from "../../containers/create-order/create-order";
import { CaretLeft } from "phosphor-react";
import CreateOrderProduct from "../create-order-product";

export interface selectClientForm {
  client: ISelectType;
}

const CreateOrderMarket: FC = ({}) => {
  const { client, setClient } = useContext(OrderViewContext);

  const categoryTabs = mockData.map((category) => ({
    key: category.name,
    label: category.name,
    children: (
      <div className={styles.productsGrid}>
        {category.products.map((product) => (
          <CreateOrderProduct key={product.id} product={product} />
        ))}
      </div>
    )
  }));

  const handleGoBack = () => {
    setClient(undefined as any);
  };

  return (
    <Flex className={styles.FlexContainer} vertical gap={"0.5rem"}>
      <Button
        type="text"
        size="large"
        className={styles.buttonGoBack}
        icon={<CaretLeft size={"1.3rem"} />}
        onClick={handleGoBack}
      >
        {client.name}
      </Button>
      <Flex>
        <UiSearchInput
          placeholder="Buscar"
          onChange={(event) => {
            setTimeout(() => {
              console.log(event.target.value);
            }, 1000);
          }}
        />
        <FilterDiscounts />
      </Flex>
      <UiTab tabs={categoryTabs} sticky />
    </Flex>
  );
};

export default CreateOrderMarket;

const mockData = [
  {
    name: "Categoría 1",
    products: [
      {
        id: 1,
        name: "Galderma Cetaphil Crema Hidratante X 453 Gr 1",
        price: 1000,
        discount: 0,
        quantity: 0,
        image: "/images/cetaphilMock.png"
      },
      {
        id: 2,
        name: "Galderma Cetaphil Crema Hidratante X 453 Gr 2",
        price: 2000,
        discount: 0,
        quantity: 0,
        image: "/images/cetaphilMock.png"
      },
      {
        id: 3,
        name: "Galderma Cetaphil Crema Hidratante X 453 Gr 3",
        price: 3000,
        discount: 0,
        quantity: 0,
        image: "/images/cetaphilMock.png"
      },
      {
        id: 4,
        name: "Galderma Cetaphil Crema Hidratante X 453 Gr 4",
        price: 4000,
        discount: 0,
        quantity: 0,
        image: "/images/cetaphilMock.png"
      },
      {
        id: 5,
        name: "Galderma Cetaphil Crema Hidratante X 453 Gr 5",
        price: 5000,
        discount: 0,
        quantity: 0,
        image: "/images/cetaphilMock.png"
      },
      {
        id: 6,
        name: "Galderma Cetaphil Crema Hidratante X 453 Gr 6",
        price: 6000,
        discount: 0,
        quantity: 0,
        image: "/images/cetaphilMock.png"
      }
    ]
  },
  {
    name: "Categoría 2",
    products: []
  },
  {
    name: "Categoría 3",
    products: []
  },
  {
    name: "Categoría 4",
    products: [
      {
        id: 7,
        name: "Galderma Cetaphil Crema Hidratante X 453 Gr 7",
        price: 7000,
        discount: 0,
        quantity: 0,
        image: "/images/cetaphilMock.png"
      },
      {
        id: 8,
        name: "Galderma Cetaphil Crema Hidratante X 453 Gr 8",
        price: 8000,
        discount: 0,
        quantity: 0,
        image: "/images/cetaphilMock.png"
      }
    ]
  },
  {
    name: "Categoría 5",
    products: [
      {
        id: 9,
        name: "Galderma Cetaphil Crema Hidratante X 453 Gr 9",
        price: 9000,
        discount: 0,
        quantity: 0,
        image: "/images/cetaphilMock.png"
      },
      {
        id: 10,
        name: "Galderma Cetaphil Crema Hidratante X 453 Gr 10",
        price: 10000,
        discount: 0,
        quantity: 0,
        image: "/images/cetaphilMock.png"
      }
    ]
  },
  {
    name: "Categoría 6",
    products: [
      {
        id: 11,
        name: "Galderma Cetaphil Crema Hidratante X 453 Gr 11",
        price: 11000,
        discount: 0,
        quantity: 0,
        image: "/images/cetaphilMock.png"
      },
      {
        id: 12,
        name: "Galderma Cetaphil Crema Hidratante X 453 Gr 12",
        price: 12000,
        discount: 0,
        quantity: 0,
        image: "/images/cetaphilMock.png"
      },
      {
        id: 13,
        name: "Galderma Cetaphil Crema Hidratante X 453 Gr 13",
        price: 13000,
        discount: 0,
        quantity: 0,
        image: "/images/cetaphilMock.png"
      },
      {
        id: 14,
        name: "Galderma Cetaphil Crema Hidratante X 453 Gr 14",
        price: 14000,
        discount: 0,
        quantity: 0,
        image: "/images/cetaphilMock.png"
      },
      {
        id: 15,
        name: "Galderma Cetaphil Crema Hidratante X 453 Gr 15",
        price: 15000,
        discount: 0,
        quantity: 0,
        image: "/images/cetaphilMock.png"
      },
      {
        id: 16,
        name: "Galderma Cetaphil Crema Hidratante X 453 Gr 16",
        price: 16000,
        discount: 0,
        quantity: 0,
        image: "/images/cetaphilMock.png"
      }
    ]
  },
  {
    name: "Categoría 7",
    products: []
  },
  {
    name: "Categoría 8",
    products: []
  },
  {
    name: "Categoría 9",
    products: []
  },
  {
    name: "Categoría 10",
    products: []
  },
  {
    name: "Categoría 11",
    products: []
  }
];
