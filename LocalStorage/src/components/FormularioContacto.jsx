//  import { useState } from "react";

// export default function FormularioContacto({ onAgregar }) {
//   const [form, setForm] = useState({
//     nombre: "",
//     telefono: "",
//     correo: "",
//     etiqueta: "",
//   });

//   const onChange = (e) => {
//     const { name, value } = e.target;

//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();

//     if (!form.nombre.trim() || !form.telefono.trim()) {
//       alert("Completa al menos Nombre y Teléfono");
//       return;
//     }

//     onAgregar(form);

//     setForm({
//       nombre: "",
//       telefono: "",
//       correo: "",
//       etiqueta: "",
//     });
//   };

//   return (
//     <form
//       onSubmit={onSubmit}
//       className="bg-white rounded-2xl shadow-lg p-6 mt-6 grid grid-cols-1 md:grid-cols-2 gap-4"
//     >
//       <div className="flex flex-col">
//         <label className="text-sm font-semibold text-gray-700 mb-1">
//           Nombre *
//         </label>

//         <input
//           type="text"
//           name="nombre"
//           placeholder="Nombre"
//           value={form.nombre}
//           onChange={onChange}
//           className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
//         />
//       </div>

//       <div className="flex flex-col">
//         <label className="text-sm font-semibold text-gray-700 mb-1">
//           Teléfono *
//         </label>

//         <input
//           type="text"
//           name="telefono"
//           placeholder="Teléfono"
//           value={form.telefono}
//           onChange={onChange}
//           className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
//         />
//       </div>

//       <div className="flex flex-col">
//         <label className="text-sm font-semibold text-gray-700 mb-1">
//           Correo
//         </label>

//         <input
//           type="email"
//           name="correo"
//           placeholder="Correo electrónico"
//           value={form.correo}
//           onChange={onChange}
//           className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
//         />
//       </div>

//       <div className="flex flex-col">
//         <label className="text-sm font-semibold text-gray-700 mb-1">
//           Etiqueta
//         </label>

//         <input
//           type="text"
//           name="etiqueta"
//           placeholder="Ej: Aprendiz"
//           value={form.etiqueta}
//           onChange={onChange}
//           className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
//         />
//       </div>

//       <button
//         type="submit"
//         className="md:col-span-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition duration-300 shadow-md"
//       >
//         Agregar contacto
//       </button>
//     </form>
//   );
// }
import { useState } from "react";

export default function FormularioContacto({ onAgregar }) {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    etiqueta: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!form.nombre.trim() || !form.telefono.trim()) {
      alert("Completa al menos Nombre y Teléfono");
      return;
    }

    onAgregar(form);

    setForm({
      nombre: "",
      telefono: "",
      correo: "",
      etiqueta: "",
    });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="bg-slate-900/90 rounded-2xl p-6 mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.2)] backdrop-blur-sm"
    >
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
      </div>

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
      </div>

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
      </div>

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

      <button
        type="submit"
        className="md:col-span-2 mt-2 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-bold py-3 rounded-xl transition duration-300 shadow-[0_0_15px_rgba(192,132,252,0.4)] hover:shadow-[0_0_25px_rgba(192,132,252,0.7)] uppercase tracking-wider text-sm"
      >
        + Agregar contacto
      </button>
    </form>
  );
}