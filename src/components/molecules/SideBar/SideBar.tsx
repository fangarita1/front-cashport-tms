"use client";
import { useState } from "react";
import { Button, Flex } from "antd";

import { ArrowLineRight, Gear, User } from "phosphor-react";
import Image from "next/image";

import "./sidebar.scss";
import { usePathname } from "next/navigation";

export const SideBar = () => {
  const [isSideBarLarge, setIsSideBarLarge] = useState(false);
  const path = usePathname();

  return (
    <div className={isSideBarLarge ? "mainLarge" : "main"}>
      <Flex vertical className="containerButtons">
        <Flex className="logoContainer">
          <Image
            width={isSideBarLarge ? 75 : 50}
            height={isSideBarLarge ? 75 : 50}
            alt="logo company"
            src="/images/cruz-verde.png"
          />
        </Flex>
        <Button
          type="primary"
          size="large"
          icon={<User size={26} />}
          className={path.startsWith("/clientes") ? "buttonIcon" : "buttonIconActive"}
          href="/clientes/all"
        >
          {isSideBarLarge && "Clientes"}
        </Button>
        <Button
          type="primary"
          size="large"
          icon={<Gear size={26} />}
          className={path === "/" ? "buttonIcon" : "buttonIconActive"}
          href="/"
        >
          {isSideBarLarge && "Ajustes"}
        </Button>
      </Flex>
      <Flex className="exit">
        <Button
          type="text"
          size="large"
          onClick={() => setIsSideBarLarge(!isSideBarLarge)}
          icon={<ArrowLineRight size={26} />}
          className="buttonExit"
        >
          {isSideBarLarge && "Salir"}
        </Button>
      </Flex>
    </div>
  );
};
