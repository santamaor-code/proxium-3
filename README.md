# BioH — Plataforma de caída del cabello (LATAM)

Plataforma en español para educar, evaluar y dirigir pacientes a consulta
médica con BioH (Costa Rica), con arquitectura preparada para agregar
países adicionales de LATAM sin reescribir código.

## Empezar

```bash
npm install
npm run dev
```

Abre http://localhost:3000 — te redirige a `/cr` (Costa Rica), el único
país activo en esta primera versión.

## Cómo se agregan países nuevos

1. Agregar una entrada en `src/config/countries.ts` (nombre, clínica,
   contacto, SEO) con `active: true`.
2. Next.js genera automáticamente la ruta `/[codigo-de-pais]` — no se
   toca ningún componente ni página.
3. Traducir/adaptar el contenido específico del país cuando se agregue
   contenido de marketing (Milestone 2 en adelante).

## Estructura

```
src/
  app/
    [country]/        Rutas específicas de cada país (ej. /cr)
    layout.tsx         Layout raíz: fuentes, metadata global
    page.tsx            Redirige a /cr (país por defecto)
  components/
    layout/             Header, Footer (dependen de la config de país)
    ui/                 Button, Container (primitivas reutilizables)
  config/
    countries.ts        Fuente única de verdad para datos por país
  styles/
    tokens.css           Variables CSS de marca (espejo de tailwind.config.ts)
```

## Sistema de diseño

Colores y tipografía derivados de la marca BioH — ver
`tailwind.config.ts` para la escala completa. Regla clave: el color
terracota (`terracotta`) está reservado exclusivamente para llamados a
la acción (CTAs); no debe usarse de forma decorativa.
