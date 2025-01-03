import React, { useEffect, useRef, useState } from "react";
import { CodeforcesContest } from "../types/codeforces";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

interface ChartComponentProps {
  contests: CodeforcesContest[];
}

const ChartComponent: React.FC<ChartComponentProps> = ({ contests }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [selectedContest, setSelectedContest] = useState<CodeforcesContest | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        const chart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: contests.map((contest) => contest.name),
            datasets: [
              {
                label: "Contest Duration (seconds)",
                data: contests.map((contest) => contest.durationSeconds),
                backgroundColor: contests.map(() =>
                  `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`
                ),
                borderColor: contests.map(() =>
                  `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`
                ),
                borderWidth: 2,
                hoverBackgroundColor: contests.map(() =>
                  `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`
                ),
                hoverBorderColor: contests.map(() =>
                  `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`
                ),
                hoverBorderWidth: 3,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Contest Name",
                  font: { size: 14, weight: "bold" },
                },
                ticks: {
                  font: { size: 12 },
                  maxRotation: 45,
                  minRotation: 45,
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Duration (seconds)",
                  font: { size: 14, weight: "bold" },
                },
                beginAtZero: true,
                ticks: {
                  font: { size: 12 },
                  stepSize: 1000,
                },
              },
            },
            plugins: {
              tooltip: {
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                titleColor: "#fff",
                bodyColor: "#fff",
              },
            },
            animation: {
              duration: 1000,
            },
            legend: {
              labels: {
                font: { size: 14, weight: "bold" },
                color: "#333",
              },
            },
            onClick: (e) => {
              const canvasPosition = Chart.helpers.getRelativePosition(e, chart);
              const dataX = chart.scales.x.getValueForPixel(canvasPosition.x);
              const dataY = chart.scales.y.getValueForPixel(canvasPosition.y);
              const index = chart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, true)[0]?.index;
              if (index !== undefined) {
                const selected = contests[index];
                setSelectedContest(selected);
                chart.setActiveElements([{ datasetIndex: 0, index }]);
                chart.update();
              }
            },
          },
        });
      }
    }

    return () => {
      const myChart = Chart.getChart("myChart");
      if (myChart) {
        myChart.destroy();
      }
    };
  }, [contests]);

  return (
    <div>
      <div className="chart-container" style={{ position: "relative", height: "400px" }}>
        <canvas id="myChart" ref={chartRef} />
      </div>
      {selectedContest && (
        <div className="contest-info">
          <h3>{selectedContest.name}</h3>
          <p><strong>Duration:</strong> {selectedContest.durationSeconds} seconds</p>          
        </div>
      )}
    </div>
  );
};

export default ChartComponent;
