"use client";

import { ButtonHTMLAttributes, useEffect, useState } from "react";

interface LabelToggleProps {
  label1: string;
  label2: string;
  onChange: (activeLabel: number) => void;
}

export default function LabelToggle({
  label1,
  label2,
  onChange,
}: LabelToggleProps) {
  const [label1Active, setLabel1Active] = useState(true);

  const onToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (label1Active && Number(event.currentTarget.dataset["id"]) === 0) return;
    if (!label1Active && Number(event.currentTarget.dataset["id"]) === 1)
      return;
    setLabel1Active((prev) => !prev);
  };

  useEffect(() => {
    onChange(label1Active ? 0 : 1);
  }, [label1Active, onChange]);

  return (
    <div
      className={
        "label-toggle" +
        (label1Active ? " label-toggle--left" : " label-toggle--right")
      }
    >
      <button onClick={onToggle} data-id="0">
        {label1}
      </button>
      <button onClick={onToggle} data-id="1">
        {label2}
      </button>
    </div>
  );
}
