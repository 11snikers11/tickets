import { format } from "date-fns";
import { ru } from "date-fns/locale";

/**
 *
 * @param {String} str - date in string
 * @param {String} type - date format template
 * @param {String} return - formatted by template date
 */
export function formatDate(str, type) {
  const date = new Date(str);
  return format(date, type, {
    locale: ru,
  });
}