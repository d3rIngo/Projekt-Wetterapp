// Importieren der globalen CSS-Datei für Styling
import './globals.css';

// Importieren der Inter-Schriftart von Google Fonts
import { Inter } from 'next/font/google';

// Konfiguration der Inter-Schriftart mit lateinischen Zeichen
const inter = Inter({ subsets: ['latin'] });

// Metadaten für die gesamte Anwendung
export const metadata = {
  title: 'Wetter App', // Titel der Anwendung
  description: '', // Beschreibung der Anwendung (leer in diesem Fall)
};

// Hauptlayoutkomponente für die gesamte Anwendung
export default function RootLayout({ children }) {
  return (
    // HTML-Dokument mit der Spracheinstellung Deutsch
    <html lang="de">
      {/* Body-Element mit der Inter-Schriftart-Klasse */}
      <body className={inter.className}>
        {/* Einbettung der Kindkomponenten */}
        {children}
      </body>
    </html>
  );
}
