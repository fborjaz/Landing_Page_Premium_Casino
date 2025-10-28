# Casino Landing — Landing Page Premium
[![Demo deploy](https://github.com/fborjaz/Landing_Page_Premium_Casino/actions/workflows/demo.yml/badge.svg)](https://github.com/fborjaz/Landing_Page_Premium_Casino/actions/workflows/demo.yml) [![Demo Pages](https://img.shields.io/badge/demo-GitHub%20Pages-blue)](https://fborjaz.github.io/Landing_Page_Premium_Casino/)

Bienvenido/a al repositorio de la landing page "Casino Landing" — una plantilla/implementación de página de aterrizaje premium construida con React, TypeScript y Vite, optimizada para animaciones, interacción 3D y rendimiento.

## Descripción

Este proyecto es una landing page enfocada a servicios o productos del sector casino/entretenimiento. Incluye una experiencia visual avanzada con gráficos 3D, partículas y animaciones fluidas pensadas para impactar al usuario y mejorar la conversión.

Principales características:

- Interfaz construida con React + TypeScript.
- Renderizado 3D y escenas con `three` y `@react-three/fiber`.
- Efectos de partículas y animaciones con `tsparticles`, `gsap` y `lenis`.
- Estilos modernos con Tailwind CSS y PostCSS.
- Configuración de desarrollo rápida con Vite (HMR rápido).

## Qué hace

- Presenta una sección hero interactiva con elementos 3D.
- Muestra pasos, tarjetas y animaciones para explicar cómo funciona el servicio.
- Incluye componentes reutilizables (chips, contador, cards 3D, secciones de scroll) y una estructura preparada para producción.

## Tecnologías

- Node.js (recomendado: v18+)
- Vite (bundler / dev server)
- React 19
- TypeScript
- Tailwind CSS
- PostCSS / Autoprefixer
- Three.js / @react-three/fiber / @react-three/drei
- tsparticles (@tsparticles/react)
- GSAP, Lenis para animaciones y scroll
- Otras utilidades: mathjs, motion, ogl

Dependencias principales (extraídas de `package.json`):

- react, react-dom
- three, @react-three/fiber, @react-three/drei
- tailwindcss, postcss, autoprefixer
- vite, typescript

## Estructura del proyecto

Raíz (archivos importantes):

- `index.html` — HTML principal.
- `package.json` — scripts y dependencias.
- `vite.config.ts` — configuración de Vite.
- `tsconfig.json` / `tsconfig.app.json` — configuración TypeScript.
- `tailwind.config.js` / `postcss.config.js` — configuración de Tailwind/PostCSS.

Carpeta `src/` (implementación):

- `main.tsx` — punto de entrada.
- `App.tsx` — componente raíz.
- `index.css`, `globals.css`, `App.css` — estilos base.
- `assets/` — imágenes y recursos.
- `components/` — componentes React reutilizables:
  - `Hero.tsx`, `Footer.tsx`, `ScrollStack.tsx`, `Particles.tsx`, `Scene.tsx`, `StepCard3D.tsx`, etc.

> Nota: La estructura completa de `src/components` está pensada para composición y fácil extensión.

## Contrato mínimo (inputs / outputs)

- Input: Código fuente en `src/` y assets estáticos en `public/`.
- Output: Bundle optimizado en `dist/` tras `npm run build`.
- Error modes: Dependencias faltantes (node_modules faltante), versión de Node incompatible.

Casos borde a considerar:

- Node o npm veriones antiguas.
- Ficheros .env no configurados (aquí no hay variables obligatorias por defecto).
- Recursos 3D grandes que afecten al rendimiento en dispositivos móviles.

## Requisitos previos

- Node.js v18 o superior (recomendado). Puedes comprobar tu versión con:

```bash
node -v
npm -v
```

- Git si quieres clonar el repositorio.

## Instalación (común)

1. Clonar el repositorio (si corresponde):

```bash
git clone https://github.com/fborjaz/Landing_Page_Premium_Casino.git
cd "Casino-Landig"
```

1. Instalar dependencias:

```bash
npm install
```

1. Ejecutar en modo desarrollo (HMR):

```bash
npm run dev
```

1. Construir para producción:

```bash
npm run build
```

1. Previsualizar el build de producción:

```bash
npm run preview
```

> Los scripts disponibles en `package.json` son: `dev` (vite), `build` (tsc -b && vite build), `preview` (vite preview) y `lint`.

## Instrucciones por sistema operativo

Windows (cmd.exe)

- Abrir `cmd.exe` y ejecutar:

```cmd
cd "a:\\Visual Studio Code\\Jobs\\Landing Page Premium\\Casino-Landig"
npm install
npm run dev
```

Linux (bash)

- Abrir terminal y ejecutar:

```bash
cd "/ruta/al/proyecto/Casino-Landig"
npm install
npm run dev
```

macOS (zsh / bash)

- Abrir Terminal y ejecutar:

```bash
cd "/ruta/al/proyecto/Casino-Landig"
npm install
npm run dev
```

Notas específicas:

- En Windows, si usas PowerShell: cambia `cmd` por PowerShell (los comandos `npm` son idénticos).
- Si prefieres `pnpm` o `yarn`, puedes adaptar `npm install` por `pnpm install` o `yarn`.

## Desarrollo y buenas prácticas

- Mantén las dependencias actualizadas y revisa breaking changes al actualizar `three`, `react` o `vite`.
- Optimiza texturas y modelos 3D para mejorar tiempos de carga en móviles.
- Usa lazy-loading para módulos pesados (componentes 3D o assets grandes).
- Ejecuta `npm run lint` antes de commits para mantener calidad de código.

## Cómo contribuir

- Crea una rama con una descripción clara del cambio.
- Añade tests mínimos o ejemplo visual cuando modifiques componentes interactivos.
- Abre un PR con descripción y capturas o GIFs del comportamiento (si aplica).

## Contacto / Autor

- Autor: fborjaz
- Repositorio: Landing_Page_Premium_Casino (rama principal: `main`).
