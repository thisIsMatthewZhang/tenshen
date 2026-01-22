import { getStartDateOfCurrentWeek } from "@/src/scripts/getStartDateOfCurrentWeek";
import { DateCircleProps } from "./components/DateCircle";

const startDate: Date = getStartDateOfCurrentWeek();

export const dates: DateCircleProps[] = [
  {
    dateOfWeek: startDate.getDate() - 1,
    dayOfWeek: "Sun",
    isCurrentDay: new Date().getDate() === startDate.getDate() - 1,
  },
  {
    dateOfWeek: startDate.getDate(),
    dayOfWeek: "M",
    isCurrentDay: new Date().getDate() === startDate.getDate(),
  },
  {
    dateOfWeek: startDate.getDate() + 1,
    dayOfWeek: "Tu",
    isCurrentDay: new Date().getDate() === startDate.getDate() + 1,
  },
  {
    dateOfWeek: startDate.getDate() + 2,
    dayOfWeek: "W",
    isCurrentDay: new Date().getDate() === startDate.getDate() + 2,
  },
  {
    dateOfWeek: startDate.getDate() + 3,
    dayOfWeek: "Th",
    isCurrentDay: new Date().getDate() === startDate.getDate() + 3,
  },
  {
    dateOfWeek: startDate.getDate() + 4,
    dayOfWeek: "F",
    isCurrentDay: new Date().getDate() === startDate.getDate() + 4,
  },
  {
    dateOfWeek: startDate.getDate() + 5,
    dayOfWeek: "Sat",
    isCurrentDay: new Date().getDate() === startDate.getDate() + 5,
  },
];
