import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const chartText = "#94a3b8";
const gridColor = "rgba(148, 163, 184, 0.12)";

function UrlClicksChart({ urls = [] }) {
  const topUrls = [...urls]
    .sort((a, b) => b.clickCount - a.clickCount)
    .slice(0, 8);

  const labels = topUrls.map((u) => u.shorturl);
  const counts = topUrls.map((u) => u.clickCount);

  const data = {
    labels: labels.length ? labels : ["—"],
    datasets: [
      {
        label: "Clicks per link",
        data: counts.length ? counts : [0],
        backgroundColor: [
          "rgba(167, 139, 250, 0.85)",
          "rgba(34, 211, 238, 0.85)",
          "rgba(232, 121, 249, 0.85)",
          "rgba(52, 211, 153, 0.85)",
          "rgba(251, 191, 36, 0.85)",
          "rgba(96, 165, 250, 0.85)",
          "rgba(248, 113, 113, 0.85)",
          "rgba(163, 230, 53, 0.85)",
        ],
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1e293b",
        titleColor: "#f8fafc",
        bodyColor: "#cbd5e1",
        borderColor: "rgba(255,255,255,0.1)",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: { color: chartText, precision: 0 },
        grid: { color: gridColor },
        border: { display: false },
      },
      y: {
        ticks: { color: chartText },
        grid: { display: false },
        border: { display: false },
      },
    },
  };

  return (
    <div className="h-64 w-full sm:h-72 md:h-80">
      <Bar data={data} options={options} />
    </div>
  );
}

export default UrlClicksChart;
