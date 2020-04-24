import getDisplayDate from "./getDisplayDate";

test("getDisplayDate", () => {
  expect(getDisplayDate("2020-01-09")).toBe("9th, sgfdpo");
});
