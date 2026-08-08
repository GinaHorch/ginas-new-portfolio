"use client";

import React from "react";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { evidenceLevels, skillCountsByLevel, skillGroups } from "./skillsData";
import styles from "./SkillsChart.module.scss";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Resolved from the forced dark theme in src/app/resources/config.js.
// #E0E0E0 on the #0A0A0A page background is ~13.8:1, well past the 4.5:1 AA minimum.
const TEXT = "#E0E0E0";
const GRID = "rgba(224, 224, 224, 0.12)";

const OverviewSkillsChart = () => {
  const groups = skillCountsByLevel();

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const data = {
    labels: groups.map((group) => group.title),
    datasets: evidenceLevels.map((level, levelIndex) => ({
      label: level.label,
      data: groups.map((group) => group.counts[levelIndex]),
      backgroundColor: level.color,
      borderWidth: 0,
      barThickness: 22,
    })),
  };

  const options = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
    animation: prefersReducedMotion ? (false as const) : undefined,
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
        labels: { color: TEXT, boxWidth: 12, font: { size: 13 } },
      },
      tooltip: {
        callbacks: {
          label: (ctx: { dataset: { label?: string }; raw: unknown }) =>
            `${ctx.dataset.label}: ${ctx.raw} skill${ctx.raw === 1 ? "" : "s"}`,
        },
      },
      title: {
        display: true,
        text: "Skills by evidence level",
        color: TEXT,
        font: { size: 16 },
        padding: { bottom: 12 },
      },
    },
    scales: {
      x: {
        stacked: true,
        beginAtZero: true,
        ticks: { color: TEXT, stepSize: 5, font: { size: 13 } },
        grid: { color: GRID },
        title: { display: true, text: "Number of skills", color: TEXT, font: { size: 12 } },
      },
      y: {
        stacked: true,
        ticks: { color: TEXT, font: { size: 13 }, autoSkip: false },
        grid: { display: false },
      },
    },
  };

  return (
    <div className={styles.chartContainer}>
      <Bar
        data={data}
        options={options}
        aria-label="Chart: number of skills in each group, broken down by evidence level. A text version follows."
      />
      <div className={styles.visuallyHidden}>
        <ul>
          {skillGroups.map((group) => (
            <li key={group.title}>
              {group.title}:{" "}
              {evidenceLevels
                .map((level) => {
                  const count = group.skills.filter((skill) => skill.level === level.id).length;
                  return count > 0 ? `${count} ${level.label.toLowerCase()}` : null;
                })
                .filter(Boolean)
                .join(", ")}
              .
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OverviewSkillsChart;
