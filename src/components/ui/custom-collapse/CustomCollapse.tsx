import { Collapse, CollapseProps, ConfigProvider } from "antd";

export default function CustomCollapse({
  items,
  ghost,
  defaultActiveKey,
  ...rest
}: Readonly<CollapseProps>) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Collapse: {
            headerPadding: "16px 12px 0 0"
          }
        }
      }}
    >
      <Collapse ghost items={items} defaultActiveKey={defaultActiveKey ?? ["0"]} {...rest} />
    </ConfigProvider>
  );
}
