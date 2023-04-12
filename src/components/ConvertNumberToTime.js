export function ConvertNumberToTime(lastLoggedInTime) {
  const date = new Date(lastLoggedInTime);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  if (minutes < 10) {
    return `${hours}:0${minutes}`;
  } else {
    return `${hours}:${minutes}`;
  }
}
