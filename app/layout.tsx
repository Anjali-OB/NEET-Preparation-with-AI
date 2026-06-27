import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Prep AI — Your AI Study Mentor',
  description: 'Complete NEET and MHT-CET preparation platform for Maharashtra students',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet"/>
        <style>{`
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          body { background: #0f1117; color: #e6edf3; font-family: Inter, system-ui, sans-serif; }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}