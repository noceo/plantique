"use client";

import { useState } from "react";
import LabelToggle from "../LabelToggle/LabelToggle";

interface ExploreViewProps {
  child1: React.ReactNode;
  child2: React.ReactNode;
}

export default function ExploreView({ child1, child2 }: ExploreViewProps) {
  const [activeChild, setActiveChild] = useState(0);

  const onToggle = (label: number) => {
    console.log(label);
    setActiveChild(label);
  };

  return (
    <div className="explore-view">
      <LabelToggle
        label1="Recipes of the Day"
        label2="Explore"
        onChange={onToggle}
      />
      <div
        style={{
          display: activeChild === 0 ? "block" : "none",
        }}
      >
        {child1}
      </div>
      <div style={{ display: activeChild === 1 ? "block" : "none" }}>
        {child2}
      </div>
    </div>
  );
}
