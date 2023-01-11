export function secondsToTime(
  e: number,
  options: {
    leadingZeroHour: boolean;
    leadingZeroMinute: boolean;
    leadingZeroSecond: boolean;
  } = {
    leadingZeroHour: true,
    leadingZeroMinute: true,
    leadingZeroSecond: true,
  }
) {
  const h = Math.floor(e / 3600),
    m = Math.floor((e % 3600) / 60),
    s = Math.floor(e % 60);
  let formattedH = h.toString();
  let formattedM = m.toString();
  let formattedS = s.toString().padStart(2, "0"); // <-- Add padStart() here
  if (!options.leadingZeroHour && h < 10) formattedH = h.toString();
  if (!options.leadingZeroMinute && m < 10) formattedM = m.toString();
  return h > 0
    ? `${formattedH}:${formattedM}:${formattedS}`
    : `${formattedM}:${formattedS}`;
}
