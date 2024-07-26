"use client";
import styles from "./Providers.module.scss";
import { Flex, Tabs } from "antd";
import UiSearchInput from "@/components/ui/search-input/search-input";
import FiltersProviders from "@/components/atoms/Filters/FiltersProviders/FiltersProviders";
import { Providers } from "@/types/providers/providers";
import ProvidersView from "./view/ProvidersView";
import { mockProviders } from "./mockdata";

const ListPanel = [
  { key: "dashboard", value: "Dashboard" },
  { key: "requested", value: "Solicitudes" },
  { key: "onTrack", value: "En curso" },
  { key: "closed", value: "Finalizados" }
];

export default function ProvidersPage() {

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
                <ProvidersView type={item.key as keyof Providers} providers={mockProviders} />
              </Flex>
            )
          };
        })}
      />
    </div>
  );
};