import React, { useEffect, useState } from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import { Line } from "react-chartjs-2";
import dayjs from "dayjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { CoinbaseProduct } from "../../types";
import { EnableLivePricesContext } from "../../Contexts/EnableLivePricesContext/EnableLivePricesContext";
import "./CryptoChart.less";
import { useCurrency } from "../../Contexts/CurrencyContext/CurrencyContext";
import { useTickerPrice } from "../../Contexts/TickerContext/TickerContext";
import { secondaryTextColor } from "../../main";
import { Skeleton } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
);

interface PricePoint {
  x: Date;
  y: number;
}

interface CryptoChartProps {
  productId: string;
  coin: CoinbaseProduct;
}

const MAX_POINTS = 50;
const UPDATE_INTERVAL = 3000;

const CryptoChart: React.FC<CryptoChartProps> = ({ coin }) => {
  const [priceHistory, setPriceHistory] = useState<PricePoint[]>([]);
  const { currency } = useCurrency();
  const { enableLivePrices } = EnableLivePricesContext();
  const livePrices = useTickerPrice();
  const livePriceData = livePrices[coin.product_id] || coin.price;
  const lastPriceRef = React.useRef<number | null>(null);

  useEffect(() => {
    setPriceHistory([]);
  }, [coin.product_id]);

  dayjs.extend(relativeTime);

  useEffect(() => {
    if (!enableLivePrices || !livePriceData) return;

    const pushPrice = () => {
      setPriceHistory((prev) => {
        const currentPrice = livePriceData.price;
        if (lastPriceRef.current === currentPrice) {
          return prev;
        }
        lastPriceRef.current = currentPrice;
        const newPoint = { x: new Date(), y: currentPrice };
        const updated = [...prev, newPoint];
        if (updated.length > MAX_POINTS) updated.shift();
        return updated;
      });
    };
    pushPrice();
    const interval = setInterval(pushPrice, UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, [enableLivePrices, livePriceData]);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  );
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      datalabels: {
        color: secondaryTextColor,
        align: "top",
        formatter: (value: number) => `$${Math.round(value).toLocaleString()}`,
      },
      tooltip: {
        enabled: true,
        titleColor: "antiquewhite",
        font: { size: 14, family: "VT323, monospace", weight: "bold" },
        bodyColor: "antiquewhite",
        callbacks: {
          label: function (tooltipItem: { raw: { y: string } }) {
            return `$${tooltipItem.raw.y.toLocaleString()}`;
          },
        },
      },
    },
    elements: {
      point: { radius: 5 },
    },
    scales: {
      y: {
        ticks: {
          color: "antiquewhite",
          font: { size: 14, family: "VT323, monospace", weight: "bold" },
          callback: (value: number) =>
            value.toLocaleString(undefined, {
              style: "currency",
              currency: currency,
              maximumFractionDigits: 0,
            }),
        },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
      x: {
        type: "time" as const,
        time: { unit: "second" },
        ticks: {
          color: "antiquewhite",
          callback: (value: string) => {
            const secondsAgo = dayjs().diff(dayjs(value), "seconds");
            const minutesAgo = dayjs().diff(dayjs(value), "minute");
            if (secondsAgo < 60) {
              return `${secondsAgo}s ago`;
            } else {
              return `${minutesAgo}s ago`;
            }
          },
          grid: { color: "rgba(255,255,255,0.1)" },
        },
      },
    },
  };

  const data = {
    datasets: [
      {
        label: "Price",
        data: priceHistory,
        parsing: { xAxisKey: "x", yAxisKey: "y" },
        borderColor: "lime",
        backgroundColor: "rgba(0,255,0,0.2)",
        tension: 0.2,
        pointRadius: 4,
      },
    ],
  };

  return (
    <div className="crypto-drawer-chart">
      {/* {null ? ( */}
      {priceHistory.length ? (
        <Line
          onBlur={() => console.log("FOCUSSED!!")}
          data={data}
          options={options}
        />
      ) : (
        <div className="crypto-chart-loading-box">
          <LoadingOutlined />
        </div>
      )}
    </div>
  );
};

export default CryptoChart;
