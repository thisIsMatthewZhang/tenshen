import { getStartDateOfCurrentWeek } from "@/src/scripts/getStartDateOfCurrentWeek";
import { DateCircleProps } from "../components/DateCircle";

export const useWeeklyDates = (): DateCircleProps[] => {
  const startDate: Date = getStartDateOfCurrentWeek();
  return [
    {
      dateOfWeek: startDate.getDate(),
      dayOfWeek: "Sun",
      isCurrentDay: new Date().getDate() === startDate.getDate(),
    },
    {
      dateOfWeek: startDate.getDate() + 1,
      dayOfWeek: "M",
      isCurrentDay: new Date().getDate() === startDate.getDate() + 1,
    },
    {
      dateOfWeek: startDate.getDate() + 2,
      dayOfWeek: "Tu",
      isCurrentDay: new Date().getDate() === startDate.getDate() + 2,
    },
    {
      dateOfWeek: startDate.getDate() + 3,
      dayOfWeek: "W",
      isCurrentDay: new Date().getDate() === startDate.getDate() + 3,
    },
    {
      dateOfWeek: startDate.getDate() + 4,
      dayOfWeek: "Th",
      isCurrentDay: new Date().getDate() === startDate.getDate() + 4,
    },
    {
      dateOfWeek: startDate.getDate() + 5,
      dayOfWeek: "F",
      isCurrentDay: new Date().getDate() === startDate.getDate() + 5,
    },
    {
      dateOfWeek: startDate.getDate() + 6,
      dayOfWeek: "Sat",
      isCurrentDay: new Date().getDate() === startDate.getDate() + 6,
    },
  ] as DateCircleProps[];
};
