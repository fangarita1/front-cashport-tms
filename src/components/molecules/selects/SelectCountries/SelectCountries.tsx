import { Select } from "antd";
import useSWR from "swr";

import { ICountries } from "@/types/countries/ICountries";
import { fetcher } from "@/utils/api/api";

import "./selectcountries.scss";

interface Props {
  errors: any;
  field: any;
}

export const SelectCountries = ({ errors, field }: Props) => {
  const { data, isLoading } = useSWR<ICountries>("/country", fetcher, {});
  const options = data?.data.map((option) => {
    return {
      value: option.id,
      label: option.country_name
    };
  });

  return (
    <Select
      placeholder="select one country"
      className={errors?.general?.countries ? "selectInputCountryError" : "selectInputCountry"}
      loading={isLoading}
      variant="borderless"
      optionLabelProp="label"
      {...field}
      options={options}
      labelInValue
    />
  );
};
