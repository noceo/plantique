import { useCallback, useEffect, useRef, useState } from "react";
import Button from "../Button/Button";

interface PortionControlProps {
  onChange: (portionCount: number) => void;
}

const MIN_PORTIONS = 1;
const MAX_PORTIONS = 10;

export default function PortionControl({ onChange }: PortionControlProps) {
  const [portionCount, setPortionCount] = useState(2);
  const didMount = useRef(false);

  const handleAddToMealplan = useCallback(() => {}, []);

  const handleLike = useCallback(() => {}, []);

  const onPortionDecrease = useCallback(
    (event: React.MouseEvent) => {
      if (portionCount === MIN_PORTIONS) return;
      setPortionCount((prev) => prev - 1);
    },
    [portionCount]
  );

  const onPortionIncrease = useCallback(
    (event: React.MouseEvent) => {
      if (portionCount === MAX_PORTIONS) return;
      setPortionCount((prev) => prev + 1);
    },
    [portionCount]
  );

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    onChange(portionCount);
  }, [didMount, onChange, portionCount]);

  return (
    <div className="control-panel">
      <Button variant="icon-only" onClick={handleAddToMealplan} />
      <div className="control-panel__portion-control">
        <Button variant="icon-only" onClick={onPortionDecrease}></Button>
        <p>
          <span>{portionCount}</span>{" "}
          <span>portion{portionCount > 1 ? "s" : ""}</span>
        </p>
        <Button variant="icon-only" onClick={onPortionIncrease}></Button>
      </div>
      <Button variant="icon-only" onClick={handleLike} />
    </div>
  );
}
