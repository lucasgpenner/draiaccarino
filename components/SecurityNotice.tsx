export function SecurityNotice() {
  return (
    <aside
      aria-labelledby="seguridad-titulo"
      className="rounded-lg border-l-4 border-gold-500 bg-ivory-50 p-6 md:p-8"
    >
      <h3 id="seguridad-titulo" className="text-xl">
        ¿Estás en una situación de violencia?
      </h3>
      <p className="mt-3 text-base leading-relaxed">
        Llamá al <strong>144</strong> (línea nacional para mujeres en situación de violencia) o al{" "}
        <strong>911</strong> si hay peligro inmediato. Después, podemos hablar de tu caso.
      </p>
    </aside>
  );
}
