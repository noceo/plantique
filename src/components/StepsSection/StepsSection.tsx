"use client";

import { useContext, useEffect, useMemo, useRef, useState } from "react";
import ProgressBar from "../ProgressBar/ProgressBar";
import { CurrentImageContext } from "@/shared/providers/CurrentImageProvider";

interface StepsSectionProps {
  steps: Array<string>;
}

export default function StepsSection({ steps }: StepsSectionProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const { setCurrentImage } = useContext(
    CurrentImageContext
  ) as CurrentImageContext;
  const headerHeight = useRef(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const progress = useMemo(
    () => currentStep * (100 / steps.length),
    [currentStep, steps]
  );

  function observerCallback(entries: Array<IntersectionObserverEntry>) {
    entries.forEach((entry: IntersectionObserverEntry) => {
      // element leaves viewport
      if (!entry.isIntersecting && entry.boundingClientRect.y < 0) {
        setCurrentStep((prevStep) => prevStep + 1);
      }
      // element comes back into viewport from above
      else if (
        entry.isIntersecting &&
        entry.boundingClientRect.y < headerHeight.current
      ) {
        setCurrentStep((prevStep) => prevStep - 1);
      }
    });
  }

  useEffect(() => {
    if (observerRef.current) return;
    headerHeight.current = document.querySelector(
      ".recipe-page__steps-header"
    )!.clientHeight;

    let observerOptions = {
      rootMargin: `-${headerHeight.current}px 0px 0px 0px`,
      threshold: 0,
    };

    var observer = new IntersectionObserver(observerCallback, observerOptions);
    observerRef.current = observer;

    document.querySelectorAll(".recipe-page__steps-item").forEach((i) => {
      if (i) {
        observer.observe(i);
      }

      return () => {
        observer.disconnect();
      };
    });
  }, []);

  useEffect(() => {
    setCurrentImage(currentStep);
  }, [currentStep, setCurrentImage]);

  return (
    <>
      <div className="recipe-page__steps-header">
        <h2>
          {currentStep < steps.length
            ? `Step ${currentStep + 1}/${steps.length}`
            : "Enjoy 🍽️"}
        </h2>
        <div className="recipe-page__progress-bar">
          <ProgressBar progress={progress} />
        </div>
      </div>
      <div className="recipe-page__steps-items">
        {steps.map((step, i) => (
          <p
            key={"step" + i}
            className="recipe-page__steps-item"
            data-step-id={i + 1}
          >
            {step}
          </p>
        ))}
      </div>
    </>
  );
}
