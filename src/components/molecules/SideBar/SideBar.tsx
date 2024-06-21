"use client";
import { useState } from "react";
import { Button, Flex } from "antd";

import { ArrowLineRight, Gear, User } from "phosphor-react";
import Image from "next/image";

import "./sidebar.scss";
import { usePathname, useRouter } from "next/navigation";
import { logOut } from "../../../../firebase-utils";
import Link from "next/link";
import { useAppStore } from "@/lib/store/store";

export const SideBar = () => {
  const [isSideBarLarge, setIsSideBarLarge] = useState(false);
  const router = useRouter();
  const path = usePathname();
  const { LOGO } = useAppStore((state) => state.selectProject);

  return (
    <div className={isSideBarLarge ? "mainLarge" : "main"}>
      <Flex vertical className="containerButtons">
        {LOGO && (
          <Flex className="logoContainer">
            <Image
              width={isSideBarLarge ? 75 : 50}
              height={isSideBarLarge ? 75 : 50}
              alt="logo company"
              src={LOGO}
            />
          </Flex>
        )}

        <Link href="/clientes/all">
          {isSideBarLarge ? (
            "Clientes"
          ) : (
            <Button
              type="primary"
              size="large"
              icon={<User size={26} />}
              className={path.startsWith("/clientes") ? "buttonIcon" : "buttonIconActive"}
            ></Button>
          )}
        </Link>

        <Link href="/">
          {isSideBarLarge ? (
            "Home"
          ) : (
            <Button
              type="primary"
              size="large"
              icon={<Gear size={26} />}
              className={
                path.startsWith("/") && !path.startsWith("/clientes")
                  ? "buttonIcon"
                  : "buttonIconActive"
              }
            ></Button>
          )}
        </Link>
      </Flex>
      <Flex className="exit">
        <Button
          type="text"
          size="large"
          onClick={() => logOut(router)}
          icon={<ArrowLineRight size={26} />}
          className="buttonExit"
        >
          {isSideBarLarge && "Salir"}
        </Button>
      </Flex>
    </div>
  );
};
