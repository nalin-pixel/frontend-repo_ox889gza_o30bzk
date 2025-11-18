import Spline from '@splinetool/react-spline'

function Hero() {
  return (
    <section className="relative w-full h-[70vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4Zh-Q6DWWp5yPnQf/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-[0_0_30px_rgba(59,130,246,0.45)]">
            AI Stock Insights
          </h1>
          <p className="mt-4 text-base md:text-lg text-blue-100/90">
            Search any ticker to view historical performance, get AI-powered analysis, and save your favorites.
          </p>
          <div className="mt-8 inline-flex items-center gap-3 text-xs md:text-sm text-blue-200/80 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 pointer-events-none">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_12px_2px_rgba(52,211,153,0.7)]"></span>
            Live demo • No signup required
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950 pointer-events-none" />
    </section>
  )
}

export default Hero
