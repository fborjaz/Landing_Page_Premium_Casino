export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-gray-800 bg-gray-950 px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-gray-500 md:flex-row">
        <p>© 2025 CasinoTech IA. Todos los derechos reservados.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-white">Términos y Condiciones</a>
          <a href="#" className="hover:text-white">Política de Privacidad</a>
        </div>
      </div>
    </footer>
  )
}