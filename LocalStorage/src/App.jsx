// Importa el hook para manejar estado local.
import { useState } from "react";

// Importa estilos globales del componente principal.
import "./App.css";

// Importa la tarjeta visual para cada contacto.
import ContactoCard from "./components/ContactoCard";

// Importa el formulario para crear contactos.
import FormularioContacto from "./components/FormularioContacto";

// Componente principal de la agenda.
export default function App() {
  // Estado: lista de contactos inicial con un ejemplo.
  const [contactos, setContactos] = useState([
    {
      id: 1,
      nombre: "Carolina Pérez",
      telefono: "300 123 4567",
      correo: "carolina@sena.edu.co",
      etiqueta: "Compañera",
    },
  ]);

  
  // Estado para el buscador.
  const [busqueda, setBusqueda] = useState("");

  // Agrega un nuevo contacto.
  const agregarContacto = (nuevo) => {
    setContactos((prev) => [...prev, { id: Date.now(), ...nuevo }]);
  };

  // Elimina un contacto.
  const eliminarContacto = (id) => {
    setContactos((prev) => prev.filter((c) => c.id !== id));
  };

  // Lista filtrada sin modificar el arreglo original.
  const contactosFiltrados = contactos.filter((contacto) =>
    contacto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <main className="app-container">
      <h1 className="app-title">Agenda ADSO v2</h1>

      <FormularioContacto onAgregar={agregarContacto} />

      {/* Buscador */}
      <input
        type="text"
        placeholder="Buscar contacto..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="input-busqueda"
      />

      <section className="lista-contactos">
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
            />
          ))
        ) : (
          <p className="sin-resultados">
            No se encontraron contactos
          </p>
        )}
      </section>
    </main>
  );
}