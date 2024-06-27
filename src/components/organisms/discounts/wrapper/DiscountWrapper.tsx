"use client";
import ButtonHeader from "@/components/atoms/buttons/buttonHeader/ButtonHeader";
import Wrapper from "@/components/organisms/wrapper/Wrapper";
import { Flex, Typography } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./DiscountWrapper.scss";

const { Title } = Typography;

export default function DiscountWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <Wrapper>
      <Flex vertical gap={"1.5rem"}  className="WrapperChild">
        <Flex gap={"2rem"} justify="space-between" wrap="wrap">
          <Title level={2} className="titleName">
            Configuración de descuentos
          </Title>
          {pathname == "/descuentos" ? (
            <Link href="/descuentos/create" passHref legacyBehavior>
              <ButtonHeader>Crear descuento</ButtonHeader>
            </Link>
          ) : (
            <Link href="/descuentos" passHref legacyBehavior>
              <ButtonHeader>Volver a la lista</ButtonHeader>
            </Link>
          )}
        </Flex>
        {children}
      </Flex>
    </Wrapper>
  );
}
