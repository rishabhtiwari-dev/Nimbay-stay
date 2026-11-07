export function getTodayDateString(): string {
  return new Date().toISOString().split("T")[0];
}

export function getMinCheckOutDate(checkIn: string): string {
  return checkIn || getTodayDateString();
}

export function isSearchDisabled(
  loading: boolean,
  checkIn: string,
  checkOut: string
): boolean {
  if (loading) return true;
  if (!checkIn || !checkOut) return true;
  return false;
}

export function isValidDateRange(checkIn: string, checkOut: string): boolean {
  if (!checkIn || !checkOut) return false;
  const inTime = new Date(checkIn).getTime();
  const outTime = new Date(checkOut).getTime();
  return !isNaN(inTime) && !isNaN(outTime) && outTime > inTime;
}
