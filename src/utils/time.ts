export const convertTimeTo12 = (time: string) => {
   let timeParts = time.split(':');
   let hours = parseInt(timeParts[0]);
   let minutes = parseInt(timeParts[1]);

   let meridiem = hours >= 12 ? 'PM' : 'AM';

   hours = hours % 12;
   hours = hours ? hours : 12;

  let minutesStr = minutes < 10 ? '0' + minutes : minutes;

   let time12 = hours + ':' + minutesStr + ' ' + meridiem;
   return time12;
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
