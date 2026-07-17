import type { Metadata } from "next";
import { Fraunces, Roboto } from "next/font/google";
import "./globals.css";

// Fraunces: a high-contrast editorial serif, echoing the BioH logotype's
// thin/thick stroke contrast. Reserved for headlines only - this is the
// deliberate upgrade over BioH's current WordPress site, which uses Roboto
// for everything, including headings.
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

// Roboto: matches the body typeface already live on bioh.cr, confirmed via
// devtools inspection (2026-07-12). Keeps continuity with what BioH's
// existing visitors already associate with the brand.
const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "BioH | Tratamiento para la caída del cabello",
  description:
    "Evaluación clínica de caída del cabello con respaldo médico en Costa Rica.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-CR" className={`${fraunces.variable} ${roboto.variable}`}>
      <head>
        {/* Tabler icons - used for small decorative icons (checkmarks,
            causes section icons) across the site */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
        />
      </head>
      <body className="font-body">{children}</body>
    </html>
  );
}
