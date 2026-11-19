const FESTIVOS_2027 = {
  '2027-01-01': 'Año Nuevo',
  '2027-01-11': 'Día de los Reyes Magos',
  '2027-03-22': 'Día de San José',
  '2027-03-25': 'Jueves Santo',
  '2027-03-26': 'Viernes Santo',
  '2027-05-01': 'Día del Trabajo',
  '2027-05-10': 'Ascensión del Señor',
  '2027-05-31': 'Corpus Christi',
  '2027-06-07': 'Sagrado Corazón de Jesús',
  '2027-06-28': 'San Pedro y San Pablo',
  '2027-07-05': 'San Pedro y San Pablo (traslado)',
  '2027-07-20': 'Día de la Independencia',
  '2027-08-07': 'Batalla de Boyacá',
  '2027-08-16': 'Asunción de la Virgen',
  '2027-10-18': 'Día de la Raza',
  '2027-11-01': 'Día de Todos los Santos',
  '2027-11-15': 'Independencia de Cartagena',
  '2027-12-08': 'Inmaculada Concepción',
  '2027-12-25': 'Navidad'
};

const MESES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];
const DIAS_SEMANA = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

function claveFecha(mes, dia) {
  return `2027-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
}

function esTemporadaAlta(mes, dia) {
  return (mes === 10 && dia >= 1) || (mes === 11 && dia <= 28);
}

function MesCalendario({ mes }) {
  const primerDia = (new Date(2027, mes, 1).getDay() + 6) % 7;
  const diasEnMes = new Date(2027, mes + 1, 0).getDate();
  const celdas = [...Array(primerDia).fill(null), ...Array.from({ length: diasEnMes }, (_, index) => index + 1)];
  while (celdas.length % 7 !== 0) celdas.push(null);

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
      <h3 className="mb-3 font-extrabold text-[#1E298B]">{MESES[mes]}</h3>
      <div className="grid grid-cols-7 gap-y-1 text-center">
        {DIAS_SEMANA.map((dia, index) => (
          <span key={`${dia}-${index}`} className="pb-2 text-[10px] font-bold uppercase text-slate-400">{dia}</span>
        ))}
        {celdas.map((dia, index) => {
          if (!dia) return <span key={`vacio-${index}`} aria-hidden="true" className="min-h-8" />;
          const fecha = claveFecha(mes, dia);
          const festivo = FESTIVOS_2027[fecha];
          const clausura = mes === 11 && dia === 28;
          const temporadaAlta = esTemporadaAlta(mes, dia);
          const etiqueta = clausura
            ? 'Jornada de Clausura, Almuerzo de Integración y Agradecimiento a todos los empleados'
            : festivo;

          let clases = 'relative mx-auto flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium ';
          if (clausura) {
            clases += 'border-2 border-amber-400 bg-[#1E298B] font-extrabold text-white';
          } else if (festivo) {
            clases += 'bg-red-50 font-bold text-[#DC2626]';
          } else if (temporadaAlta) {
            clases += 'bg-amber-100 text-amber-900';
          } else {
            clases += 'text-slate-700';
          }

          return (
            <span
              key={fecha}
              title={etiqueta || (temporadaAlta ? 'Temporada Alta Comercial' : undefined)}
              aria-label={`${dia} de ${MESES[mes]}${etiqueta ? `: ${etiqueta}` : temporadaAlta ? ', Temporada Alta Comercial' : ''}`}
              className={`flex min-h-9 items-center justify-center ${temporadaAlta ? 'rounded-md bg-amber-50' : ''}`}
            >
              <span className={clases}>{dia}</span>
            </span>
          );
        })}
      </div>
    </article>
  );
}

export function Calendario2027() {
  return (
    <section className="space-y-6">
      <header>
        <p className="text-xs font-bold uppercase tracking-wider text-[#DC2626]">Planeación anual</p>
        <h1 className="mt-1 text-2xl font-extrabold text-[#1E298B]">Cronograma 2027</h1>
        <p className="mt-1 text-sm text-slate-500">Festivos nacionales, temporadas comerciales y fechas importantes para DJS NEW WORLD.</p>
      </header>

      <section aria-label="Ciclos del Festival DJS INNOVA" className="grid gap-4 sm:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-[#DC2626]">Febrero · Ciclo 1</p>
          <h2 className="mt-2 font-extrabold text-[#1E298B]">Festival post-temporada</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">Espacio para compartir aprendizajes de producción y comercio y presentar propuestas de mejora.</p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-[#DC2626]">Agosto · Ciclo 2</p>
          <h2 className="mt-2 font-extrabold text-[#1E298B]">Festival post-temporada</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">Segundo encuentro anual para impulsar ideas surgidas del taller Bosa y la vitrina de El Gran San.</p>
        </article>
      </section>

      <div aria-label="Leyenda del calendario" className="flex flex-wrap gap-x-5 gap-y-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs text-slate-600">
        <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-red-100 ring-1 ring-red-200" /> Festivos de Colombia</span>
        <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-sm bg-amber-100" /> Temporada Alta Comercial · 1 nov – 28 dic</span>
        <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-full border-2 border-amber-400 bg-[#1E298B]" /> Clausura DJS · 28 dic</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {MESES.map((mes, index) => <MesCalendario key={mes} mes={index} />)}
      </div>

      <aside className="rounded-2xl border-2 border-amber-400 bg-[#1E298B] p-5 text-white shadow-sm sm:p-6">
        <p className="text-xs font-bold uppercase tracking-wider text-blue-100">28 de diciembre de 2027 · Jornada de clausura</p>
        <h2 className="mt-2 text-xl font-extrabold">Almuerzo de integración y agradecimiento</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-blue-50">
          Encuentro para reconocer y agradecer a todos los empleados de DJS NEW WORLD por su trabajo y los logros del año.
        </p>
      </aside>
    </section>
  );
}
