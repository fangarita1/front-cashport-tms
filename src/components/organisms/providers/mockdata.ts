import { Providers } from "@/types/providers/providers";

export const mockProviders: Providers = {
  requested: [
    {
      status_id: 1,
      status: "Por confirmar",
      color: "#969696",
      providersDetail: [
        {
          id: 1,
          departure: "Centro empresarial Dorado Plaza",
          arrival: "Centro empresarial Dorado Plaza",
          startDate: new Date(Date.now()),
          endDate: new Date(Date.now() + 360000),
          startTime: "07:00 h",
          endTime: "14:00 h",
          travelType: "Carga",
          vehicle: "Cama baja",
          timeTraveled: "30 min",
          value: 2000000,
          eyeIcon: true,
          radioactiveIcon: true,
          dangerIcon: true,
        },
        {
          id: 2,
          departure: "Centro empresarial Dorado Plaza",
          arrival: "Centro empresarial Dorado Plaza",
          startDate: new Date(Date.now()),
          endDate: new Date(Date.now() + 360000),
          startTime: "07:00 h",
          endTime: "14:00 h",
          travelType: "Carga",
          vehicle: "Cama baja",
          timeTraveled: "30 min",
          value: 2000000,
          eyeIcon: true,
          radioactiveIcon: true,
          dangerIcon: true,
        },
        {
          id: 3,
          departure: "Centro empresarial Dorado Plaza",
          arrival: "Centro empresarial Dorado Plaza",
          startDate: new Date(Date.now()),
          endDate: new Date(Date.now() + 360000),
          startTime: "07:00 h",
          endTime: "14:00 h",
          travelType: "Carga",
          vehicle: "Cama baja",
          timeTraveled: "30 min",
          value: 2000000,
          eyeIcon: true,
          dangerIcon: true,
        }
      ]
    },
    {
      status_id: 2,
      status: "En revisión",
      color: "#0085FF",
      providersDetail: [
        {
          id: 4,
          departure: "Centro empresarial Dorado Plaza",
          arrival: "Centro empresarial Dorado Plaza",
          startDate: new Date(Date.now()),
          endDate: new Date(Date.now() + 360000),
          startTime: "07:00 h",
          endTime: "14:00 h",
          travelType: "Carga",
          vehicle: "Cama baja",
          timeTraveled: "30 min",
          value: 2000000,
          eyeIcon: true,
        },
        {
          id: 4,
          departure: "Centro empresarial Dorado Plaza",
          arrival: "Centro empresarial Dorado Plaza",
          startDate: new Date(Date.now()),
          endDate: new Date(Date.now() + 360000),
          startTime: "07:00 h",
          endTime: "14:00 h",
          travelType: "Carga",
          vehicle: "Cama baja",
          timeTraveled: "30 min",
          value: 2000000,
          eyeIcon: true,
        },
        {
          id: 5,
          departure: "Centro empresarial Dorado Plaza",
          arrival: "Centro empresarial Dorado Plaza",
          startDate: new Date(Date.now()),
          endDate: new Date(Date.now() + 360000),
          startTime: "07:00 h",
          endTime: "14:00 h",
          travelType: "Carga",
          vehicle: "Cama baja",
          timeTraveled: "30 min",
          value: 2000000,
          eyeIcon: true,
          radioactiveIcon: true,
        }
      ]
    },
    {
      status_id: 3,
      status: "Asignados",
      color: "#CBE71E",
      providersDetail: [
        {
          id: 6,
          departure: "Centro empresarial Dorado Plaza",
          arrival: "Centro empresarial Dorado Plaza",
          startDate: new Date(Date.now()),
          endDate: new Date(Date.now() + 360000),
          startTime: "07:00 h",
          endTime: "14:00 h",
          travelType: "Carga",
          vehicle: "Cama baja",
          timeTraveled: "30 min",
          value: 2000000,
          eyeIcon: true,
          dangerIcon: true,
        },
        {
          id: 7,
          departure: "Centro empresarial Dorado Plaza",
          arrival: "Centro empresarial Dorado Plaza",
          startDate: new Date(Date.now()),
          endDate: new Date(Date.now() + 360000),
          startTime: "07:00 h",
          endTime: "14:00 h",
          travelType: "Carga",
          vehicle: "Cama baja",
          timeTraveled: "30 min",
          value: 2000000,
          dangerIcon: true,
        },
        {
          id: 8,
          departure: "Centro empresarial Dorado Plaza",
          arrival: "Centro empresarial Dorado Plaza",
          startDate: new Date(Date.now()),
          endDate: new Date(Date.now() + 360000),
          startTime: "07:00 h",
          endTime: "14:00 h",
          travelType: "Carga",
          vehicle: "Cama baja",
          timeTraveled: "30 min",
          value: 2000000,
          eyeIcon: true,
          dangerIcon: true,
        }
      ]
    }
  ],
  onTrack: [
    {
      status_id: 1,
      status: "Sin iniciar",
      color: "#0085FF",
      providersDetail: [
        {
          id: 9,
          departure: "Centro empresarial Dorado Plaza",
          arrival: "Centro empresarial Dorado Plaza",
          startDate: new Date(Date.now()),
          endDate: new Date(Date.now() + 360000),
          startTime: "07:00 h",
          endTime: "14:00 h",
          travelType: "Carga",
          vehicle: "Cama baja",
          timeTraveled: "30 min",
          value: 2000000,
          eyeIcon: true,
          radioactiveIcon: true,
          dangerIcon: true,
        },
        {
          id: 10,
          departure: "Centro empresarial Dorado Plaza",
          arrival: "Centro empresarial Dorado Plaza",
          startDate: new Date(Date.now()),
          endDate: new Date(Date.now() + 360000),
          startTime: "07:00 h",
          endTime: "14:00 h",
          travelType: "Carga",
          vehicle: "Cama baja",
          timeTraveled: "30 min",
          value: 2000000
        },
        {
          id: 11,
          departure: "Centro empresarial Dorado Plaza",
          arrival: "Centro empresarial Dorado Plaza",
          startDate: new Date(Date.now()),
          endDate: new Date(Date.now() + 360000),
          startTime: "07:00 h",
          endTime: "14:00 h",
          travelType: "Carga",
          vehicle: "Cama baja",
          timeTraveled: "30 min",
          value: 2000000
        }
      ]
    },
    {
      status_id: 2,
      status: "Cargando",
      color: "#969696",
      providersDetail: [
        {
          id: 12,
          departure: "Centro empresarial Dorado Plaza",
          arrival: "Centro empresarial Dorado Plaza",
          startDate: new Date(Date.now()),
          endDate: new Date(Date.now() + 360000),
          startTime: "07:00 h",
          endTime: "14:00 h",
          travelType: "Carga",
          vehicle: "Cama baja",
          timeTraveled: "30 min",
          value: 2000000
        },
        {
          id: 13,
          departure: "Centro empresarial Dorado Plaza",
          arrival: "Centro empresarial Dorado Plaza",
          startDate: new Date(Date.now()),
          endDate: new Date(Date.now() + 360000),
          startTime: "07:00 h",
          endTime: "14:00 h",
          travelType: "Carga",
          vehicle: "Cama baja",
          timeTraveled: "30 min",
          value: 2000000
        },
        {
          id: 14,
          departure: "Centro empresarial Dorado Plaza",
          arrival: "Centro empresarial Dorado Plaza",
          startDate: new Date(Date.now()),
          endDate: new Date(Date.now() + 360000),
          startTime: "07:00 h",
          endTime: "14:00 h",
          travelType: "Carga",
          vehicle: "Cama baja",
          timeTraveled: "30 min",
          value: 2000000
        }
      ]
    },
    {
      status_id: 3,
      status: "En curso",
      color: "#CBE71E",
      providersDetail: [
        {
          id: 15,
          departure: "Centro empresarial Dorado Plaza",
          arrival: "Centro empresarial Dorado Plaza",
          startDate: new Date(Date.now()),
          endDate: new Date(Date.now() + 360000),
          startTime: "07:00 h",
          endTime: "14:00 h",
          travelType: "Carga",
          vehicle: "Cama baja",
          timeTraveled: "30 min",
          value: 2000000
        },
        {
          id: 16,
          departure: "Centro empresarial Dorado Plaza",
          arrival: "Centro empresarial Dorado Plaza",
          startDate: new Date(Date.now()),
          endDate: new Date(Date.now() + 360000),
          startTime: "07:00 h",
          endTime: "14:00 h",
          travelType: "Carga",
          vehicle: "Cama baja",
          timeTraveled: "30 min",
          value: 2000000
        },
        {
          id: 17,
          departure: "Centro empresarial Dorado Plaza",
          arrival: "Centro empresarial Dorado Plaza",
          startDate: new Date(Date.now()),
          endDate: new Date(Date.now() + 360000),
          startTime: "07:00 h",
          endTime: "14:00 h",
          travelType: "Carga",
          vehicle: "Cama baja",
          timeTraveled: "30 min",
          value: 2000000
        }
      ]
    },
    {
      status_id: 4,
      status: "Descargando",
      color: "#ED171F",
      providersDetail: [
        {
          id: 18,
          departure: "Centro empresarial Dorado Plaza",
          arrival: "Centro empresarial Dorado Plaza",
          startDate: new Date(Date.now()),
          endDate: new Date(Date.now() + 360000),
          startTime: "07:00 h",
          endTime: "14:00 h",
          travelType: "Carga",
          vehicle: "Cama baja",
          timeTraveled: "30 min",
          value: 2000000
        },
        {
          id: 19,
          departure: "Centro empresarial Dorado Plaza",
          arrival: "Centro empresarial Dorado Plaza",
          startDate: new Date(Date.now()),
          endDate: new Date(Date.now() + 360000),
          startTime: "07:00 h",
          endTime: "14:00 h",
          travelType: "Carga",
          vehicle: "Cama baja",
          timeTraveled: "30 min",
          value: 2000000
        },
        {
          id: 20,
          departure: "Centro empresarial Dorado Plaza",
          arrival: "Centro empresarial Dorado Plaza",
          startDate: new Date(Date.now()),
          endDate: new Date(Date.now() + 360000),
          startTime: "07:00 h",
          endTime: "14:00 h",
          travelType: "Carga",
          vehicle: "Cama baja",
          timeTraveled: "30 min",
          value: 2000000
        }
      ]
    },
    {
      status_id: 5,
      status: "Detenido",
      color: "#FF6B00",
      providersDetail: [
        {
          id: 21,
          departure: "Centro empresarial Dorado Plaza",
          arrival: "Centro empresarial Dorado Plaza",
          startDate: new Date(Date.now()),
          endDate: new Date(Date.now() + 360000),
          startTime: "07:00 h",
          endTime: "14:00 h",
          travelType: "Carga",
          vehicle: "Cama baja",
          timeTraveled: "30 min",
          value: 2000000
        },
        {
          id: 22,
          departure: "Centro empresarial Dorado Plaza",
          arrival: "Centro empresarial Dorado Plaza",
          startDate: new Date(Date.now()),
          endDate: new Date(Date.now() + 360000),
          startTime: "07:00 h",
          endTime: "14:00 h",
          travelType: "Carga",
          vehicle: "Cama baja",
          timeTraveled: "30 min",
          value: 2000000
        },
        {
          id: 23,
          departure: "Centro empresarial Dorado Plaza",
          arrival: "Centro empresarial Dorado Plaza",
          startDate: new Date(Date.now()),
          endDate: new Date(Date.now() + 360000),
          startTime: "07:00 h",
          endTime: "14:00 h",
          travelType: "Carga",
          vehicle: "Cama baja",
          timeTraveled: "30 min",
          value: 2000000
        }
      ]
    },
    {
      status_id: 6,
      status: "Stand by",
      color: "#3D3D3D",
      providersDetail: [
        {
          id: 24,
          departure: "Centro empresarial Dorado Plaza",
          arrival: "Centro empresarial Dorado Plaza",
          startDate: new Date(Date.now()),
          endDate: new Date(Date.now() + 360000),
          startTime: "07:00 h",
          endTime: "14:00 h",
          travelType: "Carga",
          vehicle: "Cama baja",
          timeTraveled: "30 min",
          value: 2000000
        },
        {
          id: 25,
          departure: "Centro empresarial Dorado Plaza",
          arrival: "Centro empresarial Dorado Plaza",
          startDate: new Date(Date.now()),
          endDate: new Date(Date.now() + 360000),
          startTime: "07:00 h",
          endTime: "14:00 h",
          travelType: "Carga",
          vehicle: "Cama baja",
          timeTraveled: "30 min",
          value: 2000000
        },
        {
          id: 26,
          departure: "Centro empresarial Dorado Plaza",
          arrival: "Centro empresarial Dorado Plaza",
          startDate: new Date(Date.now()),
          endDate: new Date(Date.now() + 360000),
          startTime: "07:00 h",
          endTime: "14:00 h",
          travelType: "Carga",
          vehicle: "Cama baja",
          timeTraveled: "30 min",
          value: 2000000
        }
      ]
    }
  ],
  closed: [
    {
      status_id: 1,
      status: "Por aceptar",
      color: "#969696",
      providersDetail: [
        {
          id: 27,
          departure: "Centro empresarial Dorado Plaza",
          arrival: "Centro empresarial Dorado Plaza",
          startDate: new Date(Date.now()),
          endDate: new Date(Date.now() + 360000),
          startTime: "07:00 h",
          endTime: "14:00 h",
          travelType: "Carga",
          vehicle: "Cama baja",
          timeTraveled: "30 min",
          value: 2000000
        },
        {
          id: 28,
          departure: "Centro empresarial Dorado Plaza",
          arrival: "Centro empresarial Dorado Plaza",
          startDate: new Date(Date.now()),
          endDate: new Date(Date.now() + 360000),
          startTime: "07:00 h",
          endTime: "14:00 h",
          travelType: "Carga",
          vehicle: "Cama baja",
          timeTraveled: "30 min",
          value: 2000000
        },
        {
          id: 29,
          departure: "Centro empresarial Dorado Plaza",
          arrival: "Centro empresarial Dorado Plaza",
          startDate: new Date(Date.now()),
          endDate: new Date(Date.now() + 360000),
          startTime: "07:00 h",
          endTime: "14:00 h",
          travelType: "Carga",
          vehicle: "Cama baja",
          timeTraveled: "30 min",
          value: 2000000
        },
        {
          id: 30,
          departure: "Centro empresarial Dorado Plaza",
          arrival: "Centro empresarial Dorado Plaza",
          startDate: new Date(Date.now()),
          endDate: new Date(Date.now() + 360000),
          startTime: "07:00 h",
          endTime: "14:00 h",
          travelType: "Carga",
          vehicle: "Cama baja",
          timeTraveled: "30 min",
          value: 2000000
        },
        {
          id: 31,
          departure: "Centro empresarial Dorado Plaza",
          arrival: "Centro empresarial Dorado Plaza",
          startDate: new Date(Date.now()),
          endDate: new Date(Date.now() + 360000),
          startTime: "07:00 h",
          endTime: "14:00 h",
          travelType: "Carga",
          vehicle: "Cama baja",
          timeTraveled: "30 min",
          value: 2000000
        }
      ]
    },
    {
      status_id: 2,
      status: "Pre autorizados",
      color: "#0085FF",
      providersDetail: [
        {
          id: 32,
          departure: "Centro empresarial Dorado Plaza",
          arrival: "Centro empresarial Dorado Plaza",
          startDate: new Date(Date.now()),
          endDate: new Date(Date.now() + 360000),
          startTime: "07:00 h",
          endTime: "14:00 h",
          travelType: "Carga",
          vehicle: "Cama baja",
          timeTraveled: "30 min",
          value: 2000000
        }
      ]
    }
  ]
};
