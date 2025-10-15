import { useState } from "react";
import { DAYS, addDays, generatePlan, iterateDates } from '../utils/helpers';
import { Header } from "./Header";


export const Planner = ({ user, onLogout }) => {
  const today = new Date();
  const isoToday = today.toISOString().slice(0, 10);

  const [startDate, setStartDate] = useState(isoToday);
  const [examDate, setExamDate] = useState(addDays(today, 7).toISOString().slice(0, 10));
  const [pages, setPages] = useState(120);
  const [unavailableDays, setUnavailableDays] = useState([]);
  const [plan, setPlan] = useState([]);

  const totalDays = iterateDates(new Date(startDate), new Date(examDate))
    .filter(d => !unavailableDays.includes(d.getDay())).length;
  const pagesPerDay = totalDays ? Math.ceil(pages / totalDays) : 0;

  const toggleDay = (dow) => {
    setUnavailableDays(prev => prev.includes(dow) ? prev.filter(d => d !== dow) : [...prev, dow]);
  };

  const handleGenerate = () => {
    setPlan(generatePlan({ startDate, examDate, totalPages: pages, unavailableDays }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg">
        <Header user={user} onLogout={onLogout} />
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col">
              <span className="text-sm font-semibold text-gray-700">Comienzo</span>
              <input type="date" value={startDate} min={isoToday} onChange={e => setStartDate(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </label>
            <label className="flex flex-col">
              <span className="text-sm font-semibold text-gray-700">Fecha del examen</span>
              <input type="date" value={examDate} min={addDays(new Date(startDate), 1).toISOString().slice(0, 10)}
                onChange={e => setExamDate(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </label>
          </div>
          <label className="flex flex-col">
            <span className="text-sm font-semibold text-gray-700">Cantidad de páginas</span>
            <input type="number" min={1} value={pages} onChange={e => setPages(parseInt(e.target.value || 0))}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </label>

          <div className="text-gray-700 font-medium">
            {totalDays > 0
              ? `Cada día disponible deberías estudiar aproximadamente ${pagesPerDay} páginas (${totalDays} días disponibles)`
              : "No hay días disponibles entre las fechas seleccionadas"}
          </div>

          <div className="flex gap-2 flex-wrap">
            {DAYS.map((d, i) => (
              <button key={i} onClick={() => toggleDay(i)}
                className={`px-3 py-1 rounded border ${unavailableDays.includes(i) ? "bg-red-500 text-white" : "bg-gray-200 text-gray-800"
                  } transition`}>{d}</button>
            ))}
          </div>

          <button onClick={handleGenerate}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-semibold">
            Generar plan
          </button>

          {plan.length > 0 && (
            <div className="mt-4 border border-gray-300 rounded p-4 bg-gray-50 space-y-2">
              <h2 className="font-semibold text-gray-700">Resumen del plan:</h2>
              {plan.map(p => (
                <div key={p.date} className="flex justify-between text-gray-700">
                  <span>{p.date}</span>
                  <span>{p.pages} páginas</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
