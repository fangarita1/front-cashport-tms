import { UseFormGetValues, UseFormWatch } from "react-hook-form";
import { ClientFormType, ISelectType } from "@/types/clients/IClients";
import { useEffect, useRef, useState } from "react";

// Hook for getting specific client values
export const useGetClientValues = (getValues: UseFormGetValues<ClientFormType>) => {
  const getClientValues = () => {
    const billingPeriod = getValues("infoClient.billing_period");
    const radicationType = getValues("infoClient.radication_type");
    const conditionPayment = getValues("infoClient.condition_payment");

    return {
      billingPeriod,
      radicationType,
      conditionPayment
    };
  };

  return getClientValues;
};

//Hook for checking if any location Field changed
export const useCheckLocationFields = (
  getValues: UseFormGetValues<ClientFormType>,
  watch: UseFormWatch<ClientFormType>,
  isDataLoaded: boolean
) => {
  const [hasLocationChanged, setHasLocationChanged] = useState(false);

  const initialCityRef = useRef<ISelectType | null>();
  const initialAddressRef = useRef<string | null>();

  const watchCity = watch("infoClient.city");
  const watchAddress = watch("infoClient.address");

  // Set initial values only once after data is loaded
  useEffect(() => {
    if (isDataLoaded) {
      initialCityRef.current = getValues("infoClient.city");
      initialAddressRef.current = getValues("infoClient.address");
    }
  }, [getValues, isDataLoaded]);

  useEffect(() => {
    if (!isDataLoaded) return;

    if (
      (watchCity && watchCity.value !== initialCityRef?.current?.value) ||
      watchAddress !== initialAddressRef.current
    ) {
      setHasLocationChanged(true);
    } else {
      setHasLocationChanged(false);
    }
  }, [watchAddress, watchCity, isDataLoaded]);

  return hasLocationChanged;
};
