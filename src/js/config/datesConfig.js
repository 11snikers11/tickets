const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

const monthsShort = returnThreeFirstLetters(months);

const weekdays = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
const weekdaysShort = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

function returnThreeFirstLetters(stringsArray) {
  let short = [];
  stringsArray.forEach((string) => {
    short.push(string.substring(0, 3));
  });
  return short;
}

const datesConfig = {
  months,
  monthsShort,
  weekdays,
  weekdaysShort,
  weekdaysAbbrev: weekdaysShort,
  cancel: "Отмена",
  clear: "Очистить",
  done: "Выбрать",
};

export default datesConfig;