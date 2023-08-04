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
  let hours12 = hours % 12;
  if (hours12 === 0) {
    hours12 = 12;
  }
  const minutes12 = minutes < 10 ? `0${minutes}` : minutes;

  return `${hours12}:${minutes12} ${period}`;
}

export function toDDMMYYYY(dateInput) {
  const selectedDate = new Date(dateInput);
  if (!isNaN(selectedDate)) {
    const day = String(selectedDate.getDate()).padStart(2, "0");
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const year = selectedDate.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  }
}
