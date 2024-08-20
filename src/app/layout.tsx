"use client";
import { ConfigProvider } from "antd";
import theme from "@/theme/themeConfig";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Poppins } from "@next/font/google";
import { ModalProvider } from "@/context/ModalContext";
import "../styles/globals.scss";
import { useEffect, useState } from "react";
import Loader from "@/components/atoms/loaders/loader";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"]
});
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ConfigProvider theme={theme}>
      <html lang="es" className={poppins.className}>
        <body>
          <AntdRegistry>
            {loading ? <Loader /> : <ModalProvider>{children}</ModalProvider>}
          </AntdRegistry>
        </body>
      </html>
    </ConfigProvider>
  );
}
