interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="progress-bar">
      <div style={{ width: `${progress}%` }} />
    </div>
  );
}
