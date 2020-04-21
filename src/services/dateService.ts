import { lightFormat, startOfMonth, endOfMonth, format } from "date-fns";

const DateService = () => {
  const formatted = (date: Date) => lightFormat(date, "yyyy-MM-dd");

  const today = new Date();
  const getMonth = (date: string) => format(new Date(date), "MMMM");
  const getMonthRange = (date: Date, offset = 0) => {
    const offsetDate = date.setMonth(date.getMonth() - offset);
    return {
      startDate: formatted(startOfMonth(offsetDate)),
      endDate: formatted(endOfMonth(offsetDate)),
    };
  };

  return {
    today,
    getMonth,
    getMonthRange,
    formatted,
  };
};

export default DateService;
