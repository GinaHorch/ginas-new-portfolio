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

// Chart.js caps how much width the category axis may take and then clips whatever
// overflows, so on a narrow canvas "Cloud, Systems & Deployment" rendered as
// "Systems & Deployment". Wrapping the labels keeps the full text at a readable size
// instead of shrinking the font or abbreviating the group names, which have to stay
// identical to the section headings below the chart.
// Measured from the rendered canvas: Inter at 13px runs 6.15-7.0px per character
// across these six labels. Use the widest so the estimate never under-reserves and
// lets a label clip; erring wide only means wrapping slightly sooner than needed.
const AXIS_WIDTH_FRACTION = 0.36;
const APPROX_CHAR_WIDTH = 7;
const MIN_CHARS_PER_LINE = 10;

function wrapLabel(label: string, maxChars: number): string | string[] {
  if (label.length <= maxChars) {
    return label;
  }

  const lines: string[] = [];
  let line = "";

  for (const word of label.split(" ")) {
    const candidate = line ? `${line} ${word}` : word;
    if (line && candidate.length > maxChars) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }

  if (line) {
    lines.push(line);
  }

  return lines;
}

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
        ticks: {
          color: TEXT,
          font: { size: 13 },
          autoSkip: false,
          // Regular function so `this` is the scale, giving the live canvas width —
          // this then also survives orientation changes and window resizes.
          callback(this: { chart: { width: number } }, _value: unknown, index: number) {
            const maxChars = Math.max(
              MIN_CHARS_PER_LINE,
              Math.floor((this.chart.width * AXIS_WIDTH_FRACTION) / APPROX_CHAR_WIDTH),
            );
            return wrapLabel(groups[index]?.title ?? "", maxChars);
          },
        },
        grid: { display: false },
      },
    },
  };

  return (
    <div className={styles.chartWrapper}>
      <div className={styles.chartContainer}>
        <Bar
          data={data}
          options={options}
          aria-label="Chart: number of skills in each group, broken down by evidence level. A text version follows."
        />
      </div>
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
