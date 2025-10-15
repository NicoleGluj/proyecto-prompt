import React, { useState } from "react";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Planner } from "./components/Planner";

const App = () => {
  const [page, setPage] = useState("login"); // 'login' o 'register'
  const [user, setUser] = useState(null);

  const handleLogin = (username) => setUser(username);
  const handleRegisterSuccess = (username) => setUser(username);

  if (!user) {
    return page === "login" ? (
      <Login onLogin={handleLogin} onSwitchToRegister={() => setPage("register")} />
    ) : (
      <Register onSwitchToLogin={() => setPage("login")} onRegisterSuccess={handleRegisterSuccess} />
    );
  }

  return <Planner user={user} onLogout={() => setUser(null)} />;
};

export default App;
