import { useState, useEffect } from "react";

import ContactoCard from "./components/ContactoCard";
import FormularioContacto from "./components/FormularioContacto";

// ===============================
// CONFIGURACIÓN DE LA API
// ===============================

const API_URL = "http://localhost:3001/contactos";

// ===============================
// ESTILOS NEÓN
// ===============================

const neonTextPurple =
  "text-purple-300 [text-shadow:0_0_7px_#fff,0_0_10px_#9333ea,0_0_21px_#9333ea]";

const neonBorderPurple =
  "border-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.5)]";

const neonTextCyan =
  "text-cyan-200 [text-shadow:0_0_7px_#fff,0_0_10px_#06b6d4,0_0_21px_#06b6d4]";

const neonBorderCyan =
  "border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.5)]";

// ===============================
// APP
// ===============================

export default function App() {

  // =============================
  // ESTADOS
  // =============================

  const [contactos, setContactos] = useState([]);

  const [mensajeExito, setMensajeExito] = useState("");

  const [error, setError] = useState("");

  const [cargando, setCargando] = useState(true);

  const [busqueda, setBusqueda] = useState("");

  const [usuario, setUsuario] = useState("");

  const [colorNeonAlt, setColorNeonAlt] = useState(false);

  // Ordenamiento
  const [ordenAZ, setOrdenAZ] = useState(true);

  // Paginación
  const [paginaActual, setPaginaActual] = useState(1);

  const contactosPorPagina = 6;

  // =============================
  // CARGAR CONTACTOS
  // =============================

  useEffect(() => {

    const cargarContactos = async () => {

      try {

        setCargando(true);
        setError("");

        const respuesta = await fetch(API_URL);

        if (!respuesta.ok) {
          throw new Error("Error al cargar contactos");
        }

        const data = await respuesta.json();

        setContactos(data);

      } catch (error) {

        console.error("Error al cargar contactos:", error);

        setError(
          "No se pudieron cargar los contactos. Verifica que el servidor esté encendido e intenta de nuevo."
        );

      } finally {

        setCargando(false);

      }
    };

    cargarContactos();

  }, []);

  // =============================
  // TÍTULO
  // =============================

  useEffect(() => {

    if (usuario.trim() !== "") {

      document.title =
        `${usuario} - Agenda ADSO (${contactos.length})`;

    } else {

      document.title =
        `Agenda ADSO (${contactos.length} contactos)`;

    }

  }, [usuario, contactos]);

  // =============================
  // ESTILOS DINÁMICOS
  // =============================

  const currentNeonText = colorNeonAlt
    ? neonTextCyan
    : neonTextPurple;

  const currentNeonBorder = colorNeonAlt
    ? neonBorderCyan
    : neonBorderPurple;

  const currentBgBtn = colorNeonAlt
    ? "bg-cyan-950 border-cyan-400 text-cyan-100 hover:bg-cyan-900"
    : "bg-purple-950 border-purple-500 text-purple-100 hover:bg-purple-900";

  // =============================
  // AGREGAR CONTACTO
  // =============================

  const agregarContacto = async (nuevo) => {

    setMensajeExito("");
    setError("");

    try {

      const respuesta = await fetch(API_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(nuevo),
      });

      if (!respuesta.ok) {
        throw new Error("Error al guardar contacto");
      }

      const contactoCreado = await respuesta.json();

      setContactos((prev) => [
        ...prev,
        contactoCreado,
      ]);

      setMensajeExito(
        "Contacto guardado correctamente."
      );

    } catch (error) {

      console.error("Error al guardar contacto:", error);

      setError(
        "No se pudo guardar el contacto. Verifica que el servidor esté encendido e intenta de nuevo."
      );

      throw error;
    }
  };

  // =============================
  // ELIMINAR CONTACTO
  // =============================

  const eliminarContacto = async (id) => {

    setError("");
    setMensajeExito("");

    try {

      const respuesta = await fetch(
        `${API_URL}/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!respuesta.ok) {
        throw new Error("Error al eliminar contacto");
      }

      // filter crea un nuevo array, no modifica el original
      setContactos((prev) =>
        prev.filter((c) => c.id !== id)
      );

    } catch (error) {

      console.error("Error al eliminar contacto:", error);

      setError(
        "No se pudo eliminar el contacto. Verifica que el servidor esté encendido."
      );

    }
  };

  // =============================
  // FILTRAR + ORDENAR
  // =============================

  const contactosFiltrados = contactos
    .filter((contacto) =>
      contacto.nombre
        .toLowerCase()
        .includes(busqueda.toLowerCase())
    );

  // IMPORTANTE:
  // [...contactosFiltrados] crea una copia.
  // Así sort() NO modifica el array original.
  const contactosOrdenados = [...contactosFiltrados].sort(
    (a, b) => {

      const nombreA = a.nombre.toLowerCase();
      const nombreB = b.nombre.toLowerCase();

      if (ordenAZ) {
        return nombreA.localeCompare(nombreB);
      } else {
        return nombreB.localeCompare(nombreA);
      }

    }
  );

  // =============================
  // PAGINACIÓN
  // =============================

  const totalPaginas = Math.ceil(
    contactosOrdenados.length / contactosPorPagina
  );

  const indiceInicial =
    (paginaActual - 1) * contactosPorPagina;

  const indiceFinal =
    indiceInicial + contactosPorPagina;

  const contactosPaginados =
    contactosOrdenados.slice(
      indiceInicial,
      indiceFinal
    );

  // =============================
  // CAMBIAR PÁGINA
  // =============================

  const siguientePagina = () => {

    if (paginaActual < totalPaginas) {
      setPaginaActual(paginaActual + 1);
    }

  };

  const paginaAnterior = () => {

    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    }

  };

  // =============================
  // CAMBIAR ORDEN
  // =============================

  const cambiarOrden = () => {

    setOrdenAZ(!ordenAZ);

    // Cuando cambia el orden,
    // volvemos a la primera página.
    setPaginaActual(1);

  };

  // =============================
  // BUSCAR
  // =============================

  const cambiarBusqueda = (e) => {

    setBusqueda(e.target.value);

    // Al hacer una nueva búsqueda,
    // volvemos a la primera página.
    setPaginaActual(1);

  };

  // =============================
  // INTERFAZ
  // =============================

  return (

    <main className="min-h-screen bg-slate-950 text-slate-300 font-sans antialiased transition-colors duration-500">

      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* ENCABEZADO */}

        <div className="flex justify-between items-center mb-10 pb-4 border-b border-slate-800">

          <div>

            <h1
              className={`text-5xl font-extrabold tracking-tighter ${currentNeonText}`}
            >
              Agenda ADSO v2
            </h1>

            <p className="text-slate-500 mt-1 font-light tracking-wide">
              Sistema de Gestión de Contactos Futuristas
            </p>

          </div>

          <button
            onClick={() => setColorNeonAlt(!colorNeonAlt)}
            className={`border px-5 py-2 rounded-md transition-all duration-300 font-mono text-sm tracking-widest uppercase ${currentBgBtn} ${currentNeonBorder}`}
          >
            {colorNeonAlt
              ? "Modo: Cian"
              : "Modo: Púrpura"}
          </button>

        </div>

        {/* USUARIO */}

        <div
          className={`bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 mb-8 border ${currentNeonBorder} transition-all duration-500`}
        >

          <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2 font-mono">
            Identificación de Usuario
          </label>

          <input
            type="text"
            placeholder="Ingrese credenciales de usuario..."
            value={usuario}
            onChange={(e) =>
              setUsuario(e.target.value)
            }
            className={`w-full bg-slate-800 border border-slate-700 text-slate-100 rounded-lg p-3 outline-none transition-all focus:ring-1 ${
              colorNeonAlt
                ? "focus:border-cyan-400 focus:ring-cyan-400"
                : "focus:border-purple-500 focus:ring-purple-500"
            }`}
          />

          {usuario && (

            <div className="mt-5 pt-5 border-t border-slate-800">

              <h2
                className={`text-3xl font-bold tracking-tight ${currentNeonText}`}
              >
                &gt; Bienvenido, {usuario}
              </h2>

              <p className="text-slate-400 mt-1 font-light">
                Acceso autorizado a la base de datos de contactos.
              </p>

            </div>

          )}

        </div>

        {/* ERROR GLOBAL */}

        {error && (

          <div className="mb-6 bg-red-950/50 border border-red-500 rounded-xl px-4 py-3 shadow-[0_0_15px_rgba(239,68,68,0.3)]">

            <p className="text-sm font-medium text-red-400">
              ⚠ {error}
            </p>

          </div>

        )}

        {/* FORMULARIO */}

        <section className="mb-10">

          <h3 className="text-sm uppercase tracking-widest text-slate-500 mb-4 font-mono">
            Añadir Nuevo Registro
          </h3>

          <FormularioContacto
            onAgregar={agregarContacto}
            neonStyle={{
              text: currentNeonText,
              border: currentNeonBorder,
              colorAlt: colorNeonAlt,
            }}
          />

          {mensajeExito && (

            <div className="mt-4 bg-green-950/50 border border-green-500 rounded-xl px-4 py-3 shadow-[0_0_15px_rgba(34,197,94,0.3)]">

              <p className="text-sm font-medium text-green-400">
                ✓ {mensajeExito}
              </p>

            </div>

          )}

        </section>

        {/* CARGANDO */}

        {cargando ? (

          <div className="text-center py-10">

            <p className="text-purple-400">
              Cargando contactos...
            </p>

          </div>

        ) : (

          <>

            {/* BUSCADOR + ORDEN */}

            <div className="mt-12 mb-8 flex gap-3">

              <div className="relative flex-1">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  🔍
                </span>

                <input
                  type="text"
                  placeholder="Buscar contacto en la red..."
                  value={busqueda}
                  onChange={cambiarBusqueda}
                  className={`w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-full pl-12 pr-4 py-3 shadow-inner outline-none transition-all focus:ring-1 ${
                    colorNeonAlt
                      ? "focus:border-cyan-400 focus:ring-cyan-400"
                      : "focus:border-purple-500 focus:ring-purple-500"
                  }`}
                />

              </div>

              {/* BOTÓN ORDENAR */}

              <button
                onClick={cambiarOrden}
                className={`px-5 py-3 rounded-full border font-mono text-sm uppercase tracking-wider transition-all duration-300 ${currentBgBtn} ${currentNeonBorder}`}
              >
                {ordenAZ
                  ? "A → Z"
                  : "Z → A"}
              </button>

            </div>

            {/* LISTA */}

            <section>

              <div className="flex justify-between items-center mb-5">

                <h3 className="text-sm uppercase tracking-widest text-slate-500 font-mono">
                  Registros Encontrados ({contactosFiltrados.length})
                </h3>

              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                {contactosPaginados.length > 0 ? (

                  contactosPaginados.map((c) => (

                    <ContactoCard
                      key={c.id}
                      id={c.id}
                      nombre={c.nombre}
                      telefono={c.telefono}
                      correo={c.correo}
                      etiqueta={c.etiqueta}
                      onDelete={eliminarContacto}
                      neonStyle={{
                        text: currentNeonText,
                        border: currentNeonBorder,
                      }}
                    />

                  ))

                ) : (

                  <div className="col-span-full text-center bg-slate-900 rounded-xl border border-dashed border-slate-700 p-12">

                    <h3 className="text-xl font-semibold text-slate-500">
                      [ ! ] Sin coincidencias
                    </h3>

                    <p className="text-slate-600 mt-2 font-light">
                      La búsqueda no arrojó resultados en la base de datos actual.
                    </p>

                  </div>

                )}

              </div>

              {/* =========================
                  PAGINACIÓN
              ========================= */}

              {totalPaginas > 0 && (

                <div className="flex justify-center items-center gap-4 mt-10">

                  <button
                    onClick={paginaAnterior}
                    disabled={paginaActual === 1}
                    className={`px-4 py-2 rounded-lg border font-mono text-sm transition-all duration-300 ${
                      paginaActual === 1
                        ? "border-slate-800 text-slate-700 cursor-not-allowed"
                        : `${currentBgBtn} ${currentNeonBorder}`
                    }`}
                  >
                    ← Anterior
                  </button>

                  <span
                    className={`font-mono text-sm ${currentNeonText}`}
                  >
                    Página {paginaActual} de {totalPaginas}
                  </span>

                  <button
                    onClick={siguientePagina}
                    disabled={paginaActual === totalPaginas}
                    className={`px-4 py-2 rounded-lg border font-mono text-sm transition-all duration-300 ${
                      paginaActual === totalPaginas
                        ? "border-slate-800 text-slate-700 cursor-not-allowed"
                        : `${currentBgBtn} ${currentNeonBorder}`
                    }`}
                  >
                    Siguiente →
                  </button>

                </div>

              )}

            </section>

          </>

        )}

        {/* FOOTER */}

        <footer className="mt-20 pt-8 border-t border-slate-800 text-center text-xs text-slate-700 font-mono">

          ADSO Network Protocols © 2077 - Terminal ID: {Date.now()}

        </footer>

      </div>

    </main>

  );
}