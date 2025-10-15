
// Muestra título, usuario logueado y botón logout
export const Header = ({ user, onLogout }) => (
  <header className="bg-blue-600 text-white flex justify-between items-center p-4 mb-6 rounded-t-lg">
    <h1 className="font-bold text-lg">Planner de Estudio</h1>
    <div className="flex items-center gap-4">
      {user ? (
        <>
          <span className="font-semibold">{user}</span>
          <button
            onClick={onLogout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition text-sm"
          >
            Logout
          </button>
        </>
      ) : (
        <span>No logueado</span>
      )}
    </div>
  </header>
);