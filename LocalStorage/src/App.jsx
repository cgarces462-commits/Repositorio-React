
import LocalStorage from "./hook/LocalStorage";

export default function App(){ 
  const [nombre, setNombre] = LocalStorage("nombre" , "");
  const [tema, setTema] = LocalStorage("tema", "claro");
  return(
    <div style={{padding: "10px", background: tema === "claro" ? "#333" : "white", color: tema === "claro" ? "black" : "white"}}>
<h1>hola, {nombre  || "invitado"}</h1>
<input 
type="text" 
placeholder="Escriba nombre"  
value={nombre}
onChange={(e) => setNombre(e.target.value)}
/>
<button onDoubleClick={() => setTema(tema === "claro" ? "oscuro" : "claro")}> Cambiar tema </button>
    </div>
  )
}


// Captura: formulario completado y botón "Agregar contacto"
// Captura: lista con al menos 3 contactos, con toda su información
// Captura: demostración del proceso de eliminar un contacto
// Captura: recarga del navegador (F5) mostrando que los datos persisten
// Commit realizado con el mensaje exacto: Clase_5_Agenda_ADSO_v3_LocalStorage
// toma en cuenta esos parametros y aplica el local storage al formulario y el saludo