import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { ClientFormType, ISelectType } from "@/types/clients/IClients";

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

// Another hook that might set default values or handle form submission logic
export const useHandleClientSubmission = (setValue: UseFormSetValue<ClientFormType>) => {
  const setDefaultValues = () => {
    setValue("infoClient.billing_period", "Monthly");
    setValue("infoClient.radication_type", { value: 1, label: "Email" } as ISelectType);
    setValue("infoClient.condition_payment", { value: 2, label: "30 Days" } as ISelectType);
  };

  return {
    setDefaultValues
  };
};
