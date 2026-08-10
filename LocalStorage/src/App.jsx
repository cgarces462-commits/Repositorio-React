
import { useState, useEffect } from "react";
import ContactoCard from "./components/ContactoCard";
import FormularioContacto from "./components/FormularioContacto";
import useLocalStorage from "./hook/LocalStorage";

// Definimos los estilos de brillo neón como constantes para reutilizar
const neonTextPurple = "text-purple-300 [text-shadow:_0_0_7px_#fff,_0_0_10px_#9333ea,_0_0_21px_#9333ea]";
const neonBorderPurple = "border-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.5)]";
const neonTextCyan = "text-cyan-200 [text-shadow:_0_0_7px_#fff,_0_0_10px_#06b6d4,_0_0_21px_#06b6d4]";
const neonBorderCyan = "border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.5)]";

export default function App() {
  const [contactos, setContactos] = useLocalStorage("contactos", [
    { id: 1, nombre: "Carolina Pérez", telefono: "300 123 4567", correo: "carolina@sena.edu.co", etiqueta: "Aprendiz" },
    { id: 2, nombre: "Cesar Yair", telefono: "300 134 4567", correo: "cesar@sena.edu.co", etiqueta: "Aprendiz" },
    { id: 3, nombre: "Juan Agudelo", telefono: "300 433 4554", correo: "agudelo@sena.edu.co", etiqueta: "Aprendiz" },
  ]);

  const [busqueda, setBusqueda] = useState("");
  const [usuario, setUsuario] = useState("");
  // Neón Púrpura (false) y Cian (true)
  const [colorNeonAlt, setColorNeonAlt] = useState(false);

    useEffect(() => {
  if (usuario.trim() !== "") {
    document.title = `${usuario} - Agenda ADSO (${contactos.length})`;
  } else {
    document.title = `Agenda ADSO (${contactos.length} contactos)`;
  }
}, [usuario, contactos]);

  // Selección dinámica de clases basadas en el estado del color con condicionales ternarios 
  const currentNeonText = colorNeonAlt ? neonTextCyan : neonTextPurple;
  const currentNeonBorder = colorNeonAlt ? neonBorderCyan : neonBorderPurple;
  const currentBgBtn = colorNeonAlt ? "bg-cyan-950 border-cyan-400 text-cyan-100 hover:bg-cyan-900" : "bg-purple-950 border-purple-500 text-purple-100 hover:bg-purple-900";



  const agregarContacto = (nuevo) => {
    setContactos([...contactos, { id: Date.now(), ...nuevo }]);
  };

  const eliminarContacto = (id) => {
    setContactos(contactos.filter((c) => c.id !== id));
  };

  const contactosFiltrados = contactos.filter((contacto) =>
    contacto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    // Fondo base 
    <main className="min-h-screen bg-slate-950 text-slate-300 font-sans antialiased transition-colors duration-500">
      <div className="max-w-5xl mx-auto px-6 py-10">
        
        {/* Encabezado */}
        <div className="flex justify-between items-center mb-10 pb-4 border-b border-slate-800">
          <div>
            <h1 className={`text-5xl font-extrabold tracking-tighter ${currentNeonText}`}>
              Agenda ADSO v2
            </h1>
            <p className="text-slate-500 mt-1 font-light tracking-wide">
              Sistema de Gestión de Contactos Futu_ristas
            </p>
          </div>

          <button
            onClick={() => setColorNeonAlt(!colorNeonAlt)}
            className={`border px-5 py-2 rounded-md transition-all duration-300 font-mono text-sm tracking-widest uppercase ${currentBgBtn} ${currentNeonBorder}`}
          >
            {colorNeonAlt ? "Modo: Cian" : "Modo: Púrpura"}
          </button>
        </div>

        {/* Saludo y Nombre de Usuario */}
        <div className={`bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 mb-8 border ${currentNeonBorder} transition-all duration-500`}>
          <label className="block text-xs uppercase tracking-widest text-slate-500 mb-2 font-mono">Identificación de Usuario</label>
          <input
            type="text"
            placeholder="Ingrese credenciales de usuario..."
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            // Estilo de input oscuro con borde neón al hacer focus
            className={`w-full bg-slate-800 border border-slate-700 text-slate-100 rounded-lg p-3 outline-none transition-all focus:ring-1 ${colorNeonAlt ? 'focus:border-cyan-400 focus:ring-cyan-400' : 'focus:border-purple-500 focus:ring-purple-500'}`}
          />

          {usuario && (
            <div className="mt-5 pt-5 border-t border-slate-800">
              <h2 className={`text-3xl font-bold tracking-tight ${currentNeonText}`}>
                &gt; Bienvenido, {usuario}
              </h2>
              <p className="text-slate-400 mt-1 font-light">
                Acceso autorizado a la base de datos de contactos.
              </p>
            </div>
          )}
        </div>

        {/* Sección Formulario */}
        <section className="mb-10">
          <h3 className="text-sm uppercase tracking-widest text-slate-500 mb-4 font-mono">Añadir Nuevo Registro</h3>
          {/* Pasamos las clases de neón actuales al formulario para que se adapte */}
          <FormularioContacto 
            onAgregar={agregarContacto} 
            neonStyle={{text: currentNeonText, border: currentNeonBorder, colorAlt: colorNeonAlt}} 
          />
        </section>

        {/* Buscador */}
        <div className="mt-12 mb-8 relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">🔍</span>
          <input
            type="text"
            placeholder="Buscar contacto en la red..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className={`w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-full pl-12 pr-4 py-3 shadow-inner outline-none transition-all focus:ring-1 ${colorNeonAlt ? 'focus:border-cyan-400 focus:ring-cyan-400' : 'focus:border-purple-500 focus:ring-purple-500'}`}
          />
        </div>

        {/* Lista de Contactos */}
        <section>
            <h3 className="text-sm uppercase tracking-widest text-slate-500 mb-5 font-mono">Registros Encontrados ({contactosFiltrados.length})</h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contactosFiltrados.length > 0 ? (
                contactosFiltrados.map((c) => (
                  <ContactoCard
                    key={c.id}
                    id={c.id}
                    nombre={c.nombre}
                    telefono={c.telefono}
                    correo={c.correo}
                    etiqueta={c.etiqueta}
                    onDelete={eliminarContacto}
                    // Pasamos estilos neón a la tarjeta
                    neonStyle={{text: currentNeonText, border: currentNeonBorder}}
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
        </section>

        {/* Footer decorativo */}
        <footer className="mt-20 pt-8 border-t border-slate-800 text-center text-xs text-slate-700 font-mono">
            ADSO Network Protocols © 2077 - Terminal ID: {Date.now()}
        </footer>
      </div>
    </main>
  );
}