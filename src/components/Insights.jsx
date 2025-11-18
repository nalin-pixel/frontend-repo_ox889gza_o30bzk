function Insights({ analysis }) {
  if (!analysis) return null
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="bg-slate-900/40 border border-blue-500/20 rounded-xl p-4">
        <h3 className="text-blue-200 text-sm uppercase tracking-wider">Outlook</h3>
        <p className="mt-2 text-2xl font-semibold text-white">{analysis.outlook}</p>
        <p className="mt-1 text-blue-200/80 text-sm">Risk score: <span className="font-mono">{analysis.risk_score}</span></p>
      </div>
      <div className="bg-slate-900/40 border border-blue-500/20 rounded-xl p-4 md:col-span-2">
        <h3 className="text-blue-200 text-sm uppercase tracking-wider">Summary</h3>
        <p className="mt-2 text-blue-50">{analysis.summary}</p>
        <ul className="mt-3 grid sm:grid-cols-2 gap-2">
          {analysis.key_points.map((k, i) => (
            <li key={i} className="text-blue-200/90 text-sm bg-white/5 rounded-lg px-3 py-2 border border-white/10">• {k}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Insights
