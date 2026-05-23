import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
);

const chartText = "#94a3b8";
const gridColor = "rgba(148, 163, 184, 0.12)";

function formatLabel(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function Graph({ graphData = [] }) {
  const labels = graphData.map((item) => formatLabel(item.clickDate));
  const counts = graphData.map((item) => item.count);

  const data = {
    labels: labels.length ? labels : ["No data"],
    datasets: [
      {
        label: "Clicks",
        data: counts.length ? counts : [0],
        borderColor: "#a78bfa",
        backgroundColor: "rgba(167, 139, 250, 0.15)",
        pointBackgroundColor: "#22d3ee",
        pointBorderColor: "#0f172a",
        pointHoverBackgroundColor: "#22d3ee",
        pointRadius: graphData.length > 14 ? 2 : 4,
        pointHoverRadius: 6,
        fill: true,
        tension: 0.35,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1e293b",
        titleColor: "#f8fafc",
        bodyColor: "#cbd5e1",
        borderColor: "rgba(255,255,255,0.1)",
        borderWidth: 1,
        padding: 12,
      },
    },
    scales: {
      x: {
        ticks: { color: chartText, maxRotation: 45, minRotation: 0 },
        grid: { color: gridColor },
        border: { display: false },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: chartText,
          precision: 0,
          callback: (v) => (Number.isInteger(v) ? v : ""),
        },
        grid: { color: gridColor },
        border: { display: false },
      },
    },
  };

  return (
    <div className="h-64 w-full sm:h-72 md:h-80">
      <Line data={data} options={options} />
    </div>
  );
}

export default Graph;
