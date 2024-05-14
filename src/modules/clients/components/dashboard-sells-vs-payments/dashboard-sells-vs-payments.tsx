import { FC } from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Line,
  LineChart
} from "recharts";
import styles from "./dashboard-sells-vs-payments.module.scss";

interface DashboardSellsVsPaymentsProps {
  className?: string;
}

const DashboardSellsVsPayments: FC<DashboardSellsVsPaymentsProps> = ({ className }) => {
  const data = [
    {
      name: "Ene",
      value1: 20,
      value2: 60
    },
    {
      name: "Feb",
      value1: 10,
      value2: 80
    },
    {
      name: "Mar",
      value1: 30,
      value2: 30
    },
    {
      name: "Abr",
      value1: 20,
      value2: 20
    },
    {
      name: "May",
      value1: 40,
      value2: 20
    },
    {
      name: "Jun",
      value1: 30,
      value2: 10
    },
    {
      name: "Jul",
      value1: 60,
      value2: 90
    },
    {
      name: "Ago",
      value1: 50,
      value2: 30
    },
    {
      name: "Sep",
      value1: 70,
      value2: 70
    },
    {
      name: "Oct",
      value1: 60,
      value2: 10
    },
    {
      name: "Nov",
      value1: 80,
      value2: 80
    },
    {
      name: "Dic",
      value1: 70,
      value2: 90
    }
  ];

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <div className={styles.name}>
        Histórico ventas vs pagos
        <div className={styles.legends}>
          <div className={styles.legend}>
            <div className={styles.circle} style={{ backgroundColor: "#0085FF" }}></div>
            Facturación
          </div>
          <div className={styles.legend}>
            <div className={styles.circle} style={{ backgroundColor: "#CBE71E" }}></div>
            Pagos
          </div>
        </div>
      </div>
      <div className={styles.chart}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart margin={{ right: 0, left: -20 }} barCategoryGap={10} data={data} barSize={20}>
            <XAxis padding={{ left: 20, right: 20 }} dataKey="name" scale="point" />
            <YAxis padding={{ top: 6 }} />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Line type="monotone" dataKey="value1" stroke="#0085FF" strokeWidth={4} />
            <Line type="monotone" dataKey="value2" stroke="#CBE71E" strokeWidth={4} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardSellsVsPayments;
