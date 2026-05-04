import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import { Bar } from "react-chartjs-2";

const MedicineSalesChart = () => {
  const data = {
    labels: [
      "Paracetamol",
      "Amoxicillin",
      "Cetirizine",
      "Azithromycin",
      "Vitamin C",
    ],
    datasets: [
      {
        label: "Units Sold",
        data: [120, 90, 150, 70, 200],
        backgroundColor: "#22c55e", // green
        borderRadius: 8,
        barThickness: 40,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Medicine Sales Report",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Units Sold",
        },
      },
      x: {
        title: {
          display: true,
          text: "Medicine Name",
        },
      },
    },
  };

  return <Bar
  data={data}
  options={options}
  height={200}
  width={300}
/>
;
};

export default MedicineSalesChart;
