import { useState } from "react";

export default function FormularioContacto({ onAgregar }) {

  // =============================
  // ESTADOS
  // =============================

  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    etiqueta: "",
  });

  const [errores, setErrores] = useState({
    nombre: "",
    telefono: "",
    correo: "",
  });

  const [enviando, setEnviando] = useState(false);

  // =============================
  // CAMBIAR CAMPOS
  // =============================

  const onChange = (e) => {

    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpiar error mientras escribe
    setErrores((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // =============================
  // VALIDAR FORMULARIO
  // =============================
const validarFormulario = () => {

  const nuevosErrores = {
    nombre: "",
    telefono: "",
    correo: "",
  };

  if (!form.nombre.trim()) {
    nuevosErrores.nombre =
      "El nombre es obligatorio.";
  }

  if (!form.telefono.trim()) {
    nuevosErrores.telefono =
      "El teléfono es obligatorio.";
  } else if (form.telefono.trim().length < 7) {
    nuevosErrores.telefono =
      "El teléfono debe tener mínimo 7 caracteres.";
  }

  if (!form.correo.trim()) {
    nuevosErrores.correo =
      "El correo es obligatorio.";
  } else if (!form.correo.includes("@")) {
    nuevosErrores.correo =
      "El correo debe contener @.";
  }

  setErrores(nuevosErrores);

  return (
    !nuevosErrores.nombre &&
    !nuevosErrores.telefono &&
    !nuevosErrores.correo
  );
};

  // =============================
  // ENVIAR FORMULARIO
  // =============================

  const onSubmit = async (e) => {

    e.preventDefault();

    // Primero validamos
    if (!validarFormulario()) {
      return;
    }

    // Cambia el botón a "Guardando..."
    setEnviando(true);

    try {

      // Esperamos a que JSON Server guarde
      await onAgregar(form);

      // Si todo salió bien, limpiamos el formulario
      setForm({
        nombre: "",
        telefono: "",
        correo: "",
        etiqueta: "",
      });

    } finally {

      // Siempre vuelve a activar el botón
      setEnviando(false);
    }
  };

  // =============================
  // INTERFAZ
  // =============================

  return (

    <form
      onSubmit={onSubmit}
      className="bg-slate-900/90 rounded-2xl p-6 mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.2)] backdrop-blur-sm"
    >

      {/* NOMBRE */}

      <div className="flex flex-col">

        <label className="text-xs font-semibold text-purple-300 uppercase tracking-widest mb-1.5">
          Nombre *
        </label>

        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={onChange}
          className="bg-slate-950 text-white placeholder-slate-500 border border-slate-700 rounded-lg p-3 outline-none transition-all focus:border-purple-400 focus:shadow-[0_0_12px_rgba(168,85,247,0.5)]"
        />

        {errores.nombre && (
          <p className="text-xs text-red-500 mt-1">
            {errores.nombre}
          </p>
        )}

      </div>

      {/* TELÉFONO */}

      <div className="flex flex-col">

        <label className="text-xs font-semibold text-purple-300 uppercase tracking-widest mb-1.5">
          Teléfono *
        </label>

        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={form.telefono}
          onChange={onChange}
          className="bg-slate-950 text-white placeholder-slate-500 border border-slate-700 rounded-lg p-3 outline-none transition-all focus:border-purple-400 focus:shadow-[0_0_12px_rgba(168,85,247,0.5)]"
        />

        {errores.telefono && (
          <p className="text-xs text-red-500 mt-1">
            {errores.telefono}
          </p>
        )}

      </div>

      {/* CORREO */}

      <div className="flex flex-col">

        <label className="text-xs font-semibold text-purple-300 uppercase tracking-widest mb-1.5">
          Correo
        </label>

        <input
          type="email"
          name="correo"
          placeholder="Correo electrónico"
          value={form.correo}
          onChange={onChange}
          className="bg-slate-950 text-white placeholder-slate-500 border border-slate-700 rounded-lg p-3 outline-none transition-all focus:border-purple-400 focus:shadow-[0_0_12px_rgba(168,85,247,0.5)]"
        />

        {errores.correo && (
          <p className="text-xs text-red-500 mt-1">
            {errores.correo}
          </p>
        )}

      </div>

      {/* ETIQUETA */}

      <div className="flex flex-col">

        <label className="text-xs font-semibold text-purple-300 uppercase tracking-widest mb-1.5">
          Etiqueta
        </label>

        <input
          type="text"
          name="etiqueta"
          placeholder="Ej: Aprendiz"
          value={form.etiqueta}
          onChange={onChange}
          className="bg-slate-950 text-white placeholder-slate-500 border border-slate-700 rounded-lg p-3 outline-none transition-all focus:border-purple-400 focus:shadow-[0_0_12px_rgba(168,85,247,0.5)]"
        />

      </div>

      {/* BOTÓN */}

      <button
        type="submit"
        disabled={enviando}
        className="md:col-span-2 mt-2 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition duration-300 shadow-[0_0_15px_rgba(192,132,252,0.4)] uppercase tracking-wider text-sm"
      >
        {enviando
          ? "Guardando..."
          : "+ Agregar contacto"}
      </button>

    </form>
  );
}