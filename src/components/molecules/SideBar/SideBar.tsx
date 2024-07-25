"use client";
import { useEffect, useState } from "react";
import { Avatar, Button, Flex } from "antd";
import Image from "next/image";

import {
  ArrowLineRight,
  BellSimpleRinging,
  Gear,
  Megaphone,
  User,
  Clipboard
} from "phosphor-react";

import "./sidebar.scss";
import { usePathname, useRouter } from "next/navigation";
import { logOut } from "../../../../firebase-utils";
import Link from "next/link";
import { useAppStore } from "@/lib/store/store";
import useStore from "@/lib/hook/useStore";
import { ModalProjectSelector } from "../modals/ModalProjectSelector/ModalProjectSelector";

export const SideBar = () => {
  const [isSideBarLarge, setIsSideBarLarge] = useState(false);
  const [modalProjectSelectorOpen, setModalProjectSelectorOpen] = useState(false);
  const [isComponentLoading, setIsComponentLoading] = useState(true);
  const router = useRouter();
  const path = usePathname();
  const project = useStore(useAppStore, (state) => state.selectProject);
  const LOGO = project?.LOGO;

  useEffect(() => {
    setIsComponentLoading(false);
  }, []);

  useEffect(() => {
    //to check if there is a project selected
    //if not it should open the modal to select one
    if (!isComponentLoading && !project?.ID) {
      setModalProjectSelectorOpen(true);
    }
  }, [isComponentLoading, project]);

  return (
    <div className={isSideBarLarge ? "mainLarge" : "main"}>
      <Flex vertical className="containerButtons">
        <button className="logoContainer" onClick={() => setModalProjectSelectorOpen(true)}>
          {LOGO ? (
            <Image
              width={isSideBarLarge ? 75 : 50}
              height={isSideBarLarge ? 75 : 50}
              alt="logo company"
              src={LOGO.trim()}
            />
          ) : (
            <Avatar shape="square" className="imageWithoutImage" size={50} icon={<Clipboard />} />
          )}
        </button>

        <Link href="/clientes/all">
          <Button
            type="primary"
            size="large"
            icon={<User size={26} />}
            className={path.startsWith("/clientes") ? "buttonIcon" : "buttonIconActive"}
          >
            {isSideBarLarge && "Clientes"}
          </Button>
        </Link>
        <Link href="/descuentos" passHref legacyBehavior>
          <Button
            type="primary"
            size="large"
            icon={<BellSimpleRinging size={26} />}
            className={path.startsWith("/descuentos") ? "buttonIcon" : "buttonIconActive"}
          >
            {isSideBarLarge && "Descuentos"}
          </Button>
        </Link>
        <Link href="/notificaciones" passHref legacyBehavior>
          <Button
            type="primary"
            size="large"
            icon={<BellSimpleRinging size={26} />}
            className={path.startsWith("/notificaciones") ? "buttonIcon" : "buttonIconActive"}
          >
            {isSideBarLarge && "Notificaciones"}
          </Button>
        </Link>
        <Link href="/comercio" passHref legacyBehavior>
          <Button
            type="primary"
            size="large"
            icon={<Megaphone size={26} />}
            className={path.startsWith("/comercio") ? "buttonIcon" : "buttonIconActive"}
          >
            {isSideBarLarge && "Descuentos"}
          </Button>
        </Link>
        <Link href="/" passHref legacyBehavior>
          <Button
            type="primary"
            size="large"
            icon={<Gear size={26} />}
            className={path === "/" ? "buttonIcon" : "buttonIconActive"}
          >
            {isSideBarLarge && "Ajustes"}
          </Button>
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
      <ModalProjectSelector
        isOpen={modalProjectSelectorOpen}
        onClose={() => setModalProjectSelectorOpen(false)}
      />
    </div>
  );
};
