import { ConfigProvider } from "antd";
import theme from "@/theme/themeConfig";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Poppins } from "@next/font/google";

import "../styles/globals.scss";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"]
});
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider theme={theme}>
      <html lang="es" className={poppins.className}>
        <body>
          <AntdRegistry>{children}</AntdRegistry>
        </body>
      </html>
    </ConfigProvider>
  );
}
