import type { ThemeConfig } from "antd";
//TODO: investigate a great way to improve the theme
const theme: ThemeConfig = {
  token: {
    colorPrimary: "#000000",
    colorText: "#000000",
    colorTextSecondary: "#FFFFFF",
    colorTextPlaceholder: "#000000",
    colorSplit: "#FFFFFF",
    colorBgElevated: "#575a6b",
    fontFamily: "inherit"
  },
  components: {
    Message: {
      contentBg: "#FFFFFF"
    }
  }
};

export default theme;
