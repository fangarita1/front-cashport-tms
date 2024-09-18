"use client";
import { Tabs, TabsProps } from "antd";
import { usePathname, useRouter } from "next/navigation";
import ViewWrapper from "@/components/organisms/ViewWrapper/ViewWrapper";
import Container from "@/components/atoms/Container/Container";

interface Props {
  children?: React.ReactNode;
  params: {
    id: string;
  };
}

const ConfigurationLayout = ({ children, params }: Props) => {
  const router = useRouter();
  const path = usePathname();

  const getDefaultValue = () => {
    if (path.includes("materials")) {
      return "materiasl";
    }
    if (path.includes("users")) {
      return "users";
    }
    if (path.includes("carriers")) {
      return "carriers";
    }
    if (path.includes("locations") && !path.includes("grouplocations")) {
      return "locations";
    }
    if (path.includes("grouplocations")) {
      return "grouplocations";
    }
    if (path.includes("secureroutes")) {
      return "secureroutes";
    }
    return "";
  };

  const onChange = (key: string) => {
    if (key == "materials") {
      //default tab
      router.push(`/logistics/configuration`);
    } else {
      router.push(`/logistics/configuration/${key}/all`);
    }
  };
  const items: TabsProps["items"] = [
    {
      key: "materials",
      label: "Materiales",
      children: <></>
    },
    {
      key: "users",
      label: "Usuarios",
      children: <></>
    },
    {
      key: "carriers",
      label: "Proveedores",
      children: <></>
    },
    {
      key: "locations",
      label: "Ubicacion",
      children: <></>
    },
    {
      key: "grouplocations",
      label: "Grupos de Ubicaciones",
      children: <></>
    },
    {
      key: "secureroutes",
      label: "Rutas de Seguridad",
      children: <></>
    }
  ];

  return (
    <ViewWrapper headerTitle="Configuración">
      <Container>
        <Tabs defaultActiveKey={getDefaultValue()} items={items} onChange={onChange} />
        {children}
      </Container>
    </ViewWrapper>
  );
};

export default ConfigurationLayout;
