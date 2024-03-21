import { SpeedInsights } from "@vercel/speed-insights/next"; // Import der SpeedInsights-Komponente von Vercel

import WeatherApp from "./WeatherApp"; // Import der WeatherApp-Komponente

/**
 * Wrapper-Komponente für die Integration von SpeedInsights zur Leistungsoptimierung.
 * Diese Komponente enthält die WeatherApp-Komponente, um die Leistung der Wetter-App zu analysieren.
 * Durch die Integration von SpeedInsights kann die Ladezeit und Leistung der WeatherApp überwacht und optimiert werden.
 */
function SpeedInsightsWrapper() {
  return (
    <SpeedInsights> {/* SpeedInsights-Komponente umhüllt die WeatherApp */}
      <WeatherApp /> {/* Einbettung der WeatherApp-Komponente */}
    </SpeedInsights>
  );
}

export default SpeedInsightsWrapper; // Export der Wrapper-Komponente für den Einsatz in der Anwendung
