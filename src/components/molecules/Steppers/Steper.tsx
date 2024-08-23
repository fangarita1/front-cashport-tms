import { Flex } from "antd";

type Step = { title: string; active: boolean; completed: boolean };
type Colors = { active: string; completed: string; normal: string };

export default function Steper({
  steps,
  colors = { active: "#141414", completed: "#CBE71E", normal: "#969696" }
}: {
  steps: Step[];
  colors?: Colors;
}) {
  return steps.map((step, index) => {
    const BOLD = "bold";
    const NORMAL = "normal";
    const BLACK = "black";
    const WHITE = "white";
    return (
      <Flex key={index}>
        <Flex>{index > 0 && <span style={{ margin: "0 8px", width: "" }}>-</span>}</Flex>
        <Flex key={index} align="center">
          <Flex align="center">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 24,
                height: 24,
                borderRadius: "50%",
                background: step.active
                  ? colors.active
                  : step.completed
                    ? colors.completed
                    : colors.normal,
                color: step.completed ? BLACK : WHITE,
                fontWeight: step.active ? BOLD : NORMAL
              }}
            >
              {index + 1}
            </div>
            <div style={{ marginLeft: 8, fontWeight: step.active ? BOLD : NORMAL }}>
              {step.title}
            </div>
          </Flex>
        </Flex>
      </Flex>
    );
  });
}
