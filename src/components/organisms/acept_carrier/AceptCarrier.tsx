"use client";
import { Flex, Tabs } from "antd";
import UiSearchInput from "@/components/ui/search-input/search-input";
import FiltersProviders from "@/components/atoms/Filters/FiltersProviders/FiltersProviders";
import AceptCarrierView from "./view/AceptCarrierView/AceptCarrierView";
import { Providers } from "@/types/acept_carrier/acept_carrier";
import { mockProviders } from "./mockdata";
import styles from "./AceptCarrier.module.scss";

const ListPanel = [
  { key: "requested", value: "Solicitudes" },
  { key: "onTrack", value: "En curso" },
  { key: "closed", value: "Finalizados" }
];

export default function AceptCarrierPage() {

  return (
    <div className={styles.wrapper}>
      <Tabs
        defaultActiveKey="1"
        items={ListPanel.map((item, i) => {
          return {
            label: `${item.value}`,
            key: String(i),
            children: (
              <Flex vertical>
                <Flex className={styles.filters}>
                  <UiSearchInput
                    placeholder="Buscar"
                    onChange={(event) => {
                      setTimeout(() => {
                        console.info(event.target.value);
                      }, 1000);
                    }}
                  />
                  <FiltersProviders />
                </Flex>
                <AceptCarrierView type={item.key as keyof Providers} providers={mockProviders} />
              </Flex>
            )
          };
        })}
      />
    </div>
  );
};