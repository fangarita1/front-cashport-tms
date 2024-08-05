import { ProviderDetail } from "@/types/acept_carrier/acept_carrier";

export const mockProviderDetail: ProviderDetail = {
  vehicle: "Camion 350",
  total: 17000000,
  travelDetail: "150 a 200 KM Contrato #2678526565",
  travelData: {
    totalDistance: "740",
    estimatedTime: "04",
    volume: "00",
    weight: "00",
    travelType: "Carga",
    startPoint: "Centro empresarial Dorado plaza",
    endPoint: "Base Barrancabermeja",
    initialTime: "05:15",
    initialDate: new Date(Date.now()),
    endTime: "17:40",
    endDate: new Date(Date.now() + 360000)
  },
  aditionalInfo: {
    documents: [
      {
        id: 2,
        title: "Nombre del documento",
        isMandatory: true
      },
      {
        id: 3,
        title: "Nombre del documento",
        isMandatory: true
      },
      {
        id: 4,
        title: "Nombre del documento",
        isMandatory: true
      },
      {
        id: 5,
        title: "Nombre del documento",
        isMandatory: true
      },
      {
        id: 6,
        title: "Nombre del documento",
        isMandatory: false
      },
      {
        id: 7,
        title: "Nombre del documento",
        isMandatory: false
      }
    ],
    contactData: {
      initialContacts:[
      {
        name: "Carlos Jara",
        number: "316 846 9035"
      },
      {
        name: "Jairo Mota",
        number: "316 846 9035"
      }
    ],
      finalContacts: [
        {
          name: "Mateo Diaz",
          number: "316 846 9035"
        }
      ]
    },
    finalClient: "Hocol",
    aditionalRequirements: [{
      type: "Conductor adicional",
      quantity: 1
    }],
    especialIntruction: {
      observation: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      documentInfo: {
        id: 1,
        title: "Nombre del documento"
      }
    }
  },
  materials: [
    {
      id: 1,
      quantity: 11,
      SKU: "0000000",
      name: "Material 1",
      volume: 10,
      height: 10,
      broad: 10,
      width: 10,
      weight: 10,
      dangerIcon: true,
      radioactiveIcon: true,
    },
    {
        id: 2,
        quantity: 11,
        SKU: "0000000",
        name: "Material 1",
        volume: 10,
        height: 10,
        broad: 10,
        width: 10,
        weight: 10,
        dangerIcon: true,
        radioactiveIcon: true,
      },
      {
        id: 3,
        quantity: 11,
        SKU: "0000000",
        name: "Material 1",
        volume: 10,
        height: 10,
        broad: 10,
        width: 10,
        weight: 10,
        dangerIcon: true,
        radioactiveIcon: true,
      },
      {
        id: 4,
        quantity: 11,
        SKU: "0000000",
        name: "Material 1",
        volume: 10,
        height: 10,
        broad: 10,
        width: 10,
        weight: 10,
        dangerIcon: true,
        radioactiveIcon: true,
      },
      {
        id: 5,
        quantity: 11,
        SKU: "0000000",
        name: "Material 1",
        volume: 10,
        height: 10,
        broad: 10,
        width: 10,
        weight: 10,
        dangerIcon: true,
        radioactiveIcon: true,
      },
      {
        id: 6,
        quantity: 11,
        SKU: "0000000",
        name: "Material 1",
        volume: 10,
        height: 10,
        broad: 10,
        width: 10,
        weight: 10,
        dangerIcon: true,
        radioactiveIcon: true,
      },
      {
        id: 7,
        quantity: 11,
        SKU: "0000000",
        name: "Material 1",
        volume: 10,
        height: 10,
        broad: 10,
        width: 10,
        weight: 10,
        dangerIcon: true,
        radioactiveIcon: true,
      },
      {
        id: 8,
        quantity: 11,
        SKU: "0000000",
        name: "Material 1",
        volume: 10,
        height: 10,
        broad: 10,
        width: 10,
        weight: 10,
        dangerIcon: true,
        radioactiveIcon: true,
      },
      {
        id: 9,
        quantity: 11,
        SKU: "0000000",
        name: "Material 1",
        volume: 10,
        height: 10,
        broad: 10,
        width: 10,
        weight: 10,
        dangerIcon: true,
        radioactiveIcon: true,
      },
      {
        id: 10,
        quantity: 11,
        SKU: "0000000",
        name: "Material 1",
        volume: 10,
        height: 10,
        broad: 10,
        width: 10,
        weight: 10,
        dangerIcon: true,
        radioactiveIcon: true,
      },
      {
        id: 11,
        quantity: 11,
        SKU: "0000000",
        name: "Material 1",
        volume: 10,
        height: 10,
        broad: 10,
        width: 10,
        weight: 10,
        dangerIcon: true,
        radioactiveIcon: true,
      },
      {
        id: 12,
        quantity: 11,
        SKU: "0000000",
        name: "Material 1",
        volume: 10,
        height: 10,
        broad: 10,
        width: 10,
        weight: 10,
        dangerIcon: true,
        radioactiveIcon: true,
      },
      {
        id: 13,
        quantity: 11,
        SKU: "0000000",
        name: "Material 1",
        volume: 10,
        height: 10,
        broad: 10,
        width: 10,
        weight: 10,
        dangerIcon: true,
        radioactiveIcon: true,
      },
      {
        id: 14,
        quantity: 11,
        SKU: "0000000",
        name: "Material 1",
        volume: 10,
        height: 10,
        broad: 10,
        width: 10,
        weight: 10,
        dangerIcon: true,
        radioactiveIcon: true,
      },
      {
        id: 15,
        quantity: 11,
        SKU: "0000000",
        name: "Material 1",
        volume: 10,
        height: 10,
        broad: 10,
        width: 10,
        weight: 10,
        dangerIcon: true,
        radioactiveIcon: true,
      }
  ]
}