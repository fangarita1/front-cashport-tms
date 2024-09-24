export const mockedTrips: any[] = [
  {
    trip: {
      id_trip: 168,
      vehicle_type: 18,
      vehicle_type_desc: "C-600",
      carriers_pricing: [
        {
          id_carrier_pricing: 4647,
          fee_description: "Km 121 - 150 ()",
          valid_from: "0000-00-00",
          valid_to: "0000-00-00",
          description: "COLTANQUES SAS",
          disponibility: 3,
          price: 1226221,
          id_vehicle_type: 18,
          id_carrier: 19,
          nit: "900083222-9"
        },
        {
          id_carrier_pricing: 4651,
          fee_description: "Km 151 - 200 ()",
          valid_from: "2024-09-01",
          valid_to: "2024-12-31",
          description: "TRANSPORTES XYZ",
          disponibility: 2,
          price: 1500000,
          id_vehicle_type: 18,
          id_carrier: 22,
          nit: "800123456-7"
        }
      ]
    },
    journey: {
      id_journey: 158,
      start_date: "2024-09-09T06:00:00.000Z",
      end_date: "2024-09-09T09:34:42.000Z",
      start_location_desc: "BASE COTA",
      end_location_desc: "VILLAVICENCIO",
      id_type_service: 1,
      community_name: "",
      is_community: true
    }
  },
  {
    trip: {
      id_trip: 169,
      vehicle_type: 17,
      vehicle_type_desc: "C-350",
      carriers_pricing: [
        {
          id_carrier_pricing: 4633,
          fee_description: "Km 121 - 150 ()",
          valid_from: "0000-00-00",
          valid_to: "0000-00-00",
          description: "COLTANQUES SAS",
          disponibility: 1,
          price: 980750,
          id_vehicle_type: 17,
          id_carrier: 19,
          nit: "900083222-9"
        },
        {
          id_carrier_pricing: 4655,
          fee_description: "Km 151 - 200 ()",
          valid_from: "2024-07-01",
          valid_to: "2024-10-31",
          description: "TRANSPORTES ABC",
          disponibility: 5,
          price: 1200000,
          id_vehicle_type: 17,
          id_carrier: 23,
          nit: "900098765-4"
        }
      ]
    },
    journey: {
      id_journey: 158,
      start_date: "2024-09-09T06:00:00.000Z",
      end_date: "2024-09-09T09:34:42.000Z",
      start_location_desc: "BASE COTA",
      end_location_desc: "VILLAVICENCIO",
      id_type_service: 1,
      community_name: "",
      is_community: true
    }
  },
  {
    trip: {
      id_trip: 170,
      vehicle_type: 20,
      vehicle_type_desc: "C-800",
      carriers_pricing: [
        {
          id_carrier_pricing: 4660,
          fee_description: "Km 101 - 120 ()",
          valid_from: "2024-08-01",
          valid_to: "2024-12-01",
          description: "TRANSPORTES NORTE",
          disponibility: 2,
          price: 1800000,
          id_vehicle_type: 20,
          id_carrier: 24,
          nit: "900098321-1"
        },
        {
          id_carrier_pricing: 4662,
          fee_description: "Km 151 - 200 ()",
          valid_from: "2024-09-01",
          valid_to: "2025-03-01",
          description: "TRANSPORTE SUR",
          disponibility: 4,
          price: 1950000,
          id_vehicle_type: 20,
          id_carrier: 25,
          nit: "800123789-0"
        }
      ]
    },
    journey: {
      id_journey: 160,
      start_date: "2024-09-10T08:00:00.000Z",
      end_date: "2024-09-10T11:45:00.000Z",
      start_location_desc: "BOGOTÁ",
      end_location_desc: "MEDELLÍN",
      id_type_service: 2,
      community_name: "",
      is_community: false
    }
  }
];
export const defaultCarrierPricing = {
  id_carrier_pricing: 0,
  fee_description: "",
  valid_from: "0000-00-00",
  valid_to: "0000-00-00",
  description: "",
  disponibility: 0,
  price: 0,
  id_vehicle_type: 0,
  id_carrier: 0,
  nit: "",
  checked: false
};
export const currentTripDefault = {
  id_trip: 0,
  vehicle_type: 0,
  vehicle_type_desc: "",
  carriers_pricing: [defaultCarrierPricing]
};
