const getDisplayDate = (dateString: string) => {
  const n = new Date(dateString).getDate();
  const date =
    n +
    (n > 0
      ? ["th", "st", "nd", "rd"][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10]
      : "");
  const day = new Date(dateString).toLocaleString("en-us", { weekday: "long" });
  return `${date}, ${day}`;
};

export default getDisplayDate;
