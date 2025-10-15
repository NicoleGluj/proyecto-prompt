
// Página de registro de usuario
export const Register = ({ onSwitchToLogin, onRegisterSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    comments: "",
  });
  const [errors, setErrors] = useState({});
  const [serverMessage, setServerMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim() || form.name.trim().length < 3) errs.name = "Nombre debe tener al menos 3 caracteres.";
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Correo inválido.";
    if (!form.age || Number(form.age) <= 0) errs.age = "Edad debe ser mayor a 0.";
    if (!form.gender) errs.gender = "Debe seleccionar un género.";
    if (!form.comments.trim()) errs.comments = "Comentarios no pueden estar vacíos.";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    setServerMessage("");

    if (Object.keys(validationErrors).length === 0) {
      setTimeout(() => {
        if (form.email === "error@test.com") {
          setServerMessage("Error del servidor: correo ya registrado.");
        } else {
          setServerMessage("Registro exitoso!");
          onRegisterSuccess(form.name);
        }
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Registrarse</h2>

        <div className="flex flex-col">
          <input type="text" name="name" placeholder="Nombre" value={form.name} onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          {errors.name && <span className="text-red-600 text-sm">{errors.name}</span>}
        </div>

        <div className="flex flex-col">
          <input type="text" name="email" placeholder="Correo Electrónico" value={form.email} onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          {errors.email && <span className="text-red-600 text-sm">{errors.email}</span>}
        </div>

        <div className="flex flex-col">
          <input type="number" name="age" placeholder="Edad" value={form.age} onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          {errors.age && <span className="text-red-600 text-sm">{errors.age}</span>}
        </div>

        <div className="flex flex-col">
          <select name="gender" value={form.gender} onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Seleccione Género</option>
            <option value="Femenino">Femenino</option>
            <option value="Masculino">Masculino</option>
            <option value="Otro">Otro</option>
          </select>
          {errors.gender && <span className="text-red-600 text-sm">{errors.gender}</span>}
        </div>

        <div className="flex flex-col">
          <textarea name="comments" placeholder="Comentarios" value={form.comments} onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          {errors.comments && <span className="text-red-600 text-sm">{errors.comments}</span>}
        </div>

        <button type="submit" className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition font-semibold">
          Registrarse
        </button>

        {serverMessage && (
          <p className={`text-sm ${serverMessage.includes("error") ? "text-red-600" : "text-green-600"}`}>
            {serverMessage}
          </p>
        )}

        <p className="text-sm text-gray-600 text-center">
          ¿Ya tienes cuenta?{" "}
          <button type="button" onClick={onSwitchToLogin} className="text-blue-600 hover:underline">
            Iniciar sesión
          </button>
        </p>
      </form>
    </div>
  );
};