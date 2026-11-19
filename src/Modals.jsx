import { X } from 'lucide-react';
import { ESTRATEGIA_DJS, FRENTES_FASE_1 } from './data.js';

export function Modals({
  selectedPropuesta, setSelectedPropuesta,
  showModalNueva, setShowModalNueva,
  nuevaIdea, setNuevaIdea, handleCrearPropuesta,
  showModalEstrategia, setShowModalEstrategia, integrantes = []
}) {
  return (
    <>
      {selectedPropuesta && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/70 p-3 backdrop-blur-sm sm:p-6">
          <div role="dialog" aria-modal="true" className="flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="bg-[#1E298B] text-white p-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-red-300 font-bold">Ficha Oficial Pitch • 8 Puntos</span>
                <h3 className="font-bold text-sm leading-snug">{selectedPropuesta.titulo}</h3>
              </div>
              <button type="button" aria-label="Cerrar ficha" onClick={() => setSelectedPropuesta(null)} className="p-1 bg-white/15 rounded-full"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-4 overflow-y-auto space-y-3 text-xs">
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <p className="font-bold text-slate-700 text-[11px]">Integrantes ({selectedPropuesta.equipo}):</p>
                <p className="text-slate-600 text-[11px]">{selectedPropuesta.integrantes.join(' • ')}</p>
              </div>
              {[
                { num: "1. Problema u oportunidad", val: selectedPropuesta.ochoPuntos.problema },
                { num: "2. Propuesta de solución", val: selectedPropuesta.ochoPuntos.solucion },
                { num: "3. Justificación estratégica", val: selectedPropuesta.ochoPuntos.justificacion },
                { num: "4. Propuesta de valor", val: selectedPropuesta.ochoPuntos.valor },
                { num: "5. Recursos requeridos", val: selectedPropuesta.ochoPuntos.recursos },
                { num: "6. Viabilidad técnica y operativa", val: selectedPropuesta.ochoPuntos.viabilidad },
                { num: "7. Potencial comercial / retorno", val: selectedPropuesta.ochoPuntos.potencial },
                { num: "8. Prototipo o representación", val: selectedPropuesta.ochoPuntos.prototipo }
              ].map((item, i) => (
                <div key={i} className="border-b border-slate-100 pb-2">
                  <p className="font-extrabold text-[#1E298B]">{item.num}</p>
                  <p className="text-slate-700 mt-0.5 leading-relaxed">{item.val}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showModalNueva && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/70 p-3 sm:p-6">
          <form onSubmit={handleCrearPropuesta} role="dialog" aria-modal="true" className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="bg-[#DC2626] text-white p-4 flex items-center justify-between">
              <h3 className="font-black text-sm">Registrar Propuesta (Fase 3)</h3>
              <button type="button" aria-label="Cerrar formulario" onClick={() => setShowModalNueva(false)} className="p-1 bg-white/15 rounded-full"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-4 overflow-y-auto space-y-2.5 text-xs">
              <div className="rounded-xl bg-blue-50 p-3 text-xs leading-relaxed text-[#1E298B]">
                <strong>Equipo postulante:</strong> {integrantes.map(persona => persona.nombre).join(', ')}
              </div>
              <input required aria-label="Título de la iniciativa" placeholder="Título de la iniciativa *" value={nuevaIdea.titulo} onChange={e => setNuevaIdea({...nuevaIdea, titulo: e.target.value})} className="w-full border rounded-lg p-2 font-semibold" />
              <input aria-label="Nombre del equipo" placeholder="Nombre del equipo (opcional)" value={nuevaIdea.equipo} onChange={e => setNuevaIdea({...nuevaIdea, equipo: e.target.value})} className="w-full border rounded-lg p-2" />
              <div className="grid grid-cols-2 gap-2">
                <select aria-label="Sede de origen" value={nuevaIdea.sedeOrigen} onChange={e => setNuevaIdea({...nuevaIdea, sedeOrigen: e.target.value})} className="border rounded-lg p-2">
                  <option>Taller Bosa</option><option>El Gran San</option>
                </select>
                <select aria-label="Frente de innovación" value={nuevaIdea.frente} onChange={e => setNuevaIdea({...nuevaIdea, frente: e.target.value})} className="border rounded-lg p-2">
                  {FRENTES_FASE_1.map(f => <option key={f}>{f}</option>)}
                </select>
              </div>
              <textarea required rows={2} aria-label="Problema u oportunidad" placeholder="1. Problema u oportunidad identificada *" value={nuevaIdea.problema} onChange={e => setNuevaIdea({...nuevaIdea, problema: e.target.value})} className="w-full border rounded-lg p-2" />
              <textarea required rows={2} aria-label="Propuesta de solución" placeholder="2. Propuesta de solución detallada *" value={nuevaIdea.solucion} onChange={e => setNuevaIdea({...nuevaIdea, solucion: e.target.value})} className="w-full border rounded-lg p-2" />
              <textarea required rows={2} aria-label="Justificación estratégica" placeholder="3. Justificación estratégica y vínculo con Visión 2028 *" value={nuevaIdea.justificacion} onChange={e => setNuevaIdea({...nuevaIdea, justificacion: e.target.value})} className="w-full border rounded-lg p-2" />
              <textarea required rows={2} aria-label="Propuesta de valor" placeholder="4. Propuesta de valor para el cliente o la empresa *" value={nuevaIdea.valor} onChange={e => setNuevaIdea({...nuevaIdea, valor: e.target.value})} className="w-full border rounded-lg p-2" />
              <textarea required rows={2} aria-label="Recursos requeridos" placeholder="5. Recursos requeridos *" value={nuevaIdea.recursos} onChange={e => setNuevaIdea({...nuevaIdea, recursos: e.target.value})} className="w-full border rounded-lg p-2" />
              <textarea required rows={2} aria-label="Viabilidad técnica" placeholder="6. Viabilidad técnica y operativa *" value={nuevaIdea.viabilidad} onChange={e => setNuevaIdea({...nuevaIdea, viabilidad: e.target.value})} className="w-full border rounded-lg p-2" />
              <textarea required rows={2} aria-label="Potencial comercial" placeholder="7. Potencial comercial o ahorro *" value={nuevaIdea.potencial} onChange={e => setNuevaIdea({...nuevaIdea, potencial: e.target.value})} className="w-full border rounded-lg p-2" />
              <textarea required rows={2} aria-label="Prototipo o muestra" placeholder="8. Prototipo o representación de la idea *" value={nuevaIdea.prototipo} onChange={e => setNuevaIdea({...nuevaIdea, prototipo: e.target.value})} className="w-full border rounded-lg p-2" />
              <button type="submit" className="w-full bg-[#1E298B] text-white font-bold py-2.5 rounded-xl shadow mt-2">Guardar Propuesta</button>
            </div>
          </form>
        </div>
      )}

      {showModalEstrategia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/70 p-4">
          <div role="dialog" aria-modal="true" className="flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="bg-[#1E298B] text-white p-4 flex items-center justify-between">
              <h3 className="font-black text-sm">Identidad Estratégica DJS²</h3>
              <button type="button" aria-label="Cerrar información estratégica" onClick={() => setShowModalEstrategia(false)} className="p-1 bg-white/15 rounded-full"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-4 overflow-y-auto space-y-3 text-xs leading-relaxed">
              <div className="bg-blue-50 p-3 rounded-xl">
                <h4 className="font-black text-[#1E298B] uppercase text-[11px] mb-1">Misión DJS NEW WORLD</h4>
                <p className="text-slate-700">{ESTRATEGIA_DJS.mision}</p>
              </div>
              <div className="bg-red-50 p-3 rounded-xl">
                <h4 className="font-black text-[#DC2626] uppercase text-[11px] mb-1">Visión 2028</h4>
                <p className="text-slate-700">{ESTRATEGIA_DJS.vision}</p>
              </div>
              <div className="border border-slate-200 p-3 rounded-xl space-y-1">
                <h4 className="font-black text-slate-800 uppercase text-[11px]">Base Diagnóstico 7S McKinsey</h4>
                <p className="text-[11px] text-slate-600">• <strong>Estrategia:</strong> {ESTRATEGIA_DJS.diagnostico7S.estrategia}</p>
                <p className="text-[11px] text-slate-600">• <strong>Sistemas:</strong> {ESTRATEGIA_DJS.diagnostico7S.sistemas}</p>
                <p className="text-[11px] text-slate-600">• <strong>Habilidades:</strong> {ESTRATEGIA_DJS.diagnostico7S.habilidades}</p>
                <p className="text-[11px] text-emerald-700 font-semibold">• <strong>Fortaleza Cultural:</strong> {ESTRATEGIA_DJS.diagnostico7S.culturaBase}</p>
              </div>
              <p className="text-[10px] text-center text-slate-400">Consultoría por {ESTRATEGIA_DJS.consultora}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}