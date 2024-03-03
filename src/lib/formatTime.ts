// Utility function to format time to 'HH:mm AM/PM'
// When the input is in "HH:mm:ss" format
export const formatTimeToMelbourneAmPm = (time: string): string => {
  const [hour, minute] = time.split(":");

  let hourInMelbourne = parseInt(hour, 10);
  const isPm = hourInMelbourne >= 12;
  console.log("hoursInMelbourne", hourInMelbourne);
  console.log("isPm", isPm);
  if (hourInMelbourne > 12) hourInMelbourne -= 12; // Convert to 12-hour format

  return `${hourInMelbourne}:${minute} ${isPm ? "PM" : "AM"}`;
};
