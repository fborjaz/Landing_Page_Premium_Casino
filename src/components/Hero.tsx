// En: src/components/Hero.tsx

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-20">

      {/* Contenedor principal centrado */}
      <div className="flex w-full max-w-4xl flex-col items-center gap-12 text-center">

        {/* Badge Tech */}
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-6 py-3 backdrop-blur-sm">
          <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-400"></div>
          <span className="text-sm font-medium uppercase tracking-wider text-cyan-300">
            Tecnología IA Avanzada
          </span>
        </div>

        {/* Título Principal */}
        <div className="space-y-4">
          <h1 className="text-6xl font-bold leading-tight md:text-8xl">
            El Futuro de las{' '}
            <span className="relative inline-block">
              Apuestas
              <div className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
            </span>
          </h1>
          <h2 className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-5xl font-bold text-transparent md:text-7xl">
            Potenciado por IA
          </h2>
        </div>

        {/* Descripción */}
        <p className="max-w-2xl text-xl leading-relaxed text-gray-300 md:text-2xl">
          Accede a análisis predictivos y promociones exclusivas antes que nadie.
          <span className="block mt-2 font-semibold text-cyan-400">
            Tu racha ganadora empieza aquí.
          </span>
        </p>

        {/* Features en línea */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-300">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500/20">
              <svg width="12" height="12" className="text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span>IA en tiempo real</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500/20">
              <svg width="12" height="12" className="text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span>Blockchain Seguro</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500/20">
              <svg width="12" height="12" className="text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span>Bonos Exclusivos</span>
          </div>
        </div>

        {/* Formulario centrado con diseño tech */}
        <div className="relative w-full max-w-md">

          {/* Brillo de fondo */}
          <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 opacity-50 blur-2xl"></div>

          {/* Contenedor del formulario */}
          <div className="relative rounded-2xl border border-cyan-500/30 bg-black/60 p-8 backdrop-blur-xl">

            {/* Esquinas decorativas */}
            <div className="pointer-events-none absolute left-2 top-2 h-6 w-6 rounded-tl-xl border-l-2 border-t-2 border-cyan-400/70"></div>
            <div className="pointer-events-none absolute right-2 top-2 h-6 w-6 rounded-tr-xl border-r-2 border-t-2 border-cyan-400/70"></div>
            <div className="pointer-events-none absolute bottom-2 left-2 h-6 w-6 rounded-bl-xl border-b-2 border-l-2 border-cyan-400/70"></div>
            <div className="pointer-events-none absolute bottom-2 right-2 h-6 w-6 rounded-br-xl border-b-2 border-r-2 border-cyan-400/70"></div>

            <div className="space-y-6">
              {/* Banner de oferta */}
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 p-4 shadow-lg shadow-yellow-500/30">
                <div className="relative z-10 text-center">
                  <p className="flex items-center justify-center gap-2 text-base font-bold text-gray-900">
                    <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-gray-900"></span>
                    ¡OFERTA DE PRE-REGISTRO!
                  </p>
                  <p className="mt-1 text-sm font-medium text-gray-800">
                    $500 Giros Gratis + Duplica tu Depósito
                  </p>
                </div>
              </div>

              {/* Formulario */}
              <form className="space-y-4">
                <div className="group relative">
                  <input
                    type="email"
                    placeholder="correo@ejemplo.com"
                    className="w-full rounded-xl border border-cyan-500/30 bg-gray-900/80 px-4 py-4 text-white placeholder-gray-500 transition-all focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                  />
                  <div className="pointer-events-none absolute right-4 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-cyan-400/50 opacity-0 transition-opacity group-hover:opacity-100"></div>
                </div>

                <div className="group relative">
                  <input
                    type="password"
                    placeholder="Tu contraseña segura"
                    className="w-full rounded-xl border border-cyan-500/30 bg-gray-900/80 px-4 py-4 text-white placeholder-gray-500 transition-all focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                  />
                  <div className="pointer-events-none absolute right-4 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-cyan-400/50 opacity-0 transition-opacity group-hover:opacity-100"></div>
                </div>

                <button
                  type="submit"
                  className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-4 text-lg font-bold text-white shadow-lg shadow-cyan-500/50 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/70"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    ¡REGISTRARME AHORA!
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
              </form>

              {/* Badge de seguridad */}
              <div className="flex items-center justify-center gap-2 pt-2 text-xs text-gray-400">
                <div className="flex h-5 w-5 items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/10">
                  <svg width="10" height="10" className="text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <span>SSL/TLS + Encriptación AES-256</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
