import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import SearchBar from './components/SearchBar'
import StockChart from './components/StockChart'
import Insights from './components/Insights'

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function App() {
  const [symbol, setSymbol] = useState('AAPL')
  const [loading, setLoading] = useState(false)
  const [prices, setPrices] = useState([])
  const [analysis, setAnalysis] = useState(null)
  const [error, setError] = useState('')
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    runAnalysis(symbol)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const runAnalysis = async (sym) => {
    try {
      setError('')
      setLoading(true)
      setSymbol(sym)
      // fetch history
      const h = await fetch(`${BACKEND}/api/stocks/${sym}/history`).then(r => r.json())
      setPrices(h.prices || [])
      // analysis
      const a = await fetch(`${BACKEND}/api/stocks/${sym}/analysis`).then(r => r.json())
      setAnalysis(a)
    } catch (e) {
      setError(e.message || 'Failed to fetch data')
    } finally {
      setLoading(false)
    }
  }

  const addFavorite = async () => {
    try {
      const res = await fetch(`${BACKEND}/api/favorites`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbol, name: '', note: '' })
      }).then(r => r.json())
      setFavorites((f) => [{ id: res.id, symbol }, ...f.filter(x => x.symbol !== symbol)])
    } catch (e) {
      console.error(e)
    }
  }

  const loadFavorites = async () => {
    try {
      const data = await fetch(`${BACKEND}/api/favorites`).then(r => r.json())
      setFavorites(data.items || [])
    } catch {}
  }

  useEffect(() => { loadFavorites() }, [])

  return (
    <div className="min-h-screen bg-slate-950 text-blue-50">
      <Hero />

      <main className="relative -mt-16 z-10 px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl">
            <SearchBar onSearch={runAnalysis} />
            {error && (
              <div className="mt-4 text-red-300 text-sm">{error}</div>
            )}
            <div className="mt-8 grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xl font-semibold tracking-tight">{symbol} • Chart</h2>
                  <button onClick={addFavorite} className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm transition-colors">Save to Favorites</button>
                </div>
                {loading ? (
                  <div className="h-[240px] grid place-items-center text-blue-200/70 border border-blue-500/20 rounded-xl bg-slate-900/40">
                    Loading...
                  </div>
                ) : (
                  <StockChart data={prices} />
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold tracking-tight mb-3">AI Insights</h2>
                {loading ? (
                  <div className="h-[240px] grid place-items-center text-blue-200/70 border border-blue-500/20 rounded-xl bg-slate-900/40">
                    Analyzing...
                  </div>
                ) : (
                  <Insights analysis={analysis} />
                )}
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-lg font-semibold mb-3">Favorites</h3>
              {favorites.length === 0 ? (
                <div className="text-blue-200/80 text-sm">No favorites yet. Save a stock to see it here.</div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {favorites.map(f => (
                    <button key={f.id}
                      onClick={() => runAnalysis(f.symbol)}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-blue-100 text-sm">
                      {f.symbol}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="px-6 pb-10">
        <div className="max-w-6xl mx-auto text-center text-blue-300/70 text-sm">
          Built with AI • Educational use only • Not financial advice
        </div>
      </footer>
    </div>
  )
}

export default App
