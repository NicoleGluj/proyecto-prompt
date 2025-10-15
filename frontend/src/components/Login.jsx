import { useState } from "react";

// Página de inicio de sesión
export const Login = ({ onLogin, onSwitchToRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!username || !password) {
      setError("Debe completar ambos campos.");
      return;
    }
    setTimeout(() => {
      if (username === "user" && password === "123") {
        onLogin(username);
      } else {
        setError("Usuario o contraseña incorrectos.");
      }
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Iniciar sesión</h2>
        <div className="bg-gray-100 p-2 rounded text-sm text-gray-700">
          Para la demo use: <br />
          <strong>Usuario:</strong> user <br />
          <strong>Contraseña:</strong> 123
        </div>
        <input type="text" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-semibold">
          Login
        </button>
        <p className="text-sm text-gray-600 text-center">
          ¿No tienes cuenta?{" "}
          <button type="button" onClick={onSwitchToRegister} className="text-blue-600 hover:underline">
            Registrarse
          </button>
        </p>
      </form>
    </div>
  );
};
