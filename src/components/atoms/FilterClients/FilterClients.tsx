import { Cascader } from "antd";
import { Dispatch, SetStateAction } from "react";
import { IClient } from "@/types/clients/IClients";

interface Option {
  value: string;
  label: string;
  disableCheckbox?: boolean;
  isLeaf?: boolean;
  children?: Option[];
}

// FILTER:
// city: [] as any,
// holding: [] as any,
// risk: [] as any,
// payment_condition: [] as any,
// radication_type: [] as any,
// status: [] as any

interface FilterClientsProps {
  setFilterClients: Dispatch<
    SetStateAction<{
      city: any[];
      holding: any[];
      risk: any[];
      payment_condition: any[];
      radication_type: any[];
      status: any[];
    }>
  >;
  clientsData: IClient[];
}

export const FilterClients = ({ setFilterClients, clientsData }: FilterClientsProps) => {
  const onChange = (selectedValue: any[]) => {
    const city: number[] = [];
    const holding: number[] = [];
    selectedValue.forEach((arraySelectedValues: any[]) => {
      if (arraySelectedValues.includes("cities")) {
        city.push(arraySelectedValues[arraySelectedValues.length - 1]);
      }

      if (arraySelectedValues.includes("holdings")) {
        holding.push(arraySelectedValues[arraySelectedValues.length - 1]);
      }
    });
    setFilterClients((prevState) => ({ ...prevState, city, holding }));
  };

  const createCitiesChildren = (clients: IClient[]) => {
    const cities = new Set();

    clients.forEach((client) => {
      client.locations.forEach((location) => {
        if (location.id && location.city) {
          const city = { value: location.id, label: location.city };

          cities.add(JSON.stringify(city));
        }
      });
    });
    const citiesArray = Array.from(cities).map((city: any) => JSON.parse(city));

    return citiesArray;
  };

  const createHoldings = (clients: IClient[]) => {
    const holdings = new Set();

    clients.forEach((client) => {
      if (client.holding_id && client.holding_name) {
        const holding = { value: client.holding_id, label: client.holding_name };
        holdings.add(JSON.stringify(holding));
      }
    });
    const holdingsArray = Array.from(holdings).map((city: any) => JSON.parse(city));

    return holdingsArray;
  };

  const captureRisk = (client: IClient[]) => {
    console.log("capturing risk", client);
    return [{ value: "capturing", label: "AAAAA" }];
  };

  const cities = createCitiesChildren(clientsData);
  const holdings = createHoldings(clientsData);
  const risks = captureRisk(clientsData);

  const options: Option[] = [
    {
      value: "cities",
      label: "Ciudad",
      isLeaf: false,
      disableCheckbox: true,
      children: cities
    },
    {
      value: "holdings",
      label: "Holding",
      isLeaf: false,
      disableCheckbox: true,
      children: holdings
    },
    {
      value: "status",
      label: "Estado",
      isLeaf: false,
      disableCheckbox: true,
      children: risks
    }
  ];

  return (
    <Cascader
      style={{ width: "15rem" }}
      multiple
      size="large"
      removeIcon
      maxTagCount="responsive"
      placeholder="Filtrar"
      placement="bottomLeft"
      options={options}
      onChange={onChange}
    />
  );
};
