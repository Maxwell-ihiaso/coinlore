export default function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (!isNaN(Number(a[orderBy])) && !isNaN(Number(b[orderBy]))) {
    return Number(b[orderBy]) - Number(a[orderBy]);
  } else {
    return (b[orderBy] as string).localeCompare(a[orderBy] as string);
  }
}
