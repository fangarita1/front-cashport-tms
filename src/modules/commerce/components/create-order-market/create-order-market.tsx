import { FC, useContext } from "react";
import { Button, Flex } from "antd";
import { CaretLeft } from "phosphor-react";
import UiSearchInput from "@/components/ui/search-input";
import FilterDiscounts from "@/components/atoms/Filters/FilterDiscounts/FilterDiscounts";
import UiTab from "@/components/ui/ui-tab";
import { OrderViewContext } from "../../containers/create-order/create-order";
import CreateOrderProduct from "../create-order-product";
import { ISelectType } from "@/types/clients/IClients";

import styles from "./create-order-market.module.scss";
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
          <CreateOrderProduct key={product.id} product={product} categoryName={category.name} />
        ))}
      </div>
    )
  }));

  const handleGoBack = () => {
    setClient(undefined as any);
  };

  return (
    <div className={styles.marketContainer}>
      <Button
        type="text"
        size="large"
        className={styles.buttonGoBack}
        icon={<CaretLeft size={"1.3rem"} />}
        onClick={handleGoBack}
      >
        {client.name}
      </Button>
      <Flex gap={"0.5rem"}>
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
      <UiTab tabs={categoryTabs} />
    </div>
  );
};

export default CreateOrderMarket;

const mockData = [
  {
    id: 1,
    name: "Categoría 1",
    products: [
      {
        id: 1,
        name: "Galderma Cetaphil Crema Hidratante X 453 Gr 1",
        price: 1000,
        discount: 900,
        discount_percentage: 10,
        quantity: 0,
        image: "/images/cetaphilMock.png",
        category_id: 1
      },
      {
        id: 2,
        name: "Galderma Cetaphil Crema Hidratante X 453 Gr 2",
        price: 200000,
        discount: 100000,
        discount_percentage: 50,
        quantity: 0,
        image: "/images/cetaphilMock.png",
        category_id: 1
      },
      {
        id: 3,
        name: "Galderma Cetaphil Crema Hidratante X 453 Gr 3",
        price: 3000,
        discount: 0,
        discount_percentage: 0,
        quantity: 0,
        image: "/images/cetaphilMock.png",
        category_id: 1
      },
      {
        id: 4,
        name: "Galderma Cetaphil Crema Hidratante X 453 Gr 4",
        price: 4000,
        discount: 0,
        discount_percentage: 0,
        quantity: 0,
        image: "/images/cetaphilMock.png",
        category_id: 1
      },
      {
        id: 5,
        name: "Galderma Cetaphil Crema Hidratante X 453 Gr 5",
        price: 5000,
        discount: 1,
        discount_percentage: 100,
        quantity: 0,
        image: "/images/cetaphilMock.png",
        category_id: 1
      },
      {
        id: 6,
        name: "Galderma Cetaphil Crema Hidratante X 453 Gr 6",
        price: 6000,
        discount: 4800,
        discount_percentage: 20,
        quantity: 0,
        image: "/images/cetaphilMock.png",
        category_id: 1
      },
      {
        id: 17,
        name: "Galderma Cetaphil Crema Hidratante X 453 Gr 7",
        price: 7000,
        discount: 0,
        discount_percentage: 0,
        quantity: 0,
        image: "/images/cetaphilMock.png",
        category_id: 1
      },
      {
        id: 18,
        name: "Galderma Cetaphil Crema Hidratante X 453 Gr 8",
        price: 8000,
        discount: 0,
        discount_percentage: 0,
        quantity: 0,
        image: "/images/cetaphilMock.png",
        category_id: 1
      },
      {
        id: 19,
        name: "Galderma Cetaphil Crema Hidratante X 453 Gr 9",
        price: 9000,
        discount: 0,
        discount_percentage: 0,
        quantity: 0,
        image: "/images/cetaphilMock.png",
        category_id: 1
      }
    ]
  },
  {
    id: 2,
    name: "Categoría 2",
    products: []
  },
  {
    id: 3,
    name: "Categoría 3",
    products: []
  },
  {
    id: 4,
    name: "Categoría 4",
    products: [
      {
        id: 7,
        name: "Galderma Cetaphil Crema Hidratante X 453 Gr 7",
        price: 7000,
        discount: 0,
        discount_percentage: 0,
        quantity: 0,
        image: "/images/cetaphilMock.png",
        category_id: 4
      },
      {
        id: 8,
        name: "Galderma Cetaphil Crema Hidratante X 453 Gr 8",
        price: 8000,
        discount: 0,
        discount_percentage: 0,
        quantity: 0,
        image: "/images/cetaphilMock.png",
        category_id: 4
      }
    ]
  },
  {
    id: 5,
    name: "Categoría 5",
    products: [
      {
        id: 9,
        name: "Galderma Cetaphil Crema Hidratante X 453 Gr 9",
        price: 9000,
        discount: 0,
        discount_percentage: 0,
        quantity: 0,
        image: "/images/cetaphilMock.png",
        category_id: 5
      },
      {
        id: 10,
        name: "Galderma Cetaphil Crema Hidratante X 453 Gr 10",
        price: 10000,
        discount: 0,
        discount_percentage: 0,
        quantity: 0,
        image: "/images/cetaphilMock.png",
        category_id: 5
      }
    ]
  },
  {
    id: 6,
    name: "Categoría 6",
    products: [
      {
        id: 11,
        name: "Galderma Cetaphil Crema Hidratante X 453 Gr 11",
        price: 11000,
        discount: 0,
        discount_percentage: 0,
        quantity: 0,
        image: "/images/cetaphilMock.png",
        category_id: 6
      },
      {
        id: 12,
        name: "Galderma Cetaphil Crema Hidratante X 453 Gr 12",
        price: 12000,
        discount: 0,
        discount_percentage: 0,
        quantity: 0,
        image: "/images/cetaphilMock.png",
        category_id: 6
      },
      {
        id: 13,
        name: "Galderma Cetaphil Crema Hidratante X 453 Gr 13",
        price: 13000,
        discount: 0,
        discount_percentage: 0,
        quantity: 0,
        image: "/images/cetaphilMock.png",
        category_id: 6
      }
    ]
  },
  {
    id: 7,
    name: "Categoría 7",
    products: []
  },
  {
    id: 8,
    name: "Categoría 8",
    products: []
  },
  {
    id: 9,
    name: "Categoría 9",
    products: []
  },
  {
    id: 10,
    name: "Categoría 10",
    products: []
  },
  {
    id: 11,
    name: "Categoría 11",
    products: []
  }
];
