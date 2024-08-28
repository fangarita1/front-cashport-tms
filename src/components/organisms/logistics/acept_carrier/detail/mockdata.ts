import { ProviderDetail } from "@/types/acept_carrier/acept_carrier";
import { CertificateType } from "@/types/logistics/certificate/certificate";

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
      initialContacts: [
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
    aditionalRequirements: [
      {
        type: "Conductor adicional",
        quantity: 1
      }
    ],
    especialIntruction: {
      observation:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
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
      radioactiveIcon: true
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
      radioactiveIcon: true
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
      radioactiveIcon: true
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
      radioactiveIcon: true
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
      radioactiveIcon: true
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
      radioactiveIcon: true
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
      radioactiveIcon: true
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
      radioactiveIcon: true
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
      radioactiveIcon: true
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
      radioactiveIcon: true
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
      radioactiveIcon: true
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
      radioactiveIcon: true
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
      radioactiveIcon: true
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
      radioactiveIcon: true
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
      radioactiveIcon: true
    }
  ]
};
export const mockCarrierDocuments: CertificateType[] = [
  {
    key: 1,
    id: 3,
    entity_type: 1,
    description: "Tecnomecánica",
    optional: true,
    id_location: null,
    id_material_type: null,
    expiry: true,
    template: "",
    active: true,
    created_at: "2024-07-10T00:00:00.000Z",
    created_by: "0000-00-00",
    modified_at: null,
    modified_by: ""
  },
  {
    id: 4,
    entity_type: 1,
    description: "SOAT",
    optional: true,
    id_location: null,
    id_material_type: null,
    expiry: true,
    template: "",
    active: true,
    created_at: "2024-07-10T00:00:00.000Z",
    created_by: "0000-00-00",
    modified_at: null
  },
  {
    id: 7,
    entity_type: 2,
    description: "Licencia de conducción",
    optional: true,
    id_location: null,
    id_material_type: null,
    expiry: true,
    template: "",
    active: true,
    created_at: "2024-07-10T00:00:00.000Z",
    created_by: "0000-00-00",
    modified_at: null,
    modified_by: ""
  }
];

export const documentsTypes = [
  {
    id: 3,
    key: 1,
    entity_type: 1,
    description: "Tecnomecánica",
    optional: false,
    id_location: null,
    id_material_type: null,
    expiry: true,
    template: "",
    active: true,
    created_at: "2024-07-10T00:00:00.000Z",
    created_by: "0000-00-00",
    modified_at: null,
    modified_by: ""
  },
  {
    id: 4,
    key: 2,
    entity_type: 1,
    description: "SOAT",
    optional: false,
    id_location: null,
    id_material_type: null,
    expiry: true,
    template: "",
    active: true,
    created_at: "2024-07-10T00:00:00.000Z",
    created_by: "0000-00-00",
    modified_at: null,
    modified_by: ""
  },
  {
    id: 5,
    key: 3,
    entity_type: 1,
    description: "Seguro todo riesgo",
    optional: true,
    id_location: null,
    id_material_type: null,
    expiry: true,
    template: "",
    active: true,
    created_at: "2024-07-10T00:00:00.000Z",
    created_by: "0000-00-00",
    modified_at: null,
    modified_by: ""
  },
  {
    id: 6,
    key: 4,
    entity_type: 2,
    description: "Cédula",
    optional: true,
    id_location: null,
    id_material_type: null,
    expiry: false,
    template: "",
    active: true,
    created_at: "2024-07-10T00:00:00.000Z",
    created_by: "0000-00-00",
    modified_at: null,
    modified_by: ""
  },
  {
    id: 7,
    key: 5,
    entity_type: 2,
    description: "Licencia de conducción",
    optional: false,
    id_location: null,
    id_material_type: null,
    expiry: true,
    template: "",
    active: true,
    created_at: "2024-07-10T00:00:00.000Z",
    created_by: "0000-00-00",
    modified_at: null,
    modified_by: ""
  },
  {
    id: 8,
    key: 6,
    entity_type: 2,
    description: "Curso Manejo defensivo",
    optional: true,
    id_location: null,
    id_material_type: null,
    expiry: true,
    template: "",
    active: true,
    created_at: "2024-07-10T00:00:00.000Z",
    created_by: "0000-00-00",
    modified_at: null,
    modified_by: ""
  },
  {
    id: 9,
    key: 7,
    entity_type: 2,
    description: "Curso Manejo de sustancias peligrosas",
    optional: true,
    id_location: null,
    id_material_type: null,
    expiry: true,
    template: "",
    active: true,
    created_at: "2024-07-10T00:00:00.000Z",
    created_by: "0000-00-00",
    modified_at: null,
    modified_by: ""
  },
  {
    id: 10,
    key: 8,
    entity_type: 3,
    description: "Logo carrier",
    optional: true,
    id_location: null,
    id_material_type: null,
    expiry: false,
    template: null,
    active: true,
    created_at: "2024-08-08T00:00:00.000Z",
    created_by: "0000-00-00",
    modified_at: null,
    modified_by: null
  },
  {
    id: 11,
    key: 9,
    entity_type: 4,
    description: "Documentos MT",
    optional: true,
    id_location: null,
    id_material_type: null,
    expiry: 1,
    template: null,
    active: true,
    created_at: "2024-07-10T00:00:00.000Z",
    created_by: "0000-00-00",
    modified_at: null,
    modified_by: null
  }
];
