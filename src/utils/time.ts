export const convertTimeTo12 = (time: string) => {
  const [hour, minute] = time.split(":");
  const formated = new Date(0, 0, 0, parseInt(hour), parseInt(minute));

  // make it in 12 hours format
  return formated.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const timeDifference = (time1: string, time2: string) => {
  // Parse the times into Date objects
  const date1 = new Date();
  const [hours1, minutes1] = time1.split(":").map(Number);
  date1.setHours(hours1);
  date1.setMinutes(minutes1);

  const date2 = new Date();
  const [hours2, minutes2] = time2.split(":").map(Number);
  date2.setHours(hours2);
  date2.setMinutes(minutes2);

  // Calculate the time difference in milliseconds
  const timeDifference = Math.abs(date2 - date1);

  // Convert the time difference to hours and minutes
  const hoursDifference = Math.floor(timeDifference / (60 * 60 * 1000));
  const minutesDifference = Math.floor(
    (timeDifference % (60 * 60 * 1000)) / (60 * 1000)
  );

  return `${hoursDifference}h ${minutesDifference}min`;
};
