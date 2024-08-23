import React, { useState, useEffect } from "react";
import { Cascader } from "antd";
import { useAppStore } from "@/lib/store/store";
import { getAllLinesByProject } from "@/services/line/line";
import { getAllZones } from "@/services/zone/zones";
import { getBusinessRulesByProjectId } from "@/services/businessRules/BR";
import { ILine } from "@/types/lines/line";
import { IZone } from "@/types/zones/IZones";
import { IChanel } from "@/types/bre/IBRE";

import "../filterCascader.scss";

interface FilterOption {
  value: string | number;
  label: string;
  isLeaf?: boolean;
  children?: FilterOption[];
}

export interface SelectedFiltersWallet {
  lines: number[];
  zones: number[];
  channels: number[];
  paymentAgreement: number | null;
  radicationType: number | null;
}

interface Props {
  setSelectedFilters: React.Dispatch<React.SetStateAction<SelectedFiltersWallet>>;
}

export const WalletTabFilter: React.FC<Props> = ({ setSelectedFilters }) => {
  const { ID } = useAppStore((state) => state.selectedProject);
  const [cascaderOptions, setCascaderOptions] = useState<FilterOption[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<(string | number)[][]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [linesData, zonesData, businessRulesData] = await Promise.all([
          getAllLinesByProject(ID.toString()),
          getAllZones({ idProject: ID.toString() }),
          getBusinessRulesByProjectId(ID)
        ]);

        const lines = linesData.map((line: ILine) => ({
          value: line.id,
          label: line.description_line
        }));

        const zones = zonesData.data.data.map((zone: IZone) => ({
          value: zone.ID,
          label: zone.ZONE_DESCRIPTION
        }));

        const channels = businessRulesData.data.data.map((channel: IChanel) => ({
          value: channel.CHANNEL_ID,
          label: channel.CHANNEL_NAME,
          children: channel.CHANNEL_LINES.map((line) => ({
            value: line.id,
            label: line.description,
            children: line.sublines.map((subline) => ({
              value: subline.id,
              label: subline.description
            }))
          }))
        }));

        setCascaderOptions([
          {
            value: "lines",
            label: "Líneas",
            children: lines
          },
          {
            value: "zones",
            label: "Zonas",
            children: zones
          },
          {
            value: "channels",
            label: "Canales",
            children: channels
          },
          {
            value: "paymentAgreement",
            label: "Acuerdo de pago",
            children: [
              { value: 1, label: "Sí" },
              { value: 0, label: "No" }
            ]
          },
          {
            value: "radicationType",
            label: "Tipo de radicación",
            isLeaf: false,
            children: [
              { value: 1, label: "Sí" },
              { value: 0, label: "No" }
            ]
          }
        ]);
      } catch (error) {
        console.error("Error fetching filter data:", error);
      }
    };

    fetchData();
  }, [ID]);

  const handleCascaderChange = (value: (string | number)[][]) => {
    setSelectedOptions(value);
    updateFilters(value);
  };

  const updateFilters = (value: (string | number)[][]) => {
    const newFilters: SelectedFiltersWallet = {
      lines: [],
      zones: [],
      channels: [],
      paymentAgreement: null,
      radicationType: null
    };

    value.forEach((path) => {
      const category = path[0] as string;
      const id = Number(path[path.length - 1]);

      switch (category) {
        case "lines":
          newFilters.lines.push(id);
          break;
        case "zones":
          newFilters.zones.push(id);
          break;
        case "channels":
          newFilters.channels.push(id);
          break;
        case "paymentAgreement":
          newFilters.paymentAgreement = id;
          break;
        case "radicationType":
          newFilters.radicationType = id;
          break;
      }
    });

    setSelectedFilters(newFilters);
  };

  return (
    <Cascader
      className="filterCascader"
      style={{ width: "15rem" }}
      options={cascaderOptions}
      onChange={handleCascaderChange}
      multiple
      maxTagCount="responsive"
      showCheckedStrategy={Cascader.SHOW_CHILD}
      placeholder="Seleccionar filtros"
    />
  );
};
