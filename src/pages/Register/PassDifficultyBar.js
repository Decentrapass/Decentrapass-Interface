import React from "react";

function calcDiff(pass) {
  let strength = 0;

  if (pass.match(/[a-z]+/)) strength += 1;
  if (pass.match(/[A-Z]+/)) strength += 1;
  if (pass.match(/[0-9]+/)) strength += 1;
  if (pass.match(/[^A-Za-z0-9]+/)) strength += 1;
  if (pass.length >= 8) strength += 1;

  return strength;
}

const colors = ["gray", "#ff5050", "#ff9d53", "#ffe956", "#a7f452", "#4eff4e"];
const names = [
  "strength",
  "very weak!",
  "weak",
  "medium",
  "strong",
  "very strong!",
];

export default function PassDifficultyBar(props) {
  let strength = calcDiff(props.pass);
  let color = colors[strength];
  let text = names[strength];

  return (
    <div className="w-full flex flex-col justify-between items-center mt-2 mb-2 md:mb-4">
      <div className="w-full rounded-full flex items-center justify-start bg-gray-700 dark:bg-gray-400 overflow-hidden">
        <div
          className="py-1 w-full"
          style={{ width: (100 * strength) / 5 + "%", backgroundColor: color }}
        ></div>
      </div>
      <span className="mt-2" style={{ color: color }}>
        {text}
      </span>
    </div>
  );
}
