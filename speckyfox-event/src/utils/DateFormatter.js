export default function dateFormatter(dateString) {
  const date = new Date(dateString);

  // Step 2: Define arrays for days and months names
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return {
    dayOfWeekName: daysOfWeek[date.getDay()],
    day: date.getDate(),
    monthName: months[date.getMonth()],
    year: date.getFullYear(),
  };
}

export function convertTo12HourFormat(timeString = "") {
  const [hours, minutes, seconds] = timeString.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const hours12 = hours % 12;
  const minutes12 = minutes < 10 ? `0${minutes}` : minutes;

  return `${hours12}:${minutes12} ${period}`;
}
