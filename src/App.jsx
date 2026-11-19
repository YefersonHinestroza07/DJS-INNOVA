import React, { useState, useEffect } from 'react';
import {
  Home, Users, Calendar, BarChart3, CheckCircle2, AlertCircle,
  Plus, Search, Sparkles, Target, Layers, Scissors, Store,
  ChevronRight, TrendingUp
} from 'lucide-react';
import {
  ESTRATEGIA_DJS,
  COLABORADORES_INICIALES,
  FRENTES_FASE_1,
  CRITERIOS_FASE_4,
  PROPUESTAS_INICIALES
} from './data';
import { Modals } from './Modals.jsx';

export default function App() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [propuestas, setPropuestas] = useState(PROPUESTAS_INICIALES);
  const [selectedPropuesta, setSelectedPropuesta] = useState(null);
  const [showModalNueva, setShowModalNueva] = useState(false);
  const [showModalEstrategia, setShowModalEstrategia] = useState(false);

  const [filtroArea, setFiltroArea] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');
  const [equipoSeleccionado, setEquipoSeleccionado] = useState([]);

  const [filtroSede, setFiltroSede] = useState('Todas');
  const [propuestaAEvaluarId, setPropuestaAEvaluarId] = useState(102);

  const [nuevaIdea, setNuevaIdea] = useState({
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
  });

  const [tiempo, setTiempo] = useState({ dias: 12, horas: 18, minutos: 45 });
  useEffect(() => {
    const timer = setInterval(() => {
      setTiempo(prev => prev.minutos > 0 ? { ...prev, minutos: prev.minutos - 1 } : { ...prev, minutos: 59 });
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const areasEnEquipo = [...new Set(equipoSeleccionado.map(c => c.area))];
  const equipoEsValido = equipoSeleccionado.length >= 3 && areasEnEquipo.length >= 2;

  const toggleColaboradorEquipo = (colab) => {
    if (equipoSeleccionado.some(c => c.id === colab.id)) {
      setEquipoSeleccionado(equipoSeleccionado.filter(c => c.id !== colab.id));
    } else if (equipoSeleccionado.length < 4) {
      setEquipoSeleccionado([...equipoSeleccionado, colab]);
    }
  };

  const propuestaActualJurado = propuestas.find(p => p.id === propuestaAEvaluarId) || propuestas[0];
  const toggleCriterioJurado = (criterioId) => {
    setPropuestas(propuestas.map(prop => {
      if (prop.id !== propuestaActualJurado.id) return prop;
      const existe = prop.criteriosAprobados.includes(criterioId);
      const nuevosCriterios = existe
        ? prop.criteriosAprobados.filter(c => c !== criterioId)
        : [...prop.criteriosAprobados, criterioId];
      return {
        ...prop,
        criteriosAprobados: nuevosCriterios,
        estado: nuevosCriterios.length >= 4 ? "Aprobado a Piloto" : "Listo para Pitch"
      };
    }));
  };

  const handleCrearPropuesta = (e) => {
    e.preventDefault();
    if (!nuevaIdea.titulo || !nuevaIdea.problema) return;
    const creada = {
      id: Date.now(),
      titulo: nuevaIdea.titulo,
      equipo: nuevaIdea.equipo || "Equipo Nuevo DJS",
      integrantes: equipoSeleccionado.length >= 3
        ? equipoSeleccionado.map(c => `${c.nombre} (${c.area})`)
        : ["Equipo Multidisciplinario Registrado"],
      sedeOrigen: nuevaIdea.sedeOrigen,
      frente: nuevaIdea.frente,
      estado: "En Mentoría",
      imagen: "/coleccion-djs.png",
      criteriosAprobados: ["estrategia"],
      ochoPuntos: {
        problema: nuevaIdea.problema,
        solucion: nuevaIdea.solucion || "Por detallar en mentoría",
        justificacion: nuevaIdea.justificacion || "Alineado con la Visión 2028 de DJS NEW WORLD",
        valor: nuevaIdea.valor || "Mejora operativa y comercial",
        recursos: nuevaIdea.recursos || "Recursos internos post-temporada",
        viabilidad: nuevaIdea.viabilidad || "Evaluación técnica en curso",
        potencial: nuevaIdea.potencial || "Impacto positivo esperado",
        prototipo: nuevaIdea.prototipo || "Boceto inicial en preparación"
      }
    };
    setPropuestas([creada, ...propuestas]);
    setShowModalNueva(false);
    setActiveTab('festival');
    setNuevaIdea({
      titulo: '', equipo: '', sedeOrigen: 'Taller Bosa', frente: FRENTES_FASE_1[0],
      problema: '', solucion: '', justificacion: '', valor: '',
      recursos: '', viabilidad: '', potencial: '', prototipo: ''
    });
  };

  const totalPropuestas = propuestas.length;
  const aprobadasPiloto = propuestas.filter(p => p.criteriosAprobados.length >= 4).length;
  const porcentajeEfectividad = Math.round((aprobadasPiloto / totalPropuestas) * 100);
  const propuestasFiltradas = propuestas.filter(propuesta => {
    const coincideSede = filtroSede === 'Todas' || propuesta.sedeOrigen === filtroSede;
    const texto = busqueda.trim().toLowerCase();
    const coincideBusqueda = !texto || `${propuesta.titulo} ${propuesta.frente} ${propuesta.equipo}`.toLowerCase().includes(texto);
    return coincideSede && coincideBusqueda;
  });
  const colaboradoresFiltrados = COLABORADORES_INICIALES.filter(colaborador => {
    const coincideArea = filtroArea === 'Todos' || colaborador.area === filtroArea;
    const texto = busqueda.trim().toLowerCase();
    const coincideBusqueda = !texto || `${colaborador.nombre} ${colaborador.cargo} ${colaborador.area}`.toLowerCase().includes(texto);
    return coincideArea && coincideBusqueda;
  });
  const areasDisponibles = [...new Set(COLABORADORES_INICIALES.map(colaborador => colaborador.area))];
  const secciones = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'festival', label: 'Propuestas', icon: Layers },
    { id: 'equipo', label: 'Equipo', icon: Users },
    { id: 'gerencia', label: 'Evaluación', icon: BarChart3 }
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-0 font-sans text-slate-900 md:p-5">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col overflow-hidden bg-white shadow-xl md:min-h-[calc(100vh-2.5rem)] md:rounded-3xl">
        <header className="flex items-center justify-between gap-4 bg-[#1E298B] px-4 py-4 text-white shadow-md md:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-sm font-black text-[#1E298B] shadow-sm">DJS²</div>
            <div className="min-w-0">
              <h1 className="truncate text-base font-extrabold tracking-wide">DJS INNOVA</h1>
              <p className="truncate text-xs text-blue-200">DJS NEW WORLD · Intraemprendimiento</p>
            </div>
          </div>
          <button
            onClick={() => setShowModalEstrategia(true)}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white/15 px-3 py-2 text-xs font-semibold transition hover:bg-white/25"
          >
            <Target className="h-4 w-4 text-red-300" />
            <span className="hidden sm:inline">Misión y 7S</span>
          </button>
        </header>

        <nav aria-label="Secciones principales" className="grid grid-cols-4 border-b border-slate-200 bg-white px-2 md:flex md:justify-center md:gap-2 md:px-6">
          {secciones.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => {
                setActiveTab(id);
                setBusqueda('');
              }}
              aria-current={activeTab === id ? 'page' : undefined}
              className={`flex items-center justify-center gap-2 border-b-2 px-2 py-3 text-xs font-semibold transition md:px-5 md:text-sm ${
                activeTab === id
                  ? 'border-[#DC2626] text-[#1E298B]'
                  : 'border-transparent text-slate-500 hover:text-[#1E298B]'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </nav>

        <main className="flex-1 overflow-y-auto bg-slate-50 px-4 py-5 md:px-8 md:py-8">
          {activeTab === 'inicio' && (
            <div className="space-y-6">
              <section className="grid gap-4 rounded-3xl bg-gradient-to-br from-[#1E298B] via-[#2739a4] to-slate-900 p-6 text-white shadow-lg md:grid-cols-[1fr_auto] md:items-center md:p-8">
                <div className="max-w-2xl">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-100">
                    <Sparkles className="h-3.5 w-3.5 text-red-300" />
                    Ciclo post-temporada · Bosa y Gran San
                  </span>
                  <h2 className="mt-4 text-2xl font-black leading-tight sm:text-3xl">Festival de Innovación y Conexiones</h2>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-blue-100">
                    Convierte la experiencia del taller y del punto de venta en propuestas que impulsen a DJS NEW WORLD.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <button
                      onClick={() => setShowModalNueva(true)}
                      className="inline-flex items-center gap-2 rounded-xl bg-[#DC2626] px-4 py-3 text-sm font-bold shadow transition hover:bg-red-700"
                    >
                      <Plus className="h-4 w-4" /> Postular una idea
                    </button>
                    <button
                      onClick={() => setShowModalEstrategia(true)}
                      className="rounded-xl border border-white/30 bg-white/10 px-4 py-3 text-sm font-semibold transition hover:bg-white/20"
                    >
                      Conocer la estrategia
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 rounded-2xl border border-white/10 bg-slate-950/25 p-4 text-center md:min-w-64">
                  <div>
                    <Calendar className="mx-auto mb-2 h-4 w-4 text-blue-200" />
                    <span className="block text-2xl font-black">{tiempo.dias}</span>
                    <span className="text-[10px] uppercase tracking-wider text-blue-200">Días</span>
                  </div>
                  <div className="border-x border-white/15">
                    <span className="mb-2 block h-4 text-blue-200">·</span>
                    <span className="block text-2xl font-black">{tiempo.horas}</span>
                    <span className="text-[10px] uppercase tracking-wider text-blue-200">Horas</span>
                  </div>
                  <div>
                    <span className="mb-2 block h-4 text-blue-200">·</span>
                    <span className="block text-2xl font-black">{tiempo.minutos}</span>
                    <span className="text-[10px] uppercase tracking-wider text-blue-200">Min</span>
                  </div>
                </div>
              </section>

              <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                {[
                  { label: 'Propuestas', value: totalPropuestas, icon: Layers, color: 'text-blue-700', bg: 'bg-blue-50' },
                  { label: 'Colaboradores', value: COLABORADORES_INICIALES.length, icon: Users, color: 'text-violet-700', bg: 'bg-violet-50' },
                  { label: 'Aprobadas a piloto', value: aprobadasPiloto, icon: CheckCircle2, color: 'text-emerald-700', bg: 'bg-emerald-50' },
                  { label: 'Efectividad', value: `${porcentajeEfectividad}%`, icon: TrendingUp, color: 'text-red-700', bg: 'bg-red-50' }
                ].map(({ label, value, icon: Icon, color, bg }) => (
                  <article key={label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className={`mb-3 flex h-9 w-9 items-center justify-center rounded-xl ${bg} ${color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <p className="text-2xl font-black text-slate-900">{value}</p>
                    <p className="mt-1 text-xs font-medium text-slate-500">{label}</p>
                  </article>
                ))}
              </section>

              <section className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-slate-900">Propuestas recientes</h3>
                      <p className="mt-1 text-xs text-slate-500">Ideas que están impulsando la innovación</p>
                    </div>
                    <button onClick={() => setActiveTab('festival')} className="inline-flex items-center gap-1 text-xs font-bold text-[#1E298B] hover:text-[#DC2626]">
                      Ver todas <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="space-y-3">
                    {propuestas.slice(0, 3).map(propuesta => (
                      <button
                        key={propuesta.id}
                        onClick={() => setSelectedPropuesta(propuesta)}
                        className="flex w-full items-start gap-3 rounded-xl border border-slate-100 p-3 text-left transition hover:border-blue-200 hover:bg-blue-50/50"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#1E298B]">
                          {propuesta.sedeOrigen === 'Taller Bosa' ? <Scissors className="h-5 w-5" /> : <Store className="h-5 w-5" />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="line-clamp-2 text-sm font-bold text-slate-800">{propuesta.titulo}</p>
                          <p className="mt-1 text-xs text-slate-500">{propuesta.sedeOrigen} · {propuesta.estado}</p>
                        </div>
                        <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-slate-400" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="mb-3 flex items-center gap-2 text-[#1E298B]">
                    <Target className="h-5 w-5" />
                    <h3 className="font-bold">Visión 2028</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-600">{ESTRATEGIA_DJS.vision}</p>
                  <div className="mt-4 rounded-xl bg-blue-50 p-3">
                    <p className="flex items-center gap-2 text-xs font-bold text-[#1E298B]">
                      <Sparkles className="h-4 w-4" /> ¿Cómo aporta tu rol hoy?
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600">
                      Cada mejora en Bosa y cada cliente fidelizado en El Gran San construyen nuestro liderazgo sostenible.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'festival' && (
            <section className="space-y-5">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#DC2626]">Festival de innovación</p>
                  <h2 className="mt-1 text-2xl font-black text-slate-900">Propuestas</h2>
                  <p className="mt-1 text-sm text-slate-500">Explora ideas, equipos y avances del festival.</p>
                </div>
                <button onClick={() => setShowModalNueva(true)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1E298B] px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-900">
                  <Plus className="h-4 w-4" /> Nueva propuesta
                </button>
              </div>
              <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:flex-row">
                <label className="flex flex-1 items-center gap-2 rounded-xl bg-slate-50 px-3">
                  <Search className="h-4 w-4 text-slate-400" />
                  <input value={busqueda} onChange={e => setBusqueda(e.target.value)} placeholder="Buscar por idea, frente o equipo" className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-slate-400" />
                </label>
                <select value={filtroSede} onChange={e => setFiltroSede(e.target.value)} className="rounded-xl border-0 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none">
                  <option>Todas</option><option>Taller Bosa</option><option>El Gran San</option><option>Administración</option>
                </select>
              </div>
              {propuestasFiltradas.length ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {propuestasFiltradas.map(propuesta => (
                    <article key={propuesta.id} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                      <div className="flex items-start justify-between gap-3">
                        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-[#1E298B]">{propuesta.sedeOrigen}</span>
                        <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${propuesta.criteriosAprobados.length >= 4 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>{propuesta.estado}</span>
                      </div>
                      <h3 className="mt-4 text-base font-bold leading-snug text-slate-900">{propuesta.titulo}</h3>
                      <p className="mt-2 flex-1 text-sm text-slate-500">{propuesta.frente}</p>
                      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                        <span className="text-xs text-slate-500">{propuesta.criteriosAprobados.length} de {CRITERIOS_FASE_4.length} criterios aprobados</span>
                        <button onClick={() => setSelectedPropuesta(propuesta)} className="inline-flex items-center gap-1 text-xs font-bold text-[#1E298B] hover:text-[#DC2626]">
                          Ver ficha <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
                  <AlertCircle className="mx-auto h-8 w-8 text-slate-400" />
                  <p className="mt-3 font-semibold text-slate-700">No encontramos propuestas</p>
                  <p className="mt-1 text-sm text-slate-500">Prueba con otro término o cambia la sede.</p>
                </div>
              )}
            </section>
          )}

          {activeTab === 'equipo' && (
            <section className="space-y-5">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#DC2626]">Personas DJS</p>
                  <h2 className="mt-1 text-2xl font-black text-slate-900">Equipo multidisciplinario</h2>
                  <p className="mt-1 text-sm text-slate-500">Elige de 3 a 4 colaboradores de al menos dos áreas.</p>
                </div>
                <div className={`rounded-xl px-4 py-3 text-sm font-bold ${equipoEsValido ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-800'}`}>
                  {equipoSeleccionado.length} seleccionados · {areasEnEquipo.length} áreas
                </div>
              </div>
              <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:flex-row">
                <label className="flex flex-1 items-center gap-2 rounded-xl bg-slate-50 px-3">
                  <Search className="h-4 w-4 text-slate-400" />
                  <input value={busqueda} onChange={e => setBusqueda(e.target.value)} placeholder="Buscar colaborador" className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-slate-400" />
                </label>
                <select value={filtroArea} onChange={e => setFiltroArea(e.target.value)} className="rounded-xl border-0 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none">
                  <option>Todos</option>
                  {areasDisponibles.map(area => <option key={area}>{area}</option>)}
                </select>
              </div>
              {equipoSeleccionado.length > 0 && (
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-blue-50 px-4 py-3">
                  <p className="text-xs font-semibold text-[#1E298B]">
                    {equipoEsValido ? 'Equipo listo para una propuesta.' : 'Selecciona al menos 3 personas de 2 áreas.'}
                  </p>
                  <button onClick={() => setEquipoSeleccionado([])} className="text-xs font-bold text-[#1E298B] underline">Limpiar selección</button>
                </div>
              )}
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {colaboradoresFiltrados.map(colaborador => {
                  const seleccionado = equipoSeleccionado.some(persona => persona.id === colaborador.id);
                  return (
                    <button
                      key={colaborador.id}
                      onClick={() => toggleColaboradorEquipo(colaborador)}
                      className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition ${seleccionado ? 'border-[#1E298B] bg-blue-50 ring-1 ring-[#1E298B]' : 'border-slate-200 bg-white hover:border-blue-200 hover:shadow-sm'}`}
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#1E298B] text-sm font-black text-white">
                        {colaborador.nombre.split(' ').slice(0, 2).map(parte => parte[0]).join('')}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-bold text-slate-800">{colaborador.nombre}</span>
                        <span className="mt-0.5 block truncate text-xs text-slate-500">{colaborador.cargo}</span>
                        <span className="mt-1 block text-[11px] font-semibold text-[#1E298B]">{colaborador.area}</span>
                      </span>
                      <span className={`h-5 w-5 shrink-0 rounded-full border-2 ${seleccionado ? 'border-[#1E298B] bg-[#1E298B] ring-2 ring-blue-200' : 'border-slate-300'}`} />
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          {activeTab === 'gerencia' && (
            <section className="space-y-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#DC2626]">Comité de innovación</p>
                <h2 className="mt-1 text-2xl font-black text-slate-900">Evaluación de propuestas</h2>
                <p className="mt-1 text-sm text-slate-500">Marca los criterios que cumple cada idea.</p>
              </div>
              <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="space-y-3">
                  <label htmlFor="proposal-review" className="block text-xs font-bold uppercase tracking-wide text-slate-500">Propuesta a evaluar</label>
                  <select
                    id="proposal-review"
                    value={propuestaAEvaluarId}
                    onChange={e => setPropuestaAEvaluarId(Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 outline-none focus:border-[#1E298B]"
                  >
                    {propuestas.map(propuesta => <option key={propuesta.id} value={propuesta.id}>{propuesta.titulo}</option>)}
                  </select>
                  {propuestaActualJurado && (
                    <article className="rounded-2xl bg-[#1E298B] p-5 text-white">
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-200">{propuestaActualJurado.sedeOrigen}</span>
                      <h3 className="mt-2 text-lg font-bold leading-snug">{propuestaActualJurado.titulo}</h3>
                      <p className="mt-3 text-sm text-blue-100">{propuestaActualJurado.frente}</p>
                      <div className="mt-5 border-t border-white/20 pt-4">
                        <p className="text-3xl font-black">{propuestaActualJurado.criteriosAprobados.length}/{CRITERIOS_FASE_4.length}</p>
                        <p className="text-xs text-blue-200">criterios aprobados</p>
                      </div>
                    </article>
                  )}
                </div>
                <div className="space-y-3">
                  {CRITERIOS_FASE_4.map(criterio => {
                    const aprobado = propuestaActualJurado?.criteriosAprobados.includes(criterio.id) ?? false;
                    return (
                      <button
                        key={criterio.id}
                        disabled={!propuestaActualJurado}
                        onClick={() => toggleCriterioJurado(criterio.id)}
                        className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition ${aprobado ? 'border-emerald-200 bg-emerald-50' : 'border-slate-200 bg-white hover:border-blue-200'} disabled:opacity-50`}
                      >
                        <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${aprobado ? 'bg-emerald-600 text-white' : 'border border-slate-300 text-transparent'}`}>
                          <CheckCircle2 className="h-4 w-4" />
                        </span>
                        <span>
                          <span className="block text-sm font-bold text-slate-800">{criterio.titulo}</span>
                          <span className="mt-1 block text-xs leading-relaxed text-slate-500">{criterio.pregunta}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>
          )}
        </main>

        <footer className="border-t border-slate-200 bg-white px-4 py-3 text-center text-[11px] text-slate-400">
          DJS INNOVA · Ideas que conectan taller, equipo y mercado
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
        />
      </div>
    </div>
  );
}
