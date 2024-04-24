export default function convertNumberToReadableString(num: number | string) {
  if (isNaN(Number(num))) {
    return num;
  }
  return Number(num)?.toLocaleString();
}
