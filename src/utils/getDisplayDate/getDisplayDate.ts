const getDisplayDate = (dateString: string) => {
  const n = new Date(dateString).getDate();
  const date =
    n +
    (n > 0
      ? ["th", "st", "nd", "rd"][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10]
      : "");
  const num = new Date(dateString).getDay();
  const day = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(num);

  return `${date}, ${day} sdjfsdpio`;
};

export default getDisplayDate;
