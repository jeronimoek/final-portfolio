type DateSinceProps = {
  since: Date;
};

function calculateDelta(from: Date, to: Date) {
  let delta = Math.abs(to.getTime() - from.getTime()) / 1000;

  // calculate (and subtract) whole days
  const years = Math.floor(delta / 31622400);
  delta -= years * 31622400;

  // calculate (and subtract) whole days
  const months = Math.floor(delta / 2635200);
  delta -= months * 2635200;

  return `${years} years, ${months} months`;
}

export function DateSince({ since }: DateSinceProps) {
  return (
    <span>
      {calculateDelta(since, new Date())}
    </span>
  );
}
