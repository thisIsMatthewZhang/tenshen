// utility to get the first day of the week...need to account for EOM when calculating for rest of the week
export function getStartDateOfCurrentWeek() {
  const today = new Date();
  const day = today.getDay();
  const diff = today.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(today.setDate(diff));
}
