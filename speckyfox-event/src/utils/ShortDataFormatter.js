export default function ShortDateFormatter(dateString) {
    const date = new Date(dateString);


    const daysOfWeek = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
    ];
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    return {
        dayOfWeekName: daysOfWeek[date.getDay()],
        day: date.getDate() < 10 ? "0" + date.getDate() : "" + date.getDate(),
        month: date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth(),
        monthName: months[date.getMonth()],
        year: date.getFullYear(),
    };
}

export function convertTo12HourFormats(timeString = "") {
    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    let hours12 = hours % 12;
    if (hours12 === 0) {
        hours12 = 12;
    }
    const minutes12 = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours12}:${minutes12} ${period}`;
}

export function isPastDateTimes(date, time) {
    const currentDateTime = new Date();
    const combinedDateTime = new Date(
        date.year,
        parseInt(date.month),
        date.day,
        ...time.split(":").map(Number)
    );

    return combinedDateTime < currentDateTime;
}

export function addTimes(startTimeString, durationString) {
    const [startPart, startPeriod] = startTimeString.split(" ");
    const [startHours, startMinutes] = startPart.split(":").map(Number);

    const [durationHours, durationMinutes] = durationString
        .split(":")
        .map(Number);

    let totalStartMinutes = startHours * 60 + startMinutes;
    if (startPeriod === "PM") {
        totalStartMinutes += 12 * 60;
    }

    const totalDurationMinutes = durationHours * 60 + durationMinutes;

    let totalEndMinutes = totalStartMinutes + totalDurationMinutes;

    const endPeriod = totalEndMinutes >= 12 * 60 ? "PM" : "AM";
    totalEndMinutes %= 12 * 60;

    const endHours = Math.floor(totalEndMinutes / 60);
    const endMinutes = totalEndMinutes % 60;

    const formattedEndTime = `${String(endHours || 12).padStart(2, "0")}:${String(
        endMinutes
    ).padStart(2, "0")} ${endPeriod}`;

    return formattedEndTime;
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
