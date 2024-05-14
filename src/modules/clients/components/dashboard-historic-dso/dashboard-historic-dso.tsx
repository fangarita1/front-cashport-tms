import { FC } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import styles from "./dashboard-historic-dso.module.scss";

interface DashboardHistoricDsoProps {
  className?: string;
}

const DashboardHistoricDso: FC<DashboardHistoricDsoProps> = ({ className }) => {
  const data = [
    {
      name: "Ene",
      value: 20
    },
    {
      name: "Feb",
      value: 10
    },
    {
      name: "Mar",
      value: 30
    },
    {
      name: "Abr",
      value: 20
    },
    {
      name: "May",
      value: 40
    },
    {
      name: "Jun",
      value: 30
    },
    {
      name: "Jul",
      value: 60
    },
    {
      name: "Ago",
      value: 50
    },
    {
      name: "Sep",
      value: 70
    },
    {
      name: "Oct",
      value: 60
    },
    {
      name: "Nov",
      value: 80
    },
    {
      name: "Dic",
      value: 70
    }
  ];

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <div className={styles.name}>
        DSO histórico
        <div className={styles.legends}>
          <div className={styles.legend}>
            <div className={styles.circle} style={{ backgroundColor: "#CBE71E" }}></div>
            Días
          </div>
        </div>
      </div>
      <div className={styles.chart}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart margin={{ right: 0, left: -20 }} barCategoryGap={10} data={data} barSize={20}>
            <XAxis padding={{ left: 20, right: 20 }} dataKey="name" scale="point" color="#CBE71E" />
            <YAxis />
            <Tooltip />
            <CartesianGrid strokeDasharray="3" vertical={false} />
            <Bar dataKey="value" fill="#CBE71E" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardHistoricDso;
