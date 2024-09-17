export const FIREBASE_API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
export const FIREBASE_AUTH_DOMAIN = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
export const FIREBASE_PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
export const FIREBASE_STORAGE_BUCKET = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
export const FIREBASE_MESSAGING_SENDER_ID = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID;
export const FIREBASE_APP_ID = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;
export const FIREBASE_MEASUREMENT_ID = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID;
export const STORAGE_TOKEN = "token";

export const COOKIE_NAME = process.env.NEXT_PUBLIC_COOKIE_SESSION_NAME;

// ---
export const CREATED = 201;
export const SUCCESS = 200;

export const STATUS = {
  TO: {
    DRAFT: "9f5ba87c-8736-4367-8077-3b914d2ee711",
    SIN_PROCESAR: "00ce0b06-71b8-4981-861f-b4fa100dbd25",
    ESPERANDO_PROVEEDOR: "56859d8f-2345-4df2-b811-2371905d80a0"
  },
  CR: {
    POR_CONFIRMAR: "e2210921-8650-44a2-8c3a-b96d9cd492b4",
    EN_REVISÓN: "ae986b0b-071b-479d-a7ee-79160dae7fc9",
    ASIGNADAS: "6f793cd8-6203-4287-8941-b3ee90a55194",
    RECHAZADO: "64869ad8-70c1-4a2c-81c3-4d7f4879cb3a"
  },
  BNG: {
    POR_ACEPTAR: "a9a0e7cd-96e3-4738-806d-225641117a62",
    ACEPTADAS: "40f8e08b-1e7b-4412-ba57-e62e7352b729",
    PREAUTORIZADO: "089a3253-94dc-43ed-bff9-3c3c332b4be1",
    FACTURADO: "b46233c0-0587-4a57-a452-adf5c5a70c11",
    POR_LEGALIZAR: "ce946d35-381e-4bf3-a54a-4d38fb1b5e92",
    LEGALIZADO: "49e6c46e-5a57-4a38-8b13-955bbffb7279"
  },
  TI: {
    PENDIENTE: "dadec8ad-3c5d-40f7-b5b2-42b0ad7cd4d7",
    ACEPTADA: "ab5034d3-dda6-4557-bf8c-e75ce6494097",
    RECHAZADA: "da258586-c04b-4603-bea5-f9bce49687e0"
  }
};

export const TMSMODULES = {
  "TMS-Proveedores": "/logistics/providers/all",
  "TMS-Dashboard": "/map",
  "TMS-Viajes": "/logistics/transfer-orders",
  "TMS-AceptacionProveedor": "/logistics/acept_carrier",
  "TMS-Facturacion": "/facturacion",
  "TMS-Configuracion": "/logistics/configuration"
};

export const TMS_COMPONENTS = {
  ["TMS-Viajes"]: {
    REQUESTS: "Solicitudes",
    IN_PROCESS: "En curso",
    COMPLETED: "Facturacion",
    CREATE_TR: "Crear-TR"
  },
  ["TMS-Proveedores"]: {},
  ["TMS-Dashboard"]: {},
  ["TMS-AceptacionProveedor"]: {},
  ["TMS-Facturacion"]: {},
  ["TMS-Configuracion"]: {
    CONFIGURATION: "Configuración",
    MATERIALS: "Materiales",
    USERS: "Usuarios",
    LOCATIONS: "Ubicacion",
  }
};
