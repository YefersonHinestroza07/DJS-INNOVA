import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight, Award, BarChart3, Building2, CalendarDays, Check,
  CheckCircle2, ChevronRight, CircleAlert, Factory, HeartHandshake,
  Home, Layers3, MapPin, Plus, Search, Store, Target, Users
} from 'lucide-react';
import {
  COLABORADORES_INICIALES,
  CRITERIOS_FASE_4,
  ESTRATEGIA_DJS,
  FRENTES_FASE_1,
  PROPUESTAS_INICIALES
} from './data.js';
import { Calendario2027 } from './Calendario2027.jsx';
import { Modals } from './Modals.jsx';

const INITIAL_IDEA = {
  titulo: '',
  equipo: '',
  sedeOrigen: 'Taller Bosa',
  frente: FRENTES_FASE_1[0],
  problema: '',
  solucion: '',
  justificacion: '',
  valor: '',
  recursos: '',
  viabilidad: '',
  potencial: '',
  prototipo: ''
};

const MENU = [
  { id: 'inicio', label: 'Inicio', icon: Home },
  { id: 'nosotros', label: 'Quiénes Somos', icon: Building2 },
  { id: 'calendario', label: 'Cronograma 2027', icon: CalendarDays },
  { id: 'festival', label: 'Propuestas', icon: Layers3 },
  { id: 'equipos', label: 'Equipos', icon: Users },
  { id: 'gerencia', label: 'Evaluación', icon: BarChart3 }
];

const GALLERY = [
  { title: 'Planta de Producción', location: 'Taller Bosa', image: '/planta-bosa.png', icon: Factory },
  { title: 'Vitrina Comercial', location: 'El Gran San', image: '/chaqueta-puffer.png', icon: Store },
  { title: 'Cultura y Familia DJS²', location: 'DJS NEW WORLD', image: '/chaqueta-denim.png', icon: HeartHandshake }
];

function SafeImage({ src, alt, className = '', fit = 'cover' }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`overflow-hidden bg-slate-100 ${className}`}>
      {failed ? (
        <div role="img" aria-label={alt} className="flex h-full min-h-20 items-center justify-center px-4 text-center text-sm font-medium text-slate-500">
          {alt}
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className={`h-full w-full ${fit === 'contain' ? 'object-contain' : 'object-cover'}`}
        />
      )}
    </div>
  );
}
function getNextPitch() {
  const now = new Date();
  const dates = [1, 7].map(month => new Date(now.getFullYear(), month, 1));
  dates.push(new Date(now.getFullYear() + 1, 1, 1));
  dates.push(new Date(now.getFullYear() + 1, 7, 1));
  return dates.find(date => date > now);
}

function getCountdown(target) {
  const remaining = Math.max(0, target.getTime() - Date.now());
  const totalMinutes = Math.floor(remaining / 60000);
  return {
    dias: Math.floor(totalMinutes / 1440),
    horas: Math.floor((totalMinutes % 1440) / 60),
    minutos: totalMinutes % 60
  };
}

function ProgressMetric({ title, start, current, target }) {
  const progress = Math.min(100, Math.round((current / target) * 100));

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-bold text-slate-800">{title}</h3>
        <p className="text-sm font-bold text-[#1E298B]">{current.toFixed(2)} <span className="font-normal text-slate-400">/ {target.toFixed(1)}</span></p>
      </div>
      <p className="mt-1 text-xs text-slate-500">Línea base {start.toFixed(2)} · Meta {target.toFixed(1)} / 5</p>
      <div
        role="progressbar"
        aria-label={`${title}: ${progress}% del nivel objetivo`}
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100"
      >
        <div className="h-full rounded-full bg-[#1E298B] transition-all" style={{ width: `${progress}%` }} />
      </div>
      <p className="mt-2 text-right text-xs font-semibold text-slate-500">{progress}% del nivel objetivo</p>
    </article>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [propuestas, setPropuestas] = useState(PROPUESTAS_INICIALES);
  const [selectedPropuesta, setSelectedPropuesta] = useState(null);
  const [showModalNueva, setShowModalNueva] = useState(false);
  const [showModalEstrategia, setShowModalEstrategia] = useState(false);
  const [filtroArea, setFiltroArea] = useState('Todas');
  const [busquedaEquipo, setBusquedaEquipo] = useState('');
  const [busquedaPropuestas, setBusquedaPropuestas] = useState('');
  const [equipoSeleccionado, setEquipoSeleccionado] = useState([]);
  const [filtroSede, setFiltroSede] = useState('Todas');
  const [subTabGerencia, setSubTabGerencia] = useState('jurado');
  const [propuestaAEvaluarId, setPropuestaAEvaluarId] = useState(PROPUESTAS_INICIALES[0]?.id ?? null);
  const [nuevaIdea, setNuevaIdea] = useState(INITIAL_IDEA);
  const [mensajeEquipo, setMensajeEquipo] = useState('');
  const [tiempo, setTiempo] = useState(() => getCountdown(getNextPitch()));

  useEffect(() => {
    const timer = window.setInterval(() => setTiempo(getCountdown(getNextPitch())), 60000);
    return () => window.clearInterval(timer);
  }, []);

  const areasEnEquipo = [...new Set(equipoSeleccionado.map(colaborador => colaborador.area))];
  const equipoEsValido = equipoSeleccionado.length >= 3 && equipoSeleccionado.length <= 4 && areasEnEquipo.length >= 2;
  const propuestaActualJurado = propuestas.find(({ id }) => id === propuestaAEvaluarId) ?? propuestas[0];
  const aprobadasPiloto = propuestas.filter(propuesta => propuesta.criteriosAprobados.length >= 4).length;
  const porcentajeEfectividad = propuestas.length ? Math.round((aprobadasPiloto / propuestas.length) * 100) : 0;
  const sedes = ['Todas', 'Taller Bosa', 'El Gran San'];
  const areas = [...new Set(COLABORADORES_INICIALES.map(colaborador => colaborador.area))];

  const propuestasFiltradas = useMemo(() => {
    const query = busquedaPropuestas.trim().toLocaleLowerCase('es');
    return propuestas.filter(propuesta => {
      const coincideSede = filtroSede === 'Todas' || propuesta.sedeOrigen === filtroSede;
      const texto = `${propuesta.titulo} ${propuesta.frente} ${propuesta.equipo}`.toLocaleLowerCase('es');
      return coincideSede && (!query || texto.includes(query));
    });
  }, [busquedaPropuestas, filtroSede, propuestas]);

  const colaboradoresFiltrados = useMemo(() => {
    const query = busquedaEquipo.trim().toLocaleLowerCase('es');
    return COLABORADORES_INICIALES.filter(colaborador => {
      const coincideArea = filtroArea === 'Todas' || colaborador.area === filtroArea;
      const texto = `${colaborador.nombre} ${colaborador.cargo} ${colaborador.area}`.toLocaleLowerCase('es');
      return coincideArea && (!query || texto.includes(query));
    });
  }, [busquedaEquipo, filtroArea]);

  function handleSelectTab(tab) {
    setActiveTab(tab);
    setMensajeEquipo('');
  }

  function toggleColaboradorEquipo(colaborador) {
    setEquipoSeleccionado(actual => {
      if (actual.some(persona => persona.id === colaborador.id)) {
        return actual.filter(persona => persona.id !== colaborador.id);
      }
      if (actual.length >= 4) return actual;
      return [...actual, colaborador];
    });
    setMensajeEquipo('');
  }

  function openProposalForm() {
    if (!equipoEsValido) {
      setMensajeEquipo('Arma un equipo de 3 o 4 personas, con integrantes de al menos dos áreas.');
      setActiveTab('equipos');
      return;
    }
    setMensajeEquipo('');
    setShowModalNueva(true);
  }

  function handleCrearPropuesta(event) {
    event.preventDefault();
    if (!equipoEsValido) {
      setShowModalNueva(false);
      setMensajeEquipo('Antes de registrar una idea, selecciona un equipo válido.');
      setActiveTab('equipos');
      return;
    }

    const propuesta = {
      id: Date.now(),
      titulo: nuevaIdea.titulo.trim(),
      equipo: nuevaIdea.equipo.trim() || `Equipo DJS ${equipoSeleccionado.map(persona => persona.nombre.split(' ')[0]).join(' · ')}`,
      integrantes: equipoSeleccionado.map(persona => `${persona.nombre} (${persona.area})`),
      sedeOrigen: nuevaIdea.sedeOrigen,
      frente: nuevaIdea.frente,
      estado: 'En Mentoría',
      imagen: nuevaIdea.sedeOrigen === 'El Gran San' ? '/chaqueta-puffer.png' : '/coleccion-djs.png',
      criteriosAprobados: [],
      ochoPuntos: {
        problema: nuevaIdea.problema.trim(),
        solucion: nuevaIdea.solucion.trim(),
        justificacion: nuevaIdea.justificacion.trim(),
        valor: nuevaIdea.valor.trim(),
        recursos: nuevaIdea.recursos.trim(),
        viabilidad: nuevaIdea.viabilidad.trim(),
        potencial: nuevaIdea.potencial.trim(),
        prototipo: nuevaIdea.prototipo.trim()
      }
    };

    setPropuestas(actuales => [propuesta, ...actuales]);
    setPropuestaAEvaluarId(propuesta.id);
    setNuevaIdea(INITIAL_IDEA);
    setShowModalNueva(false);
    setActiveTab('festival');
    setBusquedaPropuestas('');
    setFiltroSede('Todas');
  }

  function toggleCriterioJurado(criterioId) {
    if (!propuestaActualJurado) return;
    setPropuestas(actuales => actuales.map(propuesta => {
      if (propuesta.id !== propuestaActualJurado.id) return propuesta;
      const criteriosAprobados = propuesta.criteriosAprobados.includes(criterioId)
        ? propuesta.criteriosAprobados.filter(criterio => criterio !== criterioId)
        : [...propuesta.criteriosAprobados, criterioId];
      return {
        ...propuesta,
        criteriosAprobados,
        estado: criteriosAprobados.length >= 4
          ? 'Aprobado a Piloto'
          : propuesta.estado === 'Aprobado a Piloto' ? 'Listo para Pitch' : propuesta.estado
      };
    }));
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
          <button onClick={() => handleSelectTab('inicio')} className="flex min-w-0 items-center gap-3 text-left">
            <SafeImage src="/logo-djs.png" alt="Logo DJS²" className="h-11 w-11 shrink-0 rounded-xl bg-white" fit="contain" />
            <span className="min-w-0">
              <span className="block truncate text-base font-extrabold leading-tight text-[#1E298B]">DJS INNOVA</span>
              <span className="block truncate text-[11px] font-medium text-slate-500">DJS NEW WORLD · Colombia</span>
            </span>
          </button>
          <button
            onClick={() => setShowModalEstrategia(true)}
            className="hidden shrink-0 items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-[#1E298B] transition hover:bg-slate-50 sm:inline-flex"
          >
            <Target className="h-4 w-4" /> Quiénes somos
          </button>
        </div>
        <nav aria-label="Secciones principales" className="scrollbar-none mx-auto flex max-w-7xl gap-1 overflow-x-auto bg-white px-2 md:justify-center md:px-8">
          {MENU.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => handleSelectTab(id)}
              aria-current={activeTab === id ? 'page' : undefined}
              className={`flex shrink-0 items-center gap-2 border-b-[3px] px-3 py-3 text-xs font-bold transition md:px-5 md:text-sm ${
                activeTab === id
                  ? 'border-[#DC2626] text-[#1E298B]'
                  : 'border-transparent text-slate-500 hover:text-[#1E298B]'
              }`}
            >
              <Icon className="h-4 w-4" /> {label}
            </button>
          ))}
        </nav>
      </header>

      <main className="mx-auto min-h-[65vh] max-w-7xl px-4 py-6 md:px-8 md:py-9">
        {activeTab === 'inicio' && (
          <div className="space-y-8">
            <section className="relative isolate overflow-hidden rounded-3xl bg-[#1E298B] text-white shadow-sm">
              <SafeImage src="/coleccion-djs.png" alt="Colección DJS NEW WORLD" className="absolute inset-0 -z-10 h-full w-full opacity-25" />
              <div className="absolute inset-0 -z-10 bg-[#1E298B]/70" />
              <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:p-12">
                <div className="max-w-3xl">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-100">Festival de Innovación · Bosa y El Gran San</p>
                  <h1 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">Construimos el futuro de la moda en DJS NEW WORLD</h1>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-blue-50 sm:text-base">
                    Unimos el conocimiento del taller y la cercanía con nuestros clientes para crear prendas y soluciones con propósito.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button onClick={openProposalForm} className="inline-flex items-center gap-2 rounded-xl bg-[#DC2626] px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700">
                      <Plus className="h-4 w-4" /> Registrar propuesta
                    </button>
                    <button onClick={() => handleSelectTab('nosotros')} className="rounded-xl border border-white/60 bg-white px-5 py-3 text-sm font-bold text-[#1E298B] transition hover:bg-blue-50">
                      Conocer quiénes somos
                    </button>
                  </div>
                </div>
                <div className="min-w-60 rounded-2xl border border-white/30 bg-white/10 p-5 text-center backdrop-blur-sm">
                  <p className="text-xs font-bold uppercase tracking-wider text-blue-100">Próximo Pitch post-temporada</p>
                  <div className="mt-4 grid grid-cols-3 divide-x divide-white/30">
                    {[
                      ['Días', tiempo.dias],
                      ['Horas', tiempo.horas],
                      ['Minutos', tiempo.minutos]
                    ].map(([label, value]) => (
                      <div key={label}>
                        <span className="block text-3xl font-extrabold">{value}</span>
                        <span className="mt-1 block text-[10px] uppercase text-blue-100">{label}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 text-[11px] text-blue-100">Ciclos de innovación en febrero y agosto</p>
                </div>
              </div>
            </section>

            <section aria-label="Resumen ejecutivo" className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {[
                { title: 'Propuestas activas', value: propuestas.length, icon: Layers3, color: 'text-[#1E298B]' },
                { title: 'Colaboradores vinculados', value: 15, icon: Users, color: 'text-[#1E298B]' },
                { title: 'Pilotos aprobados', value: aprobadasPiloto, icon: CheckCircle2, color: 'text-emerald-700' },
                { title: 'Gran clausura', value: '28 Dic', icon: Award, color: 'text-[#1E298B]' }
              ].map(({ title, value, icon: Icon, color }) => (
                <article key={title} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                  <Icon className={`h-5 w-5 ${color}`} />
                  <p className="mt-3 text-2xl font-extrabold text-slate-900">{value}</p>
                  <p className="mt-1 text-xs font-medium text-slate-500">{title}</p>
                </article>
              ))}
            </section>

            <section>
              <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 className="text-xl font-extrabold text-[#1E298B]">Propuestas y líneas de producto</h2>
                  <p className="mt-1 text-sm text-slate-500">Conoce las iniciativas que conectan nuestras dos sedes.</p>
                </div>
                <button onClick={() => handleSelectTab('festival')} className="inline-flex items-center gap-1 text-sm font-bold text-[#1E298B] hover:text-[#DC2626]">
                  Ver todas <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {propuestas.slice(0, 3).map(propuesta => (
                  <button
                    key={propuesta.id}
                    onClick={() => setSelectedPropuesta(propuesta)}
                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition hover:border-blue-200 hover:shadow-md"
                  >
                    <div className="relative">
                      <SafeImage src={propuesta.imagen} alt={propuesta.titulo} className="h-48 w-full" />
                      <span className="absolute bottom-3 left-3 rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-[#1E298B] shadow-sm">{propuesta.sedeOrigen}</span>
                    </div>
                    <div className="p-5">
                      <p className="text-xs font-bold text-[#DC2626]">{propuesta.estado}</p>
                      <h3 className="mt-2 font-bold leading-snug text-slate-900">{propuesta.titulo}</h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500">{propuesta.ochoPuntos.solucion}</p>
                      <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#1E298B]">Ver ficha de 8 puntos <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'nosotros' && (
          <div className="space-y-8">
            <section className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:p-8">
              <SafeImage src="/logo-djs.png" alt="Logotipo de DJS NEW WORLD" className="h-28 w-28 shrink-0 rounded-2xl border border-slate-100 bg-white p-3" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#DC2626]">Nuestra empresa</p>
                <h1 className="mt-2 text-2xl font-extrabold text-[#1E298B]">Un mismo propósito, dos puntos de encuentro</h1>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  En DJS NEW WORLD, el trabajo especializado de nuestro Taller de Producción en Bosa se encuentra con la experiencia de clientes y comerciantes en la Vitrina Mayorista de El Gran San, en Bogotá. Cada persona aporta a una cadena cercana: diseño, confección, calidad y servicio.
                </p>
              </div>
            </section>

            <section className="grid gap-5 md:grid-cols-2">
              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-sm font-extrabold uppercase tracking-wide text-[#1E298B]">Nuestra misión</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{ESTRATEGIA_DJS.mision}</p>
              </article>
              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-sm font-extrabold uppercase tracking-wide text-[#1E298B]">Nuestra visión 2028</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{ESTRATEGIA_DJS.vision}</p>
              </article>
            </section>

            <section>
              <div className="mb-4">
                <h2 className="text-xl font-extrabold text-[#1E298B]">Así hacemos parte de la historia</h2>
                <p className="mt-1 text-sm text-slate-500">Personas, espacios y prendas que construyen DJS NEW WORLD.</p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {GALLERY.map(({ title, location, image, icon: Icon }) => (
                  <article key={title} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <SafeImage src={image} alt={title} className="h-52 w-full" />
                    <div className="flex items-start gap-3 p-4">
                      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#1E298B]" />
                      <div>
                        <h3 className="font-bold text-slate-800">{title}</h3>
                        <p className="mt-1 text-sm text-slate-500">{location}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'calendario' && <Calendario2027 />}

        {activeTab === 'festival' && (
          <section className="space-y-5">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#DC2626]">Festival de innovación</p>
                <h1 className="mt-1 text-2xl font-extrabold text-[#1E298B]">Propuestas</h1>
                <p className="mt-1 text-sm text-slate-500">Cada iniciativa se presenta en ocho puntos para facilitar su evaluación.</p>
              </div>
              <button onClick={openProposalForm} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#DC2626] px-4 py-3 text-sm font-bold text-white transition hover:bg-red-700">
                <Plus className="h-4 w-4" /> Registrar propuesta
              </button>
            </div>
            {mensajeEquipo && (
              <div role="status" className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">{mensajeEquipo}</div>
            )}
            <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:flex-row">
              <label className="flex flex-1 items-center gap-2 rounded-xl bg-slate-50 px-3">
                <Search className="h-4 w-4 text-slate-400" />
                <input value={busquedaPropuestas} onChange={event => setBusquedaPropuestas(event.target.value)} placeholder="Buscar propuesta, frente o equipo" className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-slate-400" />
              </label>
              <label className="flex items-center gap-2 rounded-xl bg-slate-50 px-3">
                <MapPin className="h-4 w-4 text-slate-400" />
                <select aria-label="Filtrar por sede" value={filtroSede} onChange={event => setFiltroSede(event.target.value)} className="bg-transparent py-3 text-sm text-slate-700 outline-none">
                  {sedes.map(sede => <option key={sede}>{sede}</option>)}
                </select>
              </label>
            </div>
            {propuestasFiltradas.length > 0 ? (
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {propuestasFiltradas.map(propuesta => (
                  <article key={propuesta.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="relative">
                      <SafeImage src={propuesta.imagen} alt={propuesta.titulo} className="h-44 w-full" />
                      <span className="absolute bottom-3 left-3 rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-[#1E298B] shadow-sm">{propuesta.sedeOrigen}</span>
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-xs font-bold text-[#DC2626]">{propuesta.estado}</p>
                        <span className="shrink-0 rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-600">{propuesta.criteriosAprobados.length}/6 criterios</span>
                      </div>
                      <h2 className="mt-2 font-bold leading-snug text-slate-900">{propuesta.titulo}</h2>
                      <p className="mt-2 text-sm text-slate-500">{propuesta.frente}</p>
                      <button onClick={() => setSelectedPropuesta(propuesta)} className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#1E298B] hover:text-[#DC2626]">
                        Consultar los 8 puntos <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
                <CircleAlert className="mx-auto h-8 w-8 text-slate-400" />
                <p className="mt-3 font-semibold text-slate-700">No encontramos propuestas</p>
                <p className="mt-1 text-sm text-slate-500">Prueba con otro término o cambia la sede seleccionada.</p>
              </div>
            )}
          </section>
        )}

        {activeTab === 'equipos' && (
          <section className="space-y-5">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#DC2626]">Talento DJS</p>
                <h1 className="mt-1 text-2xl font-extrabold text-[#1E298B]">Equipos multidisciplinarios</h1>
                <p className="mt-1 text-sm text-slate-500">Selecciona de 3 a 4 personas de al menos dos áreas.</p>
              </div>
              <div className={`rounded-xl px-4 py-3 text-sm font-bold ${equipoEsValido ? 'bg-emerald-50 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>
                {equipoSeleccionado.length}/4 integrantes · {areasEnEquipo.length} áreas
              </div>
            </div>
            {mensajeEquipo && (
              <div role="status" className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">{mensajeEquipo}</div>
            )}
            <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:flex-row">
              <label className="flex flex-1 items-center gap-2 rounded-xl bg-slate-50 px-3">
                <Search className="h-4 w-4 text-slate-400" />
                <input value={busquedaEquipo} onChange={event => setBusquedaEquipo(event.target.value)} placeholder="Buscar por nombre, cargo o sede" className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-slate-400" />
              </label>
              <label className="flex items-center gap-2 rounded-xl bg-slate-50 px-3">
                <MapPin className="h-4 w-4 text-slate-400" />
                <select aria-label="Filtrar por área" value={filtroArea} onChange={event => setFiltroArea(event.target.value)} className="bg-transparent py-3 text-sm text-slate-700 outline-none">
                  <option>Todas</option>
                  {areas.map(area => <option key={area}>{area}</option>)}
                </select>
              </label>
            </div>
            {equipoSeleccionado.length > 0 && (
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
                <p className="text-sm font-semibold text-[#1E298B]">
                  {equipoEsValido ? 'El equipo cumple los requisitos para postular.' : 'Añade integrantes de otra área hasta cumplir los requisitos.'}
                </p>
                <button onClick={() => setEquipoSeleccionado([])} className="text-xs font-bold text-[#1E298B] underline">Limpiar selección</button>
              </div>
            )}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {colaboradoresFiltrados.map(colaborador => {
                const seleccionado = equipoSeleccionado.some(persona => persona.id === colaborador.id);
                const bloqueado = !seleccionado && equipoSeleccionado.length >= 4;
                return (
                  <button
                    key={colaborador.id}
                    type="button"
                    aria-pressed={seleccionado}
                    disabled={bloqueado}
                    onClick={() => toggleColaboradorEquipo(colaborador)}
                    className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition disabled:cursor-not-allowed disabled:opacity-50 ${
                      seleccionado ? 'border-[#1E298B] bg-blue-50 ring-1 ring-[#1E298B]' : 'border-slate-200 bg-white hover:border-blue-200'
                    }`}
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-extrabold text-[#1E298B]">
                      {colaborador.nombre.split(' ').slice(0, 2).map(parte => parte[0]).join('')}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-bold text-slate-800">{colaborador.nombre}</span>
                      <span className="mt-1 block truncate text-xs text-slate-500">{colaborador.cargo}</span>
                      <span className="mt-1 block text-[11px] font-semibold text-[#1E298B]">{colaborador.area}</span>
                    </span>
                    <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${seleccionado ? 'border-[#1E298B] bg-[#1E298B] text-white' : 'border-slate-300 text-transparent'}`}>
                      <Check className="h-4 w-4" />
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-600">El equipo debe incluir entre 3 y 4 personas de distintas áreas.</p>
              <button
                type="button"
                disabled={!equipoEsValido}
                onClick={() => setShowModalNueva(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#DC2626] px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                <Plus className="h-4 w-4" /> Postular propuesta
              </button>
            </div>
          </section>
        )}

        {activeTab === 'gerencia' && (
          <section className="space-y-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#DC2626]">Seguimiento y mejora</p>
              <h1 className="mt-1 text-2xl font-extrabold text-[#1E298B]">Evaluación e indicadores</h1>
              <p className="mt-1 text-sm text-slate-500">Revisión de criterios del jurado y seguimiento de las metas organizacionales.</p>
            </div>
            <div role="tablist" aria-label="Vistas de evaluación" className="flex w-fit gap-1 rounded-xl border border-slate-200 bg-white p-1">
              {[
                ['jurado', 'Matriz Jurado'],
                ['indicadores', 'Indicadores de Gestión']
              ].map(([id, label]) => (
                <button
                  key={id}
                  role="tab"
                  aria-selected={subTabGerencia === id}
                  onClick={() => setSubTabGerencia(id)}
                  className={`rounded-lg px-4 py-2.5 text-xs font-bold transition sm:text-sm ${subTabGerencia === id ? 'bg-[#1E298B] text-white' : 'text-slate-600 hover:bg-slate-100'}`}
                >
                  {label}
                </button>
              ))}
            </div>

            {subTabGerencia === 'jurado' ? (
              <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="space-y-3">
                  <label htmlFor="proposal-review" className="block text-xs font-bold uppercase tracking-wide text-slate-500">Propuesta a evaluar</label>
                  <select
                    id="proposal-review"
                    value={propuestaActualJurado?.id ?? ''}
                    onChange={event => setPropuestaAEvaluarId(Number(event.target.value))}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 outline-none focus:border-[#1E298B]"
                  >
                    {propuestas.map(propuesta => <option key={propuesta.id} value={propuesta.id}>{propuesta.titulo}</option>)}
                  </select>
                  {propuestaActualJurado ? (
                    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                      <SafeImage src={propuestaActualJurado.imagen} alt={propuestaActualJurado.titulo} className="h-40 w-full" />
                      <div className="p-5">
                        <p className="text-xs font-bold text-[#DC2626]">{propuestaActualJurado.sedeOrigen}</p>
                        <h2 className="mt-2 font-bold leading-snug text-slate-900">{propuestaActualJurado.titulo}</h2>
                        <p className="mt-2 text-sm text-slate-500">{propuestaActualJurado.estado}</p>
                        <p className="mt-4 border-t border-slate-100 pt-4 text-2xl font-extrabold text-[#1E298B]">{propuestaActualJurado.criteriosAprobados.length} / {CRITERIOS_FASE_4.length} <span className="text-sm font-medium text-slate-500">criterios aprobados</span></p>
                      </div>
                    </article>
                  ) : (
                    <p className="rounded-xl bg-white p-5 text-sm text-slate-500">Aún no hay propuestas para evaluar.</p>
                  )}
                </div>
                <div className="space-y-3">
                  {CRITERIOS_FASE_4.map(criterio => {
                    const aprobado = propuestaActualJurado?.criteriosAprobados.includes(criterio.id) ?? false;
                    return (
                      <button
                        key={criterio.id}
                        type="button"
                        disabled={!propuestaActualJurado}
                        aria-pressed={aprobado}
                        onClick={() => toggleCriterioJurado(criterio.id)}
                        className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition disabled:opacity-50 ${
                          aprobado ? 'border-emerald-200 bg-emerald-50' : 'border-slate-200 bg-white hover:border-blue-200'
                        }`}
                      >
                        <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${aprobado ? 'bg-emerald-700 text-white' : 'border border-slate-300 text-transparent'}`}>
                          <Check className="h-4 w-4" />
                        </span>
                        <span>
                          <span className="block text-sm font-bold text-slate-800">{criterio.titulo}</span>
                          <span className="mt-1 block text-xs leading-relaxed text-slate-500">{criterio.pregunta}</span>
                        </span>
                      </button>
                    );
                  })}
                  <p className="rounded-xl bg-blue-50 p-4 text-sm leading-relaxed text-[#1E298B]">
                    Con 4 o más criterios aprobados, la propuesta pasa automáticamente a <strong>Aprobado a Piloto</strong>.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <section className="grid gap-4 sm:grid-cols-3">
                  {[
                    ['Propuestas registradas', propuestas.length],
                    ['Pilotos aprobados', aprobadasPiloto],
                    ['Efectividad del portafolio', `${porcentajeEfectividad}%`]
                  ].map(([label, value]) => (
                    <article key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                      <p className="text-2xl font-extrabold text-[#1E298B]">{value}</p>
                      <p className="mt-1 text-xs font-medium text-slate-500">{label}</p>
                    </article>
                  ))}
                </section>
                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <div className="mb-5">
                    <h2 className="font-extrabold text-[#1E298B]">Cierre de brechas · Diagnóstico 7S</h2>
                    <p className="mt-1 text-sm leading-relaxed text-slate-500">Metas de trabajo desarrolladas con {ESTRATEGIA_DJS.consultora}.</p>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <ProgressMetric title="Alineación estratégica" start={2.25} current={2.25} target={4.2} />
                    <ProgressMetric title="Estandarización de sistemas" start={2.0} current={2.0} target={4.0} />
                  </div>
                </section>
              </div>
            )}
          </section>
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white px-4 py-5 text-center text-xs text-slate-500">
        DJS INNOVA · Ideas que conectan producción, equipo y mercado · Bogotá, Colombia
      </footer>

      <Modals
        selectedPropuesta={selectedPropuesta}
        setSelectedPropuesta={setSelectedPropuesta}
        showModalNueva={showModalNueva}
        setShowModalNueva={setShowModalNueva}
        nuevaIdea={nuevaIdea}
        setNuevaIdea={setNuevaIdea}
        handleCrearPropuesta={handleCrearPropuesta}
        showModalEstrategia={showModalEstrategia}
        setShowModalEstrategia={setShowModalEstrategia}
        integrantes={equipoSeleccionado}
      />
    </div>
  );
}