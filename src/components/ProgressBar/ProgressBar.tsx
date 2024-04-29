interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="progress-bar">
      <div className="progress-bar__wrapper">
        <div className="progress-bar__bar" style={{ width: `${progress}%` }} />
      </div>
      <span className="progress-bar__icon">🍛</span>
    </div>
  );
}
