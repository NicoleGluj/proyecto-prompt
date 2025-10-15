
// Funciones auxiliares para manejo de fechas y generación de plan

// Array con los nombres de los días de la semana, de domingo a sábado
export const DAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];


// Recibe una fecha `d` y un número `n` de días a sumar.
// Devuelve una nueva fecha que es `n` días después de `d`.
export const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);


// Recibe una fecha `d` y devuelve una nueva fecha solo con año, mes y día,
// descartando la hora, minutos y segundos.  
// Esto es útil para comparar fechas sin considerar la hora.
const dateOnly = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());


// Genera un array con todas las fechas entre `start` y `end` (inclusive).
// - start: fecha inicial
// - end: fecha final
// Devuelve un array de objetos Date, uno por cada día en el rango.
export const iterateDates = (start, end) => {
  const dates = [];
  let current = dateOnly(start);
  while (current <= dateOnly(end)) {
    dates.push(new Date(current));
    current = addDays(current, 1);
  }
  return dates;
};


// Genera un plan de estudio distribuyendo las páginas entre los días disponibles
// - startDate: fecha de inicio del estudio
// - examDate: fecha del examen
// - totalPages: total de páginas a estudiar
// - unavailableDays: array de días de la semana que NO se estudiará (0 = domingo, 1 = lunes, ...)
//
// Retorna un array de objetos con:
// { date: "YYYY-MM-DD", pages: número de páginas a estudiar ese día }
export const generatePlan = ({ startDate, examDate, totalPages, unavailableDays }) => {
  const dates = iterateDates(new Date(startDate), new Date(examDate));
  const availableDates = dates.filter(d => !unavailableDays.includes(d.getDay()));
  const pagesPerDay = availableDates.length ? Math.ceil(totalPages / availableDates.length) : 0;
  return availableDates.map((d, i) => ({
    date: d.toISOString().slice(0, 10),
    pages: i === availableDates.length - 1
      ? totalPages - pagesPerDay * (availableDates.length - 1)
      : pagesPerDay,
  }));
};




