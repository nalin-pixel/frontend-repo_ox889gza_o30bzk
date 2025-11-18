import { useState } from 'react'
import { Search } from 'lucide-react'

function SearchBar({ onSearch }) {
  const [value, setValue] = useState('AAPL')

  const submit = (e) => {
    e.preventDefault()
    if (!value.trim()) return
    onSearch(value.trim().toUpperCase())
  }

  return (
    <form onSubmit={submit} className="relative w-full max-w-xl mx-auto">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search ticker, e.g., AAPL, MSFT, TSLA"
        className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-800/70 border border-blue-500/20 text-blue-50 placeholder:text-blue-200/40 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300" size={18} />
      <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm transition-colors">
        Analyze
      </button>
    </form>
  )
}

export default SearchBar
