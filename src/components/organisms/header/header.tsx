"use client";
import { FC, useCallback, useState } from "react";
import { CaretDown, User } from "phosphor-react";
import styles from "./header.module.scss";
import { Avatar, Button, Popover } from "antd";
import { logOut } from "../../../../firebase-utils";
import { useRouter } from "next/navigation";
import { PopoverUserNotifications } from "@/components/molecules/Popover/PopoverUserNotifications/PopoverUserNotifications";

interface HeaderProps {
  title: string;
}

const Header: FC<HeaderProps> = ({ title }) => {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleLogOut = useCallback(() => {
    logOut(router);
  }, [router]);

  return (
    <header className={styles.wrapper}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.actions}>
        <PopoverUserNotifications
          setIsPopoverVisible={setIsModalVisible}
          isPopoverVisible={isModalVisible}
        />
        <div className={styles.profile}>
          <Avatar icon={<User />} />
          <Popover
            placement="bottomRight"
            trigger="click"
            content={
              <>
                <Button onClick={handleLogOut}>Cerrar Sesion</Button>
              </>
            }
          >
            <CaretDown className={styles.arrow} />
          </Popover>
        </div>
      </div>
    </header>
  );
};

export default Header;
