import { Flex } from "antd";
import { SideBar } from "../../molecules/SideBar/SideBar";
import "./Wrapper.scss";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <main className="mainWrapper">
      <SideBar />
      <Flex vertical className="RightContent">
        {children}
      </Flex>
    </main>
  );
}
