/** @type {import('tailwindcss').Config} */
module.exports = {
  // Inhaltsdateien für Tailwind CSS, die nach Klassen durchsucht werden sollen
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}', // Seitenkomponenten
    './src/components/**/*.{js,ts,jsx,tsx,mdx}', // Komponenten
    './src/app/**/*.{js,ts,jsx,tsx,mdx}', // Anwendungskomponenten
  ],

  // Theme-Erweiterungen für Tailwind CSS
  theme: {
    extend: {
      // Hinzufügen benutzerdefinierter Hintergrundbilder
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))', // Radialer Farbverlauf
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))', // Konischer Farbverlauf
      },
    },
  },
  // Liste der Plugins für Tailwind CSS
  plugins: [],
}
