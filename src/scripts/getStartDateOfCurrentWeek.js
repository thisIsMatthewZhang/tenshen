export function getStartDateOfCurrentWeek() {
  const today = new Date();
  const day = today.getDay() + 1;
  const diff = today.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(today.getFullYear(), today.getMonth(), diff);
}
