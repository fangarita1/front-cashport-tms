import { Dispatch, SetStateAction } from "react";

import { IChanel, ISelectedBussinessRules } from "@/types/bre/IBRE";
import { SelectChips } from "../SelectChips/SelectChips";

import "./selectchanel.scss";
interface Props {
  chanels: IChanel[];
  disabled: boolean;
  setSelectedBusinessRules: Dispatch<SetStateAction<ISelectedBussinessRules>>;
  selectedBusinessRules: ISelectedBussinessRules;
}
export const SelectChanel = ({
  chanels,
  disabled,
  selectedBusinessRules,
  setSelectedBusinessRules
}: Props) => {
  console.log("chanels: ", chanels);
  return (
    <div className="chanelSelect">
      {chanels.map(({ CHANNEL_ID, CHANNEL_NAME, CHANNEL_LINES }) => {
        return (
          <SelectChips
            key={CHANNEL_ID}
            lines={CHANNEL_LINES}
            channelId={CHANNEL_ID}
            selectedBusinessRules={selectedBusinessRules}
            setSelectedBusinessRules={setSelectedBusinessRules}
            channelName={CHANNEL_NAME}
            disabled={disabled}
          />
        );
      })}
    </div>
  );
};
