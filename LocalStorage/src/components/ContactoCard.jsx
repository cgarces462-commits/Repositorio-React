
export default function ContactoCard({
  id,
  nombre,
  telefono,
  correo,
  etiqueta,
  onDelete,
}) {
  return (
    <article className="bg-slate-900 rounded-2xl p-5 border border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.15)] hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:border-purple-400 transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-white tracking-wide [text-shadow:_0_0_8px_#c084fc]">
            {nombre}
          </h3>

          {etiqueta && (
            <span className="inline-block mt-2 bg-purple-950/80 text-purple-300 text-xs font-semibold px-3 py-1 rounded-full border border-purple-500/50 shadow-[0_0_8px_rgba(168,85,247,0.3)]">
              {etiqueta}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-2 text-slate-300 text-sm">
        <p className="flex items-center gap-2">
          <span>📞</span>
          <span className="font-medium tracking-wide text-slate-200">{telefono}</span>
        </p>

        {correo && (
          <p className="flex items-center gap-2">
            <span>✉️</span>
            <span className="font-medium tracking-wide text-slate-200">{correo}</span>
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={() => onDelete(id)}
        className="mt-5 w-full bg-red-950/40 hover:bg-red-900/60 text-red-400 hover:text-red-200 border border-red-500/50 hover:border-red-400 font-semibold py-2.5 rounded-xl transition duration-300 shadow-[0_0_10px_rgba(239,68,68,0.2)] hover:shadow-[0_0_15px_rgba(239,68,68,0.5)]"
      >
        Eliminar
      </button>
    </article>
  );
}