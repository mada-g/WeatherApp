export function dayName(date){
  const dayNames=[
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
    ];

  const dateObj = new Date(date);
  return dayNames[dateObj.getDay()];
}


export function dateFormat(dateIn){
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  let date = dateIn.slice(dateIn.indexOf('-')+1, dateIn.length);
  let dayNum = date.substring(date.lastIndexOf('-')+1, date.length);
  let monthNum = parseInt(date.substring(0, date.lastIndexOf('-')));

  if(dayNum.charAt(0) === '0')
    dayNum = dayNum.slice(1, dayNum.length);

  return months[monthNum-1] + " " + dayNum;

}
