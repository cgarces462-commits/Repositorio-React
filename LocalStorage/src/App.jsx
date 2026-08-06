import { useState } from "react";
import "./App.css";

import ContactoCard from "./components/ContactoCard";
import FormularioContacto from "./components/FormularioContacto";

import useLocalStorage from "./hook/LocalStorage";


export default function App() {

  const [contactos, setContactos] = useLocalStorage(
    "contactos",
    [
      {
        id: 1,
        nombre: "Carolina Pérez",
        telefono: "300 123 4567",
        correo: "carolina@sena.edu.co",
        etiqueta: "Aprendiz",
      },
      {
        id: 2,
        nombre: "Cesar Yair",
        telefono: "300 134 4567",
        correo: "Cesar@sena.edu.co",
        etiqueta: "Aprendiz",
      },
      {
        id: 3,
        nombre: "Juan Agudelo",
        telefono: "300 433 4554",
        correo: "agudelo@sena.edu.co",
        etiqueta: "Aprendiz",
      }
    ]
  );


  const [busqueda, setBusqueda] = useState("");

  const [usuario, setUsuario] = useState("");

  const [tema, setTema] = useState(false);



  const agregarContacto = (nuevo) => {
    setContactos([
      ...contactos,
      {
        id: Date.now(),
        ...nuevo
      }
    ]);
  };


  const eliminarContacto = (id) => {
    setContactos(
      contactos.filter(
        c => c.id !== id
      )
    );
  };


  const contactosFiltrados = contactos.filter(
    contacto =>
      contacto.nombre
        .toLowerCase()
        .includes(busqueda.toLowerCase())
  );



  return (

    <main className={tema ? "app-container negro" : "app-container"}>


      <button
        className="tema"
        onClick={() => setTema(!tema)}
      >
        {tema ? " Morado" : " Negro"}
      </button>



      <h1 className="app-title">
        Agenda ADSO v2
      </h1>



      <input

        className="saludo"

        placeholder="Escribe tu nombre..."

        value={usuario}

        onChange={(e) => setUsuario(e.target.value)}

      />



      {
        usuario &&
        <h2 className="bienvenida">
          Hola {usuario} 👋
          <br />
          Bienvenido a tu agenda
        </h2>
      }




      <FormularioContacto
        onAgregar={agregarContacto}
      />



      <input

        className="input-busqueda"

        placeholder="Buscar contacto..."

        value={busqueda}

        onChange={
          (e) => setBusqueda(e.target.value)
        }

      />



      <section className="lista-contactos">


        {
          contactosFiltrados.length > 0 ?

            contactosFiltrados.map(c => (

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

            :

            <p className="sin-resultados">
              No hay contactos
            </p>

        }


      </section>


    </main>

  )

}