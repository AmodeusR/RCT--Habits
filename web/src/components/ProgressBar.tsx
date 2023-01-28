
type ProgressBarProps = {
  progress: number;
}
const ProgressBar = ({ progress }: ProgressBarProps) => {
  const progressStyle = {
    width: `${progress}%`
  }
  return (
    <div className="h-2 rounded-xl bg-zinc-600 w-full mt-4">
      <div
        role="progressbar"
        aria-label="Progresso de hábitos completados neste dia"
        aria-valuenow={progress}
        className="h-2 rounded-xl bg-violet-600 transition-all"
        style={progressStyle}
      ></div>
    </div>
  );
};

export default ProgressBar;
